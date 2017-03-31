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
  //  console.log(playpointer);
  //  console.log(queuepointer);
    var currentsongsrc = songsqueue[playpointer].src;
  //  console.log(currentsongsrc);
    var currentsongtype = songsqueue[playpointer].type;
  //  console.log(songsqueue[playpointer].title);
    $("#artist").html(songsqueue[playpointer].artist);
    $("#songtitle").html(songsqueue[playpointer].title);
    $("#genre").html("Rock");
    $("#year").html("1980");
    $("#funfact").html("Beatles were the greatest Rock band the world ever saw. The totalsales of beatles records to date is 10 billions dollars");
    $('#myAudio').attr('src',currentsongsrc);    
    $('#myAudio')[0].play();
  } 


    
  var aud = document.getElementById("myAudio");
  aud.onended = function() {
    //alert("The audio has ended finally");
        playpointer++;
        console.log(playpointer);
        console.log(queuepointer);
        alert(" I am playing next song");
        if(playpointer <  queuepointer) {
         // console.log("ravi");
         playAudio();
          buildImages();
        }
  };
    

 // Songs Kist//
  $("#beatles").click( function(){
       var beatles = new Jukebox("Beatles","John lennon","beatles1.jpg","keromama.mp3","mpeg");
       songsqueue[queuepointer] = Object.assign({},beatles);
       queuepointer++;
       var x = "images/"+(songsqueue[playpointer].albumcover);
       // console.log(x);
      // $("queueimg1").attr("src") = x;
       $(".queueclass").attr('src', x);
      // console.log(songsqueue);
      // console.log(songsqueue.length);
      // console.log(queuepointer);
      // console.log(songsqueue[playpointer].albumcover);
      buildImages();
  });

  $("#ladygaga").click( function(){
       var ladygaga = new Jukebox("Alejandro","ladygaga","ladygaga.jpg","song1.mp3","audio/mpeg");
       songsqueue[queuepointer] = Object.assign({},ladygaga);
       queuepointer++;
      // console.log(songsqueue);
      // console.log(songsqueue.length);
      // console.log(queuepointer);
      //  var x = "images/"+(songsqueue[queuepointer-1].albumcover);
      //  console.log(x);
      // $("queueimg1").attr("src") = x;
      // $(".queueclass").attr('src', x);
      buildImages();
  });

    $("#jayz").click( function(){
       var jayz = new Jukebox("Alejandro","ladygaga","jayz.jpg","song3.mp3","audio/mpeg");
       songsqueue[queuepointer] = Object.assign({},jayz);
       queuepointer++;
      // console.log(songsqueue);
      // console.log(songsqueue.length);
      // console.log(queuepointer);
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
      // playAudio();
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






    






