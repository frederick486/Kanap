// la fonction main() s'exécute dès le chargement de la page
main()


async function main() {
    const listeArticle = await getListeArticle()

    for (article of listeArticle) {
        displayArticle(article)        
    }
}


function getListeArticle() {
    return fetch("http://localhost:3000/api/products")      // <= fetch() vas chercher les infots à l'Url spécifiée
        .then(function(httpBodyResponse) {                  // <= la fonction dans then prend en paramètre le body de la réponse http
            return httpBodyResponse.json()                  // <= transforme le body en JSON
        })        
        .then(function(listeArticle) {                      // <= on récupère le JSON du dessus (articles)
            return listeArticle                     
        })
        .catch(function(error) {                            // <= affichage si erreur
            alert(error)
        })
}


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