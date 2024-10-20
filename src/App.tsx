import LoginForm from "@/components/LoginForm";
import StartCapture from "@/components/StartCapture";
import { useStore } from "@/providers/storageProvider";

function App() {
  const {
    state: { token },
  } = useStore();

  return <>{token ? <StartCapture /> : <LoginForm />}</>;
}

export default App;
