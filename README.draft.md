# roadjoin
labyrinth maker

```

joinwalk(map,sx,sy,ex,ey,donts,finerate,rand)

部屋の扉の縦横列のみを走査し、最も近い点を見つける。その方向を扉とする。
mu.getmesure=(sx,sy,ex,ey)=>{
 return (sx-ex)^2+(sy-ey)^2
}
mu.getnearpoint=(map,cx,cy,s,min)=>{
 //s is targetsymbol
 let h=map.length,w=map[0].length
 let ary=[] //[x,y,value] 
 for(let ix=0;ix<w;ix++)
  if(map[cy][ix]==s)ary.push([ix,cy,mu.getmesure(cx,cy,ix,cy)])
 for(let iy=0;iy<h;iy++)
  if(map[iy][cx]==s)ary.push([cx,iy,mu.getmesure(cx,cy,cx,iy)])
  ;
 let a=ary.filter(d=>d[2]>min).sort((a,b)=>b-a).pop() //down and young number

 return [a[0],a[1]]
}

mu.getroompoint(map,rand,max)
```

```
//checkpoint pattern
N:[[0,39],[0,0],[39,39],[39,0]]
,Z:[[0,0],[39,0],[0,39],[39,39]]
,C:[[39,0],[0,0],[0,39],[39,39]]
,U:[[0,0],[0,39],[39,39],[39,0]]
```

```
部屋をランダムに作成する。
部屋の中心から距離を測定し、最も近い点へ接続する。

０．部屋設置するを決める。
１．部屋を設置するベースラインを決める。ベースライン決定数は部屋の数＊１０。
２．ベースラインの座標を走査する。縦か横。
３．７マス部屋か５マス部屋が入るかチェックする。設置可能座標を保存する。
４．設置可能座標群から一つ抜き出し、部屋とする。部屋のデコレーションを決める。
５．最も部屋に近い通路に向かい道を作る。開始点は扉の一つ外から、道が接続した後、部屋を作り、方角の方に扉の道を作る。

部屋は2パターンのみ。
5*5
00N00
0*1*0
W111E
0*1*0
00S00

7*
000N000
0*111*0
W11111E
0*111*0
000S000
```

```
１．チェックポイントを四つ与える。
２．シャッフルする。
３．一つ取り出し始点とする。二つ目をチェックポイントとする。
４．チェックポイントの方向を確かめる。最も近くなる方角の確率を上げる。例えば、東なら、東西南北東東となる。
５．ランダムの方角を一つ取り出し、一歩進む。その地点を道とする。範囲外の場合は動かない。
６．チェックポイントに到達するまで続ける。

autowalk(map,x,y,cp,i,limit){
 if(limit>500||!cp[i])return map;
 if([x,y]===cp[i])return autowalk(map,x,y,cp,i++,limit);
 let v=mu.vec(x,y,cp[i][0],cp[i][1])
 ,b=shuffle(("NEWS"+v+v).split(''),rand).pop()
 ,dv=mu.dvec(b)
 ,p=mu.iswalk(map,x,y,b)?[x+dv[0],y+dv[1]]:[x,y]
 ;
 mu.setpos(map,p[0],p[1],"1")
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
```
//mu.js
let o=mu;
o.genmap(w,h,symbol)
o.mapjoin(a,b,jx,jy)
o.samemap(a,b,jx,jy,cflg)
o.str2map(str)
o.map2str(map)
o.map2flg(map,flgsymbol)
o.ispos(map,x,y)
o.setpos(map,x,y,symbol)
o.getpos(map,x,y)
o.vec(cx,cy,tx,ty)
o.dvec(b)
o.iswalk(map,x,y,b)

//xors.js
shuffle(a,random)
let r=xrand(seed)
let a=shuffle([0,1,2,3,4],r)
```
# textreader
```
let looper=(ev,cr)=>{
 //ev.t:topmessage, ev.c:centermessage, ev.b:bottommessage, ev.mode:sel or mes, ev.tick:count by fps 
 cr.keyin('') //<>^v ABXYLR
 //cr.keyflash() //use system
}
let cr=crit(text,looper,opts)
```
