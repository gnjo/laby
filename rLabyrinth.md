# random labyrinth
```
Random walk like an ants and paste the room on labyrinth.
```
```
wall=0
road=1
door=2
object=3 //object is room object
//utils

getmeasure(sx,sy,ex,ey) // Math.abs(ex-sx)+Math.abs(sy-ey)

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
//map:[[],...]
//size:[w,h]
//c:[x,y]//center pos
//o:[x,y]//object pos
//N:[x,y,x2,y2]//north pos x2,y2 is north and one north
//E:...
//W:...
//S:...

makeroom(pattern,door)
```

```
let a=Laby({});
```
```
size=[40,40] //[width,height]
rnum=[4,12] //[min,max] room number
retrymax=10 //if try and try this number, false map is null
//

```
