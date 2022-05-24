(async () => {

    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);

        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        document.getElementById('wallet-address').textContent = account;

        contract = new web3.eth.Contract(ABI, ADDRESS);
        var owner = await contract.methods.owner().call();

		const SUPPLYLIMIT = Number(await contract.methods.SUPPLYLIMIT().call());
		console.log('Supply Limit:', SUPPLYLIMIT);

		var totalSupply = Number(await contract.methods.totalSupply().call());
		console.log('Total Supply:', totalSupply);

		var tokenId = totalSupply + 1;

		const BASEPRICE = Number(await contract.methods.BASEPRICE().call());
		console.log('Base price:', BASEPRICE);

		var tokenBalance = await contract.methods.balanceOf(account).call();
		console.log('Your account token balance:', tokenBalance);

		function getPriceTest() {

			var price = BASEPRICE * 100;

			if (account === owner) {
				price = 0;
				console.log('Owner minting price:', price);
			}

			else if (!animationBool()) {

				if (tokenId >=1 && tokenId <= 2) {
					if (tokenBalance == 0) {
						price = 0;
						console.log('Your newly minting price:', price);
					}
					else {
						price = BASEPRICE;
						console.log('Your next minting price:', price);
					}
				}

				else if (tokenId >=3 && tokenId <= 4) {
					price = BASEPRICE;
					console.log('Tier 2 minting price:', price);
				}
			
				else if (tokenId >=5 && tokenId <= 6) {
					price = BASEPRICE * 10;
					console.log('Tier 3 minting price:', price);
				}
			
				else {
					console.log('Minting price:', price);
				}

			}
			else {
				if (tokenId >=1 && tokenId <= 2) {
					if (tokenBalance = 0) {
						price = BASEPRICE;
						console.log('Your newly animation minting price:', price);
					}
					else {
						price = BASEPRICE * 2;
						console.log('Your next animation minting price:', price);
					}
				}
				else if (tokenId >=3 && tokenId <= 4) {
					price = BASEPRICE * 2;
					console.log('Tier 2 animation minting price:', price);
				}
			
				else if (tokenId >=5 && tokenId <= 6) {
					price = BASEPRICE * 10 * 2;
					console.log('Tier 3 animation minting price:', price);
				}
				else {
					price = BASEPRICE * 100 * 2;
					console.log('Animation minting price:', price);
				}

			}

			return price;
			
		}

		customPreview();
		getPriceTest();
		
		document.getElementById('preview').onclick = async () => {
			customPreview();
			getPriceTest();
		}

		document.getElementById('mint').onclick = async () => {
			var bgColor = String(document.getElementById('bgColor').value).toUpperCase();
			var fgColor = String(document.getElementById('fgColor').value).toUpperCase();
			var uri = createTokenUri(bgColor,fgColor);
			var price = getPriceTest();

			console.log(uri, bgColor, fgColor, animationBool());
			
            //contract.methods.mint(uri, bgColor, fgColor).send({ from: account, value: String(price), gas: 2*(10**7), gasPrice: 25*(10**8)});
			contract.methods.mint(uri, bgColor, fgColor, animationBool()).send({ from: account, value: String(price)});
        }

    }
})();