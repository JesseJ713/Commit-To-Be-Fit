$(document).ready(function () {
	// // Searches through recipes for info
	// function recipeSearchParser(recipeSearchInfo) {

	// 	// console.log(recipeSearchInfo.hits[0].recipe.label);
	// 	recipeParser(recipeSearchInfo.hits[1].recipe);
	// }

	// // Capable of returning info from different recipes
	// function recipeParser (recipe) {
	// 	// console.log(recipe.label)
	// }
// function for creating a dropdown menu with a list of ages with a corresponding value
// $("#dropdown").on("click", function() {
createAgeList();
// });
function createAgeList() {
	for(i = 1; i < 100; i++) {
		select = "";
		select += "<option value=" + i + ">" + i + "</option>";
		$("#dropdown").append(select)
}};
// function for the weight dropdown list
// $("#dropdown-weight").on("click", function() {
	createWeightList();
// });
function createWeightList() {
	for(i = 5; i < 400; i=i+5){
		select = "";
		select += "<option value=" + i/2.2 + ">" + i + "lbs " + Math.floor(i/2.2) + "kg" + "</option>";
		$("#dropdown-weight").append(select);
	}
}
// function for the height dropdown list
// $("#dropdown-height").on("click", function() {
	createHeightList();
// });
function createHeightList() {
	for(i = 5; i <= 250; i=i+5) {
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
	$("#recipeSubmit").on("click", function (e) {
		e.preventDefault();
		recipeInput = $("#dropdown-recipe").val();
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
			// variable for making the recipe random
			let randomHit = response.hits[Math.floor(Math.random() * response.hits.length)];
			// variable for showing URL
			let recipeURL = randomHit.recipe.url;
			//variable for showing recipe label
			let recipeName = randomHit.recipe.label;
			// variable for showing img
			let recipeSearchImg = randomHit.recipe.image;
			// variable for showing ingredients** just text for now but can show img for each
			let recipeDisplayImage = $("#imgSrc").attr("src", recipeSearchImg);
			// variable for Health Label Array
			let healthLabel = [];
			// array for list of ingredients
			let ingredients = [];
			// variable for adding paragraph with text under img
			let imgClick = $("<p>").text("Click the Image to view the recipe website!").addClass("clickImg");
			$(".anchor").prop("href", recipeURL);
			$("#imgSrc").append(recipeDisplayImage);
			$(".foodTitle").text(recipeName).append(imgClick);
			// for loop to add ingredients to array
			for (j = 0; j < randomHit.recipe.ingredientLines.length; j++){
				const list = randomHit.recipe.ingredientLines[j];
				ingredients.push(list);
			}
			$(".desc").append("<ul><li>" + ingredients.join("</li><li>"));
			$(".underPic").append("These are the ingredients you'll need: " );
			// for loop for store/listing health labels
			for (i = 0; i < randomHit.recipe.healthLabels.length; i++){
				const list = randomHit.recipe.healthLabels[i];
				healthLabel.push(list);
			}
			$(".healthText").text("Health Labels: ");
			$(".healthDesc").append("<ul><li>" + healthLabel.join("</li><li>"));
		});
});
})