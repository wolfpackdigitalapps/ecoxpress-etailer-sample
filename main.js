var ecoXpressWindow;
var basePath = "https://wp-development.ecoxpress.ie";
var ecoAgentMapLocation = "/simple-g-map";
var sessionId = "MY_SESSION_ID";
var etailerToken = "MY_ETAILER_TOKEN";
var eircode = "CUSTOMER_EIRCODE" || "";
var popupWidth = "750";
var popupHeight = "500";

function openMap() {
  ecoXpressWindow = window.open(
    `${basePath}${ecoAgentMapLocation}?session_id=${sessionId}&eircode=${eircode}&token=${etailerToken}`,
    "Select your shipping location", 
    `width=${popupWidth},height=${popupHeight}`);
}

function toggleEcoXpressIframe() {
  var map = document.getElementById('eco-xpress-map-eco-agent-selector');
  map.style.display = map.style.display === "none" ? "block" : "none";
}

window.addEventListener("message", function (e) {
  // for security reasons ignore messages from other sources
  if (e.origin !== basePath) return;
  if (e.data.type && e.data.type === "LOCATION_SELECTED") {
    if (ecoXpressWindow) ecoXpressWindow.close();
    var ecoAgent = e.data.ecoAgent;

    document.getElementById('eco-xpress-location-selected').innerHTML = `${ecoAgent.location} ${ecoAgent.eircode} ${ecoAgent.ecoAgentId}`;
    document.getElementById('complete-order-button').removeAttribute("disabled");
  }
});

window.onload = (event) => {
  var map = document.getElementById('eco-xpress-map-eco-agent-selector');
  map.setAttribute("src", `${basePath}${ecoAgentMapLocation}?session_id=${sessionId}&eircode=${eircode}&token=${etailerToken}`);
  map.setAttribute("width", popupWidth);
  map.setAttribute("height", popupHeight);
}
