function createLoginButton() {
	var button = document.createElement("button");
    button.classList.add("login");
    button.textContent = "Login with MetaMask";
    document.querySelector('header').appendChild(button);

    button.addEventListener('click', connect);
}

function connect() {
    ethereum
        .request({ method: 'eth_requestAccounts'})
        .catch((err) => {
            if (err.code === 4001) {
                console.log('Please connect to MetaMask.');
            } else {
                console.error(err);
            }
        });
}

(async () => {

    if (window.ethereum) {

		// remove metamask dl link
		document.getElementById("metamask-download").remove();

		window.web3 = new Web3(window.ethereum);
		var accounts = await web3.eth.getAccounts();
		account = accounts[0];

		if (account) {
			console.log(account)
		}
		else {
			//await ethereum.request({ method: 'eth_requestAccounts' });
			console.log("Not logged in.")

			// create login button
			createLoginButton();
		}
        //await window.ethereum.send('eth_requestAccounts');
		
        

        //var accounts = await web3.eth.getAccounts();
        //account = accounts[0];
        //document.getElementById('wallet-address').textContent = account;

        contract = new web3.eth.Contract(ABI, ADDRESS);
        var owner = await contract.methods.owner().call();
		//console.log(owner)

		const SUPPLYLIMIT = Number(await contract.methods.SUPPLYLIMIT().call());
		console.log('Supply Limit:', SUPPLYLIMIT);

		var totalSupply = Number(await contract.methods.totalSupply().call());
		console.log('Total Supply:', totalSupply);

		var tokenId = totalSupply + 1;

		const BASEPRICE = Number(await contract.methods.BASEPRICE().call());
		console.log('Base price:', BASEPRICE);

		var tokenBalance = await contract.methods.balanceOf(account).call();
		console.log('Your account token balance:', tokenBalance);

		//preview();
		var price = setPrice(BASEPRICE,tokenId,tokenBalance,account,owner);
		
		/*
		document.getElementById('preview').onclick = async () => {
			preview();
			setPrice(BASEPRICE,tokenId,tokenBalance,account,owner);
		}*/

		/*
		document.getElementById('mint').onclick = async () => {
			var bgColor = String(document.getElementById('bgColor').value).toUpperCase();
			var fgColor = String(document.getElementById('fgColor').value).toUpperCase();
			var uri = createTokenUri(bgColor,fgColor);
			//var price = getPrice();
			console.log(uri, bgColor, fgColor, animationBool());
			contract.methods.mint(uri, bgColor, fgColor, animationBool()).send({ from: account, value: String(price)});
        }
		*/

    }
})();