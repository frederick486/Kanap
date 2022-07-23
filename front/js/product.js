

(async function() {
    const articleId = getArticleId()
    console.log(articleId)
    const article = await getArticle(articleId)
    console.log(article)
    displayArticle(article)
})()


function getArticleId() {
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


function displayArticle(article) {
    document.getElementById("title").innerHTML = article.name
    document.getElementById("price").innerHTML = article.price
    document.getElementById("description").innerHTML = article.description
    document.querySelector(".item__img").innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`

    for (let i = 0; i < article.colors.length; i++) {
        document.getElementById("colors").innerHTML += `<option value="${article.colors[i]}">${article.colors[i]}</option>`        
    }

}