window.onload = function(){
    function getTime(){
        var now = new Date();
        var clock = document.getElementById("clock");
        clock.innerHTML = now.toLocaleTimeString();
    }
    getTime();
    window.setInterval(function(){
        getTime();
    },11000);
};
