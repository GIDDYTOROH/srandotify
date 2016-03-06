var external_url = null;
var preview_url = null;
var song_artist = null;
var song_title = null;
var audio = $("<audio>");
var error_time=0;
var autoplay = 1;
audio.on('ended', function() {
    //console.log('ended');
    if(autoplay == 1)nextSong();
});

function playorpause(){
	var button = $("#playButton");
	var span = $("#playButtonContent");
	
	function disPlay(){
		span.removeClass('glyphicon-play');
		span.addClass('glyphicon-pause');
		button.removeClass('myCssPlay');
		button.addClass('myCssPause');
	}
	function disPause(){
		span.removeClass('glyphicon-pause');
		span.addClass('glyphicon-play');
		button.removeClass('myCssPause');
		button.addClass('myCssPlay');
	}
	
	if( (' ' + document.getElementById("playButtonContent").className + ' ').indexOf(' glyphicon-refresh ') > -1 ){}
	else{
		if (audio.get(0).paused){
			//console.log('audio.source', audio.source);
			if(audio.source == 1){		
				audio.get(0).play();
				disPlay();
			}
			else getRandomSong(1);			
		}else{
			audio.get(0).pause();
			disPause();
		}
	}
}

function getRandomSong(ctrl){	
	if( (' ' + document.getElementById("playButtonContent").className + ' ').indexOf(' glyphicon-play ') > -1 ){
		console.log("Getting the song (Button status before: play)");
		myConsoleLog("Getting the song (Button status before: play)");
		disRefresh('play','refresh');
	}
	else if( (' ' + document.getElementById("playButtonContent").className + ' ').indexOf(' glyphicon-pause ') > -1 ){
		console.log("Getting the song (Button status before: pause)");
		window.myConsoleLog("Getting the song (Button status before: pause)");
		disRefresh('pause','refresh');
	}
	
	var getRandomSongsArray = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
	var getRandomElementA = getRandomSongsArray[parseInt(getRandomSongsArray.length * Math.random())];
	//var getRandomElementB = getRandomSongsArray[parseInt(getRandomSongsArray.length * Math.random())];
	var getRandomOffset = Math.floor(Math.random()*100001);
	var url = "https://api.spotify.com/v1/search?query="+getRandomElementA+"*&offset="+getRandomOffset+"&limit=1&type=track";
	var start = new Date().getTime();
	$.ajax(url)
		.done(function(data){
			var end = new Date().getTime();
			console.log("time: ",end-start);
			external_url = data.tracks.items[0].external_urls.spotify;
			preview_url = data.tracks.items[0].preview_url;
			song_artist = data.tracks.items[0].artists[0].name;
			song_title = data.tracks.items[0].name;
			console.log("Song: "+song_title+' || Artist: '+song_artist);
			window.myConsoleLog("Song: "+song_title+' || Artist: '+song_artist);
			console.log(external_url);
			window.myConsoleLog(external_url);
			console.log(data.tracks.href);
			window.myConsoleLog(data.tracks.href);
			if(ctrl==0){window.open(external_url);}
			else if(ctrl==1){
				playUrlSong(preview_url);
			}
		})
		.fail(function() {
			if(error_time<10){
				console.log("error");
				nextSong();
			}
			else{
				disRefresh('play','recover');
				audio.source=0;
			}
		}); 
	//alert(getRandomOffset);
	
}
function nextSong(){
	if(!audio.get(0).paused)audio.get(0).pause();
	getRandomSong(1);
}

function playUrlSong(url){
	audio.attr('src', url);
	audio.source = 1;
	audio.get(0).play();
	if(!audio.get(0).paused) disRefresh('pause','recover');
	else{
		disRefresh('play','recover');
		audio.source=0;
	}
}
function openInSpotify(){
	if(!audio.get(0).paused)playorpause();
	if(external_url!=null)window.open(external_url);	
}
function search(site){
	if(song_title!=null){
		if(!audio.get(0).paused)playorpause();
		var url;		
		if(site=="google"){
			url = 'https://www.google.com.tw/search?q=';
		}
		else if(site=="youtube"){
			url = 'https://www.youtube.com/results?search_query=';
		}
		url += song_title;
		if(song_artist!=null)url += ' %2B '+song_artist;
		window.open(url);
	}
}

function disRefresh(a,b){
	var button = $("#playButton");
	var span = $("#playButtonContent");
	
	if(b=='refresh'){
		if(a=='play'){
			span.removeClass('glyphicon-play');
			button.removeClass('myCssPlay');
		}
		else if(a=='pause'){
			span.removeClass('glyphicon-pause');
			button.removeClass('myCssPause');
		}
		span.addClass('glyphicon-refresh');
		button.addClass('myCssRefresh');
	}
	else{
		span.removeClass('glyphicon-refresh');
		button.removeClass('myCssRefresh');
		if(a=='play'){			
			span.addClass('glyphicon-play');			
			button.addClass('myCssPlay');
		}
		else if(a=='pause'){
			span.addClass('glyphicon-pause');
			button.addClass('myCssPause');
		}
	}
}
