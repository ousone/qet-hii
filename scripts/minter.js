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

		customPreview();
		setPrice(BASEPRICE,tokenId,tokenBalance,account,owner);
		
		document.getElementById('preview').onclick = async () => {
			customPreview();
			setPrice(BASEPRICE,tokenId,tokenBalance,account,owner);
		}

		document.getElementById('mint').onclick = async () => {
			var bgColor = String(document.getElementById('bgColor').value).toUpperCase();
			var fgColor = String(document.getElementById('fgColor').value).toUpperCase();
			var uri = createTokenUri(bgColor,fgColor);
			var price = getPrice();
			console.log(uri, bgColor, fgColor, animationBool());
			contract.methods.mint(uri, bgColor, fgColor, animationBool()).send({ from: account, value: String(price)});
        }

    }
})();