const userContainer = document.getElementById("userContainer");

// Show loading text before data arrives
userContainer.innerHTML = "<h2>Loading users...</h2>";

async function loadUsers() {
    try {
        const res = await fetch("https://randomuser.me/api/?results=12");
        const data = await res.json();
        const users = data.results;

        userContainer.innerHTML = ""; // Clear loading text

        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";

            card.innerHTML = `
                <img src="${user.picture.large}" class="user-img">
                <h3>${user.name.first} ${user.name.last}</h3>
                <p>Email: ${user.email}</p>
                <p>City: ${user.location.city}</p>
                <p>Country: ${user.location.country}</p>
            `;

            userContainer.appendChild(card);
        });

    } catch (error) {
        userContainer.innerHTML = "<h3>Error loading users ❌</h3>";
    }
}

loadUsers();
