const SIZES={square:{width:1080,height:1080,label:'square'},portrait:{width:1080,height:1350,label:'portrait'},landscape:{width:1920,height:1080,label:'landscape'}};
/** Renders and downloads one deterministic PNG at one of the three requested social sizes. */
export function exportPng(state,render,size='portrait'){
  const target=document.createElement('canvas'),spec=SIZES[size]??SIZES.portrait;target.width=spec.width;target.height=spec.height;
  render(target,state,{selection:false});return new Promise((resolve,reject)=>target.toBlob(blob=>{if(!blob){reject(new Error('PNG encoding failed'));return}download(blob,`afterhours-${spec.label}-${spec.width}x${spec.height}.png`);resolve({blob,...spec})},'image/png'));
}
export async function exportEverySize(state,render){const results=[];for(const size of ['square','portrait','landscape'])results.push(await exportPng(state,render,size));return results}
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500)}
export {SIZES};
