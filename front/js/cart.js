
let basket = JSON.parse(localStorage.getItem("basket"))

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
    //fin Récupération des infots de l'article depuis l'API

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
        
        `
        // SUPPRESSION ET MODIFICATION QUANTITE D'UN ARTICLE ------------------------------------------------------  
        if(i == basket.length - 1) {
            // suppression -----------------------------------------------------------------------------------------    
            // (ATTENTION AU . DEVANT deleteItem)
            let articleDelleted = document.querySelectorAll('.deleteItem')
            console.log(articleDelleted)

            for (let l = 0; l < articleDelleted.length; l++) {
                articleDelleted[l].addEventListener("click", (event) => {
                    event.preventDefault();
                    console.log(articleDelleted[l]);
                    // articleDelleted.splice(l,1); // => Uncaught TypeError: articleDelleted.splice is not a function                    
                    // articleDelleted = articleDelleted.filter(p => articleDelleted[l] != articleDelleted)
                    basket.splice(l, 1);
                    localStorage.setItem("basket", JSON.stringify(basket));
                });  
            }   
            // fin suppression ---------------------------------------------------------------------------------------    

            // modif quantité ----------------------------------------------------------------------------------------    
            let modifQty = document.getElementsByName('itemQuantity')
            console.log(modifQty)
           
            for (let l = 0; l < modifQty.length; l++) {

                // console.log(modifQty[l].innerHTML);

                modifQty[l].addEventListener("input", (event) => {
                    event.preventDefault();
                    var qtyArt = event.target.value;
                    console.log(modifQty[l].innerHTML);

                    basket[l][2] = qtyArt;
                    localStorage.setItem("basket", JSON.stringify(basket));
                })

            }
            // fin modif quantité -------------------------------------------------------------------------------------   

        }
        // FIN SUPPRESSION ET MODIFICATION QUANTITE D'UN ARTICLE ------------------------------------------------------  

    }
    // fin affichage ---------------------------------------------------------------------

}
// FIN DE BOUCLE FOR ///////////////////////////////////////////////////////////////////////////////////////////////////