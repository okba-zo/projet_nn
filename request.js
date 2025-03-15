document.addEventListener("DOMContentLoaded", function () {
    // Nav barre
    function toggleNav() {
        let sidebar = document.getElementById("sidebar");
        document.getElementById("sidebar").classList.toggle("open");
        sidebar.classList.toggle("active");
    }

    // Filtrage des cours
    const searchInput = document.querySelector(".search-bar input");
    const courses = document.querySelectorAll(".course-card");
    const domainFilters = document.querySelectorAll(".category-filter input");

    function filterCourses() {
        const searchValue = searchInput.value.toLowerCase().trim();
        const selectedDomain = document.querySelector(".category-filter input:checked").value;

        courses.forEach(course => {
            const courseCategory = course.getAttribute("data-category");
            const courseText = course.textContent.toLowerCase();
            const matchesSearch = courseText.includes(searchValue);
            const matchesDomain = (selectedDomain === "All" || courseCategory === selectedDomain);

            course.style.display = (matchesSearch && matchesDomain) ? "block" : "none";
        });
    }

    searchInput.addEventListener("input", filterCourses);
    domainFilters.forEach(filter => filter.addEventListener("change", filterCourses));
    filterCourses();

    // Agrandissement de l'image de profil
    const profilePic = document.querySelector(".profile");
    profilePic.addEventListener("click", function () {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.background = "rgba(0, 0, 0, 0.7)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "1000";

        const enlargedImg = document.createElement("img");
        enlargedImg.src = profilePic.src;
        enlargedImg.style.width = "300px";
        enlargedImg.style.height = "300px";
        enlargedImg.style.borderRadius = "50%";
        enlargedImg.style.border = "5px solid white";
        enlargedImg.style.cursor = "pointer";

        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", function () {
            document.body.removeChild(overlay);
        });
    });

    document.querySelectorAll(".site-mzl").forEach(button => {
        button.addEventListener("click", () => {
            alert("cette page n'est pas accessible pour le moment!");
        });
    });

    // Gestion des utilisateurs (Ajout, Modification, Suppression)
    const userForm = document.querySelector(".user-form");
    const nameInput = document.querySelector(".name-input");
    const emailInput = document.querySelector(".email-input");
    const userTableBody = document.querySelector(".user-table tbody");
    let editMode = false;
    let editRow = null;

    function addUser(name, email) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>
                <button class="edit-btn">Modifier</button>
                <button class="delete-btn">Supprimer</button>
            </td>
        `;
        userTableBody.appendChild(row);

        row.querySelector(".edit-btn").addEventListener("click", function () {
            editUser(row);
        });

        row.querySelector(".delete-btn").addEventListener("click", function () {
            deleteUser(row);
        });
    }

    function editUser(row) {
        const cells = row.getElementsByTagName("td");
        nameInput.value = cells[0].textContent;
        emailInput.value = cells[1].textContent;
        editMode = true;
        editRow = row;
    }

    function deleteUser(row) {
        row.remove();
    }

    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (name === "" || email === "") {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        if (editMode && editRow) {
            editRow.getElementsByTagName("td")[0].textContent = name;
            editRow.getElementsByTagName("td")[1].textContent = email;
            editMode = false;
            editRow = null;
        } else {
            addUser(name, email);
        }

        userForm.reset();
    });
});
