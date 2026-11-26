// ======== EDIT HERE ========
var C={
  code:"0512",
  name:"Lishy",
  nick:"Lishyy",                         // name shown on lock page and "Happy Birthday To ___!"
  cake:"images/cake1.jpg",                               // optional: cake photo for the last page, e.g. "images/cake1.jpg"
  from:"",
  month:11, day:5, year:2026,          // month: 0=Jan ... 11=Dec (birthday 5 Dec)
  song:"",                               // e.g. "song.mp3" (upload it next to this page)
  photos:["images/photo1.jpg", "images/photo2.jpg", "images/photo3.jpg", "images/photo4.jpg"],                  // 4 photo URLs for letter, e.g. "p1.jpg"
  polaroid:"images/polaroid-teddy.jpg",                           // photo for "I Love You So Much"
  letter:["🎀💗 Happiest Birthday, my Lishyyyy! 🥹🎂💕", "My Prettiest Girl, May Your Day be as Beautiful and Special as You are! 🦋✨ May Allah Bless You with Endless Happiness, Success, good health, and everything your heart desires. 🤲🏻🌸", "I’m so lucky to have a bestie like you. Thank you for being my partner in craziness, my secret keeper, and my forever favourite headache! 😂💗", "Keep smiling, keep shining, and never let anyone steal your happiness. May our friendship stay forever and may we create millions of beautiful memories together! 🫂💞", "Love you soooo much, LISHYYYY! 😭🎀", "Stay blessed, stay happy, and never change! 🥳💝", "HAPPY BIRTHDAY ONCE AGAINNN! 🎂🎉💕"],
  compliments:["You’re my favourite person", "My partner in craziness", "My secret keeper", "Forever my bestie", "So lucky to have you", "Never change, Lishy!"]
};
// ===========================
var IMG={pair:"images/panda-couple.png",angry:"images/angry-cat.jpg",cat:"images/cat.jpg",b:["images/bouquet1.jpg", "images/bouquet2.jpg", "images/bouquet3.jpg", "images/bouquet4.jpg", "images/bouquet5.jpg", "images/bouquet6.jpg", "images/bouquet7.jpg", "images/bouquet8.jpg"]};
var $=function(i){return document.getElementById(i)},cur="lock",hist=[];
function go(id,noh){$("back").textContent=(id==="bqr")?"‹ Choose again":"‹ Back to gifts";
  if(!noh&&cur)hist.push(cur);
  document.querySelectorAll(".screen").forEach(function(s){s.classList.remove("on")});
  $(id).classList.add("on");cur=id;
  $("back").style.display=(["lock","count","bday","acc","sad","gifts"].indexOf(id)<0)?"block":"none";
}
$("back").onclick=function(){stopAudio();go(cur==="bqr"?"bqp":"gifts",1);hist=[]};

// panda
function panda(sad){
  return '<svg width="150" viewBox="0 0 150 170"><circle cx="38" cy="30" r="17" fill="#222"/><circle cx="112" cy="30" r="17" fill="#222"/><ellipse cx="75" cy="120" rx="42" ry="44" fill="#fff" stroke="#222" stroke-width="3"/><ellipse cx="42" cy="105" rx="16" ry="12" fill="#222"/><ellipse cx="108" cy="105" rx="16" ry="12" fill="#222"/><circle cx="75" cy="65" r="42" fill="#fff" stroke="#222" stroke-width="3"/><ellipse cx="55" cy="62" rx="12" ry="15" fill="#222" transform="rotate(20 55 62)"/><ellipse cx="95" cy="62" rx="12" ry="15" fill="#222" transform="rotate(-20 95 62)"/><circle cx="56" cy="62" r="5" fill="#fff"/><circle cx="94" cy="62" r="5" fill="#fff"/><ellipse cx="75" cy="78" rx="6" ry="4" fill="#222"/>'+
  (sad?'<path d="M64 92q11-9 22 0" fill="none" stroke="#222" stroke-width="3"/><path d="M52 76q-2 14 0 20" stroke="#6cf" stroke-width="3" fill="none"/>':'<path d="M65 86q10 9 20 0" fill="none" stroke="#222" stroke-width="3"/><circle cx="44" cy="80" r="6" fill="#ffb3c8"/><circle cx="106" cy="80" r="6" fill="#ffb3c8"/>')+
  (sad?'':'<path d="M75 150l-26-22a14 14 0 0 1 26-14 14 14 0 0 1 26 14z" fill="#8a0f3c"/>')+'</svg>';
}
$("gBq").src=IMG.b[0];$("lockimg").src=IMG.pair;$("cdpanda").src=IMG.pair;if(C.cake){var fi=$("finimg");fi.src=C.cake;fi.hidden=false;$("finicon").style.display="none"}$("pandaA").innerHTML='<img class="pairimg" alt="Two pandas with a bouquet" src="'+IMG.pair+'">';$("pandaS").innerHTML='<img class="pimg angry" alt="Angry cat" src="'+IMG.angry+'">';$("pandaB").innerHTML='<img class="pairimg" style="width:min(240px,60vw)" alt="Two pandas with a bouquet" src="'+IMG.pair+'">'+'<div style="font-family:Dancing Script,cursive;font-weight:700;margin-top:6px">Flowers for my<br>bestie!</div>';
document.querySelector("#lock .fr p").textContent="For "+C.nick+" 💗";
document.querySelector(".finh").innerHTML="Happy <em>Birthday</em> To "+C.nick+"!";

