const canvas = document.getElementById("play-area");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 440;
let activeKey = 0;
let points = 0;
start = true;
changePos = false;

function pointCalculator() {
    document.getElementById("score").innerHTML = "Score: " + points;
};
function resetPage() {
    location.reload();
};

const coin = {                                                  //object for the rendered rectangle
    width: 25,
    height: 25,
    posX: 200,
    posY: 200,
    color: "gold"
}
const box = {                                                   //object for the rendered box
    width: 150,
    height: 150,
    x: 580,
    y: 200,
    color: "brown"
}
let dx = 0, dy = 0;
let speed = 100;

document.addEventListener('keydown', function (event) {       //keydown event listener for movement
    if (activeKey == event.keyCode) return;
    activeKey = event.keyCode;
    if (event.keyCode == 37) {
        dx -= 1
    }
    else if (event.keyCode == 38) {
        dy -= 1
    }
    else if (event.keyCode == 39) {
        dx += 1
    }
    else if (event.keyCode == 40) {
        dy += 1
    }
});

document.addEventListener('keyup', function (event) {         //keyup event listener for movement
    if (event.keyCode == 37 || event.keyCode == 39) {
        dx = 0
    }
    else if (event.keyCode == 40 || event.keyCode == 38) {
        dy = 0
    }
    activeKey = 0
});


function renderCanvas() {                                       //to render the background canvas
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

function renderBox() {                                       //to render the rectangle
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            ctx.fillStyle = `rgb(
          ${Math.floor(255 - 55 * i)}
          ${Math.floor(255 - 55 * j)}
          0)`;
            ctx.fillRect(j * 25 + box.x, i * 25 + box.y, 25, 25);
        }
    }
    // ctx.fillStyle = "brown";
    // ctx.fillRect(box.x, box.y, box.height, box.width);
};

function renderCoins() {                                        //to render coin on canvas
    ctx.fillStyle = "gold";
    ctx.fillRect(coin.posX, coin.posY, coin.height, coin.width);
}

function gameMechanics() {                                      //to do the rendering process
    renderCanvas();
    box.x += dx / 60 * speed;                                   //move x pixels per frame(dx/60)
    box.y += dy / 60 * speed;
    if (box.x <= 0) {
        box.x = canvas.width;
    }
    else if (box.y <= 0) {
        box.y = canvas.height;
    }
    else if (box.x >= canvas.width) {
        box.x = 0
    }
    else if (box.y >= canvas.height) {
        box.y = 0
    }
    renderBox();
    if ((coin.posX >= box.x && coin.posX <= box.x + box.width) && (coin.posY >= box.y && coin.posY <= box.x + box.height)) {
        coin.posX = Math.random() * canvas.width
        coin.posY = Math.random() * canvas.height
        points += 1
        pointCalculator()
    }
    renderCoins();
    requestAnimationFrame(gameMechanics);                       //requestanimation only runs once so we are recursively calling it
}

pointCalculator();
// setInterval(gameMechanics, 10);                               //render with the changes for set interval time 
requestAnimationFrame(gameMechanics)                             //request animation call(renders frame on the window)
