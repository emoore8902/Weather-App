window.addEventListener('load', ()=> {
    let lon;
    let lat;
    let loadingSymbol = document.querySelector('.container');
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const APIkey = `5e8a9bd9a44e0437703b1c26020e0dde`;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                const {description} = data.weather[0];
                //Set DOM Elements from the API
                let farenheit = ((data.main.temp-273.15)*1.8)+32;

                temperatureDegree.textContent = Math.floor(farenheit);
                temperatureSpan.textContent = "F";
                temperatureDescription.textContent = description;
                locationTimezone.textContent = data.name;
                //locationTimezone.textContent = formattedTime;
                    //FORMULA FOR CELSIUS
                    let celsius = (farenheit - 32) * (5 / 9); 
                    //Set Icon
                    document.getElementById("icon").src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                //Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(farenheit);
                    }
                })
            })
        })
     } else {
        h1.textContent = "please enable ur location";
    }

})
