const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

// Util functions
function mapNumber(value, x1, y1, x2, y2) {
    return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min); 
}

const noiseMax = 5;
let noiseOffset = 0;
let lastTick = performance.now();

// Main code
function main(timestamp) {
    const delta = timestamp - lastTick;
    lastTick = timestamp;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.setTransform(1, 0, 0, 1, canvas.clientWidth/2, canvas.clientHeight/2);

    let t = 0;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.beginPath();
    for (let a = 0; a < Math.PI*2; a+= Math.PI*2/100) {
        let xoff = mapNumber(Math.cos(a + noiseOffset), -1, 1, 0, noiseMax);
        let yoff = mapNumber(Math.sin(a - noiseOffset/2), -1, 1, 0, noiseMax);
        let r = mapNumber(PerlinNoise.noise(xoff, yoff, 0.8), 0, 1, 100, 200);
        let x = r * Math.cos(a);
        let y = r * Math.sin(a);
        ctx.lineTo(x, y);
        t += 0.1;
    }
    noiseOffset += 0.001 * delta;
    ctx.fill();
    ctx.stroke();
    window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main);