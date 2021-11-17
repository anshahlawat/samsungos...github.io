var startVar = -1;
var start = document.querySelector(".start");
const swStart = () => {
    if(startVar==1){
        start.style.bottom = "-150vh";
    }
    else if(startVar==-1){
        start.style.bottom = "60px";
    }
    startVar*=-1;
}
