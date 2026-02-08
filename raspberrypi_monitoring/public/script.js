const contentBox = document.getElementById("basic-informations");
const cpx = document.getElementById("cpuChart");
const cpxRam = document.getElementById("ramChart");

async function loadData() {
    const data = await fetch("http://localhost:8000/status");
    const jsonData = await data.json();
    return jsonData;
}

async function main() {
    try {
        const data = await loadData();
        contentBox.innerHTML = "";

        const cpu = document.createElement("p");
        const ram = document.createElement("p");
        const disk = document.createElement("p");
        const uptime = document.createElement("p");

         const secToDays = secondsToUptime(data.uptime_seconds);

        cpu.innerText = "CPU: " +  data.cpu_percent + "%";
        ram.innerText = "RAM: " + data.ram_percent + "%";
        disk.innerText = "Disk: " + data.disk_percent + "%";
        uptime.innerText = "Uptime: " + secToDays.days + " days " + secToDays.minutes + " Minutes";



        contentBox.appendChild(cpu);
        contentBox.appendChild(ram);
        contentBox.appendChild(disk);
        contentBox.appendChild(uptime);
    } catch(error) {
        console.error("Fehler beim Laden der Daten: ", error);
    }
}

function secondsToUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const minutes = Math.floor((seconds % 3600) / 60);

  return { days, minutes };
}

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

const ramChart = new Chart(cpxRam, {
        type:"line",
        data:{
            labels: [],
            datasets: [{
                label: "RAM Usage (%)",
                borderColor: "black",
                backgroundColor: "black",
                data: []
            }]
        }
    });

async function updateCharts() {
    const res = await fetch('http://localhost:8000/status');
    const data = await res.json();

    const now = new Date().toLocaleTimeString();

    cpuChart.data.labels.push(now);
    ramChart.data.labels.push(now);

    cpuChart.data.datasets[0].data.push(data.cpu_percent);
    ramChart.data.datasets[0].data.push(data.ram_percent);

    if (cpuChart.data.labels.length > 20) {
        cpuChart.data.labels.shift();
        cpuChart.data.datasets[0].data.shift();
    }

    if (ramChart.data.labels.length > 20) {
        ramChart.data.labels.shift();
        ramChart.data.datasets[0].data.shift();
    }

    cpuChart.update();
    ramChart.update();
}

document.addEventListener("DOMContentLoaded", () => {
    main();
    updateCharts();
    setInterval(main, 2000);
    setInterval(updateCharts, 1000);
});