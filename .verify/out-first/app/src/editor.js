/** Keeps small reversible editor snapshots while preserving live browser image objects. */
export function createHistory(initial){let past=[],future=[];return{
  save(state){past.push(copy(state));if(past.length>40)past.shift();future=[]},
  undo(state){if(!past.length)return null;future.push(copy(state));return past.pop()},
  redo(state){if(!future.length)return null;past.push(copy(state));return future.pop()},
  clear(){past=[];future=[]},
  get canUndo(){return past.length>0},get canRedo(){return future.length>0}
}}
function copy(s){return{...s,photos:[...s.photos],assignments:[...s.assignments],crops:s.crops.map(c=>({...c})),caption:{...s.caption}}}
/** Loads a local file or app sample as a browser image without any network dependency. */
export function loadLocalImage(url){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('That image could not be opened.'));image.src=url})}
export function freshCrop(){return{zoom:1,x:0,y:0,mode:'fill'}}
