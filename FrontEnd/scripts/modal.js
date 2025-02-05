window.addEventListener("DOMContentLoaded", () => {
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
});