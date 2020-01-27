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
//doorable
-o-
oxo
-o-

000
1*1
000

010
0*0
010

```
```
//system
20*10 * 8box = 40*40
doors range 3-7
|00|01|
|02|03|
|04|05|
|06|07|

join point
|00|a|01|
 b  - c
|02|d|03|
 e  - f
|04|g|05|
 h  -  i
|06|j|07|
let r=xrand()
ps={
a:[20,r(1,9)]
,b:[r(1,39),10]
,c:[20+r(1,39),10]
,d:[20,10+r(1,9)]
,e:[r(1,39),20]
,f:[20+r(1,39),20]
,g:[20,20+r(1,9)]
,h:[r(1,39),30]
,i:[20+r(1,39),30]
,j:[20,30+r(1,9)]
}


minimap(sx,sy,ex,ey) //20*10

offset=[
 [0,10*0],[20,10*0]
,[0,10*1],[20,10*1]
,[0,10*2],[20,10*2]
,[0,10*3],[20,10*3]
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
