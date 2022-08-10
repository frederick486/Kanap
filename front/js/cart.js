
let basket = JSON.parse(localStorage.getItem("basket"))

let totalPrice = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

for (let i = 0; i < basket.length; i++) {
     
    let id = basket[i][0]
    let color = basket[i][1]
    let qty = basket[i][2]

    // ???????? article est déclaré mais sa valeur n'est jamais lue, 
    // pourtant quand on la supprime, l'affichage ne fonctionne plus ...
    let article


    (async function() {
        const article = await getArticle(id)
        console.log(article)
        displayArticle(article)
    })()

    //Récupération des infots de l'article depuis l'API
    async function getArticle() {
        try {
            const httpBodyResponse = await fetch(`http://localhost:3000/api/products/${id}`)
            const article = await httpBodyResponse.json()
            return article
        } catch (error) {
            alert(error)
        }
    } //fin Récupération des infots de l'article depuis l'API
    

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

        if(i == basket.length - 1)
        {
            delletArticle();

            modifQuantity();

        }

        totalPrice += article.price * basket[i][2];    
        document.getElementById('totalPrice').innerHTML = totalPrice;

    } // fin display()

} // fin boucle for()


totalQuantity()


function totalQuantity() {
    let totalQty = 0;
    for (let i = 0; i < basket.length; i++) {
        totalQty = +totalQty + +basket[i][2]       
    }

    document.getElementById('totalQuantity').innerHTML = totalQty;
}


function delletArticle() {
    let articleDelleted = document.querySelectorAll('.deleteItem') // <<< ATTENTION AU . DEVANT deleteItem

    for (let l = 0; l < articleDelleted.length; l++) {

        articleDelleted[l].addEventListener("click", (event) => {
            event.preventDefault();
            basket.splice(l, 1);
            localStorage.setItem("basket", JSON.stringify(basket));
        });  
    }   
}
   

function modifQuantity() {
    let modifQty = document.getElementsByName('itemQuantity')
    console.log(modifQty)
   
    for (let l = 0; l < modifQty.length; l++) {

        modifQty[l].addEventListener("input", (event) => {
            event.preventDefault();
            var qtyArt = event.target.value;
            // console.log(modifQty[l].innerHTML);

            basket[l][2] = qtyArt;
            localStorage.setItem("basket", JSON.stringify(basket));
        })
    } 
}  


// FORMULAIRE//////////////////////////////////////////////////////////////////////////////////////////////////////////

// console.log(this.value);
// console.log(regexName.test(this.value));
//console.log( );

const regexName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/i;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexAddresse = /^[a-zA-Z0-9\s\,\''\-]*$/;

let testFirstName = testLastName = testAdress = testCity = testEmail = false;

document.getElementById("firstName").addEventListener("change", function() {

    let messageError = document.getElementById("firstNameErrorMsg");

    if(!regexName.test(this.value)) {
        messageError.innerHTML = "VEUILLEZ REMPLIR CORRECTEMENT CE CHAMP";
        return false;
    }else {
        messageError.innerHTML = null;
        testFirstName = true;
        return true;
    }
})


document.getElementById("lastName").addEventListener("change", function() {

    let messageError = document.getElementById("lastNameErrorMsg");

    if(!regexName.test(this.value)) {
        messageError.innerHTML = "VEUILLEZ REMPLIR CORRECTEMENT CE CHAMP";
        return false;
    }else {
        messageError.innerHTML = null;
        testLastName = true;
        return true;
    }
})


document.getElementById("address").addEventListener("change", function() {

    let messageError = document.getElementById("addressErrorMsg");

    if(!regexAddresse.test(this.value)) {
        messageError.innerHTML = "VEUILLEZ REMPLIR CORRECTEMENT CE CHAMP";
        return false;
    }else {
        messageError.innerHTML = null;
        testAdress = true;
        return true;
    }
})


document.getElementById("city").addEventListener("change", function() {

    let messageError = document.getElementById("cityErrorMsg");

    if(!regexAddresse.test(this.value)) {
        messageError.innerHTML = "VEUILLEZ REMPLIR CORRECTEMENT CE CHAMP";
        return false;
    }else {
        messageError.innerHTML = null;
        testCity = true;
        return true;
    }
})


document.getElementById("email").addEventListener("change", function() {

    let messageError = document.getElementById("emailErrorMsg");

    if(!regexEmail.test(this.value)) {
        messageError.innerHTML = "VEUILLEZ REMPLIR CORRECTEMENT CE CHAMP";
        return false;
    }else {
        messageError.innerHTML = null;
        testEmail = true;
        return true;
    }
})


// récupération de l'élément <input [...] id="order">
const order = document.getElementById("order");

const tabId = []

for (let i = 0; i < basket.length; i++) {
    tabId[i] = basket[i][0];    
}

console.log(tabId);

// au click sur le bouton <input [...] id="order">
order.addEventListener("click", (e) => {
    e.preventDefault();

    let bodyEnvoie = {
        contact: {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        },
        products: tabId
        // products: ["107fb5b75607497b96722bda5b504926"] // pour essais
    }


    if(testFirstName && testLastName && testAdress && testCity && testEmail) {
    // Si tout ok => envoi vers l'API  ...

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
            window.location.href = "../html/confirmation.html" + "?orderId=" + orderId
        })
        .catch((err) => console.log(err))

    }else { // Sinon message d'erreur
        alert('FORMULAIRE MAL RENSEIGNE')
    }

}) // fin du order.addEventListener("click" ...)


/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */