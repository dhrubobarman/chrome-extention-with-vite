var O=Object.defineProperty;var q=(o,t,e)=>t in o?O(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var n=(o,t,e)=>q(o,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();const z="indexed-db";class _{constructor({dbName:t=z,storeName:e,uniqueKey:s,debug:i=!1,version:a=1}){n(this,"isDBReady",!1);n(this,"version");n(this,"dbName");n(this,"storeName");n(this,"key");n(this,"debug");this.version=a,this.isDBReady=!1,this.dbName=t,this.storeName=e,this.key=s,this.debug=i,this.init()}async init(){await this.handleInitDB()}async handleInitDB(){const e=await(async()=>new Promise((s,i)=>{const a=indexedDB.open(this.dbName,this.version);a.onupgradeneeded=()=>{const r=a.result;r.objectStoreNames.contains(this.storeName)||(this.debug&&console.log("Creating users store"),r.createObjectStore(this.storeName,{keyPath:this.key}))},a.onsuccess=()=>{const r=a.result;this.version=r.version,s(r)},a.onerror=()=>{i(a.error)}}))();this.isDBReady=!!e}addData(t){return(async()=>new Promise(s=>{const i=indexedDB.open(this.dbName,this.version);i.onsuccess=()=>{this.debug&&console.log("request.onsuccess - addData",t),i.result.transaction(this.storeName,"readwrite").objectStore(this.storeName).add(t),s(t)},i.onerror=()=>{var r;const a=(r=i.error)==null?void 0:r.message;s(a||"Unknown error")}}))()}deleteData(t){return(async()=>new Promise(s=>{const i=indexedDB.open(this.dbName,this.version);i.onsuccess=()=>{this.debug&&console.log("request.onsuccess - deleteData",t);const d=i.result.transaction(this.storeName,"readwrite").objectStore(this.storeName).delete(t);d.onsuccess=()=>{s(!0)},d.onerror=()=>{s(!1)}}}))()}updateData(t,e){return(async()=>new Promise(i=>{const a=indexedDB.open(this.dbName,this.version);a.onsuccess=()=>{this.debug&&console.log("request.onsuccess - updateData",t);const d=a.result.transaction(this.storeName,"readwrite").objectStore(this.storeName),m=d.get(t);m.onsuccess=()=>{const h={...m.result,...e};d.put(h),i(h)},m.onerror=()=>{i(null)}}}))()}getSingleItem(t){return(async()=>new Promise(s=>{const i=indexedDB.open(this.dbName,this.version);i.onsuccess=()=>{this.debug&&console.log("request.onsuccess - getSingleData");const a=i.result;if(!a)return null;const d=a.transaction(this.storeName,"readonly").objectStore(this.storeName).get(t);d.onsuccess=()=>{s(d.result)}}}))()}getStoreData(){return new Promise(e=>{const s=indexedDB.open(this.dbName,this.version);s.onsuccess=()=>{this.debug&&console.log("request.onsuccess - getAllData");const c=s.result.transaction(this.storeName,"readonly").objectStore(this.storeName).getAll();c.onsuccess=()=>{e(c.result)}}})}}const j='<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>',R='<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>',F='<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path></svg>',V='<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>',k='<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg>';function l(o,t,e=!1){var i,a,r;let s=document.createElement(o);if(t&&Object.assign(s,t),typeof e=="string")(i=document.querySelector(e))==null||i.appendChild(s);else if(e===!0)(a=document.querySelector("body"))==null||a.appendChild(s);else if(typeof e=="object"){const c=e;(r=c.appendChild)==null||r.call(c,s)}return s}const g=l("div",{className:"inspector-capture-container",id:"capture-container"}),M=l("div",{className:`inspector-ui-card capture-sidebar 
  max-h-[calc(100vh-200px)] 
  shadow-lg card bg-base-300 
  fixed min-w-[300px] 
  max-w-[300px] min-h-[50px] z-[9999] left-0 top-0 rounded-md border border-[var(--inspector-border-color,gray)]`},g),D=l("div",{className:"inspector-ui-container-header bg-[var(--inpector-card-bg)] rounded-t p-3 flex justify-between items-center border-b border-[var(--inspector-border-color,gray)]"},M);l("span",{className:"capture-sidebar-header-title text-[var(--inpector-sidebar-header-title-color)] text-[20px] font-semibold",innerText:"Walkme Capture"},D);const v=l("div",{className:"inspector-ui-container p-3"},M),K=l("div",{className:"h-10 items-center justify-center rounded-md bg-[var(--inspector-list-bg)] p-1 text-black dark:text-white grid w-full grid-cols-2 bg-[#f2f2f2] dark:bg-[var(--inspector-list-bg)] mb-2",role:"tablist",ariaOrientation:"horizontal",tabIndex:0},v),X=o=>l("button",{className:"btn btn-sm btn-square !cursor-grab border-[var(--inspector-border-color,gray)] hover:border-[var(--inspector-border-color,gray)]",innerHTML:j,title:"Click and drag",draggable:!0},o),Y=o=>l("button",{className:"btn btn-sm btn-outline !ml-auto mr-2  btn-square border-[var(--inspector-border-color,gray)] hover:border-[var(--inspector-border-color,gray)]",title:"Collapse"},o),E=l("div",{className:"saved-sidebar p-3 border border-[var(--inspector-border-color)] rounded-md "},v),U=l("ul",{className:"capture-sidebar-content overscroll-contain menu bg-base-200 rounded max-h-[calc(100vh-456px)] overflow-y-auto block m-3 min-h-[50px]"},E),G=o=>l("li",{className:"saved-item",innerHTML:`<a><h6 class="text-lg line-clamp-1 ">${o.title}</h6></a>`},U),y=l("div",{className:"card-content p-3 border border-[var(--inspector-border-color)] rounded-md "},v),W=l("input",{className:"capture-sidebar-header-title editableInput line-clamp-1 text-center text-[var(--inpector-sidebar-header-title-color)] text-[20px] font-semibold mb-3"},y),Z=l("ul",{className:"capture-sidebar-content overscroll-contain menu bg-base-200 rounded max-h-[calc(100vh-456px)] overflow-y-auto block min-h-[50px]"},y),J=(o,t,e=!1)=>l("li",{className:"capture-sidebar-item relative !my-[9px]",innerHTML:`
      <a class="block">
      <h6 class="text-lg line-clamp-1">${o}</h6>
      <p class="text-xs line-clamp-2 text-gray-500">${t}</p>
      <p class="text-center absolute -bottom-[18px] left-0 right-0 flex items-center justify-center z-[2] text-gray-300  step-arrow">${R}</p>
      </a>`},e),N=l("div",{className:"card-actions justify-end mt-4"},y),p=({innerText:o,className:t="btn-neutral",container:e=!1,...s})=>l("button",{className:`btn ${t} btn-sm`,innerText:o,...s},e),b=({elementType:o="input",type:t,placeholder:e,className:s="",container:i=!1,required:a=!1,label:r="",...c})=>{const d=l("label",{className:"form-control w-full",innerHTML:` 
      <div class="label">
        <span class="label-text">${r}${a?"*":""}</span>
      </div>`},i),m=l(o,{className:`inspector-input ${o==="input"?"input input-bordered w-full ":"textarea textarea-bordered w-full "} ${s}`,...o==="input"?{type:t}:{rows:3},placeholder:e,required:a,...c},d);return{inputLabel:d,input:m}},Q=p({innerText:"Start New",container:N,className:"btn-success"}),tt=p({innerText:"Save",container:N,className:"mr-auto "}),P=l("dialog",{className:"modal",id:"capture-modal"},v),$=l("form",{className:"modal-box",id:"capture-dialog-card",onsubmit:o=>o.preventDefault()},P),et=l("div",{className:"capture-dialog-container space-y-4"},$),st=l("div",{className:"capture-dialog-container modal-action"},$),w={_id:"",title:"",learned:!1,steps:[],url:""};class nt{constructor(t,e,s=()=>{}){n(this,"ui");n(this,"container");n(this,"modal");n(this,"startButton");n(this,"stepData",w);n(this,"modalFooterContainer");n(this,"started",!1);n(this,"modalContentContainer");n(this,"saveButton",tt);n(this,"sidebarUl",Z);n(this,"resumeButton",p({innerText:"Resume",type:"button"}));n(this,"listTitle",W);n(this,"cardActions",N);n(this,"paused",!1);n(this,"name");n(this,"onContainerClick");this.ui=t,this.container=y,this.modal=P,this.startButton=Q,this.modalContentContainer=et,this.modalFooterContainer=st,this.name=e,this.onContainerClick=s,this.init()}init(){this.initButtons(),this.initInspector(),this.container.onclick=()=>{this.onContainerClick(this.container,this.name)}}initInspector(){this.ui.inspector.onElementClick=(t,e)=>{const s=this.ui.inspector.elements.targetElement;g.contains(s)||e.success&&this.openCaptureDialog(e.selector)}}handleOpenEditModal(t){this.openCaptureDialog(t.target,t),this.saveButton.disabled=!1}initButtons(){this.saveButton.disabled=!0,this.resumeButton.disabled=!0,this.startButton.onclick=()=>{this.listTitle.value="",this.resumeButton.disabled=!0,this.saveButton.disabled=!0,this.stepData=w,this.sidebarUl.innerHTML="",this.openNameInputDialog()},this.saveButton.onclick=()=>{this.save()},this.cardActions.appendChild(this.resumeButton),this.resumeButton.onclick=()=>{this.resume()},this.listTitle.oninput=t=>{const e=this.getInputValue(t);this.stepData.title=e;const s=e.length===0||!this.stepData.steps||this.stepData.steps.length===0;this.saveButton.disabled=s}}openNameInputDialog(){var m;this.clearModal();const{input:t,inputLabel:e}=b({placeholder:"Enter Flow Name",type:"text",label:"Flow Name",required:!0});this.stepData.url=((m=window==null?void 0:window.location)==null?void 0:m.href)||"",this.stepData._id=`${this.stepData._id||Date.now()}`;const{input:s,inputLabel:i}=b({elementType:"textarea",placeholder:"Enter Flow Description",label:"Flow Description",type:"text"}),{input:a,inputLabel:r}=b({placeholder:"URL where the flow will execute",label:"Flow URL",type:"text",className:"disabled",disabled:!0,required:!0,value:this.stepData.url}),c=p({innerText:"Start",className:"btn-success",type:"submit"}),d=p({innerText:"Cancel",className:"btn-error",type:"button"});c.onclick=()=>{var h,f;!this.stepData.title||((h=this.stepData.title)==null?void 0:h.length)===0||((f=this.stepData.url)==null?void 0:f.length)===0||(this.started=!0,this.closeModal(),this.startButton.disabled=!0,this.startCapturing())},d.onclick=()=>{this.started=!1,this.closeModal()},t.oninput=h=>{this.stepData.title=this.getInputValue(h),this.listTitle.value=this.stepData.title},s.oninput=h=>{this.stepData.description=this.getInputValue(h)},a.oninput=h=>{this.stepData.url=this.getInputValue(h)},this.modalContentContainer.append(r,e,i),this.modalFooterContainer.append(d,c),this.modal.showModal()}openCaptureDialog(t,e){var B;this.resumeButton.innerText="Resume",this.clearModal(),this.pause();let s={title:(e==null?void 0:e.title)??"",description:(e==null?void 0:e.description)??"",target:t||"",_id:(e==null?void 0:e._id)??`${Date.now()}`};const{input:i,inputLabel:a}=b({placeholder:"Enter Step Name",type:"text",label:"Step Name",required:!0,value:(e==null?void 0:e.title)||""}),{input:r,inputLabel:c}=b({elementType:"textarea",placeholder:"Enter Step Description",label:"Step Description",type:"text",value:(e==null?void 0:e.description)||""}),{input:d,inputLabel:m}=b({placeholder:"Step Target",label:"Step Target",type:"text",className:"disabled",disabled:!0,required:!0,value:t||""}),h=p({innerText:"Pause",className:"btn-error mr-auto",type:"button"}),f=p({innerText:"Next",className:"btn-success btn-outline",type:"submit"}),I=p({innerText:"Finish",className:"btn-success",type:"button"}),S=p({innerText:"Re-Capture",className:"btn-error  btn-outline",type:"button"});if(i.oninput=u=>{s.title=this.getInputValue(u)},r.oninput=u=>{s.description=this.getInputValue(u)},d.oninput=u=>{s.target=this.getInputValue(u)},S.onclick=()=>{this.resume(),this.clearModal(),this.closeModal()},f.onclick=()=>{var u;!s.title||((u=s.title)==null?void 0:u.length)===0||(this.stepData.steps=this.stepData.steps||[],this.stepData.steps.push(s),this.resume(),this.clearModal(),this.closeModal(),this.addListItem(s))},h.onclick=()=>{this.pause(),this.resumeButton.disabled=!1},I.onclick=()=>{var u;s.title&&((u=s.title)==null?void 0:u.length)>0&&(this.stepData.steps=this.stepData.steps||[],this.stepData.steps.push(s),this.addListItem(s)),this.pause(),this.startButton.disabled=!1,this.resumeButton.disabled=!1},e){const u=p({innerText:"Update",className:"btn-success",type:"button"}),L=p({innerText:"Cancel",className:"btn-error ml-auto",type:"button"});L.onclick=()=>{this.closeModal(),this.clearModal()},u.onclick=()=>{var T;!s.title||((T=s.title)==null?void 0:T.length)===0||(this.closeModal(),this.clearModal(),this.updateStepContent(s))},this.modalFooterContainer.append(L,u)}else this.stepData.steps&&((B=this.stepData.steps)==null?void 0:B.length)>0&&(this.modalFooterContainer.append(I),this.saveButton.disabled=!1),this.modalFooterContainer.append(h),this.modalFooterContainer.append(S,f);this.modalContentContainer.append(m,a,c),this.modal.showModal()}updateStepContent(t){var s;const e=(s=this.stepData.steps)==null?void 0:s.findIndex(i=>i._id===t._id);e===void 0||e===-1||!this.stepData||!this.stepData.steps||!this.stepData.steps[e]||(this.stepData.steps[e]=t,this.renderStepDataList(this.stepData))}addListItem(t){const e=J(t.title,t.description||"",this.sidebarUl);l("button",{className:"btn btn-sm btn-error btn-outline !text-[var(--error)] btn-square border-[var(--inspector-border-color,gray)] hover:border-[var(--inspector-border-color,gray)]",innerHTML:F,title:"Delete Step",onclick:s=>{var i;s.preventDefault(),s.stopPropagation(),this.saveButton.disabled=!1,this.removeItemFromStepData((i=this.stepData.steps)==null?void 0:i.findIndex(a=>a._id===t._id),e)}},e),e.onclick=()=>{this.handleOpenEditModal(t)}}renderStepDataList(t){!t||t.steps.length===0||(this.sidebarUl.innerHTML="",this.listTitle.value=t.title,t.steps.forEach(e=>{this.addListItem(e)}),this.stepData=t,this.resumeButton.disabled=!1)}removeItemFromStepData(t,e){var s,i;t===void 0||t===-1||(this.sidebarUl.removeChild(e),(s=this.stepData.steps)==null||s.splice(t,1),((i=this.stepData.steps)==null?void 0:i.length)===0&&(this.saveButton.disabled=!0,this.stepData=w,this.listTitle.value="",this.pause()))}pause(){this.closeModal(),this.clearModal(),this.ui.inspector.pause(),this.paused=!0,this.resumeButton.disabled=!1}resume(){this.resumeButton.disabled=!0,this.paused=!1,this.ui.inspector.resume()}startCapturing(){this.started=!0,this.ui.inspector.startCapturing()}stopCapturing(){this.ui.inspector.stopCapturing(),this.closeModal(),this.clearModal(),this.startButton.disabled=!1}clearModal(){this.modalContentContainer.innerHTML="",this.modalFooterContainer.innerHTML=""}closeModal(){this.modal.close(),this.clearModal()}getInputValue(t){const e=t.target;return e&&e.value||""}async save(){if(this.clearModal(),this.closeModal(),this.stopCapturing(),!this.ui.indexedDb.isDBReady){alert("Database is not ready yet. Please try again later.");return}try{if(!this.stepData._id){alert("Something went wrong. Please try again later.");return}await this.ui.indexedDb.getSingleItem(this.stepData._id)?await this.ui.indexedDb.updateData(this.stepData._id,this.stepData):await this.ui.indexedDb.addData(this.stepData),await this.ui.savedStepUI.fetchData(),console.log(this.stepData),this.stepData=w,this.listTitle.value="",this.sidebarUl.innerHTML="",this.saveButton.disabled=!0,this.resumeButton.disabled=!0}catch(t){console.error(t)}}}class it{constructor(t,e,s=300,i=!1){n(this,"button");n(this,"container");n(this,"isCollapsed",!1);n(this,"animationDuration",300);n(this,"padding",{top:0,bottom:0});this.button=t,this.container=e,this.animationDuration=s,this.init(),i&&this.collapse()}init(){const t=window.getComputedStyle(this.container);this.padding.top=Math.ceil(parseFloat(t.paddingTop)),this.padding.bottom=Math.ceil(parseFloat(t.paddingBottom)),this.button.innerHTML=k,this.button.addEventListener("click",()=>this.toggleCollapse())}toggleCollapse(){this.isCollapsed?this.expand():this.collapse()}collapse(){this.isCollapsed=!0,this.button.title="Expand",this.container.setAttribute("style",`
      min-height: 0px !important; 
      padding-top: 0px; 
      padding-bottom: 0px; 
      overflow: hidden !important;
      `);const t=this.container.animate([{height:`${this.container.scrollHeight}px`},{height:"0px"}],{duration:this.animationDuration,easing:"ease",fill:"forwards"});t.onfinish=()=>{this.container.setAttribute("data-collapsed",`${this.isCollapsed}`),this.container.classList.remove("expanded"),t.cancel(),this.container.setAttribute("style",`
        height: 0px !important;
        min-height: 0px !important; 
        padding-top: 0px; 
        padding-bottom: 0px; 
        overflow: hidden !important;
        `)},this.button.innerHTML=V}expand(){this.isCollapsed=!1,this.button.title="Collapse";const t=this.container.clientHeight,e=this.container.scrollHeight+this.padding.top+this.padding.bottom;this.container.style.height=`${t}px`,this.container.style.overflow="hidden",this.container.setAttribute("data-collapsed",`${this.isCollapsed}`),this.container.classList.add("expanded");const s=this.container.animate([{height:`${t}px`},{height:`${e}px`}],{duration:this.animationDuration,easing:"ease",fill:"forwards"});s.onfinish=()=>{s.cancel()},this.button.innerHTML=k,s.onfinish=()=>{s.cancel(),this.container.style.height="auto",this.container.style.overflow="",this.container.style.minHeight="",this.container.style.paddingTop="",this.container.style.paddingBottom=""}}}class at{constructor(t,e,s,i=()=>{}){n(this,"container");n(this,"handle");n(this,"isDragging",!1);n(this,"offsetX",0);n(this,"offsetY",0);n(this,"shadowClass","!shadow-2xl");n(this,"name");n(this,"onDragStart");n(this,"onMouseDown",t=>{t.preventDefault(),this.onDragStart(this.container,this.name),this.isDragging=!0,this.offsetX=t.clientX-this.container.offsetLeft,this.offsetY=t.clientY-this.container.offsetTop,this.addElevationStyle()});n(this,"onMouseMove",t=>{this.isDragging&&requestAnimationFrame(()=>{this.container.style.left=`${t.clientX-this.offsetX}px`,this.container.style.top=`${t.clientY-this.offsetY}px`})});n(this,"onMouseUp",()=>{this.isDragging=!1,this.removeElevationStyle()});this.container=t,this.handle=e,this.name=s,this.onDragStart=i,this.handle.addEventListener("mousedown",this.onMouseDown),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.onMouseUp)}addElevationStyle(){this.container.style.transition="box-shadow 0.3s ease-in-out",this.container.classList.add("dragging",this.shadowClass),this.handle.classList.add("dragging","!cursor-grabbing")}removeElevationStyle(){this.container.classList.remove("dragging",this.shadowClass),this.handle.classList.remove("dragging","!cursor-grabbing"),this.container.style.transition="box-shadow 0.3s ease-in-out"}}class ot{constructor(t,e,s=()=>{},i=E){n(this,"ui");n(this,"container",E);n(this,"savedSidebarUl",U);n(this,"stepData",[]);n(this,"interval");n(this,"retryConnection",0);n(this,"name");n(this,"onContainerClick");this.container=i,this.ui=t,this.name=e,this.onContainerClick=s,this.init()}async init(){this.container.onclick=()=>{this.onContainerClick(this.container,this.name)};try{this.interval=setInterval(async()=>{if(this.retryConnection>10){alert("Database is not ready yet. Please try again later."),clearInterval(this.interval);return}this.ui.indexedDb.isDBReady?(console.log("DB is ready"),clearInterval(this.interval),await this.fetchData()):(this.retryConnection++,console.log("DB is not ready yet"))},1e3)}catch(t){console.error(t)}}renderStepData(){this.savedSidebarUl.innerHTML="",this.stepData.forEach(t=>{const e=G(t);e.onclick=()=>{var s;(s=this.ui.captureUI)==null||s.renderStepDataList(t),this.ui.tabs.showTabAtIndex(0)},l("button",{className:"btn btn-sm btn-square btn-error btn-outline !text-[var(--error)] border-[var(--inspector-border-color,gray)] hover:border-[var(--inspector-border-color,gray)]",innerHTML:F,title:"Delete Flow",onclick:s=>{s.preventDefault(),s.stopPropagation(),this.deleteStepData(t)}},e),this.savedSidebarUl.appendChild(e)})}async deleteStepData(t){try{await this.ui.indexedDb.deleteData(t._id),await this.fetchData()}catch(e){console.error(e)}}async fetchData(){if(!this.ui.indexedDb.isDBReady){alert("Database is not ready yet. Please try again later.");return}try{const t=await this.ui.indexedDb.getStoreData();return this.stepData=t,this.renderStepData(),t}catch(t){console.error(t)}}}const rt=(o,t)=>l("button",{innerText:o,className:`inline-flex items-center justify-center whitespace-nowrap rounded-sm 
        px-3 py-1.5 text-sm font-medium ring-offset-background transition-all 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
        focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
        dark:data-[state=active]:bg-[var(--inspector-active-list-bg)] data-[state=active]:bg-white dark:data-[state=active]:text-white data-[state=active]:shadow-sm`},t);class lt{constructor({tabs:t,container:e,tabButtonContainer:s}){n(this,"tabs");n(this,"tabButtons",[]);n(this,"container");n(this,"tabButtonContainer");this.tabs=t,this.container=e,this.tabButtonContainer=s,this.init()}init(){for(let t=0;t<this.tabs.length;t++){const e=this.tabs[t],s=rt(e.title,this.tabButtonContainer);this.tabButtons.push(s),s.onclick=()=>this.showTabAtIndex(t)}this.showTabAtIndex(0)}showTabAtIndex(t){for(let e=0;e<this.tabs.length;e++){const s=this.tabs[e],i=this.tabButtons[e];e===t?(s.container.style.display="block",i.setAttribute("data-state","active"),i.classList.add("shadow-md")):(s.container.style.display="none",i.removeAttribute("data-state"),i.classList.remove("shadow-md"))}}}const ct=window.location.host,dt=`${ct}-step-data`,ht="steps";class ut{constructor(t){n(this,"inspector");n(this,"captureUI");n(this,"savedStepUI");n(this,"indexedDb");n(this,"card",M);n(this,"cardHeader",D);n(this,"container",v);n(this,"tabButtonContainer",K);n(this,"collapseButton",Y(D));n(this,"cardHandle",X(D));n(this,"tabs");this.inspector=t,this.indexedDb=new _({storeName:ht,uniqueKey:"_id",dbName:dt,version:4}),this.captureUI=new nt(this,"captureUI"),this.savedStepUI=new ot(this,"savedStepUI"),this.init()}init(){new at(this.card,this.cardHandle,"UI"),new it(this.collapseButton,this.container);const t=[{title:"Capture",container:this.captureUI.container},{title:"Saved",container:this.savedStepUI.container}];this.tabs=new lt({tabs:t,container:this.container,tabButtonContainer:this.tabButtonContainer})}show(){document.body.appendChild(g)}hide(){try{document.body.removeChild(g)}catch{}}}class pt{constructor(t,e,s){n(this,"inspector");n(this,"hoverElement");n(this,"isHoverElementAddedToDOM");n(this,"targetElement");n(this,"targetElementData");n(this,"highlightColor");n(this,"falseHighlightColor");this.inspector=t,this.isHoverElementAddedToDOM=!1,this.createHoverElement(),this.highlightColor=e,this.falseHighlightColor=s}createHoverElement(){this.hoverElement=this.createElement("div",{className:"inspector-hover-element border-2 border-red-500 fixed z-[1305]"}),this.hoverElement.style.position="fixed",this.hoverElement.style.pointerEvents="none",this.hoverElement.style.zIndex="1305"}addElementToDom(){this.isHoverElementAddedToDOM||(this.isHoverElementAddedToDOM=!0,document.body.appendChild(this.hoverElement))}removeElementFromDom(){this.isHoverElementAddedToDOM&&(this.isHoverElementAddedToDOM=!1,document.body.removeChild(this.hoverElement))}getSelector(t){var s,i;if(!t)return null;if(t.id)return"#"+t.id;const e=t.parentElement;if(e!=null&&e.id)return`#${e.id}`;if(t.className){const a=`.${(i=(s=t==null?void 0:t.className)==null?void 0:s.split)==null?void 0:i.call(s," ").join(".")}`;return this.escapeTailwindClassNames(a)}}escapeTailwindClassNames(t){return t.replace(/[^a-zA-Z0-9-_.]/g,"\\$&")}getElementData(t){if(!t)return null;const e=t.tagName.toLowerCase(),s=t.getBoundingClientRect(),i=this.getSelector(t),a=Array.from(t.attributes).reduce((r,c)=>(r[c.name]=c.value,r),{});return{tag:e,attributes:a,selector:i,htmlBox:s,element:t,success:!0}}highlightElement(){let t=this.highlightColor,e="blue";if(this.targetElementData){this.targetElementData.success=!0;try{const r=this.getElementDataFromSelector(this.targetElementData.selector);(!r||(r==null?void 0:r.element)!==this.targetElement)&&(t=this.falseHighlightColor,e="red",this.targetElementData.success=!1)}catch(r){console.warn(r),this.targetElementData.success=!1,e="red",t=this.falseHighlightColor}const i=getComputedStyle(this.targetElement).getPropertyValue("border-radius"),{htmlBox:a}=this.targetElementData;this.hoverElement.style.border=`2px dashed ${e}`,this.hoverElement.style.borderRadius=i,this.hoverElement.style.left=a.left+"px",this.hoverElement.style.top=a.top+"px",this.hoverElement.style.width=a.width+"px",this.hoverElement.style.height=a.height+"px",this.hoverElement.style.backgroundColor=t}}getElementDataFromSelector(t){if(!t)return null;const e=document.querySelector(t);return e?this.getElementData(e):null}createElement(t,e){const s=document.createElement(t);return e&&Object.assign(s,e),s}update(){if(!this.targetElement)return;const t=this.getElementData(this.targetElement);t&&(this.targetElementData=t)}render(){this.highlightElement()}}class mt{constructor(t,e,s=3,i=""){n(this,"inspector");n(this,"countdownInSeconds");n(this,"elements");n(this,"countDown");n(this,"messageContainer");n(this,"counterElement");n(this,"interval");n(this,"timeout");n(this,"isChildPresent",!1);n(this,"messageElement");n(this,"startMessage");this.inspector=t,this.countdownInSeconds=s,this.countDown=s,this.elements=e,this.messageContainer=e.createElement("div"),this.counterElement=e.createElement("h2"),this.messageElement=e.createElement("p",{innerText:"To exit the inspector tool at any time, simply press the Esc key."}),this.startMessage=i,this.init()}init(){this.messageContainer.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.5);
      max-width: 100vw;
      backdrop-filter: blur(10px);
      padding: 50px;
      border-radius: 10px;
      text-align: center;
      color: white;
    `,this.counterElement.style.cssText=`
      font-size: 24px;
      font-weight: bold;
      
    `,this.messageElement.style.cssText=`
      max-width: 300px;
      margin: 15px auto;
      font-size: 18px;
    `;const t=this.elements.createElement("span",{innerText:this.startMessage});this.messageElement.appendChild(t),this.messageContainer.appendChild(this.counterElement),this.messageContainer.appendChild(this.messageElement)}clear(){clearInterval(this.interval),clearTimeout(this.timeout),this.countDown=this.countdownInSeconds,this.isChildPresent&&document.body.removeChild(this.messageContainer)}showCountdown(t){this.counterElement.textContent=this.countDown.toString(),document.body.appendChild(this.messageContainer),this.isChildPresent=!0,this.interval=setInterval(()=>{this.countDown--,this.counterElement.textContent=this.countDown.toString()},1e3),this.timeout=setTimeout(()=>{document.body.removeChild(this.messageContainer),this.isChildPresent=!1,this.countDown=this.countdownInSeconds,t()},this.countdownInSeconds*1e3)}}class bt{constructor({onElementClick:t,update:e,startMessage:s="",countdownTimeInSeconds:i=3,highlightColor:a="rgba(0,0,255,0.3)",falseHighlightColor:r="rgba(255, 0, 0, 0.3)"}){n(this,"isInspecting");n(this,"boundKeydown");n(this,"boundMousedown");n(this,"boundMouseOver");n(this,"boundContextMenu");n(this,"elements");n(this,"isListenerAttached");n(this,"onElementClick");n(this,"updateFN");n(this,"messages");n(this,"ui");this.isListenerAttached=!1,this.isInspecting=!1,this.elements=new pt(this,a,r),this.onElementClick=t,this.updateFN=e,this.messages=new mt(this,this.elements,i,s),this.ui=new ut(this)}show(){this.ui.show()}hide(){this.ui.hide()}addEventListeners(){this.isListenerAttached||(this.isListenerAttached=!0,this.boundKeydown=this.handleKeydown.bind(this),this.boundMousedown=this.handleMouseDown.bind(this),this.boundMouseOver=this.handleMouseOver.bind(this),this.boundContextMenu=this.handleContextMenu.bind(this),document.addEventListener("keydown",this.boundKeydown),document.addEventListener("mousedown",this.boundMousedown),document.addEventListener("mouseover",this.boundMouseOver),document.addEventListener("contextmenu",this.boundContextMenu))}removeEventListeners(){this.isListenerAttached&&(this.isListenerAttached=!1,document.removeEventListener("keydown",this.boundKeydown),document.removeEventListener("mousedown",this.boundMousedown),document.removeEventListener("mouseover",this.boundMouseOver),document.removeEventListener("contextmenu",this.boundContextMenu))}handleKeydown(t){t.key==="Escape"&&this.stopCapturing(),t.key==="ḍ"&&t.altKey&&t.ctrlKey&&(this.isInspecting?this.stopCapturing():this.startCapturing())}handleMouseDown(t){t.preventDefault(),t.stopPropagation(),this.isInspecting&&(t.preventDefault(),t.stopPropagation(),this.onElementClick&&typeof this.onElementClick=="function"&&this.onElementClick(t,this.elements.targetElementData))}handleMouseOver(t){if(!this.isInspecting)return;const e=t.target;this.elements.targetElement=e}handleContextMenu(t){this.isInspecting&&(t.preventDefault(),t.stopPropagation())}pause(){this.stopCapturing()}resume(){this.addEventListeners(),this.isInspecting=!0,this.elements.addElementToDom(),requestAnimationFrame(t=>this.animate(t))}stopCapturing(){this.elements.removeElementFromDom(),this.isInspecting=!1,this.removeEventListeners(),this.messages.clear()}startCapturing(){const t=()=>{this.addEventListeners(),this.isInspecting=!0,this.elements.addElementToDom(),window.requestAnimationFrame(e=>this.animate(e))};this.messages.showCountdown(t)}animate(t){this.isInspecting&&(this.update(t),this.render(),requestAnimationFrame(this.animate.bind(this)))}update(t){this.elements.update(),this.updateFN&&typeof this.updateFN=="function"&&this.updateFN(t)}render(){this.elements.render()}}class gt{constructor(){n(this,"inspector",new bt({}))}start(){this.inspector.show()}stop(){this.inspector.hide()}async getAllData(){var t;try{return await((t=this.inspector)==null?void 0:t.ui.indexedDb.getStoreData())}catch(e){console.error(e)}}}const C=o=>{chrome.runtime.sendMessage({action:"messageFromContent",data:o},function(t){t&&console.log(t)})},x=new gt;var H,A;(A=(H=chrome.runtime)==null?void 0:H.onMessage)==null||A.addListener(async(o,t,e)=>{if(o.action==="start"&&(x.start(),C({response:"started",data:[]})),o.action==="stop"&&(x.stop(),C({response:"stoped",data:[]})),o.action==="sendStepData"){x.stop();const s=await x.getAllData();C({response:"data",data:s})}if(o.action==="changeTheme"){const{theme:s}=o;if(!g)return;g.className=`inspector-capture-container ${s}`}});