// keypad
var en="";
["1","2","3","4","5","6","7","8","9","*","0","#"].forEach(function(k){
  var b=document.createElement("button");b.textContent=k;
  b.onclick=function(){
    if(k==="*")en="";else if(k==="#")en=en.slice(0,-1);else if(en.length<4)en+=k;
    dr();if(en.length===4)setTimeout(chk,300)};
  $("pad").appendChild(b)});
function dr(){var d=$("dots").children;for(var i=0;i<4;i++)d[i].textContent=i<en.length?"♥":""}
function chk(){
  if(en.length<4)return;
  if(en===C.code){startCount()}
  else{var r=document.querySelector("#lock .r");r.classList.remove("shake");void r.offsetWidth;r.classList.add("shake");$("hint").textContent="That passcode is not right. Try again.";en="";dr()}
}
$("un").onclick=chk;

function startCount(){
  go("count",1);
  var cal=$("cal2"),mn=["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"][C.month];
  cal.innerHTML='<div class="rings"><i></i><i></i></div>';
  var gd=new Date(C.year,C.month,1),gn=new Date(C.year,C.month+1,0).getDate(),g="";["S","M","T","W","T","F","S"].forEach(function(x){g+="<b>"+x+"</b>"});for(var gi=0;gi<gd.getDay();gi++)g+="<span></span>";for(var gj=1;gj<=gn;gj++)g+='<span class="'+(gj===C.day?"hit":"")+'">'+gj+"</span>";
  [4,3,2,1].forEach(function(v,i){var p=document.createElement("div");p.className="pg";p.style.zIndex=10-i;p.innerHTML='<div class="band">'+mn+' '+C.year+'</div><div class="num">'+v+'</div><div class="mg">'+g+'</div>';cal.appendChild(p)});
  var pg=cal.querySelectorAll(".pg"),n=4;
  var t=setInterval(function(){n--;
    if(n<1){clearInterval(t);go("bday",1);resetCandles();return}
    pg[3-n].classList.add("flip")},1000);
}

// cake + calendar
function drawCandles(){
  var cs="";[0,1,2,3,4].forEach(function(i){var x=62+i*17;cs+='<rect x="'+x+'" y="40" width="9" height="32" fill="#ffb3d0" stroke="#8a0f3c" stroke-width="2"/><path class="flame" d="M'+(x+4.5)+' 22q-8 10 0 17q8-7 0-17z" fill="#ffc83d"/><path class="smoke" d="M'+(x+4.5)+' 30q-5-6 0-12q5-6 0-12"/>'});
  $("cs").innerHTML=cs;
}
drawCandles();

