var mySong = document.getElementById("mySong");
var icon = document.getElementById("icon");

icon.onclick = function(){
    if(mySong.paused){
        mySong.onplay();
        icon.src = "media/pause.png";
    }else{
        mySong.onplay();
        icon.src = "media/play.png";
    }
}