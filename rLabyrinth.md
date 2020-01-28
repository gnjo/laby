#random labyrinth
```
wall=0
road=1
door=2
object=3 //object is room object
//utils

getmeasure(sx,sy,ex,ey) // (sx-ex)^2+(sy-ey)^2

```

```
//roompattern
t33
020
232
020

t55
00200
03330
23332
03330
00200

t57

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
