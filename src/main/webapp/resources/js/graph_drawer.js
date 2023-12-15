let svgX, svgY;
const svgNamespace = "http://www.w3.org/2000/svg";

document.addEventListener("DOMContentLoaded", function () {
    const svg = document.querySelector('svg');
    const error = document.getElementById("errorPoints");

    svg.addEventListener('click', handleSvgClick);

    const rRadio = document.getElementById("form-with-validation:r");
    if (rRadio) {
        rRadio.addEventListener("change", handleRChange);
        updateSvgDisplay();
    } else {
        console.error("Element with ID 'form-with-validation:r' not found.");
    }
});

function handleSvgClick(e) {
    e.preventDefault();

    let rValue = document.querySelector('input[name="form-with-validation:r"]:checked');
    if (!rValue) {
        console.error("R value is not selected");
        return;
    }
    rValue = parseFloat(rValue.value);

    const svgPoint = getSvgPoint(e, rValue);
    drawPoint(svgPoint.x, svgPoint.y, rValue);
    sendSVG(svgPoint.x, svgPoint.y, rValue);
    savePointsToLocalStorage();
}

function getSvgPoint(event, rValue) {
    const svg = document.querySelector('svg');
    let pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function drawPoint(x, y, r) {
    const circle = document.createElementNS(svgNamespace, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "3");
    circle.setAttribute("fill", checkArea(x, y, r));

    const svg = document.querySelector('svg');
    svg.appendChild(circle);
}

function sendSVG(x, y, r) {
    if (isNaN(r) || r < 1 || r > 3) {
        console.error("Invalid R value:", r);
        return;
    }

    svgX = ((x - 200) / 50).toFixed(2);
    svgY = ((200 - y) / 50).toFixed(2);

    try {
        clickSender([{name: 'x', value: svgX}, {name: 'y', value: svgY}, {name: 'r', value: r}]);
    } catch (error) {
        console.error("Error with clickSender:", error);
    }
}

function handleRChange() {
    clearPoints();
    updateSvgDisplay();
}

function updateSvgDisplay() {
    let rValue = document.querySelector('input[name="form-with-validation:r"]:checked');
    if (rValue != null) {
        rValue = parseFloat(rValue.value);
    } else {
        console.log("R value is null");
        return;
    }

    ['1', '1.5', '2', '2.5', '3'].forEach(value => {
        const displayValue = rValue === parseFloat(value) ? "block" : "none";
        document.getElementById(`quarter-circle_${value}`).style.display = displayValue;
        document.getElementById(`triangle_${value}`).style.display = displayValue;
        document.getElementById(`rectangle_${value}`).style.display = displayValue;
    });

    console.log("R value:", rValue);
}

function checkArea(x, y, r) {
    x = ((x - 200) / 50).toFixed(5);
    y = ((200 - y) / 50).toFixed(5);

    if ((x >= 0 && y >= 0 && x <= r && y <= r/2) ||
        (x <= 0 && y <= 0 && ((-1 * x) + (-1 * y)) <= r) ||
        (x <= 0 && y >= 0 && ((x * x + y * y) <= r * r))) {
        return "green";
    }
    return "red";
}

function clearPoints() {
    localStorage.setItem('points', JSON.stringify([]));

    const svg = document.querySelector('svg');
    const circles = svg.querySelectorAll('circle');
    circles.forEach(circle => svg.removeChild(circle));
}

function savePointsToLocalStorage() {
    const svg = document.querySelector('svg');
    const circles = svg.querySelectorAll('circle');
    const points = Array.from(circles).map(circle => ({
        x: circle.getAttribute("cx"),
        y: circle.getAttribute("cy"),
        r: circle.getAttribute("r")
    }));

    localStorage.setItem('points', JSON.stringify(points));
}
