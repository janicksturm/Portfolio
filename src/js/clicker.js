let counter_div = document.getElementById("counter_div");
let button = document.getElementById("click_button");

let counter_num = 0;

function getRandomColor() {
    let symbols = "0123456789ABCDEF"
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += symbols[Math.floor(Math.random() * 16)];
    }
    button.style.backgroundColor = color;
}

getRandomColor();
let display_counter = document.createElement("p");
button.addEventListener("click", () => {
    counter_num++;
    display_counter.innerHTML = "Klicks: " + counter_num;
    counter_div.appendChild(display_counter);
    getRandomColor();
}
);
