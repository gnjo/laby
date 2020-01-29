# random labyrinth
```
Random walk like an ants and paste the room on labyrinth.
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
,pnum:8 //random points number
,rnum:[4,12] //[min,max] room number
,retrymax:10 //if try and try this number, false map is null
,fuzzy:60 //0-100 
//
})
```
