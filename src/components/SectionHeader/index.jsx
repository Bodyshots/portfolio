function SectionHeader({ text }) {
  return (
    <div className="flex h-31.25 w-full items-center justify-evenly border-y-3 border-foreground! bg-primary text-7xl text-foreground text-shadow-[3px_3px_3px_color-mix(in_srgb,var(--color-foreground)_15%,transparent)] shadow-[3px_3px_3px_color-mix(in_srgb,var(--color-foreground)_25%,transparent)]">
      <div>-</div>
      <div>{text}</div>
      <div>-</div>
    </div>
  );
}

export default SectionHeader;
