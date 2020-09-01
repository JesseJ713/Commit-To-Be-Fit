$(document).ready(function () {

	// Searches through recipes for info
	function recipeSearchParser(recipeSearchInfo) {

		// console.log(recipeSearchInfo.hits[0].recipe.label);
		recipeParser(recipeSearchInfo.hits[1].recipe);
	}

	// Capable of returning info from different recipes
	function recipeParser (recipe) {
		// console.log(recipe.label)
	}
// function for creating a dropdown menu with a list of ages with a corresponding value
$("#dropdown").on("click", function() {
createAgeList();
});
function createAgeList() {
	for(i = 0; i < 100; i ++) {
		select = "";
		select += "<option value=" + i + ">" + i + "</option>";
		$("#dropdown").append(select)
	}
};
// function for the weight dropdown list
$("#dropdown-weight").on("click", function() {
	createWeightList();
});
function createWeightList() {
	for(i = 5; i < 400; i=i+5){
		select = "";
		select += "<option value=" + i/2.2 + ">" + i + "lbs " + Math.floor(i/2.2) + "kg" + "</option>";
		$("#dropdown-weight").append(select);
	}
}
// function for the height dropdown list
$("#dropdown-height").on("click", function() {
	createHeightList();
});
function createHeightList() {
	for(i = 5; i < 250; i=i+5) {
	select = "";
	select += "<option value=" + i + ">" + i + " cm"+ "</option>";
	$("#dropdown-height").append(select);
	};
};
// Onclick button for BMI Form Submission
	$("#bmiSubmit").on("click", function (e) {
		e.preventDefault();
		var age = $(".dropdown-age").val();
		var height = $(".dropdown-height").val();
		var weight = $(".dropdown-weight").val();
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
	// Onclick function for Recipe Form Submission
	//***remember to change this button fx to the correct selector*** */
	$("#recipeSubmit").on("click", function (e) {
		e.preventDefault();
		recipeInput = $("#dropdown-recipe").val();
		console.log(recipeInput);
		var queryURLRecipe = "https://edamam-recipe-search.p.rapidapi.com/search?q=" + recipeInput;
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
		$.ajax(recipeSearch).done(function (response) {
			console.log("Recipe Search response: ", response);
						// variable for showing URL
						var recipeURL = response.hits[0].recipe.url;
						// // variable for showing recipe label
						var recipeName = response.hits[0].recipe.label;
						// // variable for showing img
						var recipeSearchImg = response.hits[0].recipe.image;
						// // variable for showing ingredients** just text for now but can show img for each	
						var recipeDisplayImage = $("<img>").attr("src", recipeSearchImg).attr("href", recipeURL);
			
			$(".foodResponse").append("This is the recipe Input: " + recipeInput);
			$(".foodResponse").append("This is the recipe URL: " + recipeURL);
			$(".foodResponse").append("This is the recipe Label: " + recipeName);
			$(".foodResponse").append(recipeDisplayImage);
		});
			
		// for (i = 0; i < response.hits.length; i++){
		// 	var recipeName = response.hits[i].recipe.label;
		// 	// console.log(recipeName)
		// 	$(".recipeNameList").append(recipeName)
		// }
		// // maybe onclick function for a selected recipe that brings up the ingredients 
		// for (i=0; i < response.hits.length; i++){
			
		// 	var recipeIngredients = response.hits[i].recipe.ingredients
			
		// 	// console.log(recipeIngredient)
		// 	// for loop to append recipe titles
			

		// 	// for loop to append recipe ingredients
		
		// 	// $(".recipe").text("Found Recipe For " + recipeName)
		// 	// $(".recipe-description").text("Recipe Description" + )
		
			
		// }
		
	
});
})