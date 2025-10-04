let a = document.getElementById("play");
let video = document.getElementById("bg");
let z = document.querySelector(".zombie");
let s = document.querySelector(".soldier");
let sc = document.querySelector(".time");
let sc2 = 0;
let s2 = document.getElementById("sol");
let isGameRunning = false;

// Score Update Interval
let scoreInterval = setInterval(() => {
    if (isGameRunning && !video.paused) {
        sc2++;
        sc.innerHTML = sc2;
    }
}, 1000);

a.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        isGameRunning = true;
        sc2 = 0; 
        sc.innerHTML = sc2;
        a.style.display = "none"; 

        let initialDelay = Math.floor(5000 + Math.random() * 7001);
        console.log(`Initial delay: ${initialDelay}ms`);

        setTimeout(() => {
            animateWithDelay(z);
        }, initialDelay);

        checkCollision(); 
    }
});

document.addEventListener("keyup", (e) => {
    if (isGameRunning === true && e.code === "ArrowUp") {
        s.style.animation = "soljump 1s linear";
        s.addEventListener("animationend", () => {
            s.style.animation = "none";
        });
    }
});


function animateWithDelay(element) {
    if (!isGameRunning) return;

    let rn = Math.random();
    let zt = Math.floor(2000 + rn * 8001);
    console.log(`Next delay: ${zt}ms`);

    element.style.animation = "zombiewalk 2s linear";

    setTimeout(() => {
        if (!isGameRunning) return;
        element.style.animation = "none";

        setTimeout(() => {
            animateWithDelay(element);
        }, zt);
    }, 2000);
}

function isOverlapping(div1, div2, t = 80) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left + t ||
        rect1.left > rect2.right - t ||
        rect1.bottom < rect2.top + 20 ||
        rect1.top > rect2.bottom - 20
    );
}

function checkCollision() {
    if (!isGameRunning) return;

    if (isOverlapping(z, s)) {
        isGameRunning = false; 
        video.pause();
        stopAnimations();
        a.style.display = "block"; 
        console.log("Collision detected! Game paused.");
    } else {
        requestAnimationFrame(checkCollision);
    }
}

function stopAnimations() {
    [z, s].forEach((element) => {
        element.style.animation = "none";
        element.offsetHeight; 
    });
}

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowDown" && !s2.classList.contains("ducked")) {
        s2.classList.add("ducked"); 
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowDown" && s2.classList.contains("ducked")) {
        s2.classList.remove("ducked"); 
    }
});


