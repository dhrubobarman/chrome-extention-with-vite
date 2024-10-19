import { getToken, getUser } from "@/utils/storage";
import { createContext, useContext, useEffect, useReducer } from "react";

export type UserData = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
};

type StorageProviderProps = {
  children: React.ReactNode;
};

type StorageProviderState = {
  token: string | null;
  userData: Partial<UserData> | null;
};

const initialState: StorageProviderState = {
  token: null,
  userData: null,
};

export type StorageAction =
  | { type: "SET_TOKEN"; payload: string | null }
  | { type: "SET_USER_DATA"; payload: Partial<UserData> | null };

const StorageProviderContext = createContext<{
  state: StorageProviderState;
  dispatch: React.Dispatch<StorageAction>;
} | null>(null);

const storeReducer = (
  state: StorageProviderState,
  action: StorageAction
): StorageProviderState => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_USER_DATA":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export function StorageProvider({ children, ...props }: StorageProviderProps) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    const setUserData = async () => {
      try {
        const user = await getUser();
        const token = await getToken();
        dispatch({ type: "SET_TOKEN", payload: token });
        dispatch({ type: "SET_USER_DATA", payload: user });
      } catch (error) {
        console.error(error);
      }
    };
    setUserData();
  }, []);

  return (
    <StorageProviderContext.Provider {...props} value={{ state, dispatch }}>
      {children}
    </StorageProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => {
  const context = useContext(StorageProviderContext);

  if (!context)
    throw new Error("useStore must be used within a StorageProvider");

  return context;
};
