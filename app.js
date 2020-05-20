window.addEventListener("load", () => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    const temperatureSpan = document.querySelector(".degree-section span");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                const {temperature, summary, icon} = data.currently
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                let celsius = (temperature - 32) * (5 / 9);
                setIcons(icon, document.querySelector('.icon'));
                temperatureSection.addEventListener("click", () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }
                    else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
                if(summary === "Humid and Overcast"){
                    document.body.style.background = 'url("http://gallery.nen.gov.uk/assets/0811/0000/0095/a_cloudy_day_in_the_garden.jpg") no-repeat center center';
                }
                if(summary === "Overcast"){
                    document.body.style.background = 'url("https://miro.medium.com/max/2000/1*K4puxpNn4OPQ2Wh-RkM1TA.jpeg") no-repeat center center'; 
                }
                if(summary === "Mostly Cloudy"){
                    document.body.style.background = 'url("https://s7d2.scene7.com/is/image/TWCNews/clouds_from_above?wid=1250&hei=703&$wide-bg$") no-repeat center center';
                }
                if(summary === "Partly Cloudy"){
                    document.body.style.background = 'url("https://webcomicms.net/sites/default/files/clipart/161196/partly-cloudy-pictures-161196-680913.jpg" no-repeat center center';
                }
                if(summary === "Clear"){
                    document.body.style.background = 'url("https://images.unsplash.com/photo-1531147646552-1eec68116469?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80") no-repeat center center';
                }
                if(summary === "Possible Light Rain and Humid"){
                    document.body.style.background = 'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/07ffd413-4f19-43ab-8534-5e2818a6beaf/d4llgix-2af381bb-efef-4680-b775-a72be922a796.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDdmZmQ0MTMtNGYxOS00M2FiLTg1MzQtNWUyODE4YTZiZWFmXC9kNGxsZ2l4LTJhZjM4MWJiLWVmZWYtNDY4MC1iNzc1LWE3MmJlOTIyYTc5Ni5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.2L4duJ3vbqGmLQarpULCV10vwbSOiyQHk5SstLRehmA.jpg") no-repeat center center';
                }

            })
        })

    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "#ff9999"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})
