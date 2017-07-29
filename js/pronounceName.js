$(document).ready(function() {
    var obj = document.createElement("audio");
    obj.src="docs/name.mp3";
    obj.autoPlay=false;
    obj.preLoad=true;       
    $(".playSound").click(function() {
        obj.play();
    });

});