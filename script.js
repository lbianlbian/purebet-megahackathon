var globalKey;
var globalProvider;
var connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("testnet"), "confirmed");
var programID = new solanaWeb3.PublicKey("FxQDLqSJ2Y3Hn4vUZHVVMhzaUnvhbbhG1yiFad2uHfFy");


function phantom_connect() {

  // Check for Solana & Phantom
  var provider = () => {
    if ("solana" in window) {
      var provider = window.solana;
	globalProvider = provider;
      if (provider.isPhantom) {
        return provider;
      } else {
        return false;
      }
    }
    window.open("https://phantom.app", "_blank");
  };

  var phantom = provider();

  if (phantom !== false) {

    console.log("Phantom Wallet Found, Connecting..");

    try {

      // Connect to Solana
      var connect_wallet = phantom.connect();

      // After Connecting
      phantom.on("connect", () => {

        // Check Connection
        console.log("Phantom Connected: " + phantom.isConnected);

        // Get Wallet Address
        var wallet_address = phantom.publicKey.toString();
	document.getElementById("wallet").innerHTML = wallet_address;
	globalKey = phantom.publicKey;
        
     });
     } catch (err) {
        console.log("Connection Cancelled!");
    }
  }
}
