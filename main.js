$(document).ready(function(){

  var songsqueue = []; // Intitializing empty songs queue;
  var queuepointer= 0; // Pointer to track the songs in a queue; 
  var playpointer= 0;   // Pointer to track the current song in queue; 
  var ispaused = 0;

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
    document.getElementById('vinyldisc').className = "vinyldiscplaying";
   //var xx = $("vinyldisc").attr('className');
   // console.log(xx);
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
    renderQueue();
  });


//Audio Controls
  //Play Control 
  $("#playbutton").click(function(){
    playAudio();
  });
  
  //Pause control
  $("#pausebutton").click(function(){
     if(ispaused == 1){
        document.getElementById("myAudio").play();
        ispaused = 0 ; 
     } else {
      $('#myAudio')[0].pause();
      ispaused = 1;
      document.getElementById('vinyldisc').className = "vinyldiscstatic";
     }
  });

  //stop Control
  $("#stopbutton").click(function(){
    $('#myAudio').attr('src',"");  
    document.getElementById('vinyldisc').className = "vinyldiscstatic"; 
  });

  $("#nextbutton").click(function(){
    playpointer++;
    if(playpointer > (queuepointer-1)){
    alert("You have reached last song in queue");
    } else {
    playAudio();
    renderQueue();
    }
  });

  $("#prevbutton").click(function(){
    playpointer--;
    if(playpointer < 0){
      alert("You have reached 1st song in queue");
    } else { 
    playAudio();
    renderQueue();
    }
  });

//song queue display
  function renderQueue() {
      if(songsqueue.length){
        var element = document.getElementById("jukeboxqueue");//Get the Parent Node
        element.innerHTML = ""; //Remove the child element
        console.log(element);
        //starting a loop to add childs
        for(var j = playpointer; j < songsqueue.length; j++){
          var newimg = document.createElement('img');
          newimg.src =  "images/"+ songsqueue[j].albumcover;
          newimg.style =  "width:75px;height:75px;"
          $('#jukeboxqueue').append(newimg);
        }
        
      } else {
        console.log("no Child to remove");
      } 
    }; 
    
});






    






