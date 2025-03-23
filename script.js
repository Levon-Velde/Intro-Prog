setInterval(mijnTijd, 1000);
function mijnTijd() {
    const time = new Date();
    const months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "July", "Augustus", "September", "October", "November", "December"];
    let formattedHour = String(time.getHours()).padStart(2, "0");
    let formattedMin = String(time.getMinutes()).padStart(2, "0");
    let formattedSec = String(time.getSeconds()).padStart(2, "0");
    document.getElementById("Tijd").innerHTML = formattedHour + " : " + formattedMin + " : " + formattedSec + " ";
    let formattedDay = String(time.getDate()).padStart(2, "0");
    document.getElementById("Datum").innerHTML = formattedDay + " " + months[time.getMonth()] + " " + time.getFullYear();
}

let AnalogeButtonKlik = document.querySelector("div:nth-child(2) button:first-of-type");
let DigitaleButtonKlik = document.querySelector("div:nth-child(2) button:last-of-type");

AnalogeButtonKlik.onclick = AnalogeModus;
DigitaleButtonKlik.onclick = DigitaleModus;

function AnalogeModus() {
  AnalogeTijd = document.querySelector("div:nth-child(2) canvas");
  DigitaleTijd = document.querySelector("div:nth-child(2) p");
  AnalogeTijd.classList.add("tonen");
  DigitaleTijd.classList.add("verbergen");
  AnalogeTijd.classList.remove("verbergen");
  DigitaleTijd.classList.remove("tonen");
};

function DigitaleModus() {
  AnalogeTijd = document.querySelector("div:nth-child(2) canvas");
  DigitaleTijd = document.querySelector("div:nth-child(2) p");
  AnalogeTijd.classList.add("verbergen");
  DigitaleTijd.classList.add("tonen");
  AnalogeTijd.classList.remove("tonen");
  DigitaleTijd.classList.remove("verbergen");
}

const hamburgermenuKnop = document.querySelector("body > div:first-of-type button");
const sluitKnop = document.getElementById("sluit");

hamburgermenuKnop.onclick = menuOpenen;
sluitKnop.onclick = menuSluiten;

function menuOpenen() {
    themaMenu = document.querySelector("body > div:last-of-type");
    themaMenu.classList.add("menuTonen");
}

function menuSluiten() {
    themaMenu = document.querySelector("body > div:last-of-type");
    themaMenu.classList.remove("menuTonen");
}

//code voor analoge klok. bron: https://www.w3schools.com/graphics/canvas_clock_start.asp
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  const grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(let num = 1; num < 13; num++){
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

//Code voor Stopwatch

let startKnop = document.getElementById('start');
let stopKnop = document.getElementById('stop');

let uren = 0o0;
let minuten = 0o0;
let secondes = 0o0;
let milliSec = 0o0;

startKnop.addEventListener('click', function () {
    timer = true;
    stopWatch();
});

stopKnop.addEventListener('click', function () {
    timer = false;
});

function stopWatch() {
    if (timer) {
        milliSec++;

        if (milliSec == 100) {
            secondes++;
            milliSec = 0;
        }

        if (secondes == 60) {
            minuten++;
            secondes = 0;
        }

        if (minuten == 60) {
            uren++;
            minuten = 0;
            secondes = 0;
        }

        let hrString = uren;
        let minString = minuten;
        let secString = secondes;
        let countString = milliSec;

        if (uren < 10) {
            hrString = "0" + hrString;
        }

        if (minuten < 10) {
            minString = "0" + minString;
        }

        if (secondes < 10) {
            secString = "0" + secString;
        }

        if (milliSec < 10) {
            countString = "0" + countString;
        }

        document.getElementById("stopwatch").innerHTML = hrString + " : " + minString + " : " + secString + " : " + countString;
        setTimeout(stopWatch, 10);
    }
}