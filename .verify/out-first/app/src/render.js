import {layoutById} from './layouts.js';
import {gradeById} from './grades.js';
import {drawLettering} from './lettering.js';

/** Draws the complete cover at a requested size; preview and exported PNG share this renderer. */
export function renderCover(canvas,state,{selection=true}={}){
  const ctx=canvas.getContext('2d',{alpha:false});const w=canvas.width,h=canvas.height;
  const layout=layoutById(state.layout),grade=gradeById(state.grade);
  ctx.save();ctx.fillStyle='#10111a';ctx.fillRect(0,0,w,h);
  for(let i=0;i<layout.panels.length;i++) drawPanel(ctx,w,h,layout.panels[i],state,i,grade);
  if(state.grain) drawGrain(ctx,w,h,state.grainSeed);
  if(state.vignette) drawVignette(ctx,w,h);
  drawLettering(ctx,w,h,state.caption,grade,state.layout);
  if(selection&&state.layout!=='full')drawSelection(ctx,w,h,layout.panels[state.selected],state.selected);
  ctx.restore();
}
function drawPanel(ctx,w,h,panel,state,index,grade){
  const x=panel.x*w,y=panel.y*h,pw=panel.w*w,ph=panel.h*h;
  ctx.save();ctx.translate(x+pw/2,y+ph/2);ctx.rotate((panel.tilt??0)*Math.PI/180);
  ctx.fillStyle='#17131d';ctx.fillRect(-pw/2,-ph/2,pw,ph);
  ctx.beginPath();ctx.rect(-pw/2,-ph/2,pw,ph);ctx.clip();
  const crop=state.crops[index]??{zoom:1,x:0,y:0,mode:'fill'};
  const photo=state.photos[state.assignments[index]??0];
  if(photo?.image){
    const iw=photo.image.naturalWidth||photo.image.width,ih=photo.image.naturalHeight||photo.image.height;
    const scale=(crop.mode==='fit'?Math.min(pw/iw,ph/ih):Math.max(pw/iw,ph/ih))*crop.zoom;
    const dw=iw*scale,dh=ih*scale;
    ctx.filter=grade.filter;ctx.drawImage(photo.image,-dw/2+crop.x*Math.max(0,(dw-pw)/2),-dh/2+crop.y*Math.max(0,(dh-ph)/2),dw,dh);ctx.filter='none';
    const tint=ctx.createLinearGradient(0,-ph/2,0,ph/2);tint.addColorStop(0,'rgba(18,40,72,.08)');tint.addColorStop(.48,'rgba(255,160,125,.03)');tint.addColorStop(1,`${grade.bottom}30`);ctx.fillStyle=tint;ctx.fillRect(-pw/2,-ph/2,pw,ph);
  }else{
    const empty=ctx.createLinearGradient(-pw/2,-ph/2,pw/2,ph/2);empty.addColorStop(0,'#252a3c');empty.addColorStop(1,'#5f405c');ctx.fillStyle=empty;ctx.fillRect(-pw/2,-ph/2,pw,ph);
    ctx.fillStyle='rgba(255,255,255,.42)';ctx.textAlign='center';ctx.font=`700 ${Math.max(10,pw*.04)}px system-ui`;ctx.fillText('DROP A PHOTO',0,0);
  }
  ctx.restore();
  ctx.save();ctx.translate(x+pw/2,y+ph/2);ctx.rotate((panel.tilt??0)*Math.PI/180);
  ctx.strokeStyle='rgba(255,232,229,.65)';ctx.lineWidth=Math.max(1,Math.min(w,h)*.002);ctx.strokeRect(-pw/2,-ph/2,pw,ph);
  ctx.restore();
}
function drawSelection(ctx,w,h,panel,index){if(!panel)return;const x=panel.x*w,y=panel.y*h,pw=panel.w*w,ph=panel.h*h;ctx.save();ctx.translate(x+pw/2,y+ph/2);ctx.rotate((panel.tilt??0)*Math.PI/180);ctx.strokeStyle='#ffd0a1';ctx.lineWidth=Math.max(2,Math.min(w,h)*.003);ctx.setLineDash([Math.min(w,h)*.012,Math.min(w,h)*.007]);ctx.strokeRect(-pw/2,-ph/2,pw,ph);ctx.setLineDash([]);const r=Math.min(w,h)*.012;for(const [a,b]of[[-pw/2,-ph/2],[pw/2,-ph/2],[-pw/2,ph/2],[pw/2,ph/2]]){ctx.fillStyle='#fff0d7';ctx.fillRect(a-r,b-r,r*2,r*2)}ctx.restore()}
function drawVignette(ctx,w,h){const g=ctx.createRadialGradient(w*.5,h*.44,Math.min(w,h)*.2,w*.5,h*.5,Math.max(w,h)*.77);g.addColorStop(0,'rgba(5,7,18,0)');g.addColorStop(.72,'rgba(6,7,18,.08)');g.addColorStop(1,'rgba(5,6,15,.58)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}
function drawGrain(ctx,w,h,seed){const s=128,c=document.createElement('canvas');c.width=s;c.height=s;const g=c.getContext('2d'),data=g.createImageData(s,s);let n=(seed>>>0)||1;for(let i=0;i<data.data.length;i+=4){n=(n*1664525+1013904223)>>>0;const v=128+(n%128)-64;data.data[i]=data.data[i+1]=data.data[i+2]=v;data.data[i+3]=n%80}g.putImageData(data,0,0);ctx.save();ctx.globalAlpha=.13;ctx.globalCompositeOperation='soft-light';ctx.fillStyle=ctx.createPattern(c,'repeat');ctx.fillRect(0,0,w,h);ctx.restore()}

/** Resolves the panel at a pointer location while accounting for rotated snapshot frames. */
export function panelAtPoint(px,py,w,h,layoutId){const panels=layoutById(layoutId).panels;for(let i=panels.length-1;i>=0;i--){const p=panels[i],pw=p.w*w,ph=p.h*h,cx=(p.x+p.w/2)*w,cy=(p.y+p.h/2)*h,a=-(p.tilt??0)*Math.PI/180,dx=px-cx,dy=py-cy,x=dx*Math.cos(a)-dy*Math.sin(a),y=dx*Math.sin(a)+dy*Math.cos(a);if(Math.abs(x)<=pw/2&&Math.abs(y)<=ph/2)return i}return -1}
