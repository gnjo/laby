#random labyrinth
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
```

```
let a=Laby({});
```
```
size=[40,40] //[width,height]
rnum=[2,8] //[min,max] room number
retrymax=10 //if try and try this number, false map is null
//

```
