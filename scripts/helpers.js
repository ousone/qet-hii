function randomColor() {
	var color = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0').toUpperCase();
	return color;
}

function animationBool() {
	var animator = document.getElementById('animation');
	if (animator.checked) {
		return true;
	} else {
		return false;
	}
}

function animationColorValues(color1,color2) {
	var values = color1+';'+color2+';'+color1;
	return values;
}

function setAnimateElement(color1,color2) {
	var colorAnime = SVG('<animate/>').attr({ attributeName: "fill", values: animationColorValues(color1,color2), dur: "8s", begin: "1s", repeatCount: "indefinite" });
	return colorAnime;
}

function getFontWeight(id) {
	var weightSelector = document.getElementById(id);
	var fontWeight = weightSelector.value;
	console.log("Font Weight:", fontWeight);
	return fontWeight;
}

function createSVG(bgColor,fgColor) {
	var draw = 	SVG().removeNamespace().attr("xmlns", "http://www.w3.org/2000/svg").size(1800, 1800);
	var bg = draw.path("M0 0h1800v1800H0Z").attr({ fill: bgColor });

	const fgPath = [10];
	fgPath[0] = "M555 600v600h30V913h270v287h30V600h-30v287H585V600h-30zm480 0v120h30V600h-30zm180 0v400h30V600h-30zm-180 200v400h30V800h-30zm180 280v120h30v-120h-30z";
	fgPath[1] = "M533 600v600h52V921h246v279h52V600h-52v279H585V600h-52zm490 0v123h52V600h-52zm192 0v400h52V600h-52zm-192 200v400h52V800h-52zm192 277v123h52v-123h-52z";
	fgPath[2] = "M510 600v600h76V930h220v270h76V600h-76v270H586V600h-76zm500 0v125h76V600h-76zm204 0v400h76V600h-76zm-204 200v400h76V800h-76zm204 275v125h76v-125h-76z";
	fgPath[3] = "M487 600v600h100V938h194v262h100V600H781v262H587V600H487zm510 0v127h100V600H997zm216 0v400h100V600h-100zM997 800v400h100V800H997zm216 273v127h100v-127h-100z";
	fgPath[4] = "M463 600v600h124V947h166v253h124V600H753v253H587V600H463zm520 0v130h124V600H983zm230 0v400h124V600h-124zM983 800v400h124V800H983zm230 270v130h124v-130h-124z";
	fgPath[5] = "M440 600v600h148V955h140v245h148V600H728v245H588V600H440zm530 0v132h148V600H970zm242 0v400h148V600h-148zM970 800v400h148V800H970zm242 268v132h148v-132h-148z";
	fgPath[6] = "M417 600v600h172V963h114v237h172V600H703v237H589V600H417zm540 0v135h172V600H957zm254 0v400h172V600h-172zM957 800v400h172V800H957zm254 265v135h172v-135h-172z";
	fgPath[7] = "M393 600v600h196V972h86v228h196V600H675v228h-86V600H393zm550 0v137h196V600H943zm268 0v400h196V600h-196zM943 800v400h196V800H943zm268 263v137h196v-137h-196z";
	fgPath[8] = "M370 600v600h220V980h60v220h220V600H650v220h-60V600H370zm560 0v140h220V600H930zm280 0v400h220V600h-220zM930 800v400h220V800H930zm280 260v140h220v-140h-220z";
	fgPath[9] = "M360 600v600h240V985h40v215h240V600H640v215h-40V600H360zm560 0v160h240V600H920zm280 0v400h240V600h-240zM920 800v400h240V800H920zm280 240v160h240v-160h-240z";

	var weightIndex = document.getElementById("fontWeight").selectedIndex;

	var fg = draw.path(fgPath[weightIndex]).attr({ fill: fgColor });

	if (animationBool()) {
		var bgAnime = setAnimateElement(bgColor,fgColor);
		var fgAnime = setAnimateElement(fgColor,bgColor);
		bg.add(bgAnime);
		fg.add(fgAnime);
	}

	var svg = draw.svg();
	//console.log(svg);
	return svg;
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

function placeSVG(bgColor,fgColor,holder) {
	var svg = createSVG(bgColor,fgColor);
	insertSVG(svg,holder);
	console.log("Animation:", animationBool());
}

function customPreview() {

	var bgColor = randomColor();
	var fgColor = randomColor();
	var holder = document.getElementById("svg-holder");

	var bgPicker = document.getElementById('bgColor');
	var fgPicker = document.getElementById('fgColor');

	bgPicker.value = bgColor;
	fgPicker.value = fgColor;
	console.log("Background color:", bgColor);
	console.log("Foreground color:", fgColor);

	// color animation
	var animator = document.getElementById('animation');
	placeSVG(bgColor,fgColor,holder);
	animator.addEventListener('change', function(event){
		placeSVG(bgColor,fgColor,holder);
	});

	// font weight selector
	var weightSelector = document.getElementById('fontWeight');
    var items = weightSelector.getElementsByTagName('option');
    var index = Math.floor(Math.random() * items.length); // random weight
    weightSelector.selectedIndex = index;
	placeSVG(bgColor,fgColor,holder);

	weightSelector.addEventListener('change', function(event){
		fontWeight = this.value;
		console.log("Font Weight:", fontWeight);
		placeSVG(bgColor,fgColor,holder);
	});

	// when manually change bgColor
	bgPicker.addEventListener("input", function() {
		bgColor = this.value;
		placeSVG(bgColor,fgColor,holder);
		console.log("Background color:", bgColor);
	});

	// when manually change fgColor
	fgPicker.addEventListener("input", function() {
		fgColor = this.value;
		placeSVG(bgColor,fgColor,holder);
		console.log("Foreground color:", fgColor);
	});

}

function createSvgUri(svg) {
	var svgURI = 'data:image/svg+xml;base64,' + btoa(svg);
	//console.log(svgURI);
	return svgURI;
}

function createMetadata(bgColor,fgColor) {

	var time = Date.now();

	var svgURI = document.getElementById("svg-preview").src;
	var fontWeight = Number(getFontWeight("fontWeight"));

	var uriObj = {};

	uriObj.name = "Hi!@" + time;
	uriObj.description = "On-chain SVG Hi! Simply customized & minted on https://hii.one";
	uriObj.image = svgURI;
	uriObj.external_url = "https://hii.one";

	var fontWeight = {
		trait_type: "Font Weight",
		value: fontWeight
	};

	var fgColorObj = {
		trait_type: "Color: Text",
		value: fgColor
	};

	var bgColorObj = {
		trait_type: "Color: Background",
		value: bgColor
	};

	uriObj.attributes = [ fontWeight, fgColorObj, bgColorObj ];

	var animator = document.getElementById('animation');
	if (animator.checked) {
		var feature1Obj = {
			trait_type: "Feature",
			value: "Color Animation"
		};
		uriObj.attributes.push(feature1Obj);
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

function setPrice(basePrice,tokenId,tokenBalance,account,owner) {
	var price = basePrice * 100;
	if (account === owner) {
		price = 0;
		console.log('Owner minting price:', price);
	}
	else if (!animationBool()) {
		if (tokenId >=1 && tokenId <= 300) {
			if (tokenBalance == 0) {
				price = 0;
				console.log('Your newly minting price:', price);
			}
			else {
				price = basePrice;
				console.log('Your next minting price:', price);
			}
		}
		else if (tokenId >=301 && tokenId <= 1000) {
			price = basePrice;
			console.log('Tier 2 minting price:', price);
		}
		else if (tokenId >=1001 && tokenId <= 3000) {
			price = basePrice * 10;
			console.log('Tier 3 minting price:', price);
		}
		else {
			console.log('Minting price:', price);
		}
	}
	else {
		if (tokenId >=1 && tokenId <= 300) {
			if (tokenBalance == 0) {
				price = basePrice;
				console.log('Your newly animation minting price:', price);
			}
			else {
				price = basePrice * 2;
				console.log('Your next animation minting price:', price);
			}
		}
		else if (tokenId >=301 && tokenId <= 1000) {
			price = basePrice * 2;
			console.log('Tier 2 animation minting price:', price);
		}
	
		else if (tokenId >=1001 && tokenId <= 3000) {
			price = basePrice * 10 * 2;
			console.log('Tier 3 animation minting price:', price);
		}
		else {
			price = basePrice * 100 * 2;
			console.log('Animation minting price:', price);
		}
	}
	//console.log('Minting price:', price);
	return price;
}

/*
function randomColorPreview() {
	var bgColor = randomColor();
	var fgColor = randomColor();
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
*/