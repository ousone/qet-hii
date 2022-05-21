function createSVG(bgColor,fgColor) {

	var head = '<svg width="540" height="540" xmlns="http://www.w3.org/2000/svg">';
	var bgPath = '<path d="M0 0h540v540H0Z" style="fill:' +bgColor+ '"/>';
	var textPath = '<path d="M111 180v180h66v-66.9h18V360h66V180h-66v66.9h-18V180Zm168 0v42h66v-42zm84 0v120h66V180Zm-84 60v120h66V240Zm84 78v42h66v-42z" style="fill:' +fgColor+'"/></svg>';

	var svg = head + bgPath + textPath;
	//console.log(svg);
	return svg;
}

function createSVGAnimate(bgColor,fgColor) {

	var head = '<svg width="540" height="540" xmlns="http://www.w3.org/2000/svg">';
	var bgPath = '<path d="M0 0h540v540H0Z" style="fill:' +bgColor+ '"><animate attributeName="fill" values="' +bgColor+';'+fgColor+';'+bgColor+ '" begin="1s" dur="8s" repeatCount="indefinite"/></path>';
	var textPath = '<path d="M111 180v180h66v-66.9h18V360h66V180h-66v66.9h-18V180Zm168 0v42h66v-42zm84 0v120h66V180Zm-84 60v120h66V240Zm84 78v42h66v-42z" style="fill:' +fgColor+'"><animate attributeName="fill" values="' +fgColor+';'+bgColor+';'+fgColor+ '" begin="1s" dur="8s" repeatCount="indefinite"/></path></svg>';

	var svg = head + bgPath + textPath;
	//console.log(svg);
	return svg;
}

function createSvgUri(svg) {
	var svgURI = 'data:image/svg+xml;base64,' + btoa(svg);
	//console.log(svgURI);
	return svgURI;
}

function createMetadata(bgColor,fgColor) {

	var holder = document.getElementById("svg-holder");
	//var svg = holder.innerHTML; // child of svg-holder
	//var svgURI = createSvgUri(svg);
	var svgURI = document.getElementById("svg-preview").src;
	//console.log(svgURI);

	var time = Date.now();

	/*
	var uriObj = {
		name: "Hi!@" + time, 
		description: "On-chain SVG Hi!", 
		image: svgURI,
		attributes: [
			{
			trait_type: "Foreground Color",
			value: fgColor
			},
			{
			trait_type: "Background Color",
			value: bgColor
			}
		]
	};*/

	var uriObj = {};

	uriObj.name = "Hi!@" + time;
	uriObj.description = "On-chain SVG Hi!";
	uriObj.image = svgURI;

	var bgColorObj = {
		trait_type: "Background Color",
		value: bgColor
	};
	var fgColorObj = {
		trait_type: "Foreground Color",
		value: fgColor
	};

	uriObj.attributes = [bgColorObj, fgColorObj];

	var animator = document.getElementById('animation');
	if (animator.checked) {
		var animeObj = {
			trait_type: "Animation",
			value: "True"
		};
		uriObj.attributes.push(animeObj);
	}

	var metadata = JSON.stringify(uriObj, null, 2);
	console.log(metadata);
	return metadata;
}

function createTokenUri(bgColor,fgColor) {
	var metadata = createMetadata(bgColor,fgColor);
	var uri = 'data:application/json;base64,' + btoa(metadata);
	//console.log(uri);
	return uri;
}

function insertSVG(svg,holder) {
	if(holder.innerHTML){
		holder.innerHTML = '';
	}
	var img = document.createElement('img');
	img.id = 'svg-preview';
    img.src = createSvgUri(svg);
    holder.appendChild(img);
}

function randomColor() {
	var color = Math.floor(Math.random()*16777215).toString(16).padStart(6,'0').toUpperCase();
	return color;
}

function randomColorPreview() {
	var bgColor = "#"+randomColor();
	var fgColor = "#"+randomColor();
	var holder = document.getElementById("svg-holder");

	var bgPicker = document.getElementById('bgColor');
	var fgPicker = document.getElementById('fgColor');

	bgPicker.textContent = bgColor;
	fgPicker.textContent = fgColor;
	console.log("Background color:", bgColor);
	console.log("Foreground color:", fgColor);

	var animator = document.getElementById('animation');

	if (animator.checked) {
		var svg = createSVGAnimate(bgColor,fgColor);
		insertSVG(svg,holder);
		console.log("Animation:", animationBool());
	} else {
		var svg = createSVG(bgColor,fgColor);
		insertSVG(svg,holder);
		console.log("Animation:", animationBool());
	}

	animator.addEventListener('change', function(event){
		if (event.currentTarget.checked) {
			svg = createSVGAnimate(bgColor,fgColor);
			insertSVG(svg,holder);
			console.log("Animation:", animationBool());
		} else {
			svg = createSVG(bgColor,fgColor);
			insertSVG(svg,holder);
			console.log("Animation:", animationBool());
		}
	});

}

function customColorPreview() {

	var bgColor = "#"+randomColor();
	var fgColor = "#"+randomColor();
	var holder = document.getElementById("svg-holder");

	var bgPicker = document.getElementById('bgColor');
	var fgPicker = document.getElementById('fgColor');

	bgPicker.value = bgColor;
	fgPicker.value = fgColor;
	console.log("Background color:", bgColor);
	console.log("Foreground color:", fgColor);

	var animator = document.getElementById('animation');

	if (animator.checked) {
		var svg = createSVGAnimate(bgColor,fgColor);
		insertSVG(svg,holder);
		console.log("Animation:", animationBool());
	} else {
		var svg = createSVG(bgColor,fgColor);
		insertSVG(svg,holder);
		console.log("Animation:", animationBool());
	}

	animator.addEventListener('change', function(event){
		if (event.currentTarget.checked) {
			svg = createSVGAnimate(bgColor,fgColor);
			insertSVG(svg,holder);
			console.log("Animation:", animationBool());
		} else {
			svg = createSVG(bgColor,fgColor);
			insertSVG(svg,holder);
			console.log("Animation:", animationBool());
		}
	});

	// when manually change fgColor
	bgPicker.addEventListener("input", function() {
		bgColor = this.value;
		if (animator.checked) {
			svg = createSVGAnimate(bgColor,fgColor);
			insertSVG(svg,holder);
			console.log("Background color:", bgColor);
		} else {
			svg = createSVG(bgColor,fgColor);
			insertSVG(svg,holder);
			console.log("Background color:", bgColor);
		}
	});

	// when manually change fgColor
	fgPicker.addEventListener("input", function() {
		fgColor = this.value;
		if (animator.checked) {
			svg = createSVGAnimate(bgColor,fgColor);
			insertSVG(svg,holder);
			console.log("Foreground color:", fgColor);
		} else {
			svg = createSVG(bgColor,fgColor);
			insertSVG(svg,holder);
			console.log("Foreground color:", fgColor);
		}
	});

}

function animationBool() {
	var animator = document.getElementById('animation');
	
	if (animator.checked) {
		return true;
	} else {
		return false;
	}
}

/*
function getPriceTest(basePrice,totalSupply) {
	if (totalSupply = 0 && totalSupply <= 2) {
		var price = 0;
	}
	else if (totalSupply = 3) {
		var price = basePrice;
	}
	else {
		var price = basePrice * 10;
	}
	return price;
}

function getPrice(basePrice,totalSupply) {
	if (totalSupply >= 0 && totalSupply <= 299) {
		var price = 0;
	}
	else if (totalSupply >= 300 && totalSupply <= 999) {
		var price = basePrice;
	}
	else if (totalSupply >= 1000 && totalSupply <= 2999) {
		var price = basePrice * 10;
	}
	else {
		var price = basePrice * 100;
	}
	return price;
}*/

/*
function getPriceTest(owner, tokenId, tokenBalance, BASEPRICE) {

	var price;

	if (owner) {
		price = 0;
	}

	else if (tokenId >=1 && tokenId <= 2) {
		if (tokenBalance = 0) {
			price = 0;
		}
		else {
			price = BASEPRICE;
		}
	}

	else if (tokenId >=3 && tokenId <= 4) {
		price = BASEPRICE;
	}

	else if (tokenId >=5 && tokenId <= 6) {
		price = BASEPRICE * 10;
	}

	else {
		price = BASEPRICE * 100;
	}

	if (animationBool()) {
		if (price = 0) {
			return price + BASEPRICE;
		}
		else {
			return price * 2;
		}	
	} 
	else {
		return price;
	}

}*/


