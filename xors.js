//xorshift
;(function(root){
 /*xorshift usage
let seed=888
let random=xrand(seed)
let a=Array.from({length:100}).map(d=>random(-100,100))
console.log(a)
let b=shuffle(a,random)
 */
function shuffle(a,random){
 return [].concat(a).sort(()=>random()-random())
}
 /*if start value change
[0,1,2,3,4,5,6].map(d=>Math.floor(Math.random()*1000000000)) 
0: 371973300
1: 472613715
2: 413900530
3: 942798599
4: 431705231
5: 427485698
6: 281552588 
 */
 function entry(_s){
  let _seed=_s||371973300,x=472613715,y=413900530,z=942798599,w=_seed,wk
  ;
  function is(d){return(d||d===0)?true:false}
  function next(){return wk=x^(x<<11),x=y,y=z,z=w, w=(w ^ (w >>> 19)) ^ (wk ^ (wk >>> 8))}  
  ;
  return function random(min,max){
    if(is(min)&&!is(max)) max=min,min=0;
    return (!is(max))?next():min + (Math.abs(next()) % (max + 1 - min));
  }
 }
 root.xrand=entry
 root.shuffle=shuffle
})(this);
