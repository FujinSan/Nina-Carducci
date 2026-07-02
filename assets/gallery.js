document.addEventListener("DOMContentLoaded", () => {

    const gallery = document.querySelector(".gallery");

    if (!gallery) return;

    const images = [...gallery.querySelectorAll(".gallery-item")];

    /*
    ==============================
    Création des filtres
    ==============================
    */

    const tags = ["Tous"];

    images.forEach(image => {
        const tag = image.dataset.galleryTag;

        if (tag && !tags.includes(tag)) {
            tags.push(tag);
        }
    });

    const tagsBar = document.createElement("ul");
    tagsBar.className = "my-4 tags-bar nav nav-pills";

    tags.forEach((tag, index) => {

        const li = document.createElement("li");
        li.className = "nav-item";

        const span = document.createElement("span");

        span.className =
            index === 0
                ? "nav-link active active-tag"
                : "nav-link";

        span.dataset.imagesToggle = tag;
        span.textContent = tag;

        li.appendChild(span);
        tagsBar.appendChild(li);
    });

    gallery.parentNode.insertBefore(tagsBar, gallery);

    /*
    ==============================
    Création de la grille
    ==============================
    */

    const row = document.createElement("div");
    row.className = "gallery-items-row row";

    images.forEach(image => {

        image.classList.add("img-fluid");

        const column = document.createElement("div");

        column.className =
            "item-column mb-4 col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4";

        column.appendChild(image);

        row.appendChild(column);
    });

    gallery.innerHTML = "";
    gallery.appendChild(row);

    gallery.style.display = "block";

    /*
    ==============================
    Filtres
    ==============================
    */

    tagsBar.addEventListener("click", e => {

        const button = e.target.closest(".nav-link");

        if (!button) return;

        document
            .querySelectorAll(".active-tag")
            .forEach(el => {
                el.classList.remove("active-tag", "active");
            });

        button.classList.add("active-tag", "active");

        const selectedTag =
            button.dataset.imagesToggle;

        document
            .querySelectorAll(".gallery-item")
            .forEach(image => {

                const column =
                    image.closest(".item-column");

                if (
                    selectedTag === "Tous" ||
                    selectedTag === "all"
                ) {
                    column.style.display = "block";
                } else {

                    column.style.display =
                        image.dataset.galleryTag === selectedTag
                            ? "block"
                            : "none";
                }
            });
    });

    /*
    ==============================
    Lightbox
    ==============================
    */

    let currentIndex = 0;

    const lightbox = document.createElement("div");

    lightbox.className = "native-lightbox";

    lightbox.innerHTML = `
        <div class="lightbox-overlay">
            <button class="lightbox-close">✕</button>
            <button class="lightbox-prev">❮</button>
            <img class="lightbox-image" alt="">
            <button class="lightbox-next">❯</button>
        </div>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage =
        lightbox.querySelector(".lightbox-image");

    const openLightbox = index => {

        currentIndex = index;

        lightboxImage.src =
            images[index].src;

        lightbox.classList.add("active");
    };

    images.forEach((image, index) => {

        image.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    lightbox
        .querySelector(".lightbox-close")
        .addEventListener("click", () => {

            lightbox.classList.remove("active");
        });

    lightbox
        .querySelector(".lightbox-prev")
        .addEventListener("click", () => {

            currentIndex =
                currentIndex === 0
                    ? images.length - 1
                    : currentIndex - 1;

            lightboxImage.src =
                images[currentIndex].src;
        });

    lightbox
        .querySelector(".lightbox-next")
        .addEventListener("click", () => {

            currentIndex =
                currentIndex === images.length - 1
                    ? 0
                    : currentIndex + 1;

            lightboxImage.src =
                images[currentIndex].src;
        });
});