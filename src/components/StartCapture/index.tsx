import { Button } from "@/components/ui/button";
import Main, {
  createButton,
  createElement,
} from "@/components/StartCapture/capture/main";

const StartCapture = () => {
  const handleClick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab.id) return;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const mainInstance = new Main();
        const container = createElement("div", {
          id: "inspector-controls-container",
          className: "flex justify-between gap-2 fixed top-2 right-2",
        });
        const startButton = createButton({
          innerText: "Start",
          onclick: () => mainInstance.start(),
        });
        const stopButton = createButton({
          innerText: "Stop",
          onclick: () => mainInstance.stop(),
        });
        const saveButton = createButton({
          innerText: "Save",
          onclick: async () => {
            const data = await mainInstance.getAllData();
            console.log(data);
          },
        });
        container.append(startButton, stopButton, saveButton);
        document.body.appendChild(container);
      },
    });
  };
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Button onClick={handleClick}>Start Capture</Button>
    </div>
  );
};

export default StartCapture;
