console.log("init");
const weatherForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const messageError = document.querySelector("#messageError");
const messageSuccess = document.querySelector("#messageSuccess");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = searchInput.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then(data => {
            if(data.error) {
                messageError.innerText = data.error;
                messageSuccess.innerText = "";
            } else {
                console.log(data);
                messageError.innerText = "";
                messageSuccess.innerText = `
                    Location: ${data.location}
                    Country: ${data.country}
                    City: ${data.region}
                    Temperature: ${data.temperature}
                    Precipitation: ${data.precipitation}
                `;
            }
        });
    });
});