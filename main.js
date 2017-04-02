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
    if(playpointer <  queuepointer) {
      playAudio();
      renderQueue();
    }
  };
    
//Below on Click event creates an instance of jukebox object by reading data from HTML 
  $(".songs").click( function(){
    var x = this;
    var song = new Jukebox(x.dataset.title,x.dataset.artist,x.dataset.albumcover,x.dataset.src,x.dataset.type,x.dataset.funfact);
    songsqueue[queuepointer] = Object.assign({},song);
    queuepointer++;
    renderQueue()
  });

//Audio Controls
  $("#playbutton").click(function(){
    playAudio();
  });

  $("#pausebutton").click(function(){
    $('#myAudio')[0].pause();
  });

  $("#stopbutton").click(function(){
    $('#myAudio')[0].stop();
    $('#myAudio')[0].currentTime = 0;
  });

  $("#nextbutton").click(function(){
    playpointer++;
    if(playpointer > (queuepointer-1)){
    alert("You have reached last song in queue");
    } else {
    playAudio();
    }
  });


  $("#prevbutton").click(function(){
    playpointer--;
    if(playpointer < 0){
      alert("You have reached 1st song in queue");
    } else { 
    playAudio();
    }
  });

//song queue display
  function renderQueue() {
    var j = 0;
    j = document.createElement('img'),
    j.src =  "images/"+(songsqueue[queuepointer-1].albumcover)
    j.style =  "width:75px;height:75px;"
    $('#jukeboxqueue').append(j);
  };
    
});






    






