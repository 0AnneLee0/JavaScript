class UI {
    constructor() {
        //Returns reference to first html id:
        this.location=document.getElementById('w-location');
        this.desc=document.getElementById('w-desc');
        this.string=document.getElementById('w-string');
        this.icon=document.getElementById('w-icon');
        // this.rain=document.getElementById('w-rain');
        this.humidity=document.getElementById('w-humidity');
        this.pressure=document.getElementById('w-pressure');
        this.wind=document.getElementById('w-wind');
    }

    paint(weather) {
        //Fills UI with results from object:
        this.location.textContent = `${weather.name}, ${weather.sys.country}`;
        this.desc.textContent=weather.weather[0].description;
        this.string.textContent=`Temp max/min ${weather.main.temp_max.toFixed()}/${weather.main.temp_min.toFixed()}\xB0F`;
        this.icon.setAttribute('src', `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
        // this.rain.textContent=`${weather.rain["1h"]}`;
        this.humidity.textContent=`Humidity: ${weather.main.humidity} %`;
        this.pressure.textContent=`Pressure: ${weather.main.pressure} hpa`;
        this.wind.textContent=`Wind Speed: ${weather.wind.speed.toFixed(1)} m/h`;
    }
}