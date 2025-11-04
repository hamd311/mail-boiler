"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" disabled />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-muted hover:text-foreground"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" color="white" />
      ) : (
        <Moon className="h-5 w-5" color="black" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
