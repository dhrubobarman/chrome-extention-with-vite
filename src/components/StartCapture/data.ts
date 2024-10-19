import rawMain from "@/components/StartCapture/capture/main?raw";
import rawCss from "@/components/StartCapture/capture/main.css?raw";

// export { z as Inspector, h as createButton, s as createElement, R as default };

const generateButtons = () => {
  return `
  var mainInstance = new R();
  var container = s("div", {
    id: "inspector-controls-container",
    className: "flex justify-between gap-2 fixed top-2 right-2",
  });
  var startButton = h({
    innerText: "Start",
    onclick: () => mainInstance.start(),
  });
  var stopButton = h({
    innerText: "Stop",
    onclick: () => mainInstance.stop(),
  });
  var saveButton = h({
    innerText: "Save",
    onclick: async () => {
      var data = await mainInstance.getAllData();
      console.log(data);
    },
  });
  container.append(startButton, stopButton, saveButton);
  document.appendChild(container)
  `;
};

const rawJs = () => {
  return `
  ${rawMain}
  ${generateButtons()}
  `;
};

export { rawCss, rawJs };
