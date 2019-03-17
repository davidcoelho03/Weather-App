window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector('.temperature-description');
  const temperatureDegree = document.querySelector('.temperature-degree');
  const locationTimezone = document.querySelector('.location-timezone');
  const temperatureSection = document.querySelector('.degree-section');
  const temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
    
      // PROXY SO WE CAN FETCH THE API IN LOCALHOST
      const proxy = "https://cors.io/?"; 
      const api = `${proxy}https://api.darksky.net/forecast/3212ebdc5b5a44b776b7c55e830545a7/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);

          const { temperature, summary, icon} = data.currently;
          
          // set DOM elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // FORMULA FOR CELSIUS
          const celsius = (temperature - 32) * (5 / 9);

          // SET icon
          setIcons(icon, document.querySelector('.icon'));

          // Change temperature metrics
          temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === 'F'){
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            }
            else{
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent = "Hey this isn't working because reasons";
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons({color: 'white'});
   
    // REGEX - Going to replace every "-" with "_"
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }



});

