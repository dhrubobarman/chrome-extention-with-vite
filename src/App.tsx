import LoginForm from "@/components/LoginForm";
import StartCapture from "@/components/StartCapture";
import { ThemeProvider } from "@/providers/themeProvider";
import { useState } from "react";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="capture-extention-ui-theme">
      {isUserLoggedIn ? (
        <StartCapture />
      ) : (
        <LoginForm setIsUserLoggedIn={setIsUserLoggedIn} />
      )}
    </ThemeProvider>
  );
}

export default App;
