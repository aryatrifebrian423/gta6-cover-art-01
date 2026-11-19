/** Paints the original Afterhours title system, badge, issue line and decorative heat stars. */
export function drawLettering(ctx,w,h,caption,grade,layoutId){
  const full=layoutId==='full';
  const safe=Math.min(w,h)*.055;
  const veil=ctx.createLinearGradient(0,h*.48,0,h);
  veil.addColorStop(0,'rgba(7,9,17,0)');veil.addColorStop(.42,'rgba(9,8,17,.33)');veil.addColorStop(1,'rgba(10,8,16,.88)');
  ctx.fillStyle=veil;ctx.fillRect(0,0,w,h);
  const left=safe*1.12, titleY=h*.82;
  const title=(caption.title||'').trim().toUpperCase();
  ctx.save();ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.lineJoin='round';
  let size=Math.min(h*.142,w*.19);ctx.font=`${size}px Anton, Impact, sans-serif`;
  while(title && ctx.measureText(title).width>w*.83 && size>24){size-=2;ctx.font=`${size}px Anton, Impact, sans-serif`}
  ctx.shadowColor='rgba(8,5,14,.72)';ctx.shadowBlur=size*.24;ctx.shadowOffsetY=size*.09;
  const fill=ctx.createLinearGradient(left,titleY-size,left+Math.min(w*.72,ctx.measureText(title).width),titleY);
  fill.addColorStop(0,'#ffd08e');fill.addColorStop(.42,'#ff9e9b');fill.addColorStop(1,grade.id==='neon'?'#79e5db':'#f077a8');
  ctx.lineWidth=Math.max(2,size*.035);ctx.strokeStyle='#2a1628';ctx.strokeText(title,left,titleY);ctx.fillStyle=fill;ctx.fillText(title,left,titleY);
  ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  ctx.strokeStyle='rgba(255,240,221,.58)';ctx.lineWidth=Math.max(1,size*.008);ctx.beginPath();ctx.moveTo(left,titleY+size*.08);ctx.lineTo(Math.min(w*.47,left+Math.max(80,ctx.measureText(title).width*.48)),titleY+size*.08);ctx.stroke();
  const subtitle=(caption.subtitle||'').trim();
  if(subtitle){ctx.font=`${Math.max(14,h*.037)}px Pacifico, cursive`;ctx.fillStyle='#ffe4e0';ctx.shadowColor='#170a19';ctx.shadowBlur=7;ctx.fillText(subtitle.slice(0,42),left,titleY+size*.42);ctx.shadowBlur=0}
  ctx.restore();
  drawMasthead(ctx,w,h,safe,caption,full);
}
function drawMasthead(ctx,w,h,pad,caption,full){
  ctx.save();const tiny=Math.max(9,Math.min(w,h)*.013);ctx.textBaseline='middle';ctx.textAlign='left';
  ctx.fillStyle='rgba(12,12,18,.54)';roundedRect(ctx,pad*.68,pad*.68,w-pad*1.36,tiny*2.55,tiny*.5);ctx.fill();
  ctx.fillStyle='#ffc28a';ctx.font=`800 ${tiny*.75}px system-ui, sans-serif`;ctx.fillText('A F T E R H O U R S',pad*1.05,pad*1.43);
  ctx.fillStyle='rgba(255,255,255,.79)';ctx.font=`700 ${tiny*.48}px system-ui, sans-serif`;ctx.fillText('N° 06   /   COASTAL STORIES',pad*1.05,pad*2.06);
  const badge=(caption.badge||'').trim().toUpperCase();if(badge){ctx.font=`800 ${tiny*.62}px system-ui, sans-serif`;const bw=ctx.measureText(badge).width+tiny*1.2;const bx=w-pad*.98-bw,by=pad*1.02;ctx.fillStyle='#ef849f';ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx+bw,by);ctx.lineTo(bx+bw-tiny*.48,by+tiny*.9);ctx.lineTo(bx,by+tiny*.9);ctx.closePath();ctx.fill();ctx.fillStyle='#20131b';ctx.textAlign='center';ctx.fillText(badge,bx+bw/2,by+tiny*.45)}
  ctx.fillStyle='rgba(255,245,235,.78)';ctx.textAlign='right';ctx.font=`700 ${tiny*.52}px system-ui, sans-serif`;ctx.fillText('VOL. 01   •   THE CITY AFTER DARK',w-pad,pad*3.75);
  const stars=full?5:4;ctx.font=`${tiny*.8}px system-ui, sans-serif`;ctx.fillStyle='#ffca84';ctx.textAlign='right';ctx.fillText('★ '.repeat(stars),w-pad,pad*4.85);
  const footerY=Math.min(h-pad*.6,h*.965);ctx.strokeStyle='rgba(255,255,255,.24)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(pad,footerY-tiny*.85);ctx.lineTo(w-pad,footerY-tiny*.85);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.7)';ctx.textAlign='left';ctx.font=`700 ${tiny*.47}px system-ui, sans-serif`;ctx.fillText('A NIGHT CAN CHANGE EVERYTHING',pad,footerY-tiny*.28);ctx.textAlign='right';ctx.fillText('MIAMI COAST  /  26° 08’ N',w-pad,footerY-tiny*.28);
  ctx.restore();
}
function roundedRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
