#random labyrinth
```
wall=0
road=1
door=2
object=3 //object is room object
//utils

getmeasure(sx,sy,ex,ey) // Math.abs(ex-sx)+Math.abs(sy-ey)

```

```
//roompattern
t53
00200
23132
00200

t35
020
030
212
030
020

t55
00200
03130
21112
03130
00200

t75
0002000
0311130
2111112
0311130
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
