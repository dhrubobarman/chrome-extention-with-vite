import { StepData } from "@/components/StartCapture/capture/main";
import { UserData } from "@/providers/storageProvider";

const TOKEN_NAME = "extention-token";
const STATUS_KEY = "extention-status";
const STEP_DATA_KEY = "extention-step-data";
const USER_DATA_KEY = "extention-user-data";

export type Status = "started" | "stoped" | "data";

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

export const setStatus = async (status: Status) => {
  await chrome.storage?.sync.set({ [STATUS_KEY]: status });
};
export const getStatus = async (): Promise<Status | null> => {
  const data = await chrome.storage?.sync.get(STATUS_KEY);
  if (data[STATUS_KEY]) {
    return data[STATUS_KEY];
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
// export const getData = async () => {
//   const data = await chrome.storage?.sync.get(STEP_DATA_KEY);
//   if (data[STEP_DATA_KEY]) {
//     return data[STEP_DATA_KEY];
//   }
//   return [];
// };
// export const clearData = async () => {
//   await chrome.storage?.sync.remove(STEP_DATA_KEY);
// };
