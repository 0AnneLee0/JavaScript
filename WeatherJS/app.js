//Step 1.
//Init Storage object
const storage = new Storage();

//Step 2. calls getLocationData method from Storage class.
//Get stored location data
const weatherLocation = storage.getLocationData();

//Step 3.
//Init Weather object passing values from storage
const weather = new Weather(weatherLocation.city, weatherLocation.country);

//Init UI object
const ui = new UI();

//Step 5. Calls getWeather function on DOM load
//Add event listener on DOM load to call getWeather
document.addEventListener('DOMContentLoaded', getWeather);

//Step 6. Takes in values to change location 
//Change location button event
document.querySelector('#w-change-btn').addEventListener('click', (e) => {
    const city = document.querySelector('#city').value;
    const country = document.querySelector('#country').value;
    
    //Change location
    weather.changeLoction(city, country);

    //Set location in local storage
    storage.setLocationData(city, country);

    //Get and display weather
    getWeather();

    //Close modal
    $('#locModal').modal('hide');
});

//Step 5. fetches from external weather API and returns response results, and paints results
//returns a promise
function getWeather() {
    weather.getWeather()
    .then(results => {
        console.log(results);
        //paint the ui with results
        ui.paint(results);
    })
    .catch(err => console.log(err));
}