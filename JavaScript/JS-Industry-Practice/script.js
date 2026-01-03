// 1. Mock Data (Imagine ye API se aa raha hai)
const users = [
    "Amit Sharma", "Ankit Verma", "Rahul Singh", "Rohan Das",
    "Singham Returns", "Shalu Gupta", "Vikram Betal", "Zoya Akhtar",
    "Java Developer", "JavaScript Ninja"
];

// 2. Select DOM Elements
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");

// 3. Core Logic: Render Function (DOM Manipulation)
function displayResults(query) {
    // Clear previous results
    resultsContainer.innerHTML = "";

    // Filter data logic
    const filteredUsers = users.filter(user => 
        user.toLowerCase().includes(query.toLowerCase())
    );

    // Create and append list items (Performance optimized approach)
    // Fragment use karne se bar-bar repaint nahi hota
    const fragment = document.createDocumentFragment();

    if (filteredUsers.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No users found";
        li.className = "item";
        fragment.appendChild(li);
    } else {
        filteredUsers.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user;
            li.className = "item";
            fragment.appendChild(li);
        });
    }
    
    resultsContainer.appendChild(fragment);
    console.log("Fetching results for:", query); // Console check karne ke liye
}

// 4. The Debounce Function (Industry Favorite Concept)
// Ye function actual function ko delay ke sath call karta hai
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        // Agar pehle se koi timer chal raha hai, toh use cancel karo
        if (timeoutId) clearTimeout(timeoutId);
        
        // Naya timer shuru karo
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// 5. Attach Event Listener with Debounce
// 500ms ka delay, yani user rukega tabhi search hoga
const processChange = debounce((e) => {
    const query = e.target.value;
    if(query.length > 0){
        displayResults(query);
    } else {
        resultsContainer.innerHTML = ""; // Input clear hone pe list hata do
    }
}, 500);

searchInput.addEventListener("input", processChange);