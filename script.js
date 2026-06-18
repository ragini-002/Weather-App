let apikey ="9813b14e5ac1475cf3addc9469fdef71";
let apiurl ="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

let intext = document.querySelector(".input1");
let inbutton = document.querySelector(".button1");
let weathericon = document.querySelector(".icon");

let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let weather = document.querySelector(".weather");

async function api(cityname){
    try{
        let response = await fetch(
            apiurl + cityname + `&appid=${apikey}`
        );

        if(!response.ok){
            alert("city not found")
            weather.style.display = "none";
            return;
        }

        let data = await response.json();

        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "℃";
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + "km/hr";

        let condition = data.weather[0].main;

        if (condition === "Clouds"){
            weathericon.src ="https://www.accuweather.com/images/weathericons/v2a/7.svg";
        }
        else if(condition === "Rain"){
            weathericon.src ="https://www.accuweather.com/images/weathericons/v2a/18.svg";
        }
        else if(condition === "Clear"){
            weathericon.src ="https://www.accuweather.com/images/weathericons/v2a/1.svg";
        }
        else if (condition === "snow"){
            weathericon.src ="https://www.accuweather.com/images/weathericons/v2a/22.svg";
        }
        else{
            weathericon.src="https://www.accuweather.com/images/weathericons/v2a/35.svg";
        }
        weather.style.display = "block";
    }
    catch(error){
        console.log(error);
        alert("Something went wrong");
    }
}

inbutton.addEventListener("click",()=>{
    
    let cityname = intext.value.trim();

    if (cityname === ""){
        alert("Please enter a city name");
        return;

    }
    api(cityname)
});

intext.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        inbutton.click();
    }
});