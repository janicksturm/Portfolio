fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    .then((response) => response.json())
    .then((data) => {
        processPicture(data);
        explantionPicture(data);
    })
    .catch((error) => console.error("Fehler:" , error)
);

function processPicture(data) {
    const picSource = document.getElementById("picSource");
    const pic = document.createElement("img");

    pic.setAttribute("src", data.hdurl);
    pic.setAttribute("height", 500);
    pic.setAttribute("weight", 500);

    picSource.appendChild(pic);
}

function explantionPicture(data) {
    const text = document.getElementById("text");

    const title = document.createElement("h1");
    const description = document.createElement("p");

    title.innerHTML = data.title;
    description.innerHTML = data.explanation;

    text.appendChild(title);
    text.appendChild(description);
}