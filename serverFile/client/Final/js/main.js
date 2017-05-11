"use strict"

//create app if there is no app, otherwise get a reference to it
var app = app || {};

//main module
app.main = {
    //all the "global" variables used throughout the program
    foodURL : "http://food2fork.com/api/search?key=5216acbc93f2da011dea0147a0dd5ed0",
    ingredientURL : "http://food2fork.com/api/get?key=5216acbc93f2da011dea0147a0dd5ed0",

    drinkURL : "http://addb.absolutdrinks.com/drinks/",
    imageURL : "http://assets.absolutdrinks.com/drinks/",
    drinkAPI : "?apiKey=757055eb67214da4ba7962391d3b8985",

    time : undefined,
    alcohol : undefined,
    taste : undefined,
    glass : undefined,
    drinkI : [],
    drinkBool : false,

    activeElement : undefined,

    //called after everything else has loaded
    init : function(){
        var drinks = document.querySelector("#drink");
        var search = document.querySelector("#button");
        window.onkeyup = function(e) {
            if(e.keyCode == 13){
                if(!drinks.checked){
                    app.main.drinkBool = false;
                    app.food.getItems();
                }
                else{
                    app.main.drinkBool = true;
                    app.drink.getDrink();
                }
            }
        }
        search.addEventListener("click",function(e){
            if(!drinks.checked){
                app.main.drinkBool = false;
                app.food.getItems();
            }
            else{
                app.main.drinkBool = true;
                app.drink.getDrink();
            }
        })
        //properly adjusts html to state of checkbox
        drinks.onchange = function(){
            if(!drinks.checked){
                document.querySelector("#options").style.display = "none";
                document.querySelector("#bar").style.display = "unset";
            } 
            else{
                document.querySelector("#options").style.display = "unset";
                document.querySelector("#bar").style.display = "none";
            }
        }
        
        //See sources
        document.body.onclick = function(e) {   //when the document body is clicked
            if (window.event) {
                e = event.srcElement;           //assign the element clicked to e (IE 6-8)
            }
            else {
                e = e.target;                   //assign the element clicked to e
            }
            //for finding more info about ingredients
            if (e.className && e.className.indexOf('showI') != -1) {
                app.main.activeElement = e.parentNode;
                if(!app.main.drinkBool){
                    app.food.getIngredients(e.getAttribute("value"));
                }
                else{
                    app.drink.getDrinkIngredients(e.getAttribute("value"));
                }
            }
        }
        //selection tools for drinks
        document.querySelector("#occasion").addEventListener("change",function(e){
            app.main.time = e.target.value;
        });
        document.querySelector("#type").addEventListener("change",function(e){
            app.main.alcohol = e.target.value;
        });
        document.querySelector("#taste").addEventListener("change",function(e){
            app.main.taste = e.target.value;
        });
        document.querySelector("#glass").addEventListener("change",function(e){
            app.main.glass = e.target.value;
        });
    }
};