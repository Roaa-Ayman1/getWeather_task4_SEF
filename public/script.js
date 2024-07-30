const searchInput = document.querySelector('.searchInput');
const searchBtn = document.querySelector('.search');
const container = document.querySelector('.container');
const country = document.querySelector('.country');
const lat = document.querySelector('.lat');
const long = document.querySelector('.long');
const forcast = document.querySelector('.forcast');
const error = document.querySelector('.error');

console.log(searchBtn)
// searchBtn.addEventListener('click', function() {
//     console.log(1)
//     getWeather();
//     document.forms[0].reset();
// });
searchBtn.onclick = function() {
    // container.style.display = 'none';
    getWeather();
    document.forms[0].reset();
};

const getWeather = async() => {
    try
    {
        console.log(1)

        const result = await fetch('http://localhost:3000/weather?country=' + searchInput.value);
        console.log(1.1)

        const data = await result.json();
        console.log(1.2)

        
        if(data.error) {
            console.log(2)

            container.style.display = 'block';
            error.innerHTML = 'Error: ' + data.error;
            country.innerHTML = "";
            lat.innerHTML = "";
            long.innerHTML = "";
            forcast.innerHTML = "";
        }
        else
        {
            console.log(3)

            container.style.display = 'block';
            error.innerHTML = '';

            setTimeout(() => {
                country.innerHTML = 'City: ' + data.country;
            },1000);
            setTimeout(() => {
                long.innerHTML = 'Longitude: ' + data.longitude;
            },2000);
            setTimeout(() => {
                lat.innerHTML = 'Latitude: ' + data.latitude;
            },3000);
            setTimeout(() => {
                forcast.innerHTML = 'Forcast: The temperature is ' + data.temperature + '° which is ' + data.description;
            },4000);
        }
    }
    catch(e)
    {
        console.log(4)

        console.log(e);
    }
}