window.onload = function () {
    function getTime() {
        let now = new Date();
        let clock = document.getElementById("clock");
        clock.innerHTML = now.toLocaleTimeString();
    }

    getTime();
    window.setInterval(function () {
        getTime();
    }, 11000);
};
