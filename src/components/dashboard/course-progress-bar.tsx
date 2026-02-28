import { cn } from "@/lib/utils";

type ColorVariant = "teal" | "purple" | "green" | "coral";

interface CourseProgressBarProps {
  current: number;
  total: number;
  variant?: ColorVariant;
  showLabel?: boolean;
}

const fillGradients: Record<ColorVariant, string> = {
  teal: "bg-[linear-gradient(135deg,_theme(colors.teal)_0%,_theme(colors.teal-light)_40%,_theme(colors.purple)_100%)]",
  purple: "bg-[linear-gradient(135deg,_theme(colors.purple),_theme(colors.purple-dark))]",
  green: "bg-[linear-gradient(135deg,_theme(colors.green),_theme(colors.green-dark))]",
  coral: "bg-[linear-gradient(135deg,_theme(colors.rose),_theme(colors.rose-dark))]",
};

const percentColors: Record<ColorVariant, string> = {
  teal: "text-teal",
  purple: "text-purple-light",
  green: "text-green",
  coral: "text-rose",
};

export function CourseProgressBar({
  current,
  total,
  variant = "teal",
  showLabel = true,
}: CourseProgressBarProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div>
      <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full relative transition-[width] duration-1000",
            fillGradients[variant]
          )}
          style={{ width: `${percent}%` }}
        >
          <div className="absolute top-0 right-0 w-5 h-full bg-white/25 rounded-full blur-[3px]" />
        </div>
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[0.72rem] font-bold text-dim">
            {current} / {total} woorden geleerd
          </span>
          <span className={cn("text-[0.72rem] font-extrabold", percentColors[variant])}>
            {percent}%
          </span>
        </div>
      )}
    </div>
  );
}
