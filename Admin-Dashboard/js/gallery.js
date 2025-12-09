const galleryContainer = document.getElementById("galleryContainer");

// Loading message
galleryContainer.innerHTML = "<h2>Loading images...</h2>";

async function loadImages() {
    try {
        const res = await fetch("https://picsum.photos/v2/list?page=2&limit=12");
        const images = await res.json();

        galleryContainer.innerHTML = ""; // clear loading text

        images.forEach(img => {
            const card = document.createElement("div");
            card.className = "gallery-card";

            card.innerHTML = `
                <img src="${img.download_url}" alt="Gallery Image">
            `;

            galleryContainer.appendChild(card);
        });

    } catch (error) {
        galleryContainer.innerHTML = "<h3>Error loading images ❌</h3>";
    }
}

loadImages();
