window.addEventListener("DOMContentLoaded", () => {
    const pictureContainer = document.getElementById("picture");
    // Sélection du conteneur
    const modalContainer = document.querySelector(".modal-container");
    // Sélection de tous les éléments qui déclenchent l'ouverture de la modal 
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    const modalGallery = document.getElementById("modal-gallery");
    const modalAddPhoto = document.getElementById("modal-add");
    const addPhotoBtn = document.getElementById("btn-modal");
    const backBtn = document.getElementById("back-arrow");

    // Ajout d'une photo
    const uploadBtn = document.getElementById("upload-btn");
    const photoInput = document.getElementById("photo-input");
    const addPhotoDiv = document.getElementById("add-photo");

    // Sélection éléments du formulaire
    const titleInput = document.getElementById("photo-title");
    const validateButton = document.getElementById("btn-modal-valid");
    const categorySelect = document.getElementById("photo-category");


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
        // Récupérer le token depuis localStorage
        const token = localStorage.getItem("authToken");
        fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}` // Utilisation du token
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

    // Passer à la modal "Ajout d'une photo" en masquant la gallery
    addPhotoBtn.addEventListener("click", () => {
        modalGallery.style.display = "none"; // Cache la galerie
        modalAddPhoto.style.display = "block"; // Affiche l'ajout de photo
    });

    backBtn.addEventListener("click", () => {
        modalAddPhoto.style.display = "none"; // Cache l'ajout de photo
        modalGallery.style.display = "block"; // Réaffiche la galerie
    });

    // Ajout d'une photo
    uploadBtn.addEventListener("click", () => {
        photoInput.click(); // Ouvre le selecteur de fichier
    });

    photoInput.addEventListener("change", (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Remplace le contenu de "add-photo" par l'image sélectionnée
                addPhotoDiv.innerHTML = `<img src="${e.target.result}" alt="Aperçu de l'image" style="width: 100%; max-height: 300px; object-fit: cover;">`;
            };
            reader.readAsDataURL(file); // Convertit l'image en URL pour affichage
        }
    });

    // Ajout des catégories dans le <select> de la modal

    fetch("http://localhost:5678/api/categories")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des catégories");
            }
            return response.json();
        })
        .then(categories => {

            // Ajoute chaque catégorie comme option dans le <select>
            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id; // ID de la catégorie comme valeur
                option.textContent = category.name; // Nom de la catégorie comme texte
                categorySelect.appendChild(option);
            });
        })

    // Fonction pour vérifier si tous les champs sont remplis
    function checkFormValidity() {
        if (titleInput.value.trim() !== "" && categorySelect.value !== "" && photoInput.files.length > 0) {
            validateButton.style.backgroundColor = "#1D6154"; // Active en vert
            validateButton.disabled = false;
        } else {
            validateButton.style.backgroundColor = "#A7A7A7"; // Désactive en gris
            validateButton.disabled = true;
        }
    }

    // Ajout d'écouteurs d'événements pour surveiller les changements
    titleInput.addEventListener("input", checkFormValidity);
    categorySelect.addEventListener("change", checkFormValidity);
    photoInput.addEventListener("change", checkFormValidity);


    // Ajouter un écouteur sur le bouton de validation
    validateButton.addEventListener("click", (event) => {
        event.preventDefault(); // Empêcher le rechargement de la page

        const file = photoInput.files[0]; // Récupérer l'image
        const title = titleInput.value.trim();
        const categoryId = categorySelect.value;

        // Vérifier que tous les champs sont remplis
        if (!file || !title || !categoryId) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        // Récupérer le token depuis localStorage
        const token = localStorage.getItem("authToken");
        console.log("Token:", token); // Ajouter un log pour vérifier si le token est présent

        // Vérifier si le token est disponible
        if (!token) {
            alert("Vous devez être connecté pour ajouter une image.");
            return;
        }

        // Préparer les données pour l'API
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("category", categoryId);

        // Envoi de la requête POST à l'API
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}` // Utilisation du token
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de l'ajout de l'image.");
                }
                return response.json();
            })
            .then((newWork) => {
                // Ajouter la nouvelle image à la galerie sans recharger la page
                addWorkToGallery(newWork);

                // Réinitialiser le formulaire
                titleInput.value = "";
                categorySelect.value = "";
                photoInput.value = "";
                document.getElementById("add-photo").innerHTML = `
                    <i class="fa-solid fa-image"></i>
                    <button id="upload-btn">+ Ajouter photo</button>
                    <input type="file" id="photo-input" accept="image/png, image/jpeg" style="display: none;">
                    <p id="format"> jpg, png : 4mo max</p>
                `;

                // Désactiver le bouton après soumission
                validateButton.style.backgroundColor = "grey";
                validateButton.disabled = true;
            })
            .catch(error => console.error("Erreur :", error));
    });

    // Fonction pour ajouter une image à la galerie
    function addWorkToGallery(work) {
        const galleryContainer = document.querySelector(".gallery");

        const figure = document.createElement("figure");
        figure.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    `;
        galleryContainer.appendChild(figure);
    }
});
