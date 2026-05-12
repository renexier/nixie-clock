function updateClock(){

    const now =
    new Date();

    let hours =
    now.getHours();

    hours =
    hours % 12 || 12;

    const h =
    String(hours)
    .padStart(2,"0");

    const m =
    String(now.getMinutes())
    .padStart(2,"0");

    const s =
    String(now.getSeconds())
    .padStart(2,"0");

    setDigit("h1",h[0]);
    setDigit("h2",h[1]);

    setDigit("m1",m[0]);
    setDigit("m2",m[1]);

    setDigit("s1",s[0]);
    setDigit("s2",s[1]);
}

function setDigit(id,value){

    const el =
    document.getElementById(id);

    if(el.innerText !== value){

        el.animate([

            {
                opacity:0.2,
                transform:"scale(1.08)"
            },

            {
                opacity:1,
                transform:"scale(1)"
            }

        ],
        {
            duration:180,
            easing:"ease-out"
        });

        el.innerText = value;
    }
}

updateClock();

setInterval(updateClock,1000);

const timezoneElement =
document.getElementById("timezone");

const zone =
Intl.DateTimeFormat()
.resolvedOptions()
.timeZone;

timezoneElement.innerText =
zone
.replace("_"," ")
.replace("/"," • ");

document.addEventListener(
"mousemove",
e=>{

    const x =
    (e.clientX/window.innerWidth)*100;

    const y =
    (e.clientY/window.innerHeight)*100;

    document.body.style.setProperty(
    "--x",
    x+"%"
    );

    document.body.style.setProperty(
    "--y",
    y+"%"
    );

    const clock =
    document.getElementById("clock");

    const rotateX =
    (e.clientY/window.innerHeight - 0.5) * -8;

    const rotateY =
    (e.clientX/window.innerWidth - 0.5) * 8;

    clock.style.transform =
    `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    `;
});

for(let i=0;i<45;i++){

    const p =
    document.createElement("div");

    p.className="particle";

    p.style.left =
    Math.random()*100+"vw";

    p.style.animationDuration =
    8 + Math.random()*12 + "s";

    p.style.opacity =
    Math.random();

    p.style.transform =
    `scale(${Math.random()*2})`;

    document.body.appendChild(p);
}

let audioCtx;

function getCtx(){

    if(!audioCtx){

        audioCtx =
        new (
        window.AudioContext ||
        window.webkitAudioContext
        )();
    }

    return audioCtx;
}

function tick(){

    const ctx =
    getCtx();

    const osc =
    ctx.createOscillator();

    const gain =
    ctx.createGain();

    osc.type="triangle";

    osc.frequency.value=850;

    gain.gain.value=0.008;

    osc.connect(gain);

    gain.connect(ctx.destination);

    osc.start();

    osc.stop(ctx.currentTime+0.02);
}

setInterval(tick,1000);

const fullscreenBtn =
document.getElementById(
"fullscreenBtn"
);

fullscreenBtn.onclick = ()=>{

    if(!document.fullscreenElement){

        document.documentElement
        .requestFullscreen();

    }else{

        document.exitFullscreen();
    }
};

const toggleCredits =
document.getElementById(
"toggleCredits"
);

const footer =
document.getElementById(
"footer"
);

let creditsVisible = true;

toggleCredits.onclick = ()=>{

    creditsVisible =
    !creditsVisible;

    footer.style.opacity =
    creditsVisible ? "1" : "0";

    toggleCredits.innerText =
    creditsVisible
    ? "HIDE INFO"
    : "SHOW INFO";
};

let inactivityTimer;

function showUI(){

    fullscreenBtn.classList.remove(
    "ui-hidden"
    );

    toggleCredits.classList.remove(
    "ui-hidden"
    );

    clearTimeout(
    inactivityTimer
    );

    inactivityTimer =
    setTimeout(()=>{

        fullscreenBtn.classList.add(
        "ui-hidden"
        );

        toggleCredits.classList.add(
        "ui-hidden"
        );

    },2000);
}

document.addEventListener(
"mousemove",
showUI
);

document.addEventListener(
"touchstart",
showUI
);

document.addEventListener(
"click",
showUI
);

showUI();
