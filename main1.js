var SC;
var list = [];
var search_string;
var songqueue = []; // Intitializing empty songs queue;
var queuepointer= 0; // Pointer to track the songs in a queue; 
var playpointer= 0;   // Pointer to track the current song in queue; 
 // var ispaused = 0;


	SC.initialize({
		client_id: 'fd4e76fc67798bfa742089ed619084a6',
		redirect_uri:'http://example.com/callback'
	});


	var iframeElement   = document.querySelector('iframe');
var iframeElementID = iframeElement.id;
//var widget1         = SC.Widget(iframeElement);
//var widget2         = SC.Widget(iframeElementID);


//Searching genre
	SC.get('/tracks', {
	 genres: "todays Hits"
	  
	}).then(function(tracks) {
	    var genrelist = tracks;
	    console.log(genrelist);
	    renderQueue(genrelist)
	});




	function renderQueue(list) {
	    if(list.length){
	        var element = document.getElementById("displaylist");//Get the Parent Node
	        element.innerHTML = ""; //Remove the child element
	        for(var j = 0; j < 5; j++) {

	        	var newmaindiv = document.createElement('div');
	        	newmaindiv.id = "queuediv_"+list[j].id;
	        	newmaindiv.class = "queuediv";
	        	newmaindiv.style = "display:flex; flex-direction :row; justify-content:space-between; align-items:center; min-width:1200px ; border-bottom: solid 1px white";
	        	idofnewid = newmaindiv.id ;
	        	$('#displaylist').append(newmaindiv);

	        	var newdiv = document.createElement('div');
	        	newdiv.id = "songlistitem"+list[j].id;
	        	//newdiv.style = "width : 1750px; border-bottom: solid 1px white";
	        	idofnewid = newdiv.id ;
	        	newmaindiv.append(newdiv);

	        	var newimg = document.createElement('img');
	        	newimg.src = list[j].artwork_url;
	        	newimg.style =  "width:75px;height:75px; padding:15px 15px"
	        	newdiv.append(newimg);

		        var newtitle = document.createElement('label'); 	
		        newtitle.innerHTML = list[j].title;
		        newdiv.append(newtitle);


	         	var newdiv2 = document.createElement('div');
	        	newdiv2.id = "queuediv_"+list[j].id;
	        	newdiv2.class = "queuediv";
	        	newdiv2.style = "width : auto; ";
	        	idofnewid = newdiv.id ;
	        	newmaindiv.append(newdiv2);

		        var newbutton = document.createElement('button'); 	
		        newbutton.innerHTML = "Add";
		        newbutton.style =  "width:75px;height:auto; color:white ;background-color:grey; border-radius:25px;"
		        newbutton.id =list[j].id;
		        newdiv2.append(newbutton);
		        console.log(newbutton.id);
		        document.getElementById(newbutton.id).addEventListener("click", myqueue);
	        }
	      } else {
	        console.log("no Child to remove");
	    } 
	}; 


	document.getElementById("btn_search").addEventListener("click", mySearch);

	function mySearch() {
    var searchstring = document.getElementById("searchtext").value;
    	SC.get('/tracks', {
		  q: searchstring,
		  license: 'cc-by-sa'
		}).then(function(tracks) {
		  console.log(tracks);
		  var genrelist = tracks;
	    renderQueue(genrelist)
		});
    }

 document.getElementById("playbutton").addEventListener("click", myplay);
 function myplay() {
    var playtrack = songqueue[playpointer];
    console.log(playtrack);
    SC.stream('/tracks/'+playtrack).then(function(player){
  	player.play();
  	SC.oEmbed('https://api.soundcloud.com/tracks/223837164',{autoplay:true},document.getElementById('audiocontext'));
    //document.getElementById("currentplaying").src = list[j].artwork_url;
    })
  	//playpointer++;
}


function myqueue() {
	songqueue[queuepointer] = this.id;
	console.log(songqueue);
 	queuepointer++;
 	console.log(songqueue);
}

document.getElementById("prevbutton").addEventListener("click", myprev);
document.getElementById("nextbutton").addEventListener("click", mynext);
document.getElementById("stopbutton").addEventListener("click", mystop);

function myprev() {
    if(playpointer < 1){
      alert("You have reached 1st song in queue");
    } else { 
    playpointer--;
    myplay();
    
    console.log(playpointer);
    }
}

function mynext() {
    if(playpointer > (queuepointer)){
    alert("You have reached last song in queue");
    } else {
    playpointer++;
    myplay();
    console.log(playpointer);
    }
}    


function mystop() {
	SC.stream('').then(function(player){
    player.stop();
    console.log(playpointer);
    });
}


