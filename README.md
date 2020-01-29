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
,fuzzy:60 //0-100 
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

getmeasure(sx,sy,ex,ey) // Math.abs(ex-sx)+Math.abs(sy-ey)
joinwalk(map,sx,sy,ex,ey,count,finerate,rand) //finerate 0-100 or 'corner'
getturn(v)// N>S, S>N, E>W, W>E
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
//checkpoint pattern
N:[[0,39],[0,0],[39,39],[39,0]]
,Z:[[0,0],[39,0],[0,39],[39,39]]
,C:[[39,0],[0,0],[0,39],[39,39]]
,U:[[0,0],[0,39],[39,39],[39,0]]
```

