# laby
```
Random walk like an ants and paste the room on labyrinth.
```
https://codepen.io/gnjo/pen/gObJLKx?editors=1010

```
//history 
v0.10 fix thinks the finishwork recovery. fail door and wildcard copy     
v0.11 fix map symbol definition. all map symbol the string.
v0.20 stp wildcard copy issue. wildcard symbol * is transparent. stop, wildcard copy dont need to use.
v0.30 cod fail door recovery. if failed the door, change to road. "2" to "1".
```
```
//pug
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
bad door recovery
130   130
120 > 110
110   110

door is 020 or vertex 020.
```
```
wall=0
road=1
door=2
object=3 //object is room object
event=4 //join point
```

```
//room pattern. the "3" is object, like a item.
000
030
000

00000
01130
00000

000
010
010
030
000

00000
01130
01110
01110
00000

0000000
0111110
0111110
0311110
0000000
```
