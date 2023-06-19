// Récupération du contenu du localStorage
let basket = JSON.parse(localStorage.getItem("basket"))

let totalPrice = 0;

//Récupération des infots de l'article en cours de traitement depuis l'API
async function getArticle(a) {
    try {
        const httpBodyResponse = await fetch(`http://localhost:3000/api/products/${a}`)
        const article = await httpBodyResponse.json()
        return article
    } catch (error) {
        alert(error)
    }
} //fin Récupération des infots de l'article depuis l'API

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if(basket != null) {
    for (let i = 0; i < basket.length; i++) {
     
        // récupération de l'id, couleur et quantité de l'article à l'indice [i]
        let id = basket[i][0]
        let color = basket[i][1]
        let qty = basket[i][2]
                   
        // affichage ---------------------------------------------------------------------
        function displayArticle(article) {
    
            document.getElementById("cart__items").innerHTML += `
    
                <article class="cart__item" data-id="${id}" data-color="${color}">
                    <div class="cart__item__img">
                    <img src="${article.imageUrl}" alt="${article.altTxt}">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${article.name}</h2>
                        <p>${color}</p>
                        <p>${article.price * qty} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${qty}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article> 
                
                ` // <<< ATTENTION A L'APOSTROPHE 

            // si l'itération est terminée
            if(i == basket.length - 1) {
                delletArticle();
                modifQuantity();
            }

            // Affichage du prix total
            totalPrice += article.price * basket[i][2];    
            document.getElementById('totalPrice').innerHTML = totalPrice;
    
        } // fin display()    

        (async function() {
            const article = await getArticle(id)
            displayArticle(article)
        })()

    } // fin boucle for()
} // fin du if(basket != null)


// Calcul quantité totale des articles
function totalQuantity() {
    let totalQty = 0;
    if(basket != null) {
        for (let i = 0; i < basket.length; i++) {
            totalQty += Number(basket[i][2])     
        }
    }

    document.getElementById('totalQuantity').innerHTML = totalQty;
}

totalQuantity()


// suppression d'un article au click sur le bouton "supprimer
function delletArticle() {
    let articleDelleted = document.querySelectorAll('.deleteItem') // <<< ATTENTION AU . DEVANT deleteItem
    
    for (let l = 0; l < articleDelleted.length; l++) {

        articleDelleted[l].addEventListener("click", (event) => {
            event.preventDefault();
            basket.splice(l, 1);
            localStorage.setItem("basket", JSON.stringify(basket));
            window.location.reload();
        });  
    }   
}
   
// modification quantité d'article au changement de la valeur du champ
function modifQuantity() {
    let modifQty = document.getElementsByName('itemQuantity')
   
    for (let l = 0; l < modifQty.length; l++) {

        modifQty[l].addEventListener("change", (event) => {
            event.preventDefault();
                    
            let qtyArt = event.target.value;
        
            if(qtyArt <= 0 || qtyArt > 100) {
                alert('Veuillez saisir une quantité comprise entre 1 et 100')
                window.location.reload();
                return false                    
            }else {
                basket[l][2] = qtyArt;
                localStorage.setItem("basket", JSON.stringify(basket));
                window.location.reload();
            }                

        })
    }     
}  

// FORMULAIRE //////////////////////////////////////////////////////////////////////////////////

// création des Regex
const regexName = /^[^-\s][A-Za-z\-\séèêëïü'çà]*$/;
const regexEmail = /^[^-\s][\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexAddresse = /^[^-\s][a-zA-Z0-9\s\,\''\-]*$/;

// Variables pour tests regex
let testFirstName = testLastName = testAdress = testCity = testEmail = false;


// Saisie prénom
document.getElementById("firstName").addEventListener("input", function() {

    let messageError = document.getElementById("firstNameErrorMsg");

    if(regexName.test(this.value) && this.value != "") {
        messageError.innerHTML = null;
        testFirstName = true;
        return true;
    }else {
        messageError.innerHTML = "Entrez un prénom valide (sans chiffre ou caractère spéciaux)";
        testFirstName = false;
        return false;
    }
})


// Saisie nom
document.getElementById("lastName").addEventListener("input", function() {

    let messageError = document.getElementById("lastNameErrorMsg");

    if(regexName.test(this.value) && this.value != "") {
        messageError.innerHTML = null;
        testLastName = true;
        return true;
    }else {
        messageError.innerHTML = "Entrez un nom valide (sans chiffre ou caractère spéciaux)";
        testLastName = false;
        return false;
    }
})


// Saisie adresse
document.getElementById("address").addEventListener("input", function() {

    let messageError = document.getElementById("addressErrorMsg");

    if(regexAddresse.test(this.value) && this.value != "") {
        messageError.innerHTML = null;
        testAdress = true;
        return true;
    }else {
        messageError.innerHTML = "Entre une adresse valide";
        testAdress = false;
        return false;
    }
})


// Saisie ville
document.getElementById("city").addEventListener("input", function() {

    let messageError = document.getElementById("cityErrorMsg");

    if(regexAddresse.test(this.value) && this.value != "") {
        messageError.innerHTML = null;
        testCity = true;
        return true;
    }else {
        messageError.innerHTML = "Entrez un nom de ville valide";
        testCity = false;
        return false;
    }
})


// Saisie adresse mail
document.getElementById("email").addEventListener("input", function() {

    let messageError = document.getElementById("emailErrorMsg");

    if(regexEmail.test(this.value) && this.value != "") {
        messageError.innerHTML = null;
        testEmail = true;
        return true;
    }else {
        messageError.innerHTML = "Entrez une adresse e-email valide";
        testEmail = false;
        return false;
    }
})


// au click sur le bouton <input [...] id="order">
document.getElementById("order").addEventListener("click", (e) => {

    e.preventDefault();

    // basket == null <=> cas ou l'utilisateur ouvre la page panier sans avoir ajouté d'article
    // basket.length == 0 <=> cas ou l'utilisateur à supprimé tous les articles du panier
    if((basket == null) || (basket.length == 0)){
        alert("Vous n'avez aucun article à passer en commande");
        
    // Si tout ok => envoi vers l'API  ...
    }else if (  testFirstName && 
                testLastName && 
                testAdress && 
                testCity && 
                testEmail ) {

        // création de l'array de string product
        const tabId = []
        for (let i = 0; i < basket.length; i++) {
            tabId[i] = basket[i][0];    
        }    

        // création de l'envoi
        let bodyEnvoie = {
            contact: {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value
            },
            products: tabId
        }
    
        // requête API
        fetch('http://localhost:3000/api/products/order', {
            method: "POST",
            body: JSON.stringify(bodyEnvoie),
            headers: {
                'Content-Type': 'application/json'
            }        
        })
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId
            // console.log("data", data)
            window.location.href = "../html/confirmation.html" + "?orderId=" + orderId
        })
        .catch((err) => console.log(err))

    }else {
        alert("Merci de compléter le formulaire");          
    }

}) // fin du order.addEventListener("click" ...)