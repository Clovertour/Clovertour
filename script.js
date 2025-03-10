window.onload = function () {
    window.scrollTo(0, 0);
};

/*LANGUAGE BUTTON*/
document.addEventListener("DOMContentLoaded", () => {
    const langButton = document.getElementById("current-lang");
    const langMenu = document.getElementById("lang-menu");

    function loadLanguage(lang) {
        fetch("languages.json")
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll("[data-i18n]").forEach(el => {
                    const key = el.getAttribute("data-i18n");
                    if (data[lang][key]) {
                        el.textContent = data[lang][key];
                    }
                });
                localStorage.setItem("lang", lang);
                langButton.textContent = lang.toUpperCase(); // Меняем текст кнопки
            });
    }

    langButton.addEventListener("click", () => {
        langMenu.classList.toggle("show");
    });

    document.querySelectorAll("#lang-menu li").forEach(item => {
        item.addEventListener("click", () => {
            loadLanguage(item.getAttribute("data-lang"));
            langMenu.classList.remove("show"); // Закрываем меню
        });
    });

    // Закрываем меню, если клик вне области
    document.addEventListener("click", (e) => {
        if (!langButton.contains(e.target) && !langMenu.contains(e.target)) {
            langMenu.classList.remove("show");
        }
    });

    
    const savedLang = localStorage.getItem("lang") || "ru";
    loadLanguage(savedLang);
});
/*LANGUAGE BUTTON*/

document.addEventListener("DOMContentLoaded", function () {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

document.getElementById("scrollButton").addEventListener("click", function() {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
});

/*SLIDESHOW BLOCK1*/
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    function changeSlide() {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
    }

    setInterval(changeSlide, 10000);
});
/*SLIDESHOW BLOCK1*/


//BLOCK 2 MODAL WINDOW & EXCEL
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("booking-modal");
    const closeModal = document.querySelector(".close");
    const buttons = document.querySelectorAll(".card-button");
    const form = document.getElementById("bookingForm");
    let selectedTour = "";

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            selectedTour = this.closest(".card1, .card2, .card3").querySelector("h1").innerText;
            modal.style.display = "block";
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы
        
        let formData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            tour: selectedTour
        };

        fetch("https://script.google.com/macros/s/AKfycbz-Bm66G29RrHdswHidegce647gN8i6TI4wVZL6gwBWeWml20sMIpUuo2pJyRLvfGQ/exec", {
            method: "POST",
            mode: "no-cors", // Добавили no-cors
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(response => {
            alert("Успешно! Бронирование отправлено.");
            modal.style.display = "none";
            form.reset();
        })
        .catch(error => console.error("Ошибка:", error));        
    });
});

//BLOCK 2 MODAL WINDOW & EXCEL

/*BLOCK 4*/

//ИЗОБРАЖЕНИЕ АККОРДЫ
const images = ["/images/animbg1.jpg", "/images/animbg2.jpg", "/images/animbg3.jpg"];
let currentImageIndex = 0;
let autoSwitch = true;
let timeoutId;

// Функция смены изображения
function changeImage(index) {
    currentImageIndex = index;
    document.getElementById("block4-image").src = images[currentImageIndex];

    // Обновляем активный индикатор
    updateDots();

    // Останавливаем авто-переключение на 15 секунд
    autoSwitch = false;
    clearTimeout(timeoutId);
    setTimeout(() => {
        autoSwitch = true;
    }, 10000);
}

// Функция авто-переключения
function autoChangeImage() {
    if (autoSwitch) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        document.getElementById("block4-image").src = images[currentImageIndex];
        updateDots();
    }
}

// Создаем индикаторы
const dotsContainer = document.createElement("div");
dotsContainer.classList.add("image-dots");

images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => changeImage(index));
    dotsContainer.appendChild(dot);
});

// Добавляем индикаторы в контейнер
document.querySelector(".block4-image-container").appendChild(dotsContainer);

// Функция обновления индикаторов
function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentImageIndex);
    });
}

// Запуск авто-переключения
setInterval(autoChangeImage, 5000);


//АККОРДЫ
const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach(button => {
    button.addEventListener("click", function () {
        const content = this.nextElementSibling;
        const arrow = this.querySelector(".arrow");
        const isActive = content.classList.contains("open");

        if (isActive) {
            content.style.maxHeight = null;
            content.classList.remove("open");
            content.style.padding = "0 10px";
            arrow.innerHTML = "&#9660;"; // Стрелка вниз
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add("open");
            content.style.padding = "10px 10px";
            arrow.innerHTML = "&#9650;"; // Стрелка вверх
        }
    });
});



/*BLOCK 4*/
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("gallery-modal");
    const galleryLink = document.querySelector("a[href='#gallery']");
    const closeBtn = document.querySelector(".close-gallery");

    // Открытие модального окна при нажатии на ссылку "Галерея"
    galleryLink.addEventListener("click", function(event) {
        event.preventDefault(); // Отменяем стандартный переход
        modal.style.display = "flex";
    });

    // Закрытие модального окна при нажатии на крестик
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Закрытие модального окна при клике вне его содержимого
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

