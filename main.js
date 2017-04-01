$(document).ready(function(){

  var songsqueue = []; // Intitializing empty songs queue;
  var queuepointer= 0; // Pointer to track the songs in a queue; 
  var playpointer=0;   // Pointer to track the current song in queue; 


  //Constructor for Jukebox
  function Jukebox(title,artist,albumcover,src,type,funfact) {
    this.title = title;
    this.artist = artist;
    this.albumcover = albumcover;
    this.src = src;
    this.type = type;
    this.funfact = funfact;
    }

  //Audio play functionailty
  function playAudio() { 
    var currentsongsrc = songsqueue[playpointer].src;
    var currentsongtype = songsqueue[playpointer].type;
    $("#artist").html(songsqueue[playpointer].artist);
    $("#songtitle").html(songsqueue[playpointer].title);
    $("#genre").html("Rock");
    $("#year").html("1980");
    $("#funfact").html(songsqueue[playpointer].funfact);
    $('#myAudio').attr('src',currentsongsrc);    
    $('#myAudio')[0].play();
  } 

  var aud = document.getElementById("myAudio");
  aud.onended = function() {
        playpointer++;
        console.log(playpointer);
        console.log(queuepointer);
        alert(" I am playing next song");
        if(playpointer <  queuepointer) {
        playAudio();
        buildImages();
        }
  };
    

 // Songs Kist//
  $("#beatles").click( function(){
      var beatles = new Jukebox("Beatles","John lennon","beatles1.jpg","keromama.mp3","mpeg","Beatles were the greatest Rock band the world ever saw. The totalsales of beatles records to date is 10 billions dollars");
      songsqueue[queuepointer] = Object.assign({},beatles);
      queuepointer++;
      var x = "images/"+(songsqueue[playpointer].albumcover);
      $(".queueclass").attr('src', x);
      buildImages();
  });

  $("#ladygaga").click( function(){
      var ladygaga = new Jukebox("Alejandro","ladygaga","ladygaga.jpg","song1.mp3","mpeg","Her main nicknames are Gagaloo, Loopy, Mother Monster, Rabbit Teeth and Little Mermaid");
      songsqueue[queuepointer] = Object.assign({},ladygaga);
      queuepointer++;
      buildImages();
  });

    $("#jayz").click( function(){
       var jayz = new Jukebox("Alejandro","ladygaga","jayz.jpg","song3.mp3","mpeg","Jay-Z sold crack and used a rubber band as a money clip: The little dudes who were working with me had to earn their rubber bands… make a certain quota for the week to get the rubber band. If they did something that wasn’t thorough, like lost work or put someone on the team at risk, they got their rubber band popped.");
       songsqueue[queuepointer] = Object.assign({},jayz);
       queuepointer++;
      buildImages();
  });



//Audio Controls
  $("#playbutton").click(function(){
       playAudio();
    });


   $("#pausebutton").click(function(){
      // playAudio();
        $('#myAudio')[0].pause();
    });


  $("#stopbutton").click(function(){
      // playAudio();
        $('#myAudio')[0].stop();
    });


  $("#nextbutton").click(function(){
      // playAudio();
       playpointer++;
       playAudio();
    });


  $("#prevbutton").click(function(){
       playpointer--;
       playAudio();
    });

//song queue display
function buildImages() {
   var j = 0;
      $('#jukeboxqueue').append ( 
      j = document.createElement('img'),
      j.id = "newimg"+[j],
      j.class = "imgqueue",
      j.src =  "images/"+(songsqueue[queuepointer-1].albumcover),
      j.style =  "width:75px;height:75px;"
    )};
});






    






