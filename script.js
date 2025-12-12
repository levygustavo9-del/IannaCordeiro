
const btn = document.getElementById("hamburguer");
const menu = document.getElementById("menuMobile");

btn.addEventListener("click", () => {
    btn.classList.toggle("ativo");
    menu.classList.toggle("ativo");
});

// Lógica do dropdown mobile
const mobileButtons = document.querySelectorAll(".mobile-btn");

mobileButtons.forEach((button) => {
    button.addEventListener("click", () => {

        // Fecha todos os outros dropdowns abertos
        mobileButtons.forEach((otherBtn) => {
            if (otherBtn !== button) {
                otherBtn.classList.remove("active");
                otherBtn.nextElementSibling.style.display = "none";
            }
        });

        // Alterna o atual
        const submenu = button.nextElementSibling;
        const isOpen = submenu.style.display === "block";

        submenu.style.display = isOpen ? "none" : "block";
        button.classList.toggle("active", !isOpen);
    });
});





document.addEventListener('DOMContentLoaded', function () {

    // ==========================================================
    // PARTE 1: LÓGICA DO MODAL
    // ==========================================================
    const detailButtons = document.querySelectorAll('.details-button');

    detailButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            const modalId = this.getAttribute('data-modal-target');
            const targetModal = document.getElementById(modalId);

            if (targetModal) {
                targetModal.classList.add('show');
            }
        });
    });

    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) modal.classList.remove('show');
        });
    });

    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
        }
    });

    // ==========================================================
    // PARTE 2: ATIVAÇÃO DOS SWIPERS
    // ==========================================================

    // --- SWIPER DE DEPOIMENTOS ---
    const depoimentosSwiper = new Swiper('.depoimentos-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoHeight: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });

    // Seleciona o slider de comparação
    const comparisonContainer = document.querySelector('.image-comparison-container');

    // Quando o usuário começa a tocar no slider ➜ desativa o arrastar do Swiper
    comparisonContainer.addEventListener('touchstart', () => {
        depoimentosSwiper.allowTouchMove = false;
    });

    // Quando o usuário termina o toque ➜ reativa o Swiper normalmente
    comparisonContainer.addEventListener('touchend', () => {
        depoimentosSwiper.allowTouchMove = true;
    });




    // --- SWIPER DECK ---
    const treatmentsDeck = new Swiper('.treatments-deck-slider', {
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        effect: 'creative',

        creativeEffect: {
            perspective: true,
            limitProgress: 3,
            prev: { translate: ["-70%", 0, -200], opacity: 0.5, scale: 0.85 },
            next: { translate: ["70%", 0, -200], opacity: 0.5, scale: 0.85 }
        },

        pagination: { el: ".swiper-pagination", clickable: true }
    });

    // 🚩 VARIÁVEL DE PROCEDIMENTOS (para uso em múltiplas partes)
    const proceduresSection = document.querySelector('.procedures-section');

    let proceduresSwiper;

    // Inicializa o Swiper de Procedimentos APENAS se a seção existir
    if (proceduresSection) {
        proceduresSwiper = new Swiper('.procedures-slider', {
            loop: false,
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            pagination: { el: '.swiper-pagination', clickable: true },
            on: {
                slideChange: function () {
                    // Pausa vídeos ao mudar o slide
                    proceduresSection.querySelectorAll('video').forEach(video => {
                        video.pause();
                        video.currentTime = 0;
                    });
                }
            }
        });

        // ==========================================================
        // PARTE 3: NAVEGAÇÃO DO DROPDOWN → SLIDE DOS PROCEDIMENTOS
        // ==========================================================
        const procedureLinks = document.querySelectorAll('.procedures-dropdown a');

        procedureLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                const slideIndex = parseInt(this.getAttribute('data-slide-index'));

                if (!isNaN(slideIndex)) {
                    event.preventDefault();
                    proceduresSwiper.slideTo(slideIndex, 1000);
                    proceduresSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });


        // ==========================================================
        // PARTE 10: NAVEGAÇÃO EXTERNA RÁPIDA (ROLAGEM FINALMENTE CORRIGIDA)
        // ==========================================================

        function goToSlideFromHash() {
            const hash = window.location.hash;

            if (hash) {
                const targetLink = document.querySelector(`.procedures-dropdown a[href*="${hash}"]`);

                if (targetLink) {
                    const slideIndex = parseInt(targetLink.getAttribute('data-slide-index'));

                    if (!isNaN(slideIndex)) {
                        // 1. Mude o slide instantaneamente (velocidade 0)
                        proceduresSwiper.slideTo(slideIndex, 0);

                        // 2. Rolagem instantânea (behavior: 'auto')
                        setTimeout(() => {
                            proceduresSection.scrollIntoView({ behavior: 'auto' });
                        }, 50);
                    }
                }
            }
        }

        // ✅ CHAMADA: Executa a função após a inicialização do Swiper.
        goToSlideFromHash();

        // ==========================================================
        // PARTE 7: FULLSCREEN FIX PARA VÍDEOS (Agora dentro do IF)
        // ==========================================================
        proceduresSection.querySelectorAll('video').forEach(video => {
            video.addEventListener('webkitbeginfullscreen', () => {
                video.style.objectFit = "contain";
            });

            video.addEventListener('webkitendfullscreen', () => {
                video.style.objectFit = "";
            });

            video.addEventListener('fullscreenchange', () => {
                if (document.fullscreenElement === video) {
                    video.style.objectFit = "contain";
                } else {
                    video.style.objectFit = "";
                }
            });
        });
    }

    // --- SWIPER DA GALERIA DE ESTRUTURA ---
    const estruturaGallery = new Swiper('.gallery-display', {
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        speed: 1200,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        pagination: {
            el: '.swiper-pagination-estrutura',
            clickable: true
        }
    });

    // --- HERO SLIDER (FADE SUAVE) ---
    const heroSlides = document.querySelectorAll(".hero-slider .slide-item");
    let heroIndex = 0;

    function showHeroSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    showHeroSlide(heroIndex);

    setInterval(() => {
        heroIndex = (heroIndex + 1) % heroSlides.length;
        showHeroSlide(heroIndex);
    }, 4000);

}); // Fim do DOMContentLoaded


// --------------------------------------------------------------------------
// PARTE 4: SLIDER ANTES E DEPOIS (Pode ficar fora se não houver conflito)
// --------------------------------------------------------------------------
function setupImageComparison(container) {
    const slider = container.querySelector('.image-comparison-slider');
    const imageBefore = container.querySelector('.image-comparison-before');
    const sliderLine = container.querySelector('.slider-line');

    if (!slider || !imageBefore || !sliderLine) return;

    const updateSlider = value => {
        imageBefore.style.width = value + '%';
        sliderLine.style.left = value + '%';
    };

    slider.addEventListener('input', e => {
        updateSlider(e.target.value);
        imageBefore.style.transition = 'none';
        sliderLine.style.transition = 'none';
    });

    slider.addEventListener('change', () => {
        imageBefore.style.transition = 'width 0.3s ease-out';
        sliderLine.style.transition = 'left 0.3s ease-out';

        const returnValue = 50;
        slider.value = returnValue;
        updateSlider(returnValue);
    });

    updateSlider(slider.value);
}

document.querySelectorAll('.image-comparison-container').forEach(setupImageComparison);


// --------------------------------------------------------------------------
// PARTE 5: ACCORDION
// --------------------------------------------------------------------------
document.querySelectorAll(".accordion-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        const group = btn.parentElement;

        document.querySelectorAll(".accordion-group").forEach(g => {
            if (g !== group) g.classList.remove("open");
        });

        group.classList.toggle("open");
    });
});


// --------------------------------------------------------------------------
// PARTE 6: PAUSAR VÍDEOS QUANDO SAIR DA TELA (AJUSTADO PARA SER MAIS SEGURO)
// --------------------------------------------------------------------------
// Variável definida globalmente para o evento de scroll
const scrollProceduresSection = document.querySelector('.procedures-section');

window.addEventListener('scroll', function () {
    // 🚩 CORREÇÃO: Busca o elemento no scroll se for NULL (para o caso de o JS carregar antes)
    const targetSection = scrollProceduresSection || document.querySelector('.procedures-section');

    if (!targetSection) return;

    const rect = targetSection.getBoundingClientRect();

    if (rect.bottom < 0 || rect.top > window.innerHeight) {
        targetSection.querySelectorAll('video').forEach(video => {
            video.pause();
        });
    }
});


// --------------------------------------------------------------------------
// PARTE 8: DROPDOWN DE ESTRUTURA
// --------------------------------------------------------------------------
const dropdowns = document.querySelectorAll(".dropdown-bloco");

dropdowns.forEach(bloco => {
    const titulo = bloco.querySelector(".dropdown-titulo");

    titulo.addEventListener("click", () => {

        dropdowns.forEach(outro => {
            if (outro !== bloco) outro.classList.remove("ativo");
        });

        bloco.classList.toggle("ativo");
    });
});

// SLIDER QUEM SOU EU — FADE SUAVE
const quemSouEuSlider = new Swiper('.quemSouEu-slider', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    speed: 1300,
});


//animação ao rolar a tela:

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.18 });

reveals.forEach(el => observer.observe(el));

