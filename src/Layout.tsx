import { ThemeProvider } from "@/providers/themeProvider";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { ModeToggle } from "@/components/ToggleTheme";
import UserProfile from "@/components/UserProfile";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="capture-extention-ui-theme">
      <div className="w-[374px] min-h-[400px] flex flex-col border dark:bg-[#28292d]">
        <div className="relative mb-3 border-b dark:border-gray-700 p-3">
          <span className="absolute top-3 left-3">
            <UserProfile />
          </span>
          <h6 className="font-semibold text-xl text-center min-h-[36px]">
            Welcome to capture
          </h6>
          <span className="absolute top-3 right-3">
            <ModeToggle />
          </span>
        </div>
        <div className="p-3 flex-grow flex flex-col">{children}</div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default Layout;
