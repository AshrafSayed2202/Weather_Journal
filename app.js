// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=d5159581ba8282321c434efef269d6f2&units=metric';
const apiUrl= 'https://api.openweathermap.org/data/2.5/weather?q='
/* Global Variables */
const zipCode = document.getElementById('zip');
const generateBtn = document.getElementById('generate');
const feelings = document.getElementById('feelings');
const resetBtn = document.getElementById('reset');
// Create a new date instance dynamically with JS
let d = new Date();
let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let newDate = d.getDate() + ' / ' + month[d.getMonth()] + ' / '+ d.getFullYear();
zipCode.onfocus = function(){
    zipCode.attributes[2].value = ''
}
zipCode.onblur = function(){
    zipCode.attributes[2].value = 'Enter zip code here'
}
feelings.onfocus = function(){
    feelings.attributes[2].value = ''
}
feelings.onblur = function(){
    feelings.attributes[2].value = 'Enter your feelings here'
}
// Asynchronous function to fetch the data from the web API
let weatherData = {};
let allData = {};
const getWeatherData = async function(url,zipCode,key){
    const res = await fetch(url+zipCode+key)
    try {
        let data = await res.json();
        weatherData = data;
        console.log(weatherData)
        allData = {
            city:weatherData.name,
            temp:weatherData.main.temp,
            description:weatherData.weather[0].description,
            content:feelings.value,
            date:newDate,
            icon:weatherData.weather[0].icon,
            country:weatherData.sys.country
        }
    } catch (error) {
        console.log("error",error)
    }
};
// Event listeners to add function to existing HTML DOM element
resetBtn.addEventListener('click',resetAction);
function resetAction(){
    zipCode.value = "";
    feelings.value = "";
    document.querySelectorAll('#entryHolder>div').forEach((e)=>{
        e.style.display = 'none'
    });
}
generateBtn.addEventListener('click',performAction);
function performAction(){
    getWeatherData(apiUrl,zipCode.value,apiKey).then(()=>{
        updateUI();
    }).then(()=>{
        document.querySelectorAll('#entryHolder>div').forEach((e)=>{
            e.style.display = "block"
            // if(document.querySelector(`.${e.className}>span`).innerHTML != ''){
            //     e.style.display = "block"
            // }
        });
    })
    
};
/* Function to GET Project Data */
const updateUI = async () =>{
    // UpdateUI
    if(allData.country === undefined){
        document.getElementById('city').innerHTML = `${allData.city}`
    }else{
        document.getElementById('city').innerHTML = `${allData.city}-${allData.country}`;
    }
    document.getElementById("date").innerHTML =allData.date;
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' C°';
    document.getElementById('description').innerHTML = allData.description;
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById('icon').attributes.src.value = `http://openweathermap.org/img/wn/${allData.icon}@2x.png`;
};
