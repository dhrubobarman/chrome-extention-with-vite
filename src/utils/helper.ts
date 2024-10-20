import { Theme } from "@/types";

export const sendThemeSignal = async (theme: Theme | undefined) => {
  if (!theme) {
    theme = "system";
  }
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!tab.id) return;
  if (theme === "system") theme = systemTheme;
  chrome.tabs.sendMessage(tab.id, { action: "changeTheme", theme });
};
