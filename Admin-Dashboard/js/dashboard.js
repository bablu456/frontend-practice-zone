const userCount = document.getElementById("userCount");
const taskCount = document.getElementById("taskCount");
const photoCount = document.getElementById("photoCount");
const productCount = document.getElementById("productCount");

// 1) FETCH USER COUNT (Random User API)
async function loadUsersCount() {
    try {
        const res = await fetch("https://randomuser.me/api/?results=20");
        const data = await res.json();
        userCount.innerText = `Users: ${data.results.length}`;
    } catch (error) {
        userCount.innerText = "Users: Error";
    }
}

// 2) FETCH PHOTO COUNT (Picsum API)
async function loadPhotoCount() {
    try {
        const res = await fetch("https://picsum.photos/v2/list?page=1&limit=15");
        const data = await res.json();
        photoCount.innerText = `Photos: ${data.length}`;
    } catch (error) {
        photoCount.innerText = "Photos: Error";
    }
}

// 3) TASK COUNT (From LocalStorage)
function loadTaskCount() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskCount.innerText = `Tasks: ${savedTasks.length}`;
}

// 4) PRODUCT COUNT (Temporary count)
function loadProductCount() {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    productCount.innerText = `Products: ${savedProducts.length}`;
}

// CALL ALL FUNCTIONS
loadUsersCount();
loadPhotoCount();
loadTaskCount();
loadProductCount();
