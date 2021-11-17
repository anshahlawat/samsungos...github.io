var cutoff=[0,5,15,17,18,20];
var sS=0,sE=0;
var title=null;
var lastSave="",bufferAction=null;
var names=[],namesElements=[];
var nms=localStorage.getItem("names");
if (nms!=null){names=nms.split(',');}
var wrap=false,bar=false,movable=false,clickedEdit=false;
var about="<span class='left'>@Samsung os <hr><br>Designed by The future web<br>by ANSH AHLAWAT - license approved<br><br>Official site - thefutureweb.renderforestsites.com </span>";
toggleBar();
if (localStorage.getItem("wrap")=="true"){toggleWrap();}
if (localStorage.getItem("bar")=="false"){toggleBar();}
var dX=0,dY=0,prevX=0,prevY=0;
var wait=0;

var fonts=["monospace","serif","sans-serif","fantasy","cursive"];
var fontIndexes=[0,4,0];

document.getElementById("actionbar").addEventListener("mousedown",function(event){movable=true; prevX=event.clientX; prevY=event.clientY;});
document.body.addEventListener("mousemove",function(event){movePrompt(event);});
document.getElementById("editarea").addEventListener("keydown",function(event){
  if (event.keyCode==9){
    var elem=document.getElementById("editarea");
    var str=elem.value,tmpStr="";
    var selStart=elem.selectionStart,selEnd=elem.selectionEnd;
    for (var i=0;i<str.length;i++){
      if (i==selStart||(i==0&&selStart==0&&selEnd==0)){tmpStr+="    ";}
      if (i<selStart||i>=selEnd){
        tmpStr+=str[i];
      }
    }
    if (selStart==selEnd&&selEnd==str.length){tmpStr+="    ";}
    elem.value=tmpStr;
    elem.selectionEnd=selStart+4;
    event.preventDefault();
  }
  wait=0;
  /*alert(document.getElementById("editarea").selectionStart);
  alert(document.getElementById("editarea").selectionEnd);*/
  /*var el=document.getElementById("editinner");
  el.innerHTML=el.innerHTML.replace(/ /g,"lol")*/
});

document.getElementById("editarea").addEventListener("mousedown",function(){
  clickedEdit=true;
});

document.body.addEventListener("mouseup",function(event){
  movable=false;
  setTimeout(function(){
    var elem=document.getElementById("editarea");
    if (clickedEdit){
      sS=elem.selectionStart;
      sE=elem.selectionEnd;
    }else{
      elem.selectionStart=sS;
      elem.selectionEnd=sE;
    }
    clickedEdit=false;
  },20);
});

document.body.addEventListener("keydown",function(event){
  if (event.ctrlKey){
    var kc=event.keyCode;
    //Ctrl-A
    if (kc==65){
      selectAll();
      event.preventDefault();
    }else if (kc==79){    //CTRL-O
      D();
      event.preventDefault();
    }else if (kc==83){    //CTRL-S
      save();
      event.preventDefault();
    }else if (kc==72){    //CTRL-H
      openPrompt("replace",null,"Replace")
      event.preventDefault();
    }
  }
});

function movePrompt(evt){
  if (movable){
    dX+=(evt.clientX-prevX);
    dY+=(evt.clientY-prevY);
    var prompt=document.getElementById("prompt");
    prompt.style.marginLeft=(dX/window.innerWidth*100)+"vw";
    prompt.style.marginTop=(dY/window.innerHeight*100)+"vh";
    prevX=evt.clientX;
    prevY=evt.clientY;
  }
}

function sortNames(){
  for (var i=0;i<names.length;i++){
    for (var n=i+1;n<names.length;n++){
      if (names[i].localeCompare(names[n])>0){
        var tmpName=names[i];
        names[i]=names[n];
        names[n]=tmpName;
      }
    }
  }
  namesElements=[];
  for (var i=0;i<names.length;i++){
    //just assume a UTF-8 character is stored in 1.5 bytes...
    var ls=localStorage.getItem(names[i]);
    var bytes=ls!=null?Math.floor(ls.length*1.5):0;
    var suffix="B";
    if (bytes>1000){
      bytes/=1000;
      suffix="KB";
    }else if (bytes>1000000){
      bytes/=1000000;
      suffix="MB";
    }
    namesElements.push("<div class='nameitem' onclick=select(\""+names[i]+"\")>"+names[i]+"<span class='nameinfo'>"+bytes+" "+suffix+"</span></div>");
  }
  console.log(names);
}
sortNames();

function select(val){
  document.getElementById('nameinput').value=val;
  document.getElementById("savebtn").setAttribute("active",true);
  document.getElementById("prompttext").innerHTML="Warning: Name already in use.";
}

function showDropdown(elem,evt){
  var dd=document.getElementById("dropdown").style;
  var items=document.getElementsByClassName("headeritem");
  var selected=0;
  for (var i=0;i<items.length;i++){
    if (items[i]==elem){selected=i; break;}
  }
  items=document.getElementsByClassName("dropdownitem");
  for (var i=0;i<items.length;i++){
    items[i].style.display=(i>=cutoff[selected]&&i<cutoff[selected+1])?"block":"none";
  }
  dd.display="block";
  dd.left=elem.offsetLeft+"px";
  getSelect();
  evt.stopPropagation();
}