// ---- blow the candles (mic + fallback) ----
var blown=false,mStream=null,mCtx=null,mRaf=null,loud=0;
function stopMic(){
  if(mRaf)cancelAnimationFrame(mRaf);mRaf=null;
  if(mStream){mStream.getTracks().forEach(function(t){t.stop()});mStream=null}
  if(mCtx&&mCtx.close){try{mCtx.close()}catch(e){}}mCtx=null;
}
function allOut(){
  if(blown)return;blown=true;stopMic();
  $("blow").style.display="none";
  setTimeout(function(){$("nx1").style.display="inline-block";boom()},600);
}
function putOut(n){
  var left=Array.prototype.slice.call(document.querySelectorAll("#cs .flame:not(.off)")).slice(0,n);
  left.forEach(function(el,i){
    el.classList.add("off");
    setTimeout(function(){
      var s=el.nextElementSibling;if(s)s.classList.add("go");
      if(!document.querySelector("#cs .flame:not(.off)"))allOut();
    },i*130);
  });
}
function resetCandles(){
  stopMic();blown=false;loud=0;
  drawCandles();bindFlames();
  $("cake").classList.remove("out");
  $("blow").style.display="";$("blow").textContent="Blow the Candles ✨";
  $("nx1").style.display="none";
}
function bindFlames(){
  Array.prototype.forEach.call(document.querySelectorAll("#cs .flame"),function(el){
    el.style.cursor="pointer";
    el.onclick=function(){if(!blown)putOut(1)};
  });
}
function listenMic(){
  var AC=window.AudioContext||window.webkitAudioContext;
  mCtx=new AC();if(mCtx.resume)mCtx.resume();
  var src=mCtx.createMediaStreamSource(mStream),an=mCtx.createAnalyser();
  an.fftSize=512;src.connect(an);
  var buf=new Uint8Array(an.fftSize);
  $("blow").textContent="Blow into the mic 🌬️";
  (function tick(){
    an.getByteTimeDomainData(buf);
    var sum=0;for(var i=0;i<buf.length;i++){var v=(buf[i]-128)/128;sum+=v*v}
    var rms=Math.sqrt(sum/buf.length);
    if(rms>0.12)loud++;else loud=Math.max(0,loud-1);   // sensitivity: chhoti value = zyada sensitive
    if(loud>6){putOut(1);loud=0}
    if(!blown)mRaf=requestAnimationFrame(tick);
  })();
}
$("blow").onclick=function(){
  if(blown||mStream)return;
  if(!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)){putOut(5);return}   // mic na ho to seedha bujha do
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(s){mStream=s;listenMic()}).catch(function(){putOut(5)});
};
bindFlames();
$("nx1").onclick=function(){stopMic();go("acc",1)};
(function(){
  var d=new Date(C.year,C.month,1),M=["January","February","March","April","May","June","July","August","September","October","November","December"];
  $("cm").textContent=M[C.month];var h="";
  ["SUN","MON","TUE","WED","THU","FRI","SAT"].forEach(function(x){h+="<b>"+x+"</b>"});
  for(var i=0;i<d.getDay();i++)h+="<span></span>";
  var n=new Date(C.year,C.month+1,0).getDate();
  for(var j=1;j<=n;j++)h+='<span class="'+(j===C.day?"hit":"")+'">'+j+"</span>";
  $("cg").innerHTML=h})();

$("yes").onclick=function(){boom();go("gifts",1);hist=[]};
var nm=["Excuse me?! 😾 Wrong button. Try again.","Click NO one more time and Lishy gets zero cake. 🍰❌","My cat is judging you right now. 👀","Okay okay, I will stop. Please press YES. 🥺","This button is broken. It only accepts YES. 😤"],ni=0;
$("no").onclick=function(){$("funny").textContent=nm[ni++%nm.length];go("sad",1)};$("try").onclick=function(){go("acc",1)};

// gifts
var op={};function mark(k){op[k]=1;var n=Object.keys(op).length,m=$("lockmsg"),b=$("toEnd2");
if(n>=3){m.style.display="none";b.style.display="inline-block"}else{m.textContent="Open all 3 gifts to unlock the party 🔒 ("+n+"/3)"}}
$("gEnv").onclick=function(){mark("e");go("let")};
$("gBq").onclick=function(){mark("b");go("bqp")};
$("gBox").onclick=function(){mark("m");go("mus")};
function restart(){stopAudio();en="";dr();$("hint").textContent="Hint: your birthday, day then month";op={};$("lockmsg").style.display="";$("lockmsg").textContent="Open all 3 gifts to unlock the party 🔒 (0/3)";$("toEnd2").style.display="none";hist=[];go("lock",1)}
$("toStart2").onclick=restart;
$("toEnd2").onclick=function(){go("fin");boom()};
(function(){var cap={gEnv:"Read the letter",gBq:"Pick your flowers",gBox:"Play your song"};
Object.keys(cap).forEach(function(id){var e=$(id),w=document.createElement("div");w.className="gf";w.tabIndex=0;w.setAttribute("role","button");
e.parentNode.insertBefore(w,e);w.appendChild(e);var s=document.createElement("span");s.textContent=cap[id];w.appendChild(s);
w.onclick=e.onclick;e.onclick=null;w.onkeydown=function(ev){if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();w.click()}}});
var p=document.createElement("p");p.className="sub";p.textContent="Three gifts are waiting. Tap one to open it.";document.querySelector("#gifts h2").after(p)})();

