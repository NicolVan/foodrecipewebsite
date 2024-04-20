const input = document.getElementById("input");
const recepetForm = document.querySelector(".search");
const tab = document.querySelector(".output");
const detail = document.querySelector("modal");

recepetForm .addEventListener("submit", async event =>{
    event.preventDefault();
	const inputfood = input.value;
	if(inputfood){
		try{ 
			const  FoodData = await Fetch(inputfood);
			Displayrecipes(FoodData);
			console.log(FoodData);
		}
		catch(error){
            console.error(error);
            displayError(error);
        }
	}else{
		displayError("Enter an ingredient");
	}

	
});


async function Fetch(inputfood){
	const url =`https://food-recipes-with-images.p.rapidapi.com/?q=${inputfood}`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '57e4e2ce6fmsha3776b1cecabe57p1df454jsn8752244771cd',
		'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	return result;
} catch (error) {
	console.error(error);
}
};

function Displayrecipes(data){
	tab.style.display="grid";
	var lengthData = data.d.length;
	if(lengthData > 0 ){
		for(let i = 0; i < lengthData; i++){
			let div = document.createElement("div");
			let imgFood = document.createElement("img");
			let title =document.createElement("h3");
			let button = document.createElement("button");
			title.textContent=data.d[i].Title;
			imgFood.setAttribute("id","img");
			imgFood.src=`https:${data.d[i].Image}`;
			div.setAttribute("id", "Div"+1, ".output1");
			title.setAttribute("id"+1,"h3");
			button.setAttribute("id","click");
			button.textContent="Get Recipe";
			tab.appendChild(div);
			div.appendChild(imgFood);
			div.appendChild(title);
			div.appendChild(button);
			button.onclick = function getRecept(){
			    let receptdetail = document.createElement("div");
				receptdetail.setAttribute("id", "displaydetail")

	            tab.appendChild(receptdetail);
	            receptdetail .textContent = data.d[i].Ingredients;
				console.log(receptdetail);
				}
		}
	}else{
		nofood();
	}
	
}

function displayError(message){
	ErrorDisplay = document.createElement("p");
	ErrorDisplay.textContent = message;
	ErrorDisplay.classList.add("errorDisplay");

	tab.textContent="";
	tab.style.display ="flex";
	tab.appendChild(ErrorDisplay);
}
function nofood(){
	const text = "Sorry, we don't find  any meal";
	const notFounds= document.createElement('p');
	notFounds.textContent = text;
	tab.classList.add("notFound");

	tab.textContent="";
	tab.style.display ="flex";
	tab.appendChild(notFounds);
}
	