function newDoc(){
  if (document.title.startsWith('*')||!title){
    openPrompt("save");
    bufferAction="new";
    return;
  }
  clearDoc();
}

function clearDoc(){
  document.getElementById("editarea").value="";
  title=null;
  document.title="untitled";
  lastSave="";
  setDatabar();
}

function openD(){
  if ((document.title.startsWith('*')||!title)&&document.getElementById("editarea").value!=""){
    openPrompt("save");
    bufferAction="open";
    return;
  }
  openPrompt("open");
}

function openDoc(){
  closePrompt();
  var name=document.getElementById("nameinput").value;
  document.getElementById("editarea").value=localStorage.getItem(name);
  title=name;
  document.title=title;
  setDatabar();
}

function relaySave(){
  title=document.getElementById("nameinput").value;
  if (document.getElementById("prompttext").innerHTML!="Warning: Name already in use."){
    names.push(title);
    localStorage.setItem("names",names);
  }
  save();
  execBuffer();
}

function save(){
  closePrompt();
  if (!title){
    setTimeout(function(){openPrompt("saveas");},200);
    return;
  }
  document.title=title;
  localStorage.setItem(title,document.getElementById("editarea").value);
  lastSave=document.getElementById("editarea").value;
  sortNames();
}

function cutText(){
  getSelect();
  var succ=document.execCommand("cut");
  succ?null:openPrompt("custom","Cut failed.","Error");
  sS=0;
  sE=0;
  setDatabar();
}

function copyText(){
  getSelect();
  var succ=document.execCommand("copy");
  succ?null:openPrompt("custom","Copy failed.","Error");
}

function deleteText(){
  //Could've used execCommand here too, but for compatibility reasons, it's better to just do it via vanilla JS.
  var elem=document.getElementById("editarea");
  var str=elem.value,tmpStr="";
  for (var i=0;i<str.length;i++){
    if (i<sS||i>=sE){tmpStr+=str[i];}
  }
  elem.value=tmpStr;
  elem.select();
  elem.selectionStart=sS;
  elem.selectionEnd=sS;
  setDatabar();
}

function selectAll(){
  var elem=document.getElementById("editarea");
  elem.select();
  sS=elem.selectionStart;
  sE=elem.selectionEnd;
}

function getSelect(){
  var elem=document.getElementById("editarea");
  elem.focus();
  elem.selectionStart=sS;
  elem.selectionEnd=sE;
}

function openPrompt(id,content,tit){
  var prompt=document.getElementById("prompt");
  document.getElementById("promptcontent").innerHTML=document.getElementById(id).outerHTML;
  var tit2=document.getElementById("prompttitle");
  prompt.style.display="block";
  prompt.style.left=(50+prompt.offsetWidth/window.innerWidth*-50)+"vw";
  document.getElementById("shade").style.display="block";
  
  if (id=="save"){
    document.getElementById("prompttext").innerHTML="Save '"+(title || "untitled")+"'?";
    tit2.innerHTML="Save";
  }else if (id=="open"){
    createSelection();
    tit2.innerHTML="Open"
  }else if (id=="saveas"){
    document.getElementById("prompttext").innerHTML="Name cannot be blank.";
    createSelection();
    tit2.innerHTML="Save As"
  }else if (id=="font"){
    var selects=document.getElementById("font").getElementsByTagName("select");
    for (var i=0;i<3;i++){
      selects[i].selectedIndex=fontIndexes[i];
    }
    tit2.innerHTML=tit;
  }else if (id=="custom"){
    document.getElementById("prompttext").innerHTML=content;
    tit2.innerHTML=tit;
  }else{
    tit2.innerHTML=tit;
  }
  
  prompt.style.top=(50+prompt.offsetHeight/window.innerHeight*-50)+"vh";
  prompt.style.marginLeft=0;
  prompt.style.marginTop=0;
}

function relayClose(){
  bufferAction=null;
  closePrompt();
}

function closePrompt(){
  var prompt=document.getElementById("prompt");
  prompt.style.animation="close 100ms forwards 1";
  setTimeout(function(){
    prompt.style.display="none";
    prompt.style.animation="";
    document.getElementById("promptcontent").innerHTML="";
  },100);
  document.getElementById("shade").style.display="none";
  dX=0;
  dY=0;
}

function execBuffer(){
  //alert(bufferAction);
  if (bufferAction=="new"){
    clearDoc();
  }else if (bufferAction=="open"){
    relayClose();
    setTimeout(function(){openPrompt("open")},200);
    return;
  }
  relayClose();
}

function checkName(){
  var inp=document.getElementById("nameinput").value;
  var elem=document.getElementById("prompttext");
  var btn=document.getElementById("savebtn");
  btn.setAttribute("active",true);
  elem.innerHTML="";
  if (inp.replace(/ /g,"")==""){
    elem.innerHTML="Name cannot be blank.";
    btn.setAttribute("active",false);
  }
  for (var i=0;i<names.length;i++){
    if (inp==names[i]&&inp!=title){
      elem.innerHTML="Warning: Name already in use.";
    }
  }
  createSelection();
}

