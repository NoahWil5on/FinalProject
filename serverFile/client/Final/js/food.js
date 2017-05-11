"use strict"

//create app if there is no app, otherwise get a reference to it
var app = app || {};

//food module
app.food = {
    //adds ingredients to html
    addIngredients : function(obj){
        var html = "<ul>"
        var ingred = obj.recipe.ingredients;
        //loop through and add the html to the right div
        for(var i = 0; i < ingred.length; i++){
            html += "<li>" + ingred[i] + "</li>";
        }
        html += "</ul>"
        app.main.activeElement.innerHTML = html;       
    },
    //is called when ingredients buttons is clicked
    getIngredients : function(id){
        var url = app.main.ingredientURL; 
        url += "&rId=";
        url += id;

        $.ajax({
            type: 'GET',
            crossOrigin: true,
            dataType: "jsonp",
            url: url,
            success: this.loadIngredients
        });
    },
    //is called when ingredients are loaded
    loadIngredients : function(obj){
        obj = JSON.parse(obj);
        app.food.addIngredients(obj);
    },
    //is called when the search button is clicked
    getItems : function(){
        var url = app.main.foodURL; 
        url += "&q=";
        
        //encode search items
        var value = document.querySelector("#bar").value;
        value = value.trim();
        if(value.length < 1) return;
        value = encodeURI(value); 
        url += value;
        
        //get the jsonp from the url
        $.ajax({
            type: 'GET',
            crossOrigin: true,
            dataType: "jsonp",
            url: url,
            success: this.loadItems
        });
    },
    //is called when items are loaded
    loadItems : function(obj){
        //Turn the jsonp into json
        obj = JSON.parse(obj);
        
        var main = document.getElementById("main");
        main.innerHTML = "";
        var errorMessage = "There has been an error, try using another part of the site for now.";
        var emptyMessage = "There is no item of that type. Try searching something else.";
        //if no results come up print out nicely formatted message
        if(obj.count == 0 || ! obj.count){
            var html = ""
            html += "<div class='recipe'>";
            html += "<div class='foodDiv'>";
            html += "<div class='name'>";
            html += "<h1>";
            if(obj.error){
                html += errorMessage;
            }
            else{
                html += emptyMessage;
            }
            html += "</h1>";
            html += "</div>";    
            html += "</div>";
            html += "<div style='clear:both'></div>";
            html += "<div class='between'></div>";
            html += "<div class='directionsDiv'>";
            html += "</div>";
            html += "<div class='foot'>";
            html += "</div>";
            html += "<div class='garnish'>";
            html += "<img src='images/garnish.png' alt='image'>";
            html += "</div>";
            html += "</div>";

            main.innerHTML = html;
            return;
        }
        
        //Loop through json and pull out any important info
        for(var i = 0; i < obj.count; i++){
            var html = "";
            var title = obj.recipes[i].title;
            var imageUrl = obj.recipes[i].image_url;
            var id = obj.recipes[i].recipe_id
            var rating = obj.recipes[i].social_rank;
            var source = obj.recipes[i].source_url; 
            rating = Math.floor(rating);
            
            //add all info to html and then main div
            html += "<div class='recipe'>";
            html += "<div class='imageDiv'>";
            html += "<div class='image'>";
            html += "<img src="+ imageUrl +" alt='image'>";
            html += "</div>";
            html += "<div class='rating'>" ;       
            html += "<p class='ratNum'>"+rating+"</p>";
            html += "<p class='pRat'>rating</p>";
            html += "</div>";
            html += "</div>";
            html += "<div class='foodDiv'>";
            html += "<div class='name'>";
            html += "<h1>"+title+"</h1>";
            html += "</div>";
            html += "<div class='ingredients'>";
            html += "<p class='showI' value="+id+">-View Ingredients-</p>";
            html += "</div>";      
            html += "</div>";
            html += "<div style='clear:both'></div>";
            html += "<div class='between'></div>";
            html += "<div class='directionsDiv'>";
            html += "</div>";
            html += "<div class='foot'>";
            html += "<a href="+source+">View Preperation Instructions</a>";
            html += "</div>";
            html += "<div class='garnish'>";
            html += "<img src='images/garnish.png' alt='image'>";
            html += "</div>";
            html += "</div>";

            main.innerHTML += html;
        }
    }
};