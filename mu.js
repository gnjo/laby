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
   if(b[y-jy][x-jx]!='*'&&a[y][x]!=b[y-jy][x-jx])same=0;
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
o.ispos=(map,x,y)=>{
 try{return map[y][x],true}catch(e){return false}
}
o.setpos=(map,x,y,symbol)=>{
 if(o.ispos(map,x,y))map[y][x]=symbol
 return map;
}
o.getpos=(map,x,y)=>{
 return o.ispos(map,x,y)?map[y][x]:void 0
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
