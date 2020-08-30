// api key fitness cal b469cb6cf6msh3da406e4c4c611dp13d77fjsnc9f693a4e222
var age = 25; // need to change to jquery input field
var height = 180;
var weight = 70;
var recipeInput = "chicken";
// Fit Cal URL
var queryURLFitCal = "https://fitness-calculator.p.rapidapi.com/bmi?age=" + age + "&height=" + height + "&weight=" + weight;
// Recipe Search URL
var queryURLRecipe = "https://edamam-recipe-search.p.rapidapi.com/search?q=" + recipeInput;

// Fit Cal Response
var responseFitCal = $.ajax({
	url: queryURLFitCal,
	method: "GET",
	"headers": {
		"x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
		"x-rapidapi-key": "b469cb6cf6msh3da406e4c4c611dp13d77fjsnc9f693a4e222"
	}
})

// Recipe Search AJAX Call
var recipeSearch = {
	"async": true,
	"crossDomain": true,
	"url": queryURLRecipe,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
		"x-rapidapi-key": "a1e9e9d373msh3ca1d0f878e9747p19baebjsn783a970a3456"
	}
}
// Recipe Search AJAX Function
$.ajax(recipeSearch).done(function (response) {
	console.log("Recipe Search response: ", response);
});

// lets just do the BMI for now

// bmiCal ONLY calculates the BMI for the given Age, Height, Weight
function bmiCal() {
	// calling the url + age + height + weight
	queryURLFitCal;
	// response from api via variable
	responseFitCal;

	// console.log for the response from the API
	console.log("called bmiCal this is response", responseFitCal)
}
bmiCal();

