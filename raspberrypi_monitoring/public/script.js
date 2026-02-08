
async function loadData() {
    const data = await fetch("http://localhost:8000/status");
    const jsonData = await data.json();
    return jsonData;
}
const contentBox = document.getElementById("basic-informations");

async function main() {
    try {
        const data = await loadData();
        contentBox.innerHTML = "";

        const cpu = document.createElement("p");
        const ram = document.createElement("p");
        const disk = document.createElement("p");
        const uptime = document.createElement("p");

        cpu.innerText = "CPU: " +  data.cpu_percent + "%";
        ram.innerText = "RAM: " + data.ram_percent + "%"
        disk.innerText = "Disk: " + data.disk_percent + "%"
        uptime.innerText = "Uptime: " + data.uptime_seconds + " Seconds"

        contentBox.appendChild(cpu);
        contentBox.appendChild(ram);
        contentBox.appendChild(disk);
        contentBox.appendChild(uptime);
    } catch(error) {
        console.error("Fehler beim Laden der Daten: ", error);
    }
}
const cpx = document.getElementById("cpuChart");
const cpuChart = new Chart(cpx, {
        type:"line",
        data:{
            labels: [],
            datasets: [{
                label: "CPU Usage (%)",
                borderColor: "black",
                backgroundColor: "black",
                data: []
            }]
        }
    });

async function updateCpuChart() {
    const res = await fetch('http://localhost:8000/status');
    const data = await res.json();

    const now = new Date().toLocaleTimeString();

    cpuChart.data.labels.push(now);
    cpuChart.data.datasets[0].data.push(data.cpu_percent);

    if (cpuChart.data.labels.length > 20) {
        cpuChart.data.labels.shift();
        cpuChart.data.datasets[0].data.shift();
    }

    cpuChart.update();
}

document.addEventListener("DOMContentLoaded", () => {
    main();
    updateCpuChart();
    setInterval(main, 2000);
    setInterval(updateCpuChart, 1000);
});