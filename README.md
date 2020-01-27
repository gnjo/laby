# roadjoin
labyrinth maker
```
１．チェックポイントを四つ与える。
２．シャッフルする。
３．一つ取り出し始点とする。二つ目をチェックポイントとする。
４．チェックポイントの方向を確かめる。最も近くなる方角の確率を上げる。例えば、東なら、東西南北東東となる。
５．ランダムの方角を一つ取り出し、一歩進む。その地点を道とする。範囲外の場合は動かない。
６．チェックポイントに到達するまで続ける。
a->b->c->d

autowalk(map,x,y,cp,i,limit){
 if(limit>500||!cp[i])return map;
 if([x,y]===cp[i])return autowalk(map,x,y,cp,i++,limit);
 let v=vec(x,y,cp[i][0],cp[i][1])
 ,b=shuffle(("NEWS"+v+v).split(''),rand).pop()
 ,p=mu.iswalk(x,y,b)?mu.walk(x,y,b):[x,y]
 ;
 return autowalk(map,p[0],p[1],cp,i,limit++)
}

```
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
,b:[r(1,19),10]
,c:[20+r(1,19),10]
,d:[20,r(1,9)]
,e:[r(1,19),10]
,f:[20+r(1,19),10]
,g:[20,r(1,9)]
,h:[r(1,19),10]
,i:[20+r(1,19),10]
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

```
