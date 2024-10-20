import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/themeProvider";
import { useEffect } from "react";
import { sendThemeSignal } from "@/utils/helper";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = async () => {
    if (theme !== "dark") {
      setTheme("dark");
      return;
    } else {
      setTheme("light");
      return;
    }
  };

  useEffect(() => {
    console.log(theme);
    sendThemeSignal(theme);
  }, [theme]);

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
