//xorshift
;(function(root){
function shuffle(a,random){
 let r,t,i,b=[].concat(a)
 for(i=b.length-1;i>0;i--) r=random()% (i+1),t=b[i],b[i] = b[r],b[r] = t
 ;
 return b;
}

 /*xorshift
let seed=888
let random=xrand(seed)
let a=Array.from({length:100}).map(d=>random(-100,100))
console.log(a)
 */
 function entry(_s){
  let is=(d)=>{return(d||d===0)?true:false},_seed=_s||123456789,x=111,y=222,z=333,w=_seed,wk
  ,next=()=>{return wk=x^(x<<11),x=y,y=z,z=w, w=(w ^ (w >>> 19)) ^ (wk ^ (wk >>> 8))}
  ;
  return function random(min,max){
    if(is(min)&&!is(max)) max=min,min=0;
    return (!is(max))?next():min + (Math.abs(next()) % (max + 1 - min));
  }
 }
 root.xrand=entry
 root.shuffle=shuffle
})(this);
