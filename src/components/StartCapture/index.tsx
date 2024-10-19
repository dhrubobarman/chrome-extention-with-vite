import { StepData } from "@/components/StartCapture/capture/main";
import css from "@/components/StartCapture/capture/main.css?raw";
import { Button } from "@/components/ui/button";
import { getStatus, setData, setStatus, Status } from "@/utils/storage";
import { Save } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const StartCapture = () => {
  const [buttonState, setButtonState] = useState({
    startButton: false,
    stopButton: true,
    saveButton: true,
  });
  const [stepData, setStepData] = useState<StepData[]>([]);

  useEffect(() => {
    getStatus().then((status) => {
      handleDisableButton(status);
    });
  }, []);

  const handleDisableButton = (status: Status | null) => {
    if (status === null) return;
    if (status === "started") {
      setButtonState({
        startButton: true,
        stopButton: false,
        saveButton: false,
      });
    }
    if (status === "stoped") {
      setButtonState({
        startButton: false,
        stopButton: true,
        saveButton: false,
      });
    }
  };

  const listenForMessage = useCallback(() => {
    chrome.runtime.onMessage?.addListener(async (request) => {
      if (request.action === "messageFromContent") {
        const { data, response } = request.data;
        if (response) {
          await setStatus(response);
          handleDisableButton(response);
        }
        if (response === "data") {
          setStepData((prev) => {
            const newData = [...prev, ...data];
            setData(newData);
            return newData;
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    listenForMessage();
  }, [listenForMessage]);

  const handleStart = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab.id) return;
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["capture/main.js"],
    });
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      css: css,
    });
    chrome.tabs.sendMessage(tab.id, { action: "start" });
  };

  const handleStop = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab.id) return;

    chrome.scripting.removeCSS({
      target: { tabId: tab.id },
      css: css,
    });
    chrome.tabs.sendMessage(tab.id, { action: "stop" });
  };

  const handleSave = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab.id) return;

    chrome.scripting.removeCSS({
      target: { tabId: tab.id },
      css: css,
    });
    chrome.tabs.sendMessage(tab.id, { action: "sendStepData" });
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="content flex-grow overflow-y-auto mb-3 max-h-[400px] relative">
        {stepData.length > 0 ? (
          <div className="flex flex-col gap-3">
            {stepData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 shadow rounded-md border dark:border-gray-900 dark:bg-[#1b1b1b] py-2 px-3"
              >
                <h6 className="text-lg font-semibold">{data.title}</h6>
                <p className="text-sm line-clamp-2">{data.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center absolute inset-0">
            <p className="text-lg font-semibold text-gray-500">No Data</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button disabled={buttonState.startButton} onClick={handleStart}>
            Start
          </Button>
          <Button
            disabled={buttonState.stopButton}
            variant={"destructive"}
            onClick={handleStop}
          >
            Stop
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            disabled={buttonState.saveButton}
            onClick={handleSave}
          >
            Get Data
          </Button>
          <Button
            variant={"secondary"}
            disabled={stepData.length === 0}
            onClick={handleSave}
          >
            <Save /> Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartCapture;
