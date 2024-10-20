import { StepData } from "../../public/capture/main";
import { UserData } from "@/types";
import { Status, Theme } from "@/types";

const TOKEN_NAME = "capture-extention-token";
const STATUS_KEY = "capture-extention-status";
const STEP_DATA_KEY = "capture-extention-step-data";
const USER_DATA_KEY = "capture-extention-user-data";
const THEME_KEY = "capture-extention-ui-theme";

export const setToken = async (token: string) => {
  await chrome.storage?.sync.set({ [TOKEN_NAME]: token });
};
export const getToken = async (): Promise<string | null> => {
  const data = await chrome.storage?.sync.get(TOKEN_NAME);
  if (data[TOKEN_NAME]) {
    return data[TOKEN_NAME];
  }
  return null;
};
export const setUser = async (user: Partial<UserData>) => {
  await chrome.storage?.sync.set({ [USER_DATA_KEY]: user });
};
export const getUser = async (): Promise<UserData | null> => {
  const data = await chrome.storage?.sync.get(USER_DATA_KEY);
  if (data[USER_DATA_KEY]) {
    return data[USER_DATA_KEY];
  }
  return null;
};

export const isLoggedIn = async () => {
  return await getToken();
};
export const logOut = async () => {
  try {
    await chrome.storage?.sync.remove(TOKEN_NAME);
    await chrome.storage?.sync.remove(USER_DATA_KEY);
  } catch (error) {
    const newError = error as Error;
    throw new Error(newError.message);
  }
};

export const setData = async (data: StepData[]) => {
  await chrome.storage?.sync.set({ [STEP_DATA_KEY]: data });
};

export const setUserTheme = async (theme: Theme) => {
  await chrome.storage?.sync.set({ [THEME_KEY]: theme });
};
export const getUserTheme = async (): Promise<Theme | null> => {
  const data = await chrome.storage?.sync.get(THEME_KEY);
  if (data[THEME_KEY]) {
    return data[THEME_KEY];
  }
  return null;
};

const getTabsStatusdata = async () => {
  const data = await chrome.storage?.sync.get(STATUS_KEY);
  return data ? data[STATUS_KEY] : null;
};

export const setCurrentTabStatus = async (
  status: Status,
  activeTabId?: number
) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = activeTabId || tab.id;
  if (!tabId) return;

  const oldData = await getTabsStatusdata();
  const newData = { ...oldData, [tabId]: status };
  await chrome.storage?.sync.set({ [STATUS_KEY]: newData });
};

export const getCurrentTabStatus = async (): Promise<Status | null> => {
  const data = await getTabsStatusdata();
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.id || !data) return null;
  if (data[tab.id]) {
    return data[tab.id];
  }
  return null;
};
