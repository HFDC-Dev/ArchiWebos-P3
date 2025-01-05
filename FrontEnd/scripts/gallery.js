// Utilisation de fetch pour récupérer des données depuis une API
fetch('http://localhost:5678/api/works') // Remplacez l'URL par l'URL de votre API
  .then(response => {
    if (!response.ok) {
      // Si la réponse n'est pas OK (status 200-299)
      throw new Error('Erreur réseau');
    }
    return response.json(); // Convertit la réponse en JSON
  })
  .then(data => {
    console.log(data); // Affiche les données récupérées dans la console
    // Utilisation d'une boucle
    for (let i = 0; i < data.length; i++) {
      setFigure(data[i]);
    }
  })
  .catch(error => {
    console.error('Erreur:', error); // Affiche l'erreur si quelque chose ne va pas
  });

// Fonction qui sert à ajouter dynamiquement les éléments dans la "gallery"
function setFigure(data) {
  const figure = document.createElement("figure") // Crée un élément
  figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
					<figcaption>${data.title}</figcaption>`; // Définir le contenu HTML de <figure>

  document.querySelector(".gallery").append(figure); // Ajout de l'élément <figure> à un élément avec la classe "gallery" dans le DOM

};

