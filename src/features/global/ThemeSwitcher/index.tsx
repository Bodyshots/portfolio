import {
  ThemedIcon,
  useHydrated,
  useTheme,
} from "@teispace/next-themes/client";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
  const hydrated = useHydrated();
  const { resolvedTheme, setTheme } = useTheme();

  if (!hydrated || !resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="fixed right-6 bottom-6 z-40 flex size-12 items-center justify-center rounded-full border border-foreground bg-secondary text-secondary-foreground shadow-lg hover:bg-gray-50 hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all duration-100 opacity-50 hover:opacity-100"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <ThemedIcon
        variants={{
          light: <SunIcon aria-hidden="true" size={22} strokeWidth={2} />,
          dark: <MoonIcon aria-hidden="true" size={22} strokeWidth={2} />,
        }}
        fallback={<SunIcon aria-hidden="true" size={22} />}
      />
    </button>
  );
};

export default ThemeSwitcher;
