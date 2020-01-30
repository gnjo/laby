//history
;(function(root){
 let mu=root.mu,shuffle=root.shuffle,xrand=root.xrand
 function entry(opts){
  let o={
   size:[40,40] //[width,height]
   ,point:8 //random points number
   ,roomrange:[10,18] //[min,max] room range
   ,finerate:40 //0-100
  }
  o.finishwork=(map)=>{
   //map and event
   return mu.clone(map);
  }
  o.getrp=(n,w,h,rand)=>{ 
   return Array.from({length:n}).map(d=>[rand(0,w-1),rand(0,h-1)]) 
  }
  o.getep=(w,h,rand)=>{
   let x=w-1, y=w-1,xr=Math.floor(x*0.15),yr=Math.floor(y*0.15)
   ,a=[
    [rand(0,xr),y-rand(0,yr)]
    ,[rand(0,xr),rand(0,yr)]
    ,[x-rand(0,xr),y-rand(0,yr)]
    ,[x-rand(0,xr),rand(0,yr)]
   ]
   return shuffle(a,rand)
  }  
  o.joinwalk=function joinwalk(map,sx,sy,ex,ey,count,finerate,rand){
   map=mu.setpos(map,sx,sy,mu.symbol.road); //symbol
   if(count>1000||(sx===ex&&sy===ey))return map
   let fi=mu.getmeasure(sx,sy,ex,ey)<3?100:finerate
   ,b=(rand(0,100)<fi)?mu.vec(sx,sy,ex,ey):shuffle("NEWS".split(""),rand).pop()
   ,dv=mu.dvec(b)
   if(mu.ispos(map,sx+dv[0],sy+dv[1])) sx=sx+dv[0],sy=sy+dv[1];
   return o.joinwalk(map,sx,sy,ex,ey,count+1,finerate,rand)
  }
  ////////////////////////
  o.gen=(seed,sx,sy,ex,ey)=>{
   let f=(d)=>{return mu.is(d[0])?d:[]}
   ,rand=xrand(seed),w=o.size[0],h=o.size[1]
   ,po=[].concat(f([sx,sy]) )/*.concat(o.getep(w,h,rand))*/.concat(o.getrp(o.point,w,h,rand)).concat(f([ex,ey]) )
   ,map=mu.genmap(w,h,0)
   ,rmax=rand(o.roomrange[0],o.roomrange[1])
   ;
   po.map((d,i,a)=>{
    if(i===a.length-1)return;
    let x=a[i+1]
    map=o.joinwalk(map,d[0],d[1],x[0],x[1],0,o.finerate,rand)
   })
   po.map(d=>map=mu.setpos(map,d[0],d[1], mu.symbol.event)) //symbol
   ;
   for(var i=0,r=0;i<rmax;i++){
    let rp=mu.getroompoint(map,rand,w*h);
    if(!rp){continue}
    let typemap=mu.getroominfo(rp[2])
    let cx=rp[0]+typemap.c[0],cy=rp[1]+typemap.c[1]
    let np=mu.getnearpoint(map,cx,cy,mu.symbol.road,3) //symbol
    if(!np){continue}
    let v=mu.vec(cx,cy,np[0],np[1])
    cx=rp[0]+typemap[v][2],cy=rp[1]+typemap[v][3]
    let info=mu.makeroom(rp[2],v)
    ,rm=info.map
    map=mu.mapjoin(map,rm,rp[0],rp[1])
    //seq change
    map=o.joinwalk(map,cx,cy,np[0],np[1],0,o.finerate,rand)    
    //
   }
   ;
   //issue fail door recovery
   mu.getsymbolary(map,mu.symbol.door).filter(d=>!mu.iswelldonedoor(map,d[0],d[1]))
    //.map(d=>{console.log(mu.clone(map),d);return d})
    .map(d=>{map=mu.setpos(map,d[0],d[1],mu.symbol.road)})
   //
   return o.finishwork(map)
  }
  ////////////////////////
  o=Object.assign(o,opts)
  return o;
 }
 root.laby=entry;
})(this);
