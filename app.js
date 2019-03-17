window.addEventListener("load", () => {
  let long;
  let lat;

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
        });
    
    });
  } else {
    h1.textContent = "Hey this isn't working because reasons";
  }
});

