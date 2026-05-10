const card = document.getElementById("card");

const ctx = document.getElementById("chart");


let chart;


async function getWeather(){


const city = document.getElementById("city").value;


const res = await fetch(

`http://localhost:5000/api/weather/${city}`

);


const data = await res.json();


card.innerHTML = `

<h2 class="text-3xl">

<i class="wi wi-day-sunny text-yellow-300"></i>

${data.city}

</h2>


<p class="text-xl">

${data.temperature} °C

</p>


<p>

${data.condition}

</p>

`;


updateChart(data.temperature);


}


function updateChart(temp){


if(chart) chart.destroy();


chart = new Chart(ctx, {

type:"line",

data:{

labels:["Temperature"],

datasets:[{

label:"Temp",

data:[temp]

}]

}

});


}