# roadjoin
labyrinth maker
```
0:wall all
1:road all
2:road on stairs 4 only. 00 01 06 07
3:road on doors
4:road on treasure 5 to 20
5:road on other
6...9:road on other

roadjoin.rand=Math.random();/*number fix random*/
let o=roadjoin.done(seed)
o.w=40
o.h=40
o.map[40][40]
o.pmap[0...9]=[[x,y],[x,y]...] //o.pmap[1]=[[x,y],[x,y]...] //road on door points
o.smap="" //strings map
```
```
joinlist=[//0-7
{sx,sy,ex,ey},...
]
let joinlist=makejoinlist()
joinlist.map(d=>{
 minimap(d.sx,d.sy,d.ex,d.ey) //20*10
}
```
```
//doorable
(x,y-1)&&(x,y)&&(x,y+1) === road ||
(x-1,y)&&(x,y)&&(x+1,y) === road 

-o-
oxo
-o-

-o-
-x-
-o-

---
oxo
---


getdoorablelist=(m)=>{ //m[][]
}

```
```
//system
20*10 * 8box = 40*40
doors range 3-7

|00|01|
|02|03|
|04|05|
|06|07|
L-R to U-D
if 00, join point 2 00>01,00>02
//00,03,12,15
LRUD
joinmap={
  '00':'RD','01':'LD'
}
```

```js
//xorshift
;(function(root){
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
})(this);
```
