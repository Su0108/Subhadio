// StampBook UI effects: ripple, 3D tilt, staggered entrance
(function(){
  var RIP='.btn,.iconbtn,.chip,.navbtn,.fab,.menurow,.sheet-opt,.listitem';
  var TILT='.card,.stat,.listitem';
  document.addEventListener('pointerdown',function(e){
    var el=e.target.closest&&e.target.closest(RIP); if(!el) return;
    var r=el.getBoundingClientRect(),s=Math.max(r.width,r.height)*2;
    var d=document.createElement('span'); d.className='fx-ripple';
    d.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';
    if(getComputedStyle(el).position==='static') el.style.position='relative';
    el.style.overflow='hidden'; el.appendChild(d); setTimeout(function(){d.remove()},650);
  });
  document.addEventListener('pointermove',function(e){
    if(e.pointerType!=='mouse') return;
    var el=e.target.closest&&e.target.closest(TILT); if(!el) return;
    var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    el.style.transform='perspective(800px) rotateX('+(-y*7)+'deg) rotateY('+(x*9)+'deg) translateZ(6px)';
  });
  document.addEventListener('pointerout',function(e){
    var el=e.target.closest&&e.target.closest(TILT); if(el) el.style.transform='';
  });
  var seen=new WeakSet();
  new MutationObserver(function(ms){
    ms.forEach(function(m){
      m.addedNodes.forEach(function(n){
        if(n.nodeType!==1||seen.has(n)) return;
        if(n.matches&&n.matches('.card,.listitem,.stat,.menurow')){
          seen.add(n); n.style.setProperty('--i',Math.min([].indexOf.call(n.parentNode.children,n),10)); n.classList.add('fx-in');
        }
      });
    });
  }).observe(document.body,{childList:true,subtree:true});
})();
