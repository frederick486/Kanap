// récupération depuis le localStorage /!\
var items = []

items = JSON.parse(localStorage.getItem("basket"))
// items = localStorage.getItem("basket")

console.log(items)

let id = items[0]
let qty = items[1]
let color = items[2]

console.log("id = ", id)
console.log("quantité = ", qty)
console.log("couleur = ", color)

let article

///////////////////////////////////////////////////////////

(async function() {
    // const articleId = getArticleId()
    // console.log(articleId)
    const article = await getArticle(id)
    console.log(article)
    displayArticle(article)
})()


//Récupération des infots de l'article depuis l'API
function getArticle() {
    return fetch(`http://localhost:3000/api/products/${id}`)      
        .then(function(httpBodyResponse) {                  
            return httpBodyResponse.json()                 
        })        
        .then(function(article) {                     
            return article                     
        })
        .catch(function(error) {                            
            alert(error)
        })
}

///////////////////////////////////////////////////

//AFFICHAGE
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
            <p>${article.price} €</p>
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
    
    `    
}




