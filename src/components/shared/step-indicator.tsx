interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex items-center flex-1 last:flex-initial">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isActive
                    ? "bg-teal text-teal-fg border-2 border-teal-dark border-b-4"
                    : isCompleted
                      ? "bg-teal text-teal-fg"
                      : "bg-secondary text-dim border border-white/[0.08]"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-xs font-medium text-center ${
                  isActive
                    ? "text-teal font-bold"
                    : isCompleted
                      ? "text-teal"
                      : "text-dim"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 border-t-2 mx-2 mt-[-1rem] ${
                  index < currentStep ? "border-teal" : "border-white/[0.08]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