function checkName2(){
  var btn=document.getElementById("savebtn");
  var val=document.getElementById("nameinput").value;
  btn.setAttribute("active",false);
  for (var i=0;i<names.length;i++){
    if (val==names[i]){
      btn.setAttribute("active",true);
      break;
    }
  }
  createSelection();
}

function createSelection(){
  var val=document.getElementById("nameinput").value;
  var inner="";
  for (var i=0;i<names.length;i++){
    if (names[i].startsWith(val)){
      inner+=namesElements[i];
    }
  }
  var btn=document.getElementById("namebox").innerHTML=inner;
}

function toggleWrap(){
  wrap=!wrap;
  var icon=document.getElementsByClassName("checkmark")[0];
  icon.setAttribute("checked",wrap);
  var area=document.getElementById("editarea");
  area.setAttribute("wrap",(wrap?"hard":"soft"));
  localStorage.setItem("wrap",wrap);
}

function toggleBar(){
  bar=!bar;
  var icon=document.getElementsByClassName("checkmark")[1];
  icon.setAttribute("checked",bar);
  document.getElementById("footer").style.display=bar?"block":"none";
  localStorage.setItem("bar",bar);
}

function replace(){
  var elem=document.getElementById("editarea");
  var inps=document.getElementById("prompt").getElementsByTagName("input");
  var regex=new RegExp(inps[0].value,"g");
  var matches=(elem.value.match(regex) || 0).length;
  elem.value=elem.value.replace(regex,inps[1].value);
  relayClose();
  setTimeout(function(){openPrompt("custom",matches>0?("Replaced "+matches+" match"+(matches==1?"":"es")+"."):"Found no matches to replace.","Replace");},100);
  setDatabar();
}

function initAdd(){
  var inner="0123456789";
  document.getElementById("editarea").value=inner;
}

function addFile(url){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var edit=document.getElementById("editarea");
      edit.value=this.responseText;
      edit.selectionStart=0;
      edit.selectionEnd=0;
      var fileArr=url.split("/");
      title=fileArr[fileArr.length-1];
      if (!names.hasElem(title)){
        names.push(title);
        localStorage.setItem("names",names);
      }
      save();
      setDatabar();
    }
  };
  xhttp.open("GET",url,true);
  xhttp.send();
}

function init(){
  var url=window.location.href.split("url=");
  if (url.length==2){
    addFile(url[1]);
  }
}

init();
setInterval(count,20);

function count(){
  wait++;
  if (wait==10&&title){
    //This is a pretty expensive operation, so it's best left for when the user isn't typing constantly. 
    getPos();
    var val=document.getElementById("editarea").value;
    if (lastSave.length!=val.length||lastSave!=val){
      document.title="*"+title;
    }else{
      document.title=title;
    }
  }
  
  if (wait==10){
    setDatabar();
  }
}

function getPos(){
  var elem=document.getElementById("editarea");
  //alert(elem.selectionStart);
  //alert(elem.innerHTML.substring(0,elem.selectionStart));
}

document.title="untitled";

function createFontSelection(){
  var sel=document.getElementById("font_select");
  var fontList=genFontList();
  for (var i=0;i<fontList.length;i++){
    if (fontList[i]=="Consolas"){
      fontIndexes[0]=i;
    }
    var option=document.createElement("option");
    option.innerHTML=fontList[i];
    option.style.fontFamily=fontList[i];
    sel.appendChild(option);
  }
  
  sel=document.getElementById("size_select");
  var sizes=[6,7,8,9,10,11,12,13,14,15,16,18,20,22,24,26,28,32,36,40,44,48,54,60,66,72,80,88,96];
  for (var i=0;i<sizes.length;i++){
    var option=document.createElement("option");
    option.innerHTML=sizes[i]+" pt";
    option.setAttribute("data-css","font-size: "+sizes[i]+"pt");
    sel.appendChild(option);
  }
}
createFontSelection();

function setFont(){
  var style="";
  var selects=document.getElementById("font").getElementsByTagName("select");
  for (var i=0;i<3;i++){
    var option=selects[i].children[selects[i].selectedIndex];
    style+=(option.getAttribute("style") || option.getAttribute("data-css"))+"; ";
    fontIndexes[i]=selects[i].selectedIndex;
  }
  document.getElementById("editarea").style=style;
  closePrompt();
}

function setDatabar(){
  var text=document.getElementById("editarea").value;
  var charCount=text.length;
  text = text.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n");
  var wordCount=text!=""?text.split(" ").length:0;
  document.getElementById("databar").innerHTML=wordCount+" word"+(wordCount==1?"":"s")+", "+charCount+" character"+(charCount==1?"":"s")+"";
}

Array.prototype.hasElem=function(elem){
  for (var i in this){
    if (this[i]==elem)return true;
  }
  return false;
};

//localStorage.clear();

//alert(genFontList().length);