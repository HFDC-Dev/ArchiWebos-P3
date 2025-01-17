document.getElementById("loginApi").addEventListener("submit", function (event) {
    event.preventDefault();

    // On récupère les valeurs saisies par l'utilisateur dans les champs du formulaire
    const email = document.getElementById("username").value;
    const password = document.getElementById("pass").value;

    // Envoyer une requete POST à l'API pour connecter l'utilisateur
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Les données sont au format JSON
        },
        body: JSON.stringify({ email, password }), // Les données utilisateur sont envoyé dans le corps de la requete
    })
        .then(response => {
            if (!response.ok) { // Vérification de la réponse si c'est une erreur
                throw new Error("Identifiants incorrects !"); // Affiche une erreur si les identifiants sont incorrects
            }
            return response.json(); // Convertit la réponse en JSON
        })
        .then(data => {
            // Stocke le token et redirige vers la page index.html
            localStorage.setItem("authToken", data.token);
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error("Erreur pendant la connexion :", error.message);
            document.getElementById("message").textContent = error.message; // Affiche un message d'erreur à l'utilisateur
        });
});