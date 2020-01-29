# laby
```
Random walk like an ants and paste the room on labyrinth.
```
```
script(src="https://gnjo.github.io/laby/xors.js")
script(src="https://gnjo.github.io/laby/mu.js")
script(src="https://gnjo.github.io/laby/laby.js")
```
```
let a=laby(opts);
let mm=a.gen(seed) //or a.gen(seed,sx,sy,ex,ey)
mm.map
mm.doors=[[x,y]...] //symbol 2
mm.objects=[[x,y]...] //3
mm.events=[[x,y]...] //4
```
```
laby({
size:[40,40] //[width,height]
,point:8 //random points number
,roomrange:[4,12] //[min,max] room range
,retry:10 //if try and try this number, false map is null
,finerate:60 //0-100 
//
})
```

# note
```
function is(d){return (d||d===0)?true:false}
```
```
wall=0
road=1
door=2
object=3 //object is room object
event=4 //join point
//utils

joinwalk(map,sx,sy,ex,ey,count,finerate,rand) //finerate 0-100 or 'corner'
getep(w,h,rand) //enough point
getrp(n,w,h,rand) //random point
```

```
//room has object, one only.
//roompattern
t33
020
232
020

t53
00200
21132
00200

t35
020
010
212
030
020

t55
00200
01130
21112
01110
00200

t75
0002000
0111110
2111112
0311110
0002000

getroominfo(pattern)
makeroom(pattern,door)
```
```
o.getep=(w,h,rand)=>{
 let x=w-1, y=w-1,xr=Math.floor(x*0.15),yr=Math.floor(y*0.15)
 ,a=[
  [rand(0,xr),y-rand(0,yr)]
  ,[rand(0,xr),rand(0,yr)]
  ,[x-rand(0,xr),y-rand(0,yr)]
  ,[x-rand(0,xr),rand(0,yr)]
 ]
 return shuffle(a,rand)
}
o.getrp=(n,w,h,rand)=>{ 
 return Array.from({length:n}).map(d=>[rand(0,w-1),rand(0,h-1)]) 
}
```

