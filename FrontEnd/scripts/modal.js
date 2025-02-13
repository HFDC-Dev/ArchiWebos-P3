window.addEventListener("DOMContentLoaded", () => {
    const pictureContainer = document.getElementById("picture")
    // Sélection du conteneur
    const modalContainer = document.querySelector(".modal-container");
    // Sélection de tous les éléments qui déclenchent l'ouverture de la modal 
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    // Ajout d'un écouteur d'événements
    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));

    // Fonction pour afficher et masquer la modal
    function toggleModal() {
        modalContainer.classList.toggle("active");
    }

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
        pictureContainer.innerHTML = ""; // Effacer la galerie existante
        works.forEach((work) => {
            const figure = document.createElement("figure");
            figure.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption></figcaption>
      `;
            pictureContainer.appendChild(figure);
        });
    }
});