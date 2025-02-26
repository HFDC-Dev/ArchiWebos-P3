window.addEventListener("DOMContentLoaded", () => {
    const pictureContainer = document.getElementById("picture");
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

    // Charger et afficher les images
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => {
            displayWorks(works);
        })
        .catch(error => console.error("Erreur lors du chargement des images:", error));

    // Fonction pour afficher les images avec l'icône poubelle
    function displayWorks(works) {
        pictureContainer.innerHTML = ""; // Effacer la galerie existante
        works.forEach(work => {
            const figure = document.createElement("figure");
            figure.classList.add("image-container"); // Ajout de classe pour le style
            figure.innerHTML = `
                <img src="${work.imageUrl}" alt="${work.title}">
                <i class="fa-solid fa-trash-can delete-btn" data-id="${work.id}"></i>
            `;

            // Ajouter l'événement de suppression
            const deleteButton = figure.querySelector(".delete-btn");
            deleteButton.addEventListener("click", () => deleteWork(work.id, figure));

            pictureContainer.appendChild(figure);
        });
    }

    // Fonction pour supprimer une image
    function deleteWork(id, figureElement) {
        fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}` // Ajoute le token si nécessaire
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                figureElement.remove(); // Supprime l'image de la modal
            })
            .catch(error => console.error("Erreur :", error));
    }
});
