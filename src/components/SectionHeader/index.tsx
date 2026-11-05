interface SectionHeaderProps {
  text: string;
}

function SectionHeader({ text }: SectionHeaderProps) {
  return (
    <div className="flex h-31.25 w-full items-center justify-evenly border-y-3 border-foreground! bg-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl  text-foreground text-shadow-[3px_3px_3px_color-mix(in_srgb,var(--color-foreground)_15%,transparent)] shadow-[3px_3px_3px_color-mix(in_srgb,var(--color-foreground)_25%,transparent)] overflow-hidden">
      <span className="hidden lg:text-7xl lg:inline">-</span>
      <span>{text}</span>
      <span className="hidden lg:text-7xl lg:inline">-</span>
    </div>
  );
}

export default SectionHeader;
