let nameInput = document.getElementById("pName");
let priceInput = document.getElementById("pPrice");
let descInput = document.getElementById("pDesc");
let imgInput = document.getElementById("pImg");
let addBtn = document.getElementById("addProductBtn");
let preview = document.getElementById("productPreview");

// LIVE PREVIEW
function updatePreview() {
    preview.innerHTML = `
        <h2>${nameInput.value || "Product Name"}</h2>
        <img src="${imgInput.value || "https://via.placeholder.com/300"}" alt="">
        <h3>Price: $${priceInput.value || "0"}</h3>
        <p>${descInput.value || "Description will appear here..."}</p>
    `;
}

nameInput.addEventListener("input", updatePreview);
priceInput.addEventListener("input", updatePreview);
descInput.addEventListener("input", updatePreview);
imgInput.addEventListener("input", updatePreview);

// ON SUBMIT
let products = JSON.parse(localStorage.getItem("products")) || [];

addBtn.addEventListener("click", function() {
    if (
        nameInput.value.trim() === "" ||
        priceInput.value.trim() === "" ||
        descInput.value.trim() === "" ||
        imgInput.value.trim() === ""
    ) {
        alert("Please fill all fields!");
        return;
    }

    let product = {
        name: nameInput.value,
        price: priceInput.value,
        desc: descInput.value,
        img: imgInput.value,
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product added successfully!");
});
