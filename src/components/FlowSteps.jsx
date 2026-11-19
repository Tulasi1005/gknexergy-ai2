import { ArrowRight } from "lucide-react";

const FlowSteps = ({ steps, testId = "flow-steps" }) => (
    <div className="flowsteps-container" data-testid={testId}>
        {steps.map((step, i) => (
            <div key={step} className="flowstep-item">
                <div className="flowstep-card">
                    <span className="flowstep-num">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flowstep-title">
                        {step}
                    </span>
                </div>
                {i < steps.length - 1 && (
                    <ArrowRight className="flowstep-arrow" strokeWidth={2.2} aria-hidden="true" />
                )}
            </div>
        ))}
    </div>
);

export default FlowSteps;
