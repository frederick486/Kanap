
let basket = JSON.parse(localStorage.getItem("basket"))


for (let i = 0; i < basket.length; i++) {
     
    let id = basket[i][0]
    let color = basket[i][1]
    let qty = basket[i][2]

/////////////////////////////////////////////////////////////////////////////////////

    // ???????? article est déclaré mais sa valeur n'est jamais lue, 
    // pourtant quand on la supprime, l'affichage ne fonctionne plus ...
    let article


    (async function() {
        const article = await getArticle(id)
        // console.log(article)
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

/////////////////////////////////////////////////////////////////////////////////////

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
}