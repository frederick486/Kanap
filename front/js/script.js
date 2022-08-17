
// requête de l'API
async function getListeArticle() {
    try {
        const httpBodyResponse = await fetch("http://localhost:3000/api/products")            
        const listeArticle = await httpBodyResponse.json()             
        return listeArticle
    } catch (error) {
        alert(error)
    }
}

// récupération de la promise de fetch, parcours de celle-ci et appel de displayArticle pour chaque élément
(async function () {
    const listeArticle = await getListeArticle()    
    for (article of listeArticle) {
        displayArticle(article)        
    }
})()

//affichage d'un article
function displayArticle(article) {
    document.getElementById("items").innerHTML += `
    <a href="./product.html?id=${article._id}">
        <article>
            <img src="${article.imageUrl}" alt="${article.altTxt}">
            <h3 class="productName">${article.name}</h3>
            <p class="productDescription">${article.description}</p>
        </article>
    </a>`    
}