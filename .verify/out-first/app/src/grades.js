/** Stores each original color recipe and applies a complementary print tint over the photographs. */
export const GRADES = [
  {id:'vice',name:'Vice sunset',swatch:'sw-vice',filter:'saturate(1.16) contrast(1.08) sepia(.11)',top:'#315a84',bottom:'#fa8b94'},
  {id:'neon',name:'Neon night',swatch:'sw-neon',filter:'saturate(1.48) contrast(1.16) hue-rotate(-8deg)',top:'#0c5260',bottom:'#ed4f9b'},
  {id:'gold',name:'Golden hour',swatch:'sw-gold',filter:'saturate(1.2) sepia(.34) contrast(1.04)',top:'#d5a048',bottom:'#ffcb75'},
  {id:'noir',name:'Noir',swatch:'sw-noir',filter:'grayscale(1) contrast(1.3) brightness(.84)',top:'#283447',bottom:'#9894a7'},
  {id:'duo',name:'Blue hour',swatch:'sw-duo',filter:'saturate(.9) contrast(1.12) hue-rotate(18deg)',top:'#27536b',bottom:'#ed787f'},
];
export function gradeById(id){return GRADES.find(grade=>grade.id===id)??GRADES[0]}
