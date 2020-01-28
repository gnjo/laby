//maputil
/* history
v0.0 made it
*/
;(function(root){
let o={}
o.genmap=(w,h,symbol)=>{
 return Array(w*h+1).join(symbol).match(new RegExp(".{"+w+"}","g")).map(d=>d.split(''))
}
o.mapjoin=(a,b,jx,jy)=>{
 let j=a,h=b.length,w=b[0].length
 for(let y=jy;y<jy+h;y++)
  for(let x=jx;x<jx+w;x++)
   a[y][x]=b[ y-jy ][ x-jx ]
 return j;
}
o.samemap=(a,b,jx,jy,cflg)=>{
 //* is wildcard,cflg is jx,jy is center. odd number only.
 let same=1,h=b.length,w=b[0].length
 ,ox=cflg?Math.floor(w/2):0,oy=cflg?Math.floor(h/2):0
 ;
 jx=jx-ox,jy=jy-oy
 for(let y=jy;y<jy+h;y++)
  for(let x=jx;x<jx+w;x++)
   if( (!o.ispos(a,x,y)) || (b[y-jy][x-jx]!='*'&&a[y][x]!=b[y-jy][x-jx]) ){same=0;break}
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

/*
o.ispos=(map,x,y)=>{
 try{
  if(x<0)return false;
  if(x>map[0].length-1)return false;
  return map[y][x],true
 }catch(e){
  return false
 }
}
*/
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
