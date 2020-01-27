# roadjoin
labyrinth maker
```
0:wall all
1:road all
2:road on stairs 5 only. 00 03 12 15 06
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
//system
10*10 * 16box = 40*40

|00|01|02|03|
|04|05|06|07|
|08|09|10|11|
|12|13|14|15|
```
