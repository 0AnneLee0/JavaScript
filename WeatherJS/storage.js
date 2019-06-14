class Storage {
    constructor() {
        this.city;
        this.country;
        this.defaultCity = 'Richmond';
        this.defaultCountry = 'US';
    }

    //Step 2. Returns city and country values.
    getLocationData() {
        if(localStorage.getItem('city') === null||'undefined') {
            this.city = this.defaultCity;
        } else {
            this.city = localStorage.getItem('city');
        }

        if(localStorage.getItem('country') === null||'undefined') {
            this.country = this.defaultCountry;
        } else {
            this.country = localStorage.getItem('country');
        }

        console.log(this.city);
        console.log(this.defaultCity);

        return {
            city: this.city,
            country: this.country
        }
    }

    setLocationData(city, country) {
        localStorage.setItem('city', city);
        localStorage.setItem('country', country);
    }
}