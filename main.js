var SC;
var player;
var songqueue = []; // Intitializing empty songs queue;
var playqueue = []; // Intitializing empty songs queue;
var queuepointer= 0; // Pointer to track the songs in a queue; 
var playpointer= 0;   // Pointer to track the current song in queue; 

document.getElementById("playbutton").addEventListener("click", myplay);
document.getElementById("prevbutton").addEventListener("click", myprev);
document.getElementById("nextbutton").addEventListener("click", mynext);
document.getElementById("pausebutton").addEventListener("click", mypause);
document.getElementById("btn_search").addEventListener("click", mySearch);


	SC.initialize({
		client_id: 'fd4e76fc67798bfa742089ed619084a6'
		//redirect_uri:'http://example.com/callback'
	});


//Populates the initial list of songs based on 'Hits' keyword for genre
	SC.get('/tracks', {
	 genres: "todays Hits"	  
	}).then(function(tracks) {
	    var searchresultset = tracks;
	    //console.log(searchresultset);
	    renderList(searchresultset)
	});


	function renderList(list) {
	    if(list.length){
	        var element = document.getElementById("displaylist");//Get the Parent Node
	        element.innerHTML = ""; //Remove the child element
	        for(var j = 0; j < 5; j++) {
	        	var newmaindiv = document.createElement('div');
	        	newmaindiv.id = "queuediv_"+list[j].id;
	        	newmaindiv.class = "queuediv";
	        	newmaindiv.style = "display:flex; flex-direction :row; justify-content:space-between; align-items:center; min-width:750px ; border-bottom: solid 1px white";
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
		        newtitle.style =  "font-size:x-small; color:white"
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
		        //console.log(newbutton.id);
		        document.getElementById(newbutton.id).addEventListener("click", myqueue);
	        }
	      } else {
	        console.log("no Child to remove");
	    } 
	}; 


	function myqueue() {
		var queuesong = this.id;
		SC.get('/tracks', {
			  ids:queuesong
			}).then(function(tracks) {
			//console.log(tracks); 
			playqueue[queuepointer] = tracks;
			songqueue[queuepointer] = tracks[0].id;
		 	queuepointer++;
	 	    // console.log(songqueue);
	 	    //console.log(playqueue);
	 	    renderPlayingQueue(playqueue);
		})
    }

	function renderPlayingQueue(playqueue) {
	   	if(songqueue.length){
        var element1 = document.getElementById("queuelist");//Get the Parent Node
        element1.innerHTML = ""; //Remove the child element
        for(var j = playpointer; j < songqueue.length; j++){
			var newqueuediv = document.createElement('div');
	       	newqueuediv.id = "queueid_"+j;
	       // newqueuediv.class = "queuediv";
	        newqueuediv.style = "display:flex; flex-direction :column; justify-content:flex-start; align-items:center;border:.01px solid white;";
	        idofqueuediv = newqueuediv.id ;
	        $('#queuelist').append(newqueuediv);

	        var queueimg = document.createElement('img');
	        queueimg.src =  playqueue[j][0].artwork_url;
	        queueimg.style =  "width:50px;height:50px; padding:2px; margin:5px"
	        $('#queuelist').append(queueimg);
	        
	        var queuelabel = document.createElement('label');
	        queuelabel.innerHTML =  playqueue[j][0].title;
	        queuelabel.style ="color:white; font-size:xx-small;"
	        $('#queuelist').append(queuelabel);
        }
        
      } 
    }; 

	function mySearch() {
    var searchstring = document.getElementById("searchtext").value;
    	SC.get('/tracks', {
			q: searchstring
			}).then(function(tracks) {
			//console.log(tracks);
			var searchresultset = tracks;
		   	renderList(searchresultset)
		});
    }


	function myplay() {
		var playtrack = songqueue[playpointer];
	    SC.stream('/tracks/'+playtrack).then(function(player){
		SC.player = player;	
		SC.player.play();
		renderPlayingQueue(playqueue);
		console.log(playqueue);
	
		var currentsongplaydiv = document.createElement('div');
	       	currentsongplaydiv.id = "currentsong"
	        currentsongplaydiv.style = "display:flex; flex-direction :column; justify-content:flex-start; align-items:center;border:.01px solid white;";
	        idofcurrentsongplaydiv = currentsongplaydiv.id ;
	        $('#currentsong').append(currentsongplaydiv);

	        var currentsongplayimg = document.createElement('img');
	        currentsongplayimg.src =  playqueue[playpointer][0].artwork_url;
	        currentsongplayimg.style =  "width:50px;height:50px; padding:2px; margin:5px"
	        currentsongplaydiv.append(currentsongplayimg);
	        
	        var currentsongplaylabel = document.createElement('label');
	        currentsongplaylabel.innerHTML =  playqueue[playpointer][0].title;
	        currentsongplaylabel.style ="color:white; font-size:xx-small;"
	        $('#currentsong').append(currentsongplaylabel);

	 		var promise = new Promise(function (resolve, reject) {
			SC.player.on('finish',resolve)
			});

	    	promise.then(function(result){
		    playpointer++;
		    myplay();
			});
		});
	};

	function myprev() {
	    if(playpointer < 1){
	      alert("You have reached 1st song in queue");
	    } else { 
	    playpointer--;
	    myplay();
	    //console.log(playpointer);
	    }
	}

	function mynext() {
	    if(playpointer > (queuepointer)){
	    alert("You have reached last song in queue");
	    } else {
	    playpointer++;
	    myplay();
	    //console.log(playpointer);
	    }
	}    

	function mypause(player) {
	    SC.player.pause();
	  //  console.log(playpointer);
	}
   

 



