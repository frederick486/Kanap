

(async function() {
    const articleId = getArticleId()
    console.log(articleId)
    const article = await getArticle(articleId)
    console.log(article)
    displayArticle(article)
})()


function getArticleId() {
    // location.href <=> URL de la page courrante
    return new URL(location.href).searchParams.get("id")
}


function getArticle(articleId) {
    return fetch(`http://localhost:3000/api/products/${articleId}`)      
        .then(function(httpBodyResponse) {                  
            return httpBodyResponse.json()                 
        })        
        .then(function(listeArticle) {                     
            return listeArticle                     
        })
        .catch(function(error) {                            
            alert(error)
        })
}


// affichage 
function displayArticle(article) {
    document.getElementById("title").innerHTML = article.name
    document.getElementById("price").innerHTML = article.price
    document.getElementById("description").innerHTML = article.description
    document.querySelector(".item__img").innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`

    for (let i = 0; i < article.colors.length; i++) {
        document.getElementById("colors").innerHTML += `<option value="${article.colors[i]}">${article.colors[i]}</option>`        
    }
}


////////////////////////////////////////////////////////////
// Envoi dans le localStorage
////////////////////////////////////////////////////////////

const toCardBtn = document.getElementById("addToCart")

function qtyValue() {
    let qty = document.getElementById("quantity")
    return qty.value
}


function colorValue() {
    let color = document.getElementById("colors")
    return color.value
}


// au clic du bouton avec id=click
toCardBtn.addEventListener("click", () => {
    // Envoi de l'id, quantité et couleur dans le localStorage 
    // Version 1 --------------------------------------------------------
    // const articleId = getArticleId()
    // localStorage.setItem("id", articleId)
    // const qty = qtyValue()
    // localStorage.setItem("Quantity", qty)
    // const color = colorValue()
    // localStorage.setItem("Color", color)
    // Version 2 ---------------------------------------------------------
    // var basket = {"id": articleId, "Quantity": qty, "Color":color}

    // Envoi id, quantité et couleur dans un tableau 
    var items = [getArticleId(), qtyValue(), colorValue()]
    // Essais antérieurs (ne fonctionnent pas) ----------------------------
    // var items = {"id": getArticleId(), "Quantity": qtyValue(), "Color":colorValue()}
    // var items = [{"id": getArticleId()}, {"Quantity": qtyValue()}, {"Color":colorValue()}]

    // Transformation du tableau en chaine de caractère et envoi dans le localstorage
    localStorage.setItem("basket", JSON.stringify(items))
    // localStorage.setItem("basket", items)

})


// // envoie dans le localStorage
// function saveBasket(basket) {
//     localStorage.setItem("basket", JSON.stringify(basket))
// }


// function addBasket(product) {
//     let basket = getBasket()
//     let foundProduct = basket.find(p => p.id == product.id)
//     if(foundProduct != undefined){
//         foundProduct.quantity++
//     } else{
//         product.quantity = 1
//         basket.push(product)
//     }
//     saveBasket(basket)
// }

// function removeFromBasket(product) {
//     let basket = getBasket()
//     basket = basket.filter(p => p.id != product.id)
//     saveBasket(basket)
// }

// function changeQuantity(product, quantity) {
//     let basket = getBasket()
//     let foundProduct = basket.find(p => p.id == product.id)
//     if(foundProduct != undefined){
//         foundProduct.quantity += quantity
//         if(foundProduct.quantity <= 0){
//             removeFromBasket(foundProduct)
//         } else {
//             saveBasket(basket)
//         }
//     } 
// }

// function getNumberProduct() {
//     let basket = getBasket()
//     let number = 0
//     for (let product of basket) {
//         number += product.quantity        
//     }
//     return number
// }

// function getTotalPrice(){
//     let basket = getBasket()
//     let total = 0
//     for (let product of basket) {
//         total += product.quantity * product.price        
//     }
//     return total
// }
