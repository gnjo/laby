# laby
```
Random walk like an ants and paste the room on labyrinth.
```
https://codepen.io/gnjo/pen/gObJLKx?editors=1010

```
log      
v0.10 fix thinks the finishwork recovery. fail door and wildcard copy     
v0.11 cod map symbol definition. all map symbol the string.
v0.20 cod wildcard copy issue. wildcard symbol * is transparent.
v0.30 cod fail door recovery. if failed the door, change to road. "2" to "1".
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
mm.events=[[x,y]...] //4
//mm.doors=[[x,y]...] //symbol 2
//mm.objects=[[x,y]...] //3
```
```
laby({
size:[40,40] //[width,height]
,point:8 //random points number
,roomrange:[4,12] //[min,max] room range
,finerate:60 //0-100 
//
})
```

# note
```
function is(d){return (d||d===0)?true:false}
```
```
door recovery
130
120
110

door is 020 or vertex 020

```
```
wall=0
road=1
door=2
object=3 //object is room object
event=4 //join point
//utils

joinwalk(map,sx,sy,ex,ey,count,finerate,rand) //finerate 0-100 or 'corner'
gen(seed,sx,sy,ex,ey){
 let f=(d)=>{return mu.is(d[0])?d:[]}
}
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
