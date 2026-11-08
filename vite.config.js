import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function ttsProxyPlugin() {
  return {
    name: 'tts-proxy-plugin',
    configureServer(server) {
      server.middlewares.use('/api/tts', async (req, res) => {
        try {
          const url = new URL(req.url, 'http://localhost');
          const text = url.searchParams.get('q') || '';
          const lang = url.searchParams.get('tl') || 'en';
          if (!text) {
            res.statusCode = 400;
            res.end('Missing text parameter');
            return;
          }
          const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(lang)}&client=tw-ob&q=${encodeURIComponent(text)}`;
          const response = await fetch(googleUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Referer': 'https://translate.google.com/',
            },
          });
          if (!response.ok) {
            res.statusCode = response.status;
            res.end('Upstream TTS error');
            return;
          }
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          const arrayBuffer = await response.arrayBuffer();
          res.end(Buffer.from(arrayBuffer));
        } catch (err) {
          res.statusCode = 500;
          res.end('TTS Proxy Error: ' + err.message);
        }
      });
    },
  };
}

function counterDevPlugin() {
  const activeSessions = new Map();
  const ACTIVE_WINDOW_MS = 25000;

  function prune() {
    const now = Date.now();
    for (const [id, lastSeen] of activeSessions.entries()) {
      if (now - lastSeen > ACTIVE_WINDOW_MS) {
        activeSessions.delete(id);
      }
    }
  }

  function handle(req, res) {
    prune();
    const url = new URL(req.url, 'http://localhost');
    const action = url.searchParams.get('action') || '';
    const sessionId = (url.searchParams.get('session_id') || '').replace(/[^a-zA-Z0-9_-]/g, '');

    if (action === 'leave' && sessionId) {
      activeSessions.delete(sessionId);
    } else if (sessionId) {
      activeSessions.set(sessionId, Date.now());
    }

    const activeCount = Math.max(1, activeSessions.size);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      active_users: activeCount
    }));
  }

  return {
    name: 'counter-dev-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.startsWith('/api/counter') || req.url.startsWith('/public/api/counter'))) {
          handle(req, res);
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.startsWith('/api/counter') || req.url.startsWith('/public/api/counter'))) {
          handle(req, res);
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), ttsProxyPlugin(), counterDevPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssMinify: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' || process.env.VITE_KEEP_LOGS !== 'true' ? ['console', 'debugger'] : [],
    legalComments: 'none',
  },
});
