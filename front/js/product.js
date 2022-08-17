// récupération de l'id de l'article dans l'URL de la page
function getArticleId() {
    return new URL(location.href).searchParams.get("id")
}


// récupération de l'id de l'article dans variable articleId
// récupération de la promise de fetch, appel displayArticle pour l'article en cour
(async function() {
    const articleId = getArticleId()
    const article = await getArticle(articleId)
    displayArticle(article)
})()


// requête de l'API sur l'article en cours
async function getArticle(articleId) {
    try {
        const httpBodyResponse = await fetch(`http://localhost:3000/api/products/${articleId}`)
        const listeArticle = await httpBodyResponse.json()
        return listeArticle
    } catch (error) {
        alert(error)
    }
}


// affichage de l'article
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

// Récupération de la couleur
function colorValue() {
    let color = document.getElementById("colors").value
    return color
}

// Récupération de la quantité 
function qtyValue() {
    let qty = document.getElementById("quantity").value
    return qty
}

// envoie dans le localStorage
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket))
    alert("Ajout au panier")
}


////////////////////////////////////////////////////////////
// Envoi dans le localStorage   
////////////////////////////////////////////////////////////

// au clic du bouton "ajouter au panier"
document.getElementById("addToCart").addEventListener("click", () => {

    // si aucune couleur n'est sélectionnée
    if(colorValue() == "") {
        alert('Veuillez selectionner une couleur')
        return false;
    // si la quantité n'est pas correctement renseignée
    }else if(qtyValue() <= 0 || qtyValue() > 100) {
        alert('Veillez saisir une quantité comprise entre 1 et 100');
        return false;
    }else {
        let basket = JSON.parse(localStorage.getItem("basket"))
        let newArticle = [getArticleId(), colorValue(), qtyValue()]

        let articleExistant = false
    
        // si panier vide
        if(basket == null) {
            basket = []
            basket.push(newArticle)
            saveBasket(basket)
        } else {
            for (let i = 0; i < basket.length; i++) {
                // sinom : vérification si article similaire dans panier
                if(basket[i][0] == getArticleId() && basket[i][1] == colorValue() ) {
                    basket[i][2] = Number(qtyValue()) + Number(basket[i][2])
                    saveBasket(basket)
                    articleExistant = true
                    break
                }            
            }   
            // si le panier contient au moins 1 article différent
            if (articleExistant == false) {
                basket.push(newArticle)
                saveBasket(basket)
            }
        }
    }
})