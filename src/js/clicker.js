let counter_div = document.getElementById("counter_div");
let button = document.getElementById("click_button");
let upgrade_button = document.getElementById("upgrade_button");
let time_button = document.getElementById("time_button");

let counter_num = 0;
let auto_clicks = 0;
let time_var = 1000;
let reduce_time = 0;

function getRandomColor() {
    let symbols = "0123456789ABCDEF"
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += symbols[Math.floor(Math.random() * 16)];
    }
    button.style.backgroundColor = color;
}

let display_counter = document.createElement("p");
function updateDisplay() {
    upgrade_button.style.display = "inline-block";
    time_button.style.display = "inline-block";
    upgrade_button.innerText = "Auto-Click +" + auto_clicks;
    display_counter.innerHTML = "Klicks: " + counter_num;
    counter_div.appendChild(display_counter);
}

getRandomColor();
button.addEventListener("click", () => {
    counter_num++;
    updateDisplay();
    getRandomColor();
}
);

upgrade_button.addEventListener("click", () => {
    if (counter_num > 9) {
        counter_num -= 10;
        auto_clicks += 2;
        upgrade_button.innerText = "Auto-Click +" + auto_clicks;
        updateDisplay();
    }
});

time_button.addEventListener("click", () => {
    if (counter_num > 50) {
        counter_num -= 50;
        reduce_time++;
        time_var -= reduce_time;
        time_button.innerText = "Zeit +" + reduce_time;
    }
});

setInterval(() => {
    if (auto_clicks > 0) {
        counter_num += auto_clicks;
        updateDisplay();
    }
}, time_var);

