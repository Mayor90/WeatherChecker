const cityInput = document.querySelector("input");
const search = document.querySelector("button");
const apiKey = "4ec199c80a5c4b5678762436b2018f26";
const weather = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");

weather.style.display = "none";

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        Enter();
    }
});

search.addEventListener("click", () => {
    Enter();
});

function Enter(){
    errorMsg.style.display = "none";
    weather.style.display = "block";
    getWeatherData(cityInput.value);
}
async function getWeatherData(city){
    if (city == "") console.log("Enter a valid city name");

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try{

        const response = await fetch(apiURL);
        if (!response.ok) displayError();
        else{
            const data = await response.json();
            displayWeatherData(data); 
        }

    }
    catch(error){
        displayError();
    }
}
function displayWeatherData(data){
    console.log(data);
    const cityDisplay = document.querySelector(".city");
    const tempDisplay = document.querySelector(".temp");
    const imgDisplay = document.querySelector(".weather > img");
    const humidityDisplay = document.querySelector(".humidity");
    const windDisplay = document.querySelector(".wind");


    cityDisplay.innerHTML = data.name;
    tempDisplay.innerHTML = Math.round((data.main.temp) - 273)+ `°C`;

    imgSrc = data.weather[0].main;
    imgSrc = imgSrc.toLowerCase();
    imgDisplay.src = `images/${imgSrc}.png`;
    humidityDisplay.innerHTML = data.main.humidity + ' %';
    windDisplay.innerHTML = data.wind.speed + ' m/s';

}
function displayError(){
    errorMsg.style.display = "block";
    weather.style.display = "none";
}