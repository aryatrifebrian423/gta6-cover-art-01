/** Defines the six panel maps used by the canvas at every export aspect ratio. */
export const LAYOUTS = [
  { id:'four', name:'Four panel', art:'grid4', panels:[p(.012,.012,.488,.488),p(.5,.012,.488,.488),p(.012,.5,.488,.488),p(.5,.5,.488,.488)] },
  { id:'hero', name:'Hero + three', art:'hero', panels:[p(.012,.012,.976,.49),p(.012,.51,.318,.478),p(.341,.51,.318,.478),p(.67,.51,.318,.478)] },
  { id:'full', name:'Full bleed', art:'full', panels:[p(.012,.012,.976,.976)] },
  { id:'tilt', name:'Snapshot mix', art:'tilt', panels:[p(.04,.035,.53,.51,-5),p(.47,.08,.48,.43,4),p(.055,.53,.42,.4,3),p(.42,.55,.53,.39,-3)] },
  { id:'nine', name:'Nine frame', art:'nine', panels:Array.from({length:9},(_,i)=>p(.012+(i%3)*.329,.012+Math.floor(i/3)*.329,.318,.318)) },
  { id:'story', name:'Story poster', art:'story', panels:[p(.012,.012,.976,.55),p(.012,.572,.48,.404),p(.504,.572,.484,.404)] },
];
function p(x,y,w,h,tilt=0){return{x,y,w,h,tilt}}
export function layoutById(id){return LAYOUTS.find(layout=>layout.id===id)??LAYOUTS[0]}
