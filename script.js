window.addEventListener("load", analyzeInternetConnection);

function defaultInternetConnection(
  internetStatus,
  internetIpAddress,
  internetSpeed,
) {
  internetStatus.textContent = "Disconnected";
  internetIpAddress.textContent = "-";
  internetSpeed.textContent = "-";
}

function analyzeInternetConnection() {
  const internetStatus = document.getElementById("internetStatus");
  const internetIpAddress = document.getElementById("internetIpAddress");
  const internetSpeed = document.getElementById("internetSpeed");

  internetStatus.textContent = "Checking...";
  if (navigator.onLine) {
    fetch("https://api.ipify.org?format=json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response error");
        return res.json();
      })
      .then((data) => {
        internetStatus.textContent = "Connected";
        internetIpAddress.textContent = data.ip;

        /*
            navigator.connection: used by modern browsers like Chrome and Edge.
            navigator.mozConnection: used by  older Mozilla/Firefox browsers.
            navigator.webkitConnection: used by  WebKit browsers (early Chrome/Safari).
      */
        const connection =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection;

        // Assign value safely only if connection exists
        const netSpeed = connection ? connection.downlink : null;

        internetSpeed.textContent = netSpeed ? netSpeed + " Mbps"  : "Unknown";
      })
      .catch((error) => {
        // Pass an anonymous function so it executes ONLY when a catch triggers
        console.error("Fetch failed:", error);
        defaultInternetConnection(
          internetStatus,
          internetIpAddress,
          internetSpeed,
        );
      });
  } else {
    // Always remember to trigger your offline UI defaults if navigator.onLine is false
    defaultInternetConnection(internetStatus, internetIpAddress, internetSpeed);
  }
}
