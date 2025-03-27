window.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem("authToken"); // On récupère le token d'identification
    const categoriesContainer = document.getElementById("categories"); // Le conteneur des boutons de filtres
    const editButton = document.getElementById("edit-btn"); // Le bouton modifier
    const loginLink = document.getElementById("login-link"); // Le lien pour la page de login
    const logoutBtn = document.getElementById("logout-btn"); // Le bouton logout

    if (authToken) {
        // Si l'utilisateur est connecté nous affichons le bouton Modifier et logout et on masque les filtres             
        console.log("Utilisateur connecté"); // Voir dans la console si l'utilisateur est bien connecté
        categoriesContainer.classList.add("hidden"); // On ajoute la classe hidden pour cacher les filtres
        editButton.classList.remove("hidden"); // On supprime la classe hidden pour afficher le bouton Modifier
        loginLink.classList.add("hidden"); // On masque login
        logoutBtn.classList.remove("hidden"); // On affiche logout
    } else {
        // Sinon si l'utilisateur est déconnecter on affiche les filtres et on masque le bouton modifier et logout
        console.log("Utilisateur non connecté"); // Voir dans la console si l'utilisateur est bien déconnecter 
        categoriesContainer.classList.remove("hidden"); // On supprime la classe hidden pour afficher les filtres
        editButton.classList.add("hidden"); // On ajoute la classe hidden pour cacher le bouton Modifier
        loginLink.classList.remove("hidden"); // On affiche login
        logoutBtn.classList.add("hidden"); // On masque logout
    }

    // Gérer la déconnexion (bouton logout)
    logoutBtn.addEventListener("click", () => {
        console.log("Déconnexion...");
        localStorage.removeItem("authToken"); // On supprime le token du localStorage quand l'utilisateur est déconnecter
        window.location.href = "index.html"; // L'utilisateur est rediriger vers la page principale
    });

    if (authToken) {
        // Si un token est trouvé, afficher la barre "mode édition" et décaler le body
        showEditBar();
    }
});

// Fontion pour afficher la barre mode édition et décaler le body 
function showEditBar() {
    const editBar = document.getElementById("edit-bar");
    const body = document.body;

    // Afficher la barre mode édition
    editBar.classList.remove("edit-bar-hidden");
    body.classList.add("edit-mode");
}
