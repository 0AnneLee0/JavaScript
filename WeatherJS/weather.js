class Weather {
    constructor(city, country) {
        this.api_key = '';

        this.city = city;
        this.country = country;
    }

    //Fetch data from weather API
    //async means will return promise
    async getWeather() {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&APPID=${this.api_key}&units=imperial`);

        const responseData = await response.json();
        
        return responseData;
    }

    //Change weather location
    changeLoction(city, country) {
        this.city = city;
        this.country = country;
    }
}
