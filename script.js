$(document).ready(function () {
// function for creating a dropdown menu with a list of ages with a corresponding value
createAgeList();
function createAgeList() {
	for(i = 1; i < 100; i++) {
		select = "";
		select += "<option value=" + i + ">" + i + "</option>";
		$("#dropdown").append(select)
}};

// function for the weight dropdown list
createWeightList();
function createWeightList() {
	for(i = 5; i < 400; i=i+5){
		select = "";
		select += "<option value=" + i/2.2 + ">" + i + "lbs " + Math.floor(i/2.2) + "kg" + "</option>";
		$("#dropdown-weight").append(select);
	}
}

// function for the height dropdown list
createHeightList();
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
			var bmi = response.bmi;
			bmi = Math.floor(bmi);
			var bmiDescription = response.health;
			var bmiRange = response.healthy_bmi_range;
			let resultsH1 = $("<h3 id='bmiTitle'>Your Results:</h3>")
			let bmiResults = $("<h3 id='BMI'>Your BMI: " + bmi + "</h3>")
			let bmiD = $("<h3 id='health'>BMI Description: " + bmiDescription +  "</h3>")
			let bmiRange1 = $("<h3 id='range'>Healthy BMI Range: " + bmiRange + "</h3>")

			// Dynamically appending elements to page with each promised return
			$("#bmiTitle").html(resultsH1)
			$("#BMI").html(bmiResults);	
			$("#health").html(bmiD)
			$("#range").html(bmiRange1);
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
				"x-rapidapi-key": "79b6d03564msh3568c299c24350fp18e97ajsndf6c82590b5c"
			}
		}
		$.ajax(recipeSearch).done(function (response) {
			let randomHit = response.hits[Math.floor(Math.random() * response.hits.length)];
			let recipeName = randomHit.recipe.label;
			let recipeURL = randomHit.recipe.url;
			let recipeSearchImg = randomHit.recipe.image;
			let healthLabel = [];
			let ingredients = [];
			let img = $("#imgSrc").attr({src: recipeSearchImg, id: "imgSrc" });
			let h1 = $("<h1 id='underPic'>");
			let p = $("<h3 id='desc'>");
			let healthText = $("<h3 id='healthText'>");
			let healthDesc = $("<h3 id='healthDesc'>");
			let anchor = $("#anchor").prop("href", recipeURL);
			
			// Dynamically appending elements to page with each promised return
			$("#anchor").html(anchor)
			img.appendTo("#anchor");
			$("#foodTitle").html(recipeName);
			$("#imgSrc").html(img);
			$("#underPic").html(h1);
			$("#desc").html(p);
			$("#healthText").html(healthText);
			$("#healthDesc").html(healthDesc);

			// For loop for choosing with recipe within array to display
			for (j = 0; j < randomHit.recipe.ingredientLines.length; j++){
				const list = randomHit.recipe.ingredientLines[j];
				ingredients.push(list);
			}
			$("#desc").html("<li>" + ingredients.join("</li><li>"));
			$("#underPic").html("These are the ingredients you'll need: " );
			// For loop for store/listing health labels
			for (i = 0; i < randomHit.recipe.healthLabels.length; i++){
				const list = randomHit.recipe.healthLabels[i];
				healthLabel.push(list);
			}
			$("#healthText").html("Health Labels: ");
			$("#healthDesc").html("<li>" + healthLabel.join("</li><li>"));
   		});
});
})