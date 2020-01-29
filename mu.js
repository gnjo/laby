//maputil
/* history
v0.0 made it
v1.0 bugfix
is(d)
genmap(w,h,symbol)
mapjoin(a,b,jx,jy)
samemap(a,b,jx,jy,cflg)
str2map(str)
map2str(map)
map2flg(map,flgsymbol)
isrange(min,x,max)
setpos(map,x,y,symbol)
getpos(map,x,y)
vec(cx,cy,tx,ty)
dvec(b)
iswalk(map,x,y,b)
getturn(b)
getmeasure(sx,sy,ex,ey)
makeroom(pattern,door)
getroominfo(pattern)
*/
;(function(root){
let o={}
o.is=(d)=>{return (d||d===0)?true:false}
o.genmap=(w,h,symbol)=>{
 return Array(w*h+1).join(symbol).match(new RegExp(".{"+w+"}","g")).map(d=>d.split(''))
}
o.mapjoin=(a,b,jx,jy)=>{
 let h=b.length,w=b[0].length
 for(let y=jy;y<jy+h;y++)
  for(let x=jx;x<jx+w;x++)
   a[y][x]=b[ y-jy ][ x-jx ]
 return a;
}
o.samemap=(a,b,jx,jy,cflg)=>{
 //* is wildcard,cflg is jx,jy is center. odd number only.
 let same=1,h=b.length,w=b[0].length
 ,ox=cflg?Math.floor(w/2):0,oy=cflg?Math.floor(h/2):0
 ;
 jx=jx-ox,jy=jy-oy
 if(!o.ispos(a,jx+w-1,jy+h-1))return 0;//out of range
 for(let y=jy;y<jy+h;y++)
  for(let x=jx;x<jx+w;x++)
   if((b[y-jy][x-jx]!='*'&&a[y][x]!=b[y-jy][x-jx]) ){same=0;break}
 return same;
}
o.str2map=(str)=>{
 //trim
 return str.trim().split('\n').map(d=>d.split(''))
}
o.map2str=(map)=>{
 return map.map(d=>d.join('')).join('\n')
}
o.map2flg=(map,flgsymbol)=>{
 return map.map(d=>d.map(d=>d==flgsymbol?1:0))
}

o.isrange=(min,x,max)=>{
 let wk=min
 if(min>max) min=max,max=wk;
 return (min<=x&&x<=max)
}
o.ispos=(map,x,y)=>{
 return o.isrange(0,x,map[0].length-1)&&o.isrange(0,y,map.length-1)
}

o.setpos=(map,x,y,symbol)=>{
 if(o.ispos(map,x,y))map[y][x]=symbol
 return map;
}
o.getpos=(map,x,y)=>{
 return o.ispos(map,x,y)?map[y][x]:void 0
}
o.vec=(cx,cy,tx,ty)=>{
  let dx=tx-cx,dy=ty-cy
  let v=Math.atan2(-1*dy, dx) * 180 / Math.PI;
   if(v<=135&&v>45)return "N"
   if(v<=45&&v>-45)return "E"
   if(v<=-45&&v>-135)return "S"
   return "W" //other W
}
o.dvec=(b)=>{
 if(b==="N") return [0,-1]
 if(b==="E") return [1,0]
 if(b==="W") return [-1,0]
 if(b==="S") return [0,1]
 return [0,0]
}
o.iswalk=(map,x,y,b)=>{
 let dv=o.dvec(b)
 return o.ispos(map,x+dv[0],y+dv[1])
}

o.getturn=(b)=>{
 if(b==="N") return "S"
 if(b==="E") return "W"
 if(b==="W") return "E"
 if(b==="S") return "N"
 return "S"
}
o.getmeasure=(sx,sy,ex,ey)=>{
 return Math.abs(ex-sx)+Math.abs(sy-ey)
}

//room has object, one only.
//roompattern
let t33=o.str2map(`
000
030
000
`)
let t53=o.str2map(`
00000
01130
00000
`)
let t35=o.str2map(`
000
010
010
030
000
`)
let t55=o.str2map(`
00000
01130
01110
01110
00000
`)
let t75=o.str2map(`
0000000
0111110
0111110
0311110
0000000
`)
o.roompattern={33:t33,53:t53,35:t35,55:t55,75:t75}
o.makeroom=(pattern,door)=>{
 let info=o.getroominfo(pattern||33)
 info.door=door||'N' //NEWS
 info.d=info[info.door]
 info.map=o.setpos([].concat(o.roompattern[info.pattern]),info.d[0],info.d[1],2)
 return info
}
o.getroominfo=(pattern)=>{
 let f=(x,y,v)=>{
  let s=o.dvec(v)
  return [x,y,x+s[0],y+s[1]]
 }
 let info={}
 info.pattern=pattern||33 //33,53,35,55,75
 let w=parseInt(String(info.pattern).charAt(0))
 ,h=parseInt(String(info.pattern).charAt(1))
 ,x=(w-1)/2
 ,y=(h-1)/2
 if(info.pattern===33){
  info.o=[1,1]  
  /*
000
030
000
*/  
 }
 if(info.pattern===53){
  /*
00000
01130
00000
*/ 
  info.o=[3,1]
 }
 if(info.pattern===35){
  /*
000
010
010
030
000
*/
  info.o=[1,3]
 }
 if(info.pattern===55){
/*
00000
01130
01110
01110
00000
*/
  info.o=[3,1]
 }
 if(info.pattern===75){
/*
0000000
0111110
0111110
0311110
0000000
*/
  info.o=[1,3]
 }
  info.size=[w,h]
  info.c=[x,y]
  info.N=f(x,0,'N')
  info.E=f(w-1,y,'E')
  info.W=f(0,y,'W')
  info.S=f(x,h-1,'S')
  info.emap=o.genmap(info.size[0],info.size[1],0)
  ;
  return info;

 //map:[[],...]
 //size:[w,h] 
 //d:[x,y,x2,y2] //default 
 //c:[x,y]//center pos
 //o:[x,y]//object pos
 //N:[x,y,x2,y2]//north pos x2,y2 is north and one north
 //E:...
 //W:...
 //S:...
}

 root.mu=o; //maputil
 /*
let a=mu.genmap(40,40,"0")
let b=mu.genmap(20,10,"1")
let c=mu.genmap(20,10,"*")
let d=mu.map2flg(mu.genmap(20,10,"3"),"3")
let ret=mu.mapjoin(a,b,20,0)
let flg=mu.samemap(b,d,0,0);
fn.q('pre').textContent=mu.map2str(ret)
console.log(mu.ispos(a,0,0)) 
 */
})(this);
