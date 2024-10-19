import LoginForm from "@/components/LoginForm";
import StartCapture from "@/components/StartCapture";
import { useStore } from "@/providers/storageProvider";
import { ThemeProvider } from "@/providers/themeProvider";

function App() {
  const {
    state: { token },
  } = useStore();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="capture-extention-ui-theme">
      {token ? <StartCapture /> : <LoginForm />}
    </ThemeProvider>
  );
}

export default App;
