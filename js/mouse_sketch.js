var progressive = "off";
$(document).ready(function(){


	for(i=0; i<20; i++){
		$("#container").append('<div class="row"/>');
		for(j=0; j<20; j++){
			$("#container").append('<div class="square"/>');
		}
	}

	$(".square").mouseenter(function(){
		if(progressive == "on"){
			color = $(this).css("background-color");
			newColor = LightenDarkenColor(color, -10);
			$(this).css("background-color", newColor);
		}
		else{
			$(this).css("background-color", "black");
		}
	});



});

function resolution(){
	var userInput = document.getElementById("pixelSize").value;
	var color, newColor;

	if(((800 % userInput) == 0) && (userInput != 1) && (userInput != 2)){
		var userInput = document.getElementById("pixelSize").value;
		$(".row").remove();
		$(".square").remove();

		for(i=0; i<(800/userInput); i++){
			$("#container").append('<div class="row"/>');

			for(j=0; j<(800/userInput); j++){
				$("#container").append('<div class="square"/>');
			}
		}

		$(".square").mouseenter(function(){
			console.log(progressive);
			if(progressive == "on"){
				color = $(this).css("background-color");
				newColor = LightenDarkenColor(color, -10);
				$(this).css("background-color", newColor);
			}
			else{
				$(this).css("background-color", "black");
			}
		});

		$(".square").css("height", userInput);
		$(".square").css("width", userInput);
	}

	else{
		alert("Number must be a factor of 800 and cannot be 1 or 2.")
	}

}

function reset(){
	$(".square").css("background-color", "#C0C0C0");
}

function LightenDarkenColor(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16); //stores as hex

    var r = (num >> 16) + amt; //shift down to only get bits we need
 

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt; //apply mask after shifting to discard bits in front

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16); //shift and bitwise OR to recombine
}

$.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
}

function idk(){
	var checkedValue = $('#progressive:checked').val();
	if(checkedValue == "on"){
		progressive = "on";
	}
	else{
		progressive = "off";
	}

}
