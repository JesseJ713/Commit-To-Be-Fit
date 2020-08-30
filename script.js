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
}).done(function (response) {
	console.log(response)
	bmiCal(response);
});

// bmiCal ONLY calculates the BMI for the given Age, Height, Weight
function bmiCal(bmiInfo) {

	// Test Call for BMI Number
	console.log("This is BMI Info Number from within AJAX promise: ", bmiInfo.bmi);
	console.log("This is BMI Info Status from within AJAX promise: ", bmiInfo.health);
}

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
	recipeSearchParser(response);
});

	// Searches through recipes for info
	function recipeSearchParser(recipeSearchInfo) {

		console.log(recipeSearchInfo.hits[0].recipe.label);
		recipeParser(recipeSearchInfo.hits[1].recipe);
	}

	// Capable of returning info from different recipes
	function recipeParser (recipe) {
		console.log(recipe.label)
	}


