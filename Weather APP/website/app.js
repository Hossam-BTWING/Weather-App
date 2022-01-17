/* Global Variables */
//let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}';

let apiKey = ',&appid=9c398eddcf88f7574e0df25d9b8c12d3&units=imperial';
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let d = new Date();
let month = months[d.getMonth()];
let newDate = month+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event Listener part:
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const zipCode = document.getElementById('zip').value;
  const feeling = document.getElementById('feelings').value;
  //retData(baseURL, zipCode, apiKey)
  
  //Getting specific data:
  retData(baseURL, zipCode, apiKey).then((data) =>{
  if(data){
    const {
      main:{temp},
      name:city,
      weather:[{description}], } = data;

    const other = {
      newDate,
      city,
      temp,
      description,
      feeling
    };
    postData('/post', other);
    frontData();
  }
 });
};

// function to retrieve data:
const retData = async (baseURL, zip, key)=>{
  
  try {
    const response = await fetch(baseURL+zip+key);
    const data = await response.json();
    //console.log(data);
    return data;
  }catch(error) {
  console.log("error", error);
  }
}

//POSTING DATA:
const postData = async ( url = '', other = {})=>{
   // console.log(other);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(other), 
  });

    try {
      const newData = await response.json();
      //console.log(newData);     //working !
      return newData;
    }catch(error) {
      console.log("error", error);
    }
};
  


// POSTING DATA TO FRONT-END:
const frontData = async () => {
  const response = await fetch("/get");
  try {
    const clData = await response.json();
    console.log(clData);
    document.getElementById("date").innerHTML= clData.newDate;
    document.getElementById("city").innerHTML= clData.city;
    document.getElementById("temp").innerHTML= clData.temp;
    document.getElementById("description").innerHTML= clData.description;
    document.getElementById("content").innerHTML= clData.feeling;
  }catch(error) {
  console.log("error", error);
  }
}
 