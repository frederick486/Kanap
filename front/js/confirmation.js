// fonction récupération de l'identifiant de commande dans l'URL
function getOrderId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderId = urlParams.get("orderId");
    return orderId;
}

// affichage identifiant de commande dans le DOM
function displayOrderId(orderId) {
    const orderIdElement = document.getElementById('orderId');
    orderIdElement.textContent = orderId;
}

// appels de fonctions
const orderId = getOrderId()
displayOrderId(orderId);

// suppression du localStorage après commande
localStorage.clear();
