document.addEventListener("DOMContentLoaded", function () {
  const categoriesContainer = document.getElementById("categories");
  const galleryContainer = document.querySelector(".gallery");
  let allWorks = []; // Variable pour stocker tous les projets

  // Récupération des catégories (utilisation de fetch pour récupérer les données depuis une API)
  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
      }
      return response.json();
    })
    .then((categories) => {
      // Ajout d'un bouton "Tous"
      const allButton = document.createElement("button");
      allButton.className = "btn";
      allButton.textContent = "Tous";
      allButton.addEventListener("click", () => displayWorks(allWorks));
      categoriesContainer.appendChild(allButton);

      // Générer les boutons pour chaque catégorie
      categories.forEach((category) => {
        const button = document.createElement("button");
        button.className = "btn";
        button.textContent = category.name; // On utilise le nom de la catégorie
        button.addEventListener("click", () => {
          const filteredWorks = allWorks.filter(
            (work) => work.categoryId === category.id
          );
          displayWorks(filteredWorks);
        });
        categoriesContainer.appendChild(button);
      });
    })
    .catch((error) => console.error("Erreur lors du chargement des catégories:", error))

  // Récupération des images(works) et les afficher
  fetch("http://localhost:5678/api/works") // Url de l'api works
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des images");
      }
      return response.json();
    })
    .then((works) => {
      allWorks = works; // Stocker dans une variable globale
      displayWorks(allWorks); // Afficher toutes les images par défaut
    })
    .catch((error) => console.error("Erreur lors du chargement des images:", error));

  // Fonction pour afficher les images dans la galerie
  function displayWorks(works) {
    galleryContainer.innerHTML = ""; // Effacer la galerie existante
    works.forEach((work) => {
      const figure = document.createElement("figure");
      figure.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>${work.title}</figcaption>
      `;
      galleryContainer.appendChild(figure);
    });
  }
});
