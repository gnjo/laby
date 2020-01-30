//maputil
/* history
v0.0 made it
v1.0 bugfix
v1.1 is(d)
v1.2 
genmap(w,h,symbol)
mapjoin(a,b,jx,jy)
samemap(a,b,jx,jy,cflg)
str2map(str)
map2str(map)
map2flg(map,flgsymbol)
v1.3 
isrange(min,x,max)
setpos(map,x,y,symbol)
getpos(map,x,y)
v1.4 
vec(cx,cy,tx,ty)
dvec(b)
iswalk(map,x,y,b)
getturn(b)
v1.5 
getmeasure(sx,sy,ex,ey)
makeroom(pattern,door)
getroominfo(pattern)
v1.6
getnearpoint(map,cx,cy,s,min)
getroompoint(map,rand,max)
v1.7 door issue
getsymbolary(map,symbol)
iswelldonedoor=(map,cx,cy)
*/
;(function(root){
let o={}
o.is=(d)=>{return (d||d===0)?true:false}
o.deep=d=>JSON.parse(JSON.stringify(d));
o.clone=o.deep
o.symbol={wall:"0",road:"1",door:"2",object:"3",event:"4"}
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
const PI=3.141592653589793;
o.vec=(cx,cy,tx,ty)=>{
  let dx=tx-cx,dy=ty-cy
  let v=Math.atan2(-1*dy, dx) * 180/PI; //issue multi os differ
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
const t33=o.str2map(`
000
030
000
`)
const t53=o.str2map(`
00000
01130
00000
`)
const t35=o.str2map(`
000
010
010
030
000
`)
const t55=o.str2map(`
00000
01130
01110
01110
00000
`)
const t75=o.str2map(`
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
 info.map=o.clone(o.roompattern[info.pattern])
 info.map=o.setpos(info.map,info.d[0],info.d[1], o.symbol.door) //symbol
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
  info.emap=o.genmap(info.size[0],info.size[1],o.symbol.wall) //symbol
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

o.getroompoint=(map,rand,max)=>{
 //33,53,35,55,75
 let ary=[75,55,35,53,33].map(d=>o.getroominfo(d))
 ;
 let h=map.length,w=map[0].length,found=0
 ,x,y,type
 ;max=max||1000;
 for(let i=0;i<max;i++){
  x=rand(0,w-1),y=rand(0,h-1)
  if(ary.some( (info)=>{if(o.samemap(map,info.emap,x,y))return found=1,type=info.pattern,true} ))break;
 }
 return found?[x,y,type]:void 0
 //return [x,y,type] //type is 55 or 75
}

o.getnearpoint=(map,cx,cy,s,min)=>{
 //s is targetsymbol
 let h=map.length,w=map[0].length
 let ary=[] //[x,y,value] 
 for(let ix=0;ix<w;ix++)
  if(map[cy][ix]==s)ary.push([ix,cy,o.getmeasure(cx,cy,ix,cy)])
 for(let iy=0;iy<h;iy++)
  if(map[iy][cx]==s)ary.push([cx,iy,o.getmeasure(cx,cy,cx,iy)])
 ;
 let a=ary.filter(d=>d[2]>min).sort((a,b)=>b[2]-a[2])
 //console.log(a)
 a=a.pop() //down and young number
 if(!a)return void 0
 //console.log([cx,cy],[a[0],a[1]],mu.getmeasure(cx,cy,a[0],a[1])) 
 return [a[0],a[1]]
}

o.getsymbolary=(map,symbol)=>{
 let h=map.length,w=map[0].length
 ,ary=[] //
 for(let y=0;y<h;y++)
  for(let x=0;x<w;x++)
   if(map[y][x]==symbol)ary.push([x,y])
 return ary;
}

const hdoor=o.str2map(`
*0*
121
*0*
`)
const vdoor=o.str2map(`
*1*
020
*1*
`)

o.iswelldonedoor=(map,cx,cy)=>{
 return [hdoor,vdoor].some(d=>o.samemap(map,d,cx,cy,1))
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
