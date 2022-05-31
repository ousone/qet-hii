/* Moralis init code */
const serverUrl = "https://dbjphwbbcywr.usemoralis.com:2053/server";
const appId = "BxTYqSfCxk7q5JVAu90SmO03Q8Elh8Qt5t8IhoCI";
Moralis.start({ serverUrl, appId });

let user = Moralis.User.current();

var btnLogin = document.getElementById("btn-login");
var btnLogout = document.getElementById("btn-logout");
var btnMint = document.getElementById("mint");
var wltAddr = document.getElementById("wallet-address");

btnLogin.style.display = "none";
btnLogout.style.display = "none";
btnMint.style.display = "none";
wltAddr.style.display = "none";

/* Authentication code */
async function login() {
  if (!user) {
    btnLogin.style.display = "block";
    btnLogout.style.display = "none";
    user = await Moralis.authenticate({
      signingMessage: "Hi there! Sign this message to prove you have access to this wallet and we’ll log you in. This won’t cost you anything.",
    })
      .then(function (user) {
        console.log("Logged in user:", user);
        console.log(user.get("ethAddress"));
        btnLogin.style.display = "none";
        btnLogout.style.display = "block";
        btnMint.style.display = "block";
        wltAddr.style.display = "block";
        wltAddr.textContent = "Your wallet address: " + user.get("ethAddress");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("Logged out");
  btnLogin.style.display = "block";
  btnLogout.style.display = "none";
  btnMint.style.display = "none";
  wltAddr.style.display = "none";
}

// bind button click handlers
btnLogin.onclick = login;
btnLogout.onclick = logOut;

if (window.ethereum) {
  // remove MetaMask download link
  var dlink = document.querySelector("#metamask-download");
	if (dlink){
		dlink.remove();
	}
  // buttons handle
  if (!user) {
    btnLogin.style.display = "block";
    //btnLogout.style.display = "none";
    console.log("Not logged in");
  } else {
    btnLogin.style.display = "none";
    btnLogout.style.display = "block";
    btnMint.style.display = "block";
    wltAddr.style.display = "block";
    wltAddr.textContent = "Your wallet address: " + user.get("ethAddress");
    console.log("Logged in user:", user);
    console.log("Wallet address:", user.get("ethAddress"));
  }
}
