import { ThemeProvider } from "@/providers/themeProvider";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { ModeToggle } from "@/components/ToggleTheme";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="capture-extention-ui-theme">
      <div className="w-[374px] min-h-[500px] p-3">
        <div className="relative mb-3">
          <h6 className="font-semibold text-xl text-center min-h-[36px]">
            Welcome to capture
          </h6>
          <span className="absolute top-0 right-0">
            <ModeToggle />
          </span>
        </div>
        {children}
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default Layout;
