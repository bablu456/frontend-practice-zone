// 1. Elements select karo
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const profileCard = document.getElementById("profile-card");

// Data dikhane wale elements
const avatar = document.getElementById("avatar");
const nameTag = document.getElementById("name");
const bioTag = document.getElementById("bio");
const reposTag = document.getElementById("repos");
const followersTag = document.getElementById("followers");

searchBtn.addEventListener("click", () => {
    const username = searchInput.value;
    if(username) {
        fetchGitHubUser(username);
    }
});

async function fetchGitHubUser(username) {
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if(!response.ok) {
            alert("User not found! ❌");
            return;
        }

        const data = await response.json();

        updateUI(data);

    } catch (error) {
        console.error("Galti ho gayi:", error);
    }
}
function updateUI(data) {
    profileCard.style.display = "block"; // Card dikhao
    
    avatar.src = data.avatar_url;
    nameTag.innerText = data.name || data.login; // Agar naam nahi hai to username dikhao
    bioTag.innerText = data.bio || "No Bio Available";
    reposTag.innerText = data.public_repos;
    followersTag.innerText = data.followers;
}