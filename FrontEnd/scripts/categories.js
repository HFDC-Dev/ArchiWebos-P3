// Utilisation de fetch pour récupérer des données depuis une API
fetch('http://localhost:5678/api/categories') // Remplacez l'URL par l'URL de votre API
  .then(response => {
    if (!response.ok) {
      // Si la réponse n'est pas OK (status 200-299)
      throw new Error('Erreur réseau');
    }
    return response.json(); // Convertit la réponse en JSON
  })
  .then(data => {
    console.log(data); // Affiche les données récupérées dans la console
  })
  .catch(error => {
    console.error('Erreur:', error); // Affiche l'erreur si quelque chose ne va pas
  });
