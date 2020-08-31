$(document).ready(function () {
// api key fitness cal b469cb6cf6msh3da406e4c4c611dp13d77fjsnc9f693a4e222

var recipeInput = "chicken";

// Recipe Search URL
var queryURLRecipe = "https://edamam-recipe-search.p.rapidapi.com/search?q=" + recipeInput;

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
// 	$.ajax(recipeSearch).done(function (response) {
// 	console.log("Recipe Search response: ", response);
// 	recipeSearchParser(response);
// });

	// Searches through recipes for info
	function recipeSearchParser(recipeSearchInfo) {

		// console.log(recipeSearchInfo.hits[0].recipe.label);
		recipeParser(recipeSearchInfo.hits[1].recipe);
	}

	// Capable of returning info from different recipes
	function recipeParser (recipe) {
		// console.log(recipe.label)
	}



// Onclick button for BMI Form Submission
	$("#bmiSubmit").on("click", function (e) {
		e.preventDefault();
		var age = $(".dropdown-age").val();
		var height = $(".dropdown-height").val();
		var weight = $(".dropdown-weight").val();
		// Function for converting the paramters variables from imperial to metric
		convertToMetric();
		

		// Fit Cal Response
		var queryURLFitCal = "https://fitness-calculator.p.rapidapi.com/bmi?age=" + age + "&height=" + height + "&weight=" + weight;
		var responseFitCal =  {
			async : true,
			url: queryURLFitCal,
			method: "GET",
			"headers": {
				"x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
				"x-rapidapi-key": "b469cb6cf6msh3da406e4c4c611dp13d77fjsnc9f693a4e222"
			}
		};
			$.ajax(responseFitCal).done(function (response) {
			console.log("BMI Search response: ", response);
		// setting bmi variable
		var bmi = response.bmi;
		bmi = Math.floor(bmi);
		// setting health description
		var bmiDescription = response.health;
		// setting healthy bmi range
		var bmiRange = response.healthy_bmi_range;
		// appending variables to the div
		$(".BMI").text("BMI: " + bmi);
		$(".health").text("BMI Description: " + bmiDescription);
		$(".range").text("Healthy BMI Range: " + bmiRange);	
});
});
// function for converting imperial measurements to metric
function convertToMetric(height) {
		height = Math.floor() * 30;
}
	// Onclick function for Recipe Form Submission
	// $("#recipeSubmit").on("click", function (e) {
	// 	e.preventDefault();
	// 	var recipeInput = $(".dropdown-recipe").val();
	// 	console.log(recipeInput);
	// })

})