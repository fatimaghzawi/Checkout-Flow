import { STEP_LABELS } from "../utils/a11y";

const steps = [
  {
    label: "REVIEW ORDER",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="step-icon" aria-hidden="true">
        <rect x="10" y="6" width="28" height="36" rx="2" />
        <line x1="16" y1="14" x2="32" y2="14" />
        <line x1="16" y1="20" x2="32" y2="20" />
        <line x1="16" y1="26" x2="26" y2="26" />
        <path d="M16 34 Q24 28 32 34" />
      </svg>
    ),
  },
  {
    label: "YOUR DETAILS",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="step-icon" aria-hidden="true">
        <rect x="8" y="14" width="32" height="22" rx="2" />
        <rect x="12" y="10" width="32" height="22" rx="2" fill="white" />
        <circle cx="20" cy="21" r="3" />
        <line x1="26" y1="19" x2="36" y2="19" />
        <line x1="26" y1="24" x2="34" y2="24" />
      </svg>
    ),
  },
  {
    label: "SHIPPING",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="step-icon" aria-hidden="true">
        <path d="M8 18 L8 36 L40 36 L40 18 Z" />
        <polyline points="8,18 24,8 40,18" />
        <line x1="24" y1="8" x2="24" y2="22" />
        <polyline points="20,14 24,10 28,14" />
      </svg>
    ),
  },
  {
    label: "PAYMENT",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="step-icon" aria-hidden="true">
        <rect x="6" y="16" width="36" height="24" rx="3" />
        <rect x="10" y="10" width="36" height="24" rx="3" fill="white" />
        <line x1="10" y1="20" x2="46" y2="20" />
        <line x1="14" y1="28" x2="24" y2="28" />
      </svg>
    ),
  },
];

const progressState = {
  1: { active: 1, completed: [] },
  2: { active: 2, completed: [1] },
  3: { active: 3, completed: [1, 2] },
  4: { active: 4, completed: [1, 2, 3] },
};

function ProgressBar({ currentStep, onStepClick }) {
  const { active, completed } = progressState[currentStep] ?? { active: 1, completed: [] };
  const progressPercent = (currentStep / 4) * 100;

  const handleStepClick = (stepNumber) => {
    if (completed.includes(stepNumber)) {
      onStepClick?.(stepNumber);
    }
  };

  return (
    <>
      <div className="mobile-progress">
        <p className="mobile-step-indicator" aria-hidden="true">
          Step {currentStep} of 4 · <span>{STEP_LABELS[currentStep]}</span>
        </p>
        <div className="mobile-progress-track" aria-hidden="true">
          <div
            className="mobile-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mobile-step-nav" role="group" aria-label="Go to a previous step">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = completed.includes(stepNumber);
            const isActive = stepNumber === active;

            return (
              <button
                key={step.label}
                type="button"
                className={`mobile-step-btn ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
                onClick={() => handleStepClick(stepNumber)}
                disabled={!isCompleted}
                aria-current={isActive ? "step" : undefined}
                aria-label={
                  isCompleted
                    ? `Go back to ${step.label}`
                    : isActive
                      ? `${step.label}, current step`
                      : `${step.label}, upcoming step`
                }
              >
                {isCompleted ? "✓" : stepNumber}
              </button>
            );
          })}
        </div>
      </div>

      <nav className="progress-container" aria-label="Checkout progress">
        <ol className="progress-list">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = completed.includes(stepNumber);
            const isActive = stepNumber === active;
            const status = isCompleted ? "completed" : isActive ? "current" : "upcoming";

            const iconContent = (
              <>
                {step.icon}
                {isCompleted && (
                  <div className="step-check">
                    <span aria-hidden="true">✓</span>
                  </div>
                )}
              </>
            );

            return (
              <li
                key={step.label}
                className={`progress-step ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? (
                  <button
                    type="button"
                    className="step-button"
                    onClick={() => handleStepClick(stepNumber)}
                    aria-label={`Go back to ${step.label}`}
                  >
                    <div className="step-icon-wrap" aria-hidden="true">
                      {iconContent}
                    </div>
                  </button>
                ) : (
                  <div className="step-icon-wrap" aria-hidden="true">
                    {iconContent}
                  </div>
                )}
                <span className="step-label" aria-hidden="true">
                  {stepNumber}. {step.label}
                </span>
                <span className="sr-only">
                  {status === "completed" && "Completed. "}
                  {status === "current" && "Current step. "}
                  {status === "upcoming" && "Upcoming step. "}
                  {step.label}
                  {isCompleted && ". Click to go back."}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default ProgressBar;
