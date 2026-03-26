export function Avatar({
  letters,
  grad,
  size = "md",
  online = false,
}: {
  letters: string;
  grad: string;
  size?: "sm" | "md" | "lg" | "xl";
  online?: boolean;
}) {
  const sizes = {
    sm: "w-9 h-9 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-3xl",
  };
  const dotSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
    xl: "w-5 h-5",
  };
  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizes[size]} rounded-full bg-gradient-to-br ${grad} flex items-center justify-center font-bold text-white shadow-lg`}
      >
        {letters}
      </div>
      {online && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizes[size]} bg-emerald-400 rounded-full border-2 border-[#0f0f1a]`}
        />
      )}
    </div>
  );
}

export function WaveVoice({ fromMe }: { fromMe: boolean }) {
  const heights = [3, 5, 8, 6, 4, 7, 5, 8];
  return (
    <div className="flex items-center gap-0.5 h-8">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-full wave-bar"
          style={{
            height: `${h * 3.5}px`,
            background: fromMe ? "rgba(255,255,255,0.75)" : "#7C3AED",
            animationDelay: `${i * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}
