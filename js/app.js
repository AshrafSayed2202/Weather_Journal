// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=d5159581ba8282321c434efef269d6f2&units=metric';
const apiUrl= 'https://api.openweathermap.org/data/2.5/weather?q='
/* Global Variables */
const zipCode = document.getElementById('zip');
const generateBtn = document.getElementById('generate');
const resetBtn = document.getElementById('reset');
// Create a new date instance dynamically with JS
let d = new Date();
let month = ["1","2","3","4","5","6","7","8","9","10","11","12"];
let newDate = d.getDate() + '-' + month[d.getMonth()] + '-'+ d.getFullYear();
zipCode.onfocus = function(){
    zipCode.attributes[2].value = ''
}
zipCode.onblur = function(){
    zipCode.attributes[2].value = 'Enter City'
}
// Asynchronous function to fetch the data from the web API
let weatherData = {};
let allData = {};
const getWeatherData = async function(url,zipCode,key){
    const res = await fetch(url+zipCode+key)
    try {
        let data = await res.json();
        weatherData = data;
        allData = {
            city:weatherData.name,
            temp:weatherData.main.temp,
            description:weatherData.weather[0].description,
            date:newDate,
            icon:weatherData.weather[0].icon,
            country:weatherData.sys.country,
            humidity:weatherData.main.humidity
        }
    } catch (error) {
        console.log("error",error)
    }
};
zipCode.onkeyup = function(e){
    if(e.key == 'Enter'){
        performAction();
    }
}
generateBtn.addEventListener('click',performAction);
function performAction(){
    if(document.querySelector('.entry').style.left == '50%'){
        if(document.querySelector('.entry').style.animation == '1s ease 0s 1 normal none running entryChange1'){
            document.querySelector('.entry').style.animation = '1s ease 0s 1 normal none running entryChange2'
        }else{
            document.querySelector('.entry').style.animation = '1s ease 0s 1 normal none running entryChange1';
        }
    }
    getWeatherData(apiUrl,zipCode.value,apiKey).then(()=>{
        updateUI();
    }).then(()=>{
        document.querySelector('.entry').style.left = '50%';
    })
    
};
/* Function to GET Project Data */
const updateUI = async () =>{
    // UpdateUI
    if(allData.country === undefined){
        document.getElementById('city').innerHTML = `${allData.city}`
    }else{
        document.getElementById('city').innerHTML = `${allData.city} - ${allData.country}`;
    }
    document.getElementById("date").innerHTML =allData.date;
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ '°C';
    document.getElementById('description').innerHTML = allData.description;
    document.getElementById('icon').attributes.src.value = `http://openweathermap.org/img/wn/${allData.icon}@2x.png`;
    document.getElementById('humidity').innerHTML = `  ${allData.humidity}%`;
};