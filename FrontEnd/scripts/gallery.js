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
    data.forEach((data, i) => {
        setFigure(`Élément ${i}:`,data)
    })
  })
  .catch(error => {
    console.error('Erreur:', error); // Affiche l'erreur si quelque chose ne va pas
  });


  
  function setFigure(data) {
    const figure = document.createElement("figure")
  figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
					<figcaption>${data.title}</figcaption>`;

  document.body.append(figure);

  }