// bouquets
var BQ=[["Red Roses","💐"],["Cream Bloom","💐"],["Spring Garden","💐"],["Tulip Basket","💐"],["Pink Tulips","💐"],["Baby’s Breath Tulips","💐"],["Peach Tulips","💐"],["Roses & Baby’s Breath","💐"]],sel=[];
BQ.forEach(function(b,i){var d=document.createElement("div");d.innerHTML='<img src="'+IMG.b[i]+'" alt="'+b[0]+'">'+b[0];d.tabIndex=0;d.setAttribute("role","button");d.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();d.click()}};
  d.onclick=function(){var k=sel.indexOf(i);if(k>=0)sel.splice(k,1);else{if(sel.length>=2)sel.shift();sel.push(i)}
    Array.prototype.forEach.call($("bql").children,function(e,j){e.classList.toggle("sel",sel.indexOf(j)>=0)});
    $("mk").style.display=sel.length?"inline-block":"none"};
  $("bql").appendChild(d)});
$("mk").onclick=function(){
  $("big").style.fontSize="16px";$("big").innerHTML='<div class="mix">'+sel.map(function(i){return'<img src="'+IMG.b[i]+'">'}).join("")+"</div>";
  $("bn").textContent=sel.map(function(i){return BQ[i][0]}).join(" - ");
  var p=$("pills");p.innerHTML="";
  C.compliments.forEach(function(t,i){var s=document.createElement("span");s.textContent="♥ "+t;s.style.animationDelay=(i*.5)+"s";p.appendChild(s)});
  go("bqr");boom()};

// music
var au=null,pl=false;
if(C.polaroid)$("polph").style.cssText="background-image:url("+C.polaroid+");font-size:0";
if(C.song)au=new Audio(C.song);
function stopAudio(){if(au){au.pause()}pl=false;$("pp").textContent="▶";$("vin").classList.remove("spin")}
$("pp").onclick=function(){
  if(pl){stopAudio();return}
  if(au)au.play().catch(function(){});
  pl=true;$("pp").textContent="❚❚";$("vin").classList.add("spin")};

// letter
$("paper").innerHTML="<h4>"+C.name+" 💗,</h4>"+C.letter.map(function(t){return"<p>"+t+"</p>"}).join("")+(C.from?'<p style="font-family:Dancing Script,cursive;font-size:20px;color:#8a0f3c">'+C.from+'</p>':'');
[0,1,2,3].forEach(function(i){
  var d=document.createElement("div");d.className="p4";
  d.innerHTML='<div class="ph" style="'+(C.photos[i]?"background-image:url("+C.photos[i]+");font-size:0":"")+'">📷</div>';
  $(i<2?"s2":"s1").appendChild(d)});

// confetti
var cv=$("cv"),cx=cv.getContext("2d"),P=[],run=false;
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener("resize",rs);
function boom(){
  var c=["#e0457f","#f48fb1","#ffd54a","#8a0f3c","#fff","#ffc0d8"];
  for(var i=0;i<130;i++)P.push({x:innerWidth/2,y:innerHeight/2,vx:(Math.random()-.5)*16,vy:Math.random()*-14-3,s:4+Math.random()*6,c:c[i%6],r:Math.random()*6,l:130+Math.random()*50});
  if(!run){run=true;lp()}}
function lp(){
  cx.clearRect(0,0,cv.width,cv.height);P=P.filter(function(p){return p.l>0});
  P.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.3;p.r+=.2;p.l--;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);cx.restore()});
  if(P.length)requestAnimationFrame(lp);else run=false}