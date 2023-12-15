let svgX;
let svgY;
let error;


document.addEventListener("DOMContentLoaded", function () {

    var svg = document.querySelector('svg');
    var outOfSpace = true;
    error = document.getElementById("errorPoints");

    // loadPointsFromLocalStorage();

    svg.addEventListener('click', function (e) {
        e.preventDefault();
        var rValue = document.querySelector('input[name="form-with-validation:r"]:checked');

        if (rValue != null) {
            rValue = parseFloat(rValue.value);
            let pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            let svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
            svgX = ((svgP.x - 200) / 50).toFixed(5);
            svgY = ((200 - svgP.y) / 50).toFixed(5);

            drawPoint(svgP.x, svgP.y, rValue);
            sendSVG(svgP.x, svgP.y, rValue);

            try {
                console.log("X: " + svgX + ", y: " + svgY + ", r: " + rValue);
                clickSender([
                    {name: 'x', value: svgX},
                    {name: 'y', value: svgY},
                    {name: 'r', value: rValue}
                ]);

                console.log("после clicksender")
            } catch (e) {
                console.log("error with clicksender: " + e);
            }
            drawPoint(svgP.x, svgP.y, rValue);
            savePointsToLocalStorage();

        }
        // else clearPoints();
    });
    // Функция загрузки точек из localStorage
    function loadPointsFromLocalStorage() {
        var storedPoints = localStorage.getItem('points');
        if (storedPoints) {
            var parsedPoints = JSON.parse(storedPoints);
            parsedPoints.forEach(function (point) {
                drawPoint(point.x, point.y, point.r);
            });
        }
    }
    // Функция сохранения точек в localStorage
    function savePointsToLocalStorage() {
        var circles = svg.querySelectorAll('circle');
        var points = [];

        circles.forEach(function (circle) {
            var point = {
                x: circle.getAttribute("cx"),
                y: circle.getAttribute("cy"),
                r: circle.getAttribute("r")
            };
            points.push(point);
        });

        localStorage.setItem('points', JSON.stringify(points));
    }


    function drawPoint(x, y, r) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "3");
        circle.setAttribute("fill", checkArea(x, y, r));
        console.log(checkArea(x, y, r));
        svg.appendChild(circle);
    }

    function sendSVG(x, y, r) {
        if (isNaN(r) || r < 1 || r > 3) {
            outOfSpace = true;
            document.getElementById("error-r").textContent = "Неверное значение R";
            return;
        }

        svgX = ((x - 200) / 50).toFixed(2);
        svgY = ((200 - y) / 50).toFixed(2);
        console.log("x: " + svgX + ", y: " + svgY);
        try {
            clickSender([{name: 'x', value: svgX}, {name: 'y', value: svgY}, {name: 'r', value: r.value}]);
            console.log("после clicksender")
        } catch (e) {
            console.log("error with clicksender: "+ e);
        }



        outOfSpace = false;


    }
    // Обработчик изменения значения r
    var rRadio = document.getElementById("form-with-validation:r");
    if (rRadio) {
        rRadio.addEventListener("change", function () {
            clearPoints();
            updateSvg();
        });

        updateSvg();
    } else {
        console.error("Элемент с идентификатором 'form-with-validation:r' не найден.");
    }
});

function updateSvg() {
    var rValue = document.querySelector('input[name="form-with-validation:r"]:checked');
    if (rValue != null){
        rValue = parseFloat(rValue.value);
    }
    else console.log("r is null")

    var quarterCircle1 = document.getElementById("quarter-circle_1");
    var quarterCircle1_5 = document.getElementById("quarter-circle_1.5");
    var quarterCircle2 = document.getElementById("quarter-circle_2");
    var quarterCircle2_5 = document.getElementById("quarter-circle_2.5");
    var quarterCircle3 = document.getElementById("quarter-circle_3");

    var triangle1 = document.getElementById("triangle_1");
    var triangle1_5 = document.getElementById("triangle_1.5");
    var triangle2 = document.getElementById("triangle_2");
    var triangle2_5 = document.getElementById("triangle_2.5");
    var triangle3 = document.getElementById("triangle_3");

    var rect1 = document.getElementById("rectangle_1");
    var rect1_5 = document.getElementById("rectangle_1.5");
    var rect2 = document.getElementById("rectangle_2");
    var rect2_5 = document.getElementById("rectangle_2.5");
    var rect3 = document.getElementById("rectangle_3");


    quarterCircle1.style.display = rValue === 1 ? "block" : "none";
    triangle1.style.display = rValue === 1 ? "block" : "none";
    rect1.style.display = rValue === 1 ? "block" : "none";

    quarterCircle1_5.style.display = rValue === 1.5 ? "block" : "none";
    triangle1_5.style.display = rValue === 1.5 ? "block" : "none";
    rect1_5.style.display = rValue === 1.5 ? "block" : "none";

    quarterCircle2.style.display = rValue === 2 ? "block" : "none";
    triangle2.style.display = rValue === 2 ? "block" : "none";
    rect2.style.display = rValue === 2 ? "block" : "none";

    quarterCircle2_5.style.display = rValue === 2.5 ? "block" : "none";
    triangle2_5.style.display = rValue === 2.5 ? "block" : "none";
    rect2_5.style.display = rValue === 2.5 ? "block" : "none";

    quarterCircle3.style.display = rValue === 3 ? "block" : "none";
    triangle3.style.display = rValue === 3 ? "block" : "none";
    rect3.style.display = rValue === 3 ? "block" : "none";

    console.log("rValue:", rValue);


}
function checkArea(x, y, r) {
    x = ((x - 200) / 50).toFixed(5);
    y = ((200 - y) / 50).toFixed(5);
    //квадрат
    if (x >= 0 && y >= 0 && x <= r && y <= r/2) return "green";
    //треугольник
    if (x <= 0 && y <= 0 && ((-1*x) + (-1*y)) <= r) return "green";
    //четверть круга
    if (x <= 0 && y >= 0 && ((x*x + y*y) <= r*r)) return "green";
    else return "red";
}

function clearPoints() {
    // Очищаем массив точек в localStorage
    localStorage.setItem('points', JSON.stringify([]));
    // Очищаем все точки на графике
    var svg = document.querySelector('svg');
    var circles = svg.querySelectorAll('circle');
    circles.forEach(function (circle) {
        svg.removeChild(circle);
    });
}