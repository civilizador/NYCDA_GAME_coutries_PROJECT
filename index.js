var selectable = true;
var clicked=false;
var score=100;
var latlan;
//////////////////////
///  CREATING MAP  ///
/////////////////////
var map = AmCharts.makeChart("chartdiv", {
  "type": "map",
  "theme": "dark",
  "projection": "eckert3",
  "dataProvider": {
    "map": "worldLow",
    "getAreasFromMap": true
  },
  "areasSettings": {
    "selectedColor": "rgb(79, 46, 22, 0.75)",
    "selectable": selectable
  },
  /**
   * Add click event to track country selection/unselection
   */
  "listeners": [{
    "event": "clickMapObject",
    "method": function(e) {
      
      // Ignore any click not on area
      if (e.mapObject.objectType !== "MapArea")
        return;
      
      var area = e.mapObject;
      
      // Toggle showAsSelected
      area.showAsSelected = !area.showAsSelected;
      e.chart.returnInitialColor(area);
      
      // Update the list
      document.getElementById("selected").innerHTML = JSON.stringify(getSelectedCountries());
     if (currentPlayingCountries !== undefined && clicked!=true) {
          $.ajax ({url: "https://restcountries.eu/rest/v2/alpha/" + currentPlayingCountries ,
               dataType:"json",
               success: function(response){
                  resp = response;
                  getAnswers(resp);  
                  b=questions[0] + resp.name;
                  $('#question').html(b); 
                  $('#scores').html(score);
                latlan =  resp.latlng;
               }
          });
            
            questNumber++ 
            clicked=true;
     } 
    }
  }]
});

/**
 * Function which extracts currently selected country list.
 * Returns array consisting of country ISO2 codes
 */
function getSelectedCountries() {
  var selected = [];
  for(var i = 0; i < map.dataProvider.areas.length; i++) {
    if(map.dataProvider.areas[i].showAsSelected)
      //selected.push(map.dataProvider.areas[i].id);
      currentPlayingCountries =  map.dataProvider.areas[i].id;
  }
  // return selected;
}

  ////////////////////
 ///   END OF MAP ///
////////////////////
  var gameEndScreen = document.getElementById('gameEndScreen')
  var newGameButton = document.getElementById('newGameButton')
  var finalScreenScores = document.getElementById('finalScreenScores')
  var chartdiv=document.getElementById('chartdiv');
  var resp;
  var b;
  var questNumber=0;
  var answers=[];
  var currentPlayingCountries;
  var allData= [
  ["Avar","Azerbaijani","Bambara","Basque","Bassa","Belarusian","Bemba","Bengal","Berta","Bisla","Bosnian","Breton","Buginese","Buhid","Bulgarian","Burmes","Carrier","Catalanian","Cebuano","Danish","Dargwa","Dhivehi","Dutch","Dzongkha","Erzya","Esperanto","Ees","Evenki","Ewe","Faroese","Fijian","Suo","French","Frisian","Creole","Himba ","Hindi","Hindustani","Hiri Motu ","Igbo","Jutis","Kaingang","Latin","Latvian","Lithuanian","Livonian"] ,
     ["apsar","ruble","pound","dinar","wanza","peso","dram","pound","manat","dollar","dinar","taka","franc","ngultrum","rupee","boliviano","mark","pula","real","lev","riel","escudo","yuan","kuna","guilder","koruna","krone","nakfa","birr","dalasi","lari","cedi","quetzal","gourde","lempira","forint","rupiah","new shekel","yen","tenge","shilling","won","som","kip","loti","rand","pataca","ariary","kwacha","ouguiya","leu","tögrög","dirham","metical","naira","lira","balboa","złoty","peseta"],
        ["Capital City","Abu Dhabi","Accra","Adamstown","Addis Ababa","Algiers","Alofi","Amman","Amsterdam","Andorra la Vella","Ankara","Antananarivo","Apia","Ashgabat","Asmara","Astana","Asunción","Athens","Avarua","Baghdad","Baku","Bamako","Bandar Seri Begawan","Bangkok","Bangui","Banjul","Basseterre","Beijing","Beirut","Belgrade","Belmopan","Berlin","Bern","Bishkek","Bissau","Bogota","Brasília","Bratislava","razzaville","Bridgetown","Brussels","Bucharest","Budapest","Buenos Aires","Conakry","Copenhagen","Damascus","Dhaka","Freetown","Funafuti","Gaborone","George Town","Georgetown","Georgetown","Gibraltar","Grytviken","Hamilton","Hanga Roa","Hanoi","Harare","Havana","Helsinki","Islamabad","Jakarta","Jamestown","Juba","Kampala","Khartoum","Kiev","Kigali","Kingston","Kuala Lumpur","Kuwait City","Lilongwe","Lima","Lisbon","Ljubljana","Lomé","London","Manama","Manila","Marigot","Maseru","Moscow","Muscat","Nairobi","Nassau","New Delhi","Niamey","Nicosia","Palikir","Panama City","Papeete","Paramaribo","Paris","Plymouth","Brades Estate","Podgorica","Cetinje","Port Louis","Port Moresby","Port Vila","Prague","Praia","Pristina","Pyongyang","Quito","Rabat","Reykjavík","Riga","Riyadh","Road Town","Rome","Roseau","Sarajevo","Seoul","Singapore","Skopje","Sofia","Sri Jayawardenepura Kotte","Colombo","Stockholm","Sukhumi","Suva","Taipei","Tallinn","Tashkent","Tbilisi"],
          [],
            ["Northern America", "South America", "Central America", "Eastern Europe","Western Europe","South Europe", "North Europe", "Australia","Northern Africa", "South Africa", "Eastern Asia", "Far East", "Middle East", "Antarctica", "Oceania"],
               ["Capital City","Abu Dhabi","Accra","Adamstown","Addis Ababa","Algiers","Alofi","Amman","Amsterdam","Andorra la Vella","Ankara","Antananarivo","Apia","Ashgabat","Asmara","Astana","Asunción","Athens","Avarua","Baghdad","Baku","Bamako","Bandar Seri Begawan","Bangkok","Bangui","Banjul","Basseterre","Beijing","Beirut","Belgrade","Belmopan","Berlin","Bern","Bishkek","Bissau","Bogota","Brasília","Bratislava","razzaville","Bridgetown","Brussels","Bucharest","Budapest","Buenos Aires","Conakry","Copenhagen","Damascus","Dhaka","Freetown","Funafuti","Gaborone","George Town","Georgetown","Georgetown","Gibraltar","Grytviken","Hamilton","Hanga Roa","Hanoi","Harare","Havana","Helsinki","Islamabad","Jakarta","Jamestown","Juba","Kampala","Khartoum","Kiev","Kigali","Kingston","Kuala Lumpur","Kuwait City","Lilongwe","Lima","Lisbon","Ljubljana","Lomé","London","Manama","Manila","Marigot","Maseru","Moscow","Muscat","Nairobi","Nassau","New Delhi","Niamey","Nicosia","Palikir","Panama City","Papeete","Paramaribo","Paris","Plymouth","Brades Estate","Podgorica","Cetinje","Port Louis","Port Moresby","Port Vila","Prague","Praia","Pristina","Pyongyang","Quito","Rabat","Reykjavík","Riga","Riyadh","Road Town","Rome","Roseau","Sarajevo","Seoul","Singapore","Skopje","Sofia","Sri Jayawardenepura Kotte","Colombo","Stockholm","Sukhumi","Suva","Taipei","Tallinn","Tashkent","Tbilisi"],
 ];
 var citiesPictures = [{},{}]
  // filling allData[3] with random population
          populationRandom();
  function populationRandom() {
            for (i=0;i<220;i++) {
              allData[3].push( Math.floor( Math.random()*650000000 )) 
            }
          }
  //  end of random population        
 
  var questions = [  
    "What is the official language in the ",
    "What is the national currency of "   , 
    "What is the capital of the "   ,
    "What is the population of the " ,
    "What is the name of this museum:  "  
    
  ];
  // Grabbing only  DATA that we eould need for game from API and saving them into the array accordingly to questions.
  
  function getAnswers (resp) {
                                console.log(resp)               
                   answers[0]=(resp.languages[0].name)
                   answerCurrency=(resp.currencies[0].name.split(' '))
                   answers[1]=answerCurrency[1]
                   answers[2]=capital=(resp.capital)
                   answers[3]=population=(resp.population)
                   answers[4]=partOftheWorld=(resp.subregion)
                   
    loadAnswer (answers); 
  }
      var  li = document.getElementById("correctAnswer") 
      var wrongLi =[];
      wrongLi = document.getElementsByClassName("wrong")
      
    //    Assigning correct and wrong answers to the 4 list items in UL.
    
  function loadAnswer  (answers) {
    li.innerHTML="<i id='correctLi' class='iconQuestion far fa-question-circle'>"  + '</i>' + answers[questNumber-1] 
        for (i=0;i<wrongLi.length;i++) {
            wrongLi[i].innerHTML="<i id='wrongLi' id='correctLi' class='iconQuestion far fa-question-circle'>" + '</i>' + allData[questNumber-1][ Math.floor( Math.random()*allData[questNumber-1].length ) ] 
        }
   }
 
    $("#newGameButton").click(function(){window.location.reload()})
    $("#playSameGameButton").click(function(){
      gameEndScreen.style.display='none';
      score=100;
    })
  
  //  RANDOMLY DISPLAYING ANSWER OPTIONS //
  
    var uls = document.querySelectorAll('ul');
      for (var j = 0; j < uls.length; j++) {
         var ul = uls.item(j);
            for (var i = ul.children.length; i >= 0; i--) {
               ul.appendChild(ul.children[Math.random() * i | 0]);
               }
      }

  //   Selecting CORRECT and WROG ANSWER List Items   //
  
     var correctListItem = document.getElementById("correctAnswer");
     var wrongListItems = document.querySelectorAll(".wrong");
  
  //   Event listener on Correct and wrong answer List Items   //   
  
  correctListItem.addEventListener("click",function(){
       
       for (i=0; i <3; i++){
                 wrongListItems[i].style.background="rgb(79, 46, 22, 0.75)"
        }    
        var uls = document.querySelectorAll('ul');
      for (var j = 0; j < uls.length; j++) {
        var ul = uls.item(j);
            for (var i = ul.children.length; i >= 0; i--) {
              ul.appendChild(ul.children[Math.random() * i | 0]);
              }
      }
        if (questNumber < questions.length) {
            $('#question').html(questions[questNumber]+resp.name);
            questNumber++ 
            removeOld ()
              function removeOld () {
                var lis = document.querySelectorAll('li');
                  lis.innerHTML= ' ';
                    loadAnswer (answers);
              }
        }
        else {console.log("YOU WON")
        gameEndScreen.style.display='inline-block'
          $('#question').html('')
            questNumber=0;
          finalScreenScores.innerHTML=score; 
            
        }
     });
     for (i=0; i <3; i++){
       wrongListItems[i].addEventListener("click",function(){
               this.style.background="red"

       score=score-5;
        alert("Wrong!" + "Your score is " + score);
         $('#scores').html(score);
       })}
       
       
    