"use strict"

//create app if there is no app, otherwise get a reference to it
var app = app || {};

//drink module
app.drink = {
    //called when ingredients are requested
    getDrinkIngredients : function(id){
        var html = "<ul>"
        //loop through data and add html to proper div
        for(var i = 0; i < app.main.drinkI[id].length; i++){
            html += "<li>" + app.main.drinkI[id][i] + "</li>";
        }
        html += "</ul>"
        app.main.activeElement.innerHTML = html;
    },
    //called anytime search is pressed
    getDrink : function(){
        var url = app.main.drinkURL;
        if(app.main.alcohol != "none" && app.main.alcohol != undefined){
            url += "withtype/" + app.main.alcohol + "/";
        }
        if(app.main.taste != "none" && app.main.taste != undefined){
            url += "tasting/" + app.main.taste + "/";
        }
        if(app.main.glass != "none" && app.main.glass != undefined){
            url += "servedin/" + app.main.glass + "/";
        }
        if(app.main.time != "none" && this.time != undefined){
            url += "for/" + app.main.time + "/";
        }
        url += app.main.drinkAPI;
        
        //get the jsonp
        $.ajax({
            type: 'GET',
            dataType: "jsonp",
            url: url,
            success: this.loadDrink
        });
    },
    //called when jsonp is properly loaded
    loadDrink : function(obj){
        app.main.drinkI = [];
        var main = document.getElementById("main");
        main.innerHTML = "";
        var errorMessage = "There has been an error, try using another part of the site for now.";
        var emptyMessage = "There is no item of that type. Try searching something else.";
        
        //if no results come up print out nicely formatted message 
        if(obj.result.length == 0 || ! obj.result){
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
        //loop through json and pull out any important info
        for(var i = 0; i < obj.result.length; i++){
            var html = "";
            var name = obj.result[i].id;
            var rating = obj.result[i].rating;
            var id = i;
            var video;
            if(obj.result[i].videos[0]){
                if(obj.result[i].videos[0].type == "youtube")
                {
                    video = obj.result[i].videos[0].video;
                    video.replace(/['"]+/g, '');
                }
            }
            var ingredients = [];
            for(var b = 0; b < obj.result[i].ingredients.length; b++){
                ingredients.push(obj.result[i].ingredients[b].textPlain);
            }
            app.main.drinkI.push(ingredients);

            var drinkImage = app.main.imageURL + name+".png";
            
            //add all info to the html and add that to the main div
            html += "<div class='recipe'>";
            html += "<div class='imageDiv'>";
            html += "<div class='image'>";
            html += "<img src='" + drinkImage + "' alt='image'>";
            html += "</div>";
            html += "<div class='rating'>" ;       
            html += "<p class='ratNum'>"+rating+"</p>";
            html += "<p class='pRat'>rating</p>";
            html += "</div>";
            html += "</div>";
            html += "<div class='foodDiv'>";
            html += "<div class='name'>";
            name = name.replace('-', ' ');
            html += "<h1>"+name+"</h1>";
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
            html += "<a href='https://www.youtube.com/watch?v="+video+"'>View Tutorial</a>";
            html += "</div>";
            html += "<div class='garnish'>";
            html += "<img src='images/garnish.png' alt='image'>";
            html += "</div>";
            html += "</div>";

            main.innerHTML += html;
        }
    }
};