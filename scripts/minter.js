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

(async () => {

    if (window.ethereum) {

        window.web3 = new Web3(window.ethereum);

        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        //document.getElementById('wallet-address').textContent = "Your wallet address: " + account;
        
        contract = new web3.eth.Contract(ABI, ADDRESS);
        var owner = await contract.methods.owner().call();
		console.log("Contract owner:", owner);

        const SUPPLYLIMIT = Number(await contract.methods.SUPPLYLIMIT().call());
		console.log('Supply Limit:', SUPPLYLIMIT);

		var totalSupply = Number(await contract.methods.totalSupply().call());
		console.log('Total Supply:', totalSupply);

		var tokenId = totalSupply + 1;

		const BASEPRICE = Number(await contract.methods.BASEPRICE().call());
		console.log('Base price:', BASEPRICE);

		var tokenBalance = await contract.methods.balanceOf(account).call();
		console.log('Your account token balance:', tokenBalance);

        var price = setPrice(BASEPRICE,tokenId,tokenBalance,account,owner);

        document.getElementById('mint').onclick = async () => {
			var bgColor = String(document.getElementById('bgColor').value).toUpperCase();
			var fgColor = String(document.getElementById('fgColor').value).toUpperCase();
			var uri = createTokenUri(bgColor,fgColor);
			//var price = getPrice();
			console.log(uri, bgColor, fgColor, animationBool());
			contract.methods.mint(uri, bgColor, fgColor, animationBool()).send({ from: account, value: String(price)});
        }
    }

})();