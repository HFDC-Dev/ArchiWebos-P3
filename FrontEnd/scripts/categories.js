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


})
