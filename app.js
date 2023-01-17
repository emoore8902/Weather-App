window.addEventListener('load', ()=> {
    let lon;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            //const proxy = 'https://cors-anywhere.herokuapp.com/';
            const APIkey = `5e8a9bd9a44e0437703b1c26020e0dde`;
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                    //FORMULAT FOR CELSIUS
                    let celsius = (temperature - 32) * (5 / 9); 
                    //Set Icon
                    setIcons(icon, document.querySelector('icon'));

                //Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent === "C";
                        temperatureDegree.textContent = Math.floor(celsius * 100)/100;
                    } else {
                        temperatureSpan.textContent === "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            })
        }) 
    } else {
        h1.textContent = "please enable ur location";
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})