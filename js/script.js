
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // KONFIGURASI SEA FLORES
    // =====================================

    // GANTI DENGAN NOMOR WHATSAPP ADMIN
    // Format: 628xxxxxxxxxx (tanpa +, spasi, atau strip)
    const whatsappNumber = "6285382920804";

    function openWhatsApp(message) {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    }

    // =====================================
    // PRELOADER
    // =====================================

    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add("hide");
        }
    }

    window.addEventListener("load", hidePreloader);

    // Fallback jika gambar atau sumber eksternal lambat dimuat
    setTimeout(hidePreloader, 3000);

    // =====================================
    // NAVBAR MOBILE
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const menuIcon = menuToggle.querySelector("i");
    const header = document.getElementById("header");

    function closeMenu() {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuIcon.classList.replace("fa-xmark", "fa-bars");
    }

    menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuIcon.classList.toggle("fa-bars", !isOpen);
        menuIcon.classList.toggle("fa-xmark", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (e) {
        if (!header.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeMenu();
            closeLightbox();
        }
    });

    // =====================================
    // HEADER SCROLL
    // =====================================

    function handleScroll() {
        header.classList.toggle("scrolled", window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // =====================================
    // ACTIVE NAVIGATION
    // =====================================

    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });
            }
        });
    }, {
        rootMargin: "-30% 0px -60% 0px"
    });

    sections.forEach(section => sectionObserver.observe(section));

    // =====================================
    // ANIMASI REVEAL
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("visible"));
    }

    // =====================================
    // FILTER PRIVATE TRIP / OPEN TRIP
    // =====================================

    const tripTabs = document.querySelectorAll(".trip-tab");
    const packageCards = document.querySelectorAll(".package-card");

    tripTabs.forEach(tab => {
        tab.addEventListener("click", function () {

            tripTabs.forEach(item => item.classList.remove("active"));
            this.classList.add("active");

            const filter = this.dataset.filter;

            packageCards.forEach(card => {
                const category = card.dataset.category;

                if (filter === "all" || category === filter) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });

        });
    });

    // =====================================
    // BOOKING WHATSAPP SETIAP PAKET
    // =====================================

    document.querySelectorAll(".book-trip").forEach(button => {

        button.addEventListener("click", function (e) {
            e.preventDefault();

            const tripName = this.dataset.trip;

            const message =
`Hello Sea Flores!

I am interested in booking:

Trip: ${tripName}

Could you please provide more information about:
- Available schedule
- Trip itinerary
- Price and facilities
- Booking requirements

Thank you.
`;

            openWhatsApp(message);
        });

    });

    // =====================================
    // WHATSAPP UTAMA DAN FLOATING
    // =====================================

    const mainWhatsapp = document.getElementById("mainWhatsapp");
    const floatingWhatsapp = document.getElementById("floatingWhatsapp");

    const generalMessage =
`Hello Sea Flores!

I would like to know more about your Flores Island tour packages.

Please send me information about Private Trip, Open Trip, schedules, and prices.

Thank you!`;

    mainWhatsapp.addEventListener("click", function (e) {
        e.preventDefault();
        openWhatsApp(generalMessage);
    });

    floatingWhatsapp.addEventListener("click", function (e) {
        e.preventDefault();
        openWhatsApp(generalMessage);
    });

    // =====================================
    // GALLERY LIGHTBOX
    // =====================================

    const galleryItems = Array.from(
        document.querySelectorAll(".gallery-item img")
    );

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCounter = document.getElementById("lightboxCounter");

    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    let currentImageIndex = 0;

    function showGalleryImage(index) {
        if (!galleryItems.length) return;

        currentImageIndex =
            (index + galleryItems.length) % galleryItems.length;

        const selectedImage = galleryItems[currentImageIndex];

        lightboxImage.src = selectedImage.src;
        lightboxImage.alt = selectedImage.alt;

        lightboxCounter.textContent =
            `${currentImageIndex + 1} / ${galleryItems.length}`;
    }

    function openLightbox(index) {
        showGalleryImage(index);
        lightbox.classList.add("show");
        document.body.classList.add("no-scroll");
    }

    function closeLightbox() {
        lightbox.classList.remove("show");
        document.body.classList.remove("no-scroll");
    }

    galleryItems.forEach((image, index) => {
        image.parentElement.addEventListener("click", function () {
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightboxPrev.addEventListener("click", function () {
        showGalleryImage(currentImageIndex - 1);
    });

    lightboxNext.addEventListener("click", function () {
        showGalleryImage(currentImageIndex + 1);
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Swipe support untuk galeri mobile
    let touchStartX = 0;

    lightbox.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (e) {
        const touchEndX = e.changedTouches[0].screenX;
        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) > 50) {
            if (difference < 0) {
                showGalleryImage(currentImageIndex + 1);
            } else {
                showGalleryImage(currentImageIndex - 1);
            }
        }
    }, { passive: true });

    // =====================================
    // TESTIMONIAL SLIDER
    // =====================================

    const testimonialCards = Array.from(
        document.querySelectorAll(".testimonial-card")
    );

    const testimonialDots = document.getElementById("testimonialDots");
    const testimonialPrev = document.getElementById("testimonialPrev");
    const testimonialNext = document.getElementById("testimonialNext");

    let testimonialIndex = 0;
    let testimonialTimer;

    function createTestimonialDots() {
        testimonialCards.forEach((card, index) => {
            const dot = document.createElement("button");

            dot.className = "testimonial-dot";
            dot.setAttribute("aria-label", `Testimoni ${index + 1}`);

            dot.addEventListener("click", function () {
                showTestimonial(index);
                restartTestimonial();
            });

            testimonialDots.appendChild(dot);
        });
    }

    function showTestimonial(index) {
        if (!testimonialCards.length) return;

        testimonialIndex =
            (index + testimonialCards.length) % testimonialCards.length;

        testimonialCards.forEach((card, i) => {
            card.classList.toggle("active", i === testimonialIndex);
        });

        testimonialDots.querySelectorAll(".testimonial-dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === testimonialIndex);
        });
    }

    function nextTestimonial() {
        showTestimonial(testimonialIndex + 1);
    }

    function prevTestimonial() {
        showTestimonial(testimonialIndex - 1);
    }

    function startTestimonial() {
        if (testimonialCards.length <= 1) return;

        testimonialTimer = setInterval(nextTestimonial, 5000);
    }

    function stopTestimonial() {
        clearInterval(testimonialTimer);
    }

    function restartTestimonial() {
        stopTestimonial();
        startTestimonial();
    }

    createTestimonialDots();
    showTestimonial(0);
    startTestimonial();

    testimonialNext.addEventListener("click", function () {
        nextTestimonial();
        restartTestimonial();
    });

    testimonialPrev.addEventListener("click", function () {
        prevTestimonial();
        restartTestimonial();
    });

    // Hentikan sementara saat pengguna mengarahkan mouse
    const testimonialSlider = document.querySelector(".testimonial-slider");

    testimonialSlider.addEventListener("mouseenter", stopTestimonial);
    testimonialSlider.addEventListener("mouseleave", startTestimonial);

    // =====================================
    // FAQ ACCORDION
    // =====================================

    document.querySelectorAll(".faq-question").forEach(button => {

        button.addEventListener("click", function () {

            const currentItem = this.parentElement;
            const isOpen = currentItem.classList.contains("open");

            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("open");
            });

            if (!isOpen) {
                currentItem.classList.add("open");
            }

        });

    });

    // =====================================
    // FOOTER YEAR
    // =====================================

    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

});
