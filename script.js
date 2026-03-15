// ==========================================================
// 1. MENU MOBILE (FORA DO DOMCONTENTLOADED PARA CARGA RÁPIDA)
// ==========================================================
const btn = document.getElementById("hamburguer");
const menu = document.getElementById("menuMobile");

if (btn && menu) {
    btn.addEventListener("click", () => {
        btn.classList.toggle("ativo");
        menu.classList.toggle("ativo");
    });

    const mobileButtons = document.querySelectorAll(".mobile-btn");
    mobileButtons.forEach((button) => {
        button.addEventListener("click", () => {
            mobileButtons.forEach((otherBtn) => {
                if (otherBtn !== button) {
                    otherBtn.classList.remove("active");
                    if (otherBtn.nextElementSibling) otherBtn.nextElementSibling.style.display = "none";
                }
            });

            const submenu = button.nextElementSibling;
            if (submenu) {
                const isOpen = submenu.style.display === "block";
                submenu.style.display = isOpen ? "none" : "block";
                button.classList.toggle("active", !isOpen);
            }
        });
    });

    document.querySelectorAll("#menuMobile a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("ativo");
            btn.classList.remove("ativo");
        });
    });
}

// ==========================================================
// 2. LÓGICA PRINCIPAL (DENTRO DE UM ÚNICO DOMCONTENTLOADED)
// ==========================================================
document.addEventListener('DOMContentLoaded', function () {

    // ==========================================================
    // PARTE 2: ATIVAÇÃO DOS SWIPERS E VÍDEOS (OTIMIZADO)
    // ==========================================================
    const detailButtons = document.querySelectorAll('.details-button');
    detailButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const modalId = this.getAttribute('data-modal-target');
            const targetModal = document.getElementById(modalId);
            if (targetModal) targetModal.classList.add('show');
        });
    });

    // ==========================================
    // LÓGICA PARA FECHAR QUALQUER MODAL
    // ==========================================
    document.querySelectorAll('.close-button, .procedure-modal-close').forEach(button => {
        button.addEventListener('click', () => {
            const modalToClose = button.closest('.modal, #procedureModal');
            if (modalToClose) {
                modalToClose.classList.remove('show', 'active');
                document.body.style.overflow = "";
            }
        });
    });

    window.addEventListener('click', (event) => {
        // O "?" garante que se classList for undefined, ele não trava o código
        if (event.target.classList?.contains('modal') || event.target.classList?.contains('procedure-modal-overlay')) {
            event.target.classList.remove('show', 'active');
            document.body.style.overflow = "";
        }
    });

    // ==========================================================
    // PARTE 2: ATIVAÇÃO DOS SWIPERS E VÍDEOS (OTIMIZADO)
    // ==========================================================
    const depoimentosSwiper = new Swiper('.depoimentos-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoHeight: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });

    // Pausa vídeos quando forem da tela
    const pauseAllVideos = () => {
        document.querySelectorAll('.procedure-video iframe').forEach(iframe => {
            if (iframe?.contentWindow) {
                iframe.contentWindow.postMessage(JSON.stringify({
                    event: 'command',
                    func: 'pauseVideo',
                    args: ''
                }), '*');
            }
        });
    };

    // Carrega vídeo ao clicar (lazy load)
    document.querySelectorAll('.procedure-video').forEach(container => {
        container.addEventListener('click', function () {
            if (this.querySelector('iframe')) return;
            const videoId = this.getAttribute('data-video');
            this.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        });
    });

    const proceduresSection = document.querySelector('.procedures-section');
    if (proceduresSection) {
        // Observer para pausar vídeos quando sair da viewport
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) pauseAllVideos();
            });
        }, { threshold: 0.1 }).observe(proceduresSection);

        // Pausa quando documento fica hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) pauseAllVideos();
        });
    }

    // Localize a parte do "Antes e Depois" no seu código e use esta lógica:
    document.querySelectorAll('.image-comparison-container').forEach(container => {
        setupImageComparison(container);

        const sliderInput = container.querySelector('.image-comparison-slider');

        // Bloqueia o Swiper de trocar de slide enquanto o usuário arrasta o Antes/Depois
        if (sliderInput && depoimentosSwiper) {
            const bloquearSwiper = () => { depoimentosSwiper.allowTouchMove = false; };
            const liberarSwiper = () => { depoimentosSwiper.allowTouchMove = true; };

            sliderInput.addEventListener('mousedown', bloquearSwiper);
            sliderInput.addEventListener('touchstart', bloquearSwiper, { passive: true });

            // Libera quando soltar (em qualquer lugar da tela)
            window.addEventListener('mouseup', liberarSwiper);
            window.addEventListener('touchend', liberarSwiper);
        }
    });

    // ==========================================================
    // MODAL DE PROCEDIMENTOS (CARDS)
    // ==========================================================
    const procedureData = {
        pdrn: { title: "PDRN", description: "Bioestimulador de última geração derivado do DNA do salmão que recupera a saúde da pele.", indication: "Cicatrizes de acne, poros abertos, manchas, olheiras escuras e envelhecimento precoce.", time: "30 a 40 minutos", recovery: "Pequenas pápulas que desaparecem em até 24h" },
        limpeza_pele: { title: "Limpeza de Pele Profunda", description: "Protocolo completo para remoção de impurezas, cravos e células mortas, devolvendo o viço à pele.", indication: "Cravos (comedões), milium, excesso de oleosidade e preparação para outros tratamentos.", time: "60 a 90 minutos", recovery: "Evitar exposição solar direta por 48h" },
        skinbooster: { title: "SkinBooster", description: "Banho de hidratação profunda com ácido hialurônico que atua nas camadas internas da derme.", indication: "Pele ressecada, desvitalizada, rugas finas ao redor dos olhos e do 'código de barras'.", time: "30 minutos", recovery: "Retorno imediato" },
        botox: { title: "Botox (Toxina Botulínica)", description: "Suaviza rugas dinâmicas e previne o envelhecimento, promovendo um semblante mais descansado.", indication: "Rugas na testa, pés de galinha, linhas entre as sobrancelhas e arqueamento de sobrancelha.", time: "20 a 30 minutos", recovery: "Retorno imediato às atividades" },
        microagulhamento: { title: "Microagulhamento Específico", description: "Indução de colágeno através de microagulhas associada ao drug delivery de ativos concentrados.", indication: "Cicatrizes de acne, poros dilatados, estrias, melasma e rejuvenescimento.", time: "45 a 60 minutos", recovery: "Vermelhidão leve a moderada por 24h a 48h" },
        bioestimulador: { title: "Bioestimulador de Colágeno", description: "Substâncias que ativam a produção natural de colágeno pelo próprio organismo de forma progressiva.", indication: "Perda de firmeza (derretimento facial), pele fina, flacidez no pescoço e interno de braços/coxas.", time: "30 a 45 minutos", recovery: "Retorno imediato, evitar sol e esforço físico por 24h" },
        peeling: { title: "Peeling Químico", description: "Aplicação de ácidos que removem camadas danificadas da pele e estimulam a renovação celular.", indication: "Manchas (melasma/sol), acne ativa, sequelas de acne e textura irregular da pele.", time: "30 minutos", recovery: "Descamação fina entre o 3º e 7º dia" },
        peim: { title: "PEIM (Secagem de Vasinhos)", description: "Microinjeções de substâncias esclerosantes para eliminar pequenos vasos superficiais.", indication: "Telangiectasias (vasinhos estéticos) nas pernas e microvarizes.", time: "30 minutos", recovery: "Evitar exposição solar direta e exercícios intensos por 48h" },
        mesclas: { title: "Intradermoterapia / Mesclas", description: "Aplicação direta de coquetéis de ativos farmacológicos para tratar queixas específicas de forma concentrada.", indication: "Gordura localizada, queda capilar (alopecia), celulite, estrias e clareamento de manchas.", time: "20 a 40 minutos", recovery: "Retorno imediato, podendo apresentar leve sensibilidade no local" },
        ultraformer: { title: "Ultraformer MPT", description: "Tecnologia de ultrassom de última geração que combina efeito lifting com a quebra de gordura localizada.", indication: "Flacidez facial, papada, contorno mandibular indefinido e flacidez corporal.", time: "30 a 60 minutos", recovery: "Atividades normais no mesmo dia" },
        labios: { title: "Preenchimento Labial", description: "Refinamento do contorno e volume labial, mantendo a naturalidade e a hidratação dos tecidos.", indication: "Lábios finos, perda de contorno, assimetria labial e rugas periorais.", time: "40 a 60 minutos", recovery: "Edema (inchaço) leve nos primeiros 2 a 5 dias" },
        profhilo: { title: "Profhilo", description: "Biorremodelador celular que melhora a qualidade da pele através da máxima hidratação e elasticidade.", indication: "Laxidão da pele, perda de viço, aspecto 'craquelado' e envelhecimento do pescoço e mãos.", time: "20 a 30 minutos", recovery: "Retorno imediato" },
        hof: { title: "Harmonização Orofacial (HOF)", description: "Planejamento personalizado que utiliza diversas técnicas para equilibrar a estética e funcionalidade da face.", indication: "Assimetrias faciais, perda de volume global, desproporção entre nariz, queixo e mandíbula.", time: "60 a 90 minutos", recovery: "Pequeno inchaço local por 48h" }
    };

    const modal = document.getElementById("procedureModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalIndication = document.getElementById("modalIndication");
    const modalDescription = document.getElementById("modalDescription");
    const modalTime = document.getElementById("modalTime");
    const modalRecovery = document.getElementById("modalRecovery");

    document.querySelectorAll(".btn-saiba-mais").forEach(btn => {
        btn.addEventListener("click", () => {
            const key = btn.dataset.procedure;
            const data = procedureData[key];

            if (!data) return;

            if (modalTitle) modalTitle.textContent = data.title;
            if (modalDescription) modalDescription.textContent = data.description;
            if (modalIndication) modalIndication.textContent = data.indication;
            if (modalTime) modalTime.textContent = data.time;
            if (modalRecovery) modalRecovery.textContent = data.recovery;

            if (modal) {
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    if (modal) {
        modal.addEventListener("click", e => {
            if (e.target.classList.contains("procedure-modal-overlay") || e.target.classList.contains("procedure-modal-close")) {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }

    // --- SWIPER DECK (OTIMIZADO - Removido watchSlidesProgress) ---
    const treatmentsDeck = new Swiper('.treatments-deck-slider', {
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        effect: 'creative',
        spaceBetween: 0,
        touchEventsTarget: 'container',
        resistanceRatio: 0,
        navigation: {
            nextEl: '.button-swiper-next',
            prevEl: '.button-swiper-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        creativeEffect: {
            perspective: true,
            limitProgress: 2,
            prev: {
                translate: ["-80%", 0, -200],
                opacity: 0.4,
                scale: 0.85
            },
            next: {
                translate: ["80%", 0, -200],
                opacity: 0.4,
                scale: 0.85
            }
        }
    });


    // 🚩 INICIALIZAÇÃO ÚNICA DO SWIPER DE PROCEDIMENTOS
    let proceduresSwiper;

    if (proceduresSection) {
        // Swiper otimizado - Removidos observer, observeParents, resizeObserver (melhor performance)
        proceduresSwiper = new Swiper('.procedures-slider', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 30,
            grabCursor: true,
            loop: false,
            centeredSlidesBounds: true,
            centerInsufficientSlides: true,
            navigation: {
                nextEl: '.button-swiper-next',
                prevEl: '.button-swiper-prev'
            },
            pagination: {
                el: '.button-swiper-pagination',
                clickable: true
            },
            on: {
                slideChange: function () {
                    if (typeof pauseAllVideos === "function") pauseAllVideos();
                },
                init: function () {
                    setTimeout(() => this.update(), 500);
                }
            }
        });

        proceduresSwiper.on('slideChangeTransitionEnd', pauseAllVideos);

        proceduresSwiper.on('touchStart', () => {
            proceduresSection.classList.add('swiper-dragging');
            pauseAllVideos();
        });

        proceduresSwiper.on('touchEnd', () => {
            proceduresSection.classList.remove('swiper-dragging');
        });

        // Garante pausa ao trocar aba/janela
        const handleVisibilityChange = () => {
            if (document.hidden) pauseAllVideos();
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const procedureLinks = document.querySelectorAll('.procedures-dropdown a, .menu-mobile a[data-slide-index]');

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

        function goToSlideFromHash() {
            const hash = window.location.hash;

            if (hash) {
                const targetLink = document.querySelector(`.procedures-dropdown a[href*="${hash}"]`);

                if (targetLink) {
                    const slideIndex = parseInt(targetLink.getAttribute('data-slide-index'));

                    if (!isNaN(slideIndex)) {
                        proceduresSwiper.slideTo(slideIndex, 0);

                        setTimeout(() => {
                            proceduresSection.scrollIntoView({ behavior: 'auto' });
                            proceduresSwiper.update();
                            proceduresSwiper.updateSlides();
                            proceduresSwiper.updateSize();
                        }, 300);
                    }
                }
            }
        }

        goToSlideFromHash();
    }

    // --- SWIPER DA GALERIA DE ESTRUTURA (OTIMIZADO - Transição suave e lenta) ---
    const estruturaGallery = new Swiper('.gallery-display', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        speed: 2500,
        effect: 'slide',
        pagination: {
            el: '.swiper-pagination-estrutura',
            clickable: true
        }
    });

    // --- HERO SLIDER DO HERO-SECTION (CSS ANIMATION) ---
    const heroSection = document.querySelector('.hero-section');
    const heroSectionSlides = heroSection ? heroSection.querySelectorAll(".hero-slider .slide-item") : [];
    if (heroSectionSlides.length > 0) {
        const slideCount = heroSectionSlides.length;
        const duration = slideCount * 4;
        const styles = document.createElement('style');

        let keyframes = '@keyframes heroFade { ';
        heroSectionSlides.forEach((_, i) => {
            const startPercent = (i / slideCount) * 100;
            const midPercent = ((i + 0.5) / slideCount) * 100;
            const endPercent = ((i + 1) / slideCount) * 100;

           
        });
        keyframes += '}';

        styles.textContent = keyframes + ` .hero-section .hero-slider .slide-item { animation: heroFade ${duration}s infinite; }`;
        document.head.appendChild(styles);

        heroSectionSlides[0].classList.add('active');
    }

    // --- SLIDER DE ESTRUTURA (SLIDE SUAVE - SEM FADE) ---
    const estruturaSection = document.querySelector('.estrutura-section');
    const estruturaSlides = estruturaSection ? estruturaSection.querySelectorAll(".hero-slider .slide-item") : [];
    if (estruturaSlides.length > 0) {
        let currentSlide = 0;
        const slideCount = estruturaSlides.length;

        const showSlide = (index) => {
            estruturaSlides.forEach((slide, i) => {
                slide.style.opacity = i === index ? '1' : '0';
                slide.style.transition = 'opacity 2.5s ease-in-out';
            });
        };

        showSlide(0);

        // Muda de slide a cada 5 segundos
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            showSlide(currentSlide);
        }, 5500);
    }

    // --------------------------------------------------------------------------
    // PARTE 4: SLIDER ANTES E DEPOIS
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
    // PARTE 8: DROPDOWN DE ESTRUTURA — OTIMIZADO PARA MOBILE
    // --------------------------------------------------------------------------
    const dropdowns = document.querySelectorAll(".dropdown-bloco");

    dropdowns.forEach(bloco => {
        const titulo = bloco.querySelector(".dropdown-titulo");

        titulo.addEventListener("click", () => {
            // Batch updates com requestAnimationFrame para evitar reflow
            requestAnimationFrame(() => {
                dropdowns.forEach(outro => {
                    if (outro !== bloco) outro.classList.remove("ativo");
                });

                bloco.classList.toggle("ativo");
            });
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

    // ==========================================================
    // HEADER COM SCROLL DINÂMICO
    // ==========================================================
    const header = document.querySelector("header");
    if (header) {
        let lastScrollY = window.scrollY;
        let scrollTimeout;
        let isInteracting = false;

        const showHeader = () => {
            header.classList.add("is-visible");
            header.classList.remove("is-hidden");
        };

        const hideHeader = () => {
            if (window.scrollY > 50 && !isInteracting) {
                header.classList.remove("is-visible");
                header.classList.add("is-hidden");
            }
        };

        window.addEventListener("scroll", () => {
            const currentScroll = window.scrollY;

            if (currentScroll <= 10) {
                header.classList.remove("is-fixed");
                showHeader();
                lastScrollY = currentScroll;
                return;
            }

            header.classList.add("is-fixed");

            if (currentScroll > lastScrollY && !isInteracting) {
                hideHeader();
            } else if (currentScroll < lastScrollY - 10) {
                showHeader();
            }

            lastScrollY = currentScroll;

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                hideHeader();
            }, 2000);
        });

        const setInteracting = (val) => isInteracting = val;

        header.addEventListener("mouseenter", () => setInteracting(true));
        header.addEventListener("mouseleave", () => setInteracting(false));
        header.addEventListener("touchstart", () => setInteracting(true));
        header.addEventListener("touchend", () => {
            setInteracting(false);
            setTimeout(() => hideHeader(), 2000);
        });

        header.classList.add("is-visible");
    }

    // --- Mantendo sua animação de revelar elementos (Reveal) ---
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    reveals.forEach(el => revealObserver.observe(el));

    // ==========================================================
    // CHATBOT - INTEGRADO NO ÚNICO DOMCONTENTLOADED
    // ==========================================================
    const chatToggle = document.getElementById("chatToggle");
    const chatbot = document.getElementById("chatbot");
    const closeChat = document.getElementById("closeChat");
    const chatBody = document.getElementById("chatBody");
    const chatOptions = document.getElementById("chatOptions");
    const chatOverlay = document.getElementById("chatOverlay");
    const clearChatBtn = document.getElementById("clearChat");

    let userData = {};
    let typingEl = null;

    function openChat() {
        chatbot.classList.remove("hidden");
        chatOverlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";

        if (!chatbot.dataset.started) {
            startChat();
            chatbot.dataset.started = "true";
        }
    }

    function closeChatFn() {
        chatbot.classList.add("hidden");
        chatOverlay.classList.add("hidden");
        document.body.style.overflow = "";
    }

    if (chatToggle) chatToggle.addEventListener("click", openChat);
    if (closeChat) closeChat.addEventListener("click", closeChatFn);
    if (chatOverlay) chatOverlay.addEventListener("click", closeChatFn);

    function resetChat(e) {
        e.preventDefault();

        chatBody.innerHTML = "";
        chatOptions.innerHTML = "";
        userData = {};
        chatbot.dataset.started = "";

        botReply("Tudo bem 😊 Vamos começar novamente.", 1000);
        setTimeout(startChat, 1200);
    }

    if (clearChatBtn) {
        clearChatBtn.addEventListener("click", resetChat);
        clearChatBtn.addEventListener("touchstart", resetChat, { passive: false });
    }

    const knowledge = {
        intro: `Olá! Sou a assistente virtual da Dra. Ianna Cordeiro.
Estou aqui para te orientar sobre os procedimentos estéticos
e esclarecer suas dúvidas iniciais.`,
        horarios: `Atendemos de segunda a sexta-feira, das 9h às 18h,
sempre mediante agendamento prévio.`,
        localizacao: `Rua Eng. Mário de Gusmão, 988 – Ponta Verde  
Maceió – AL | Record Offices`,
        procedimentos: {
            pdrn: { nome: "PDRN", descricao: "Bioestimulador regenerador derivado do DNA do salmão que recupera a saúde e o viço da pele.", tempo: "30 a 40 minutos", recuperacao: "Pequenas pápulas temporárias que desaparecem em até 24h." },
            limpeza_pele: { nome: "Limpeza de Pele Profunda", descricao: "Remoção de impurezas, cravos e células mortas, promovendo a desintoxicação e renovação da pele.", tempo: "60 a 90 minutos", recuperacao: "Leve vermelhidão por algumas horas, evitar sol nas primeiras 48h." },
            skinbooster: { nome: "Skinbooster", descricao: "Hidratação profunda com ácido hialurônico para melhorar o brilho e a elasticidade da pele.", tempo: "30 minutos", recuperacao: "Retorno imediato às atividades." },
            botox: { nome: "Botox", descricao: "Suaviza linhas de expressão e previne o envelhecimento dinâmico relaxando a musculatura.", tempo: "20 a 30 minutos", recuperacao: "Retorno imediato, evitando deitar ou massagear a área por 4h." },
            bioestimulador: { nome: "Bioestimulador de Colágeno", descricao: "Estimula a produção natural de colágeno, combatendo a flacidez e o derretimento facial.", tempo: "30 a 45 minutos", recuperacao: "Leve inchaço inicial, com retorno rápido às atividades." },
            peeling: { nome: "Peeling Químico", descricao: "Aplicação de ácidos para renovação celular, tratamento de manchas e rejuvenescimento.", tempo: "30 minutos", recuperacao: "Descamação controlada por alguns dias, proteção solar obrigatória." },
            peim: { nome: "PEIM (Secagem de Vasinhos)", descricao: "Eliminação de vasos estéticos superficiais através de microinjeções esclerosantes.", tempo: "30 minutos", recuperacao: "Evitar sol e exercícios físicos intensos por 48h." },
            ultraformer: { nome: "Ultraformer MPT", descricao: "Tecnologia de ultrassom de última geração para efeito lifting e quebra de gordura localizada.", tempo: "30 a 60 minutos", recuperacao: "Atividades normais no mesmo dia." },
            labios: { nome: "Preenchimento Labial", descricao: "Realça o contorno, volume e a hidratação dos lábios com ácido hialurônico.", tempo: "40 a 60 minutos", recuperacao: "Inchaço leve nos primeiros 2 a 5 dias." },
            profhilo: { nome: "Profhilo", descricao: "Biorremodelador celular que melhora a arquitetura da pele e a hidratação profunda.", tempo: "20 a 30 minutos", recuperacao: "Pontos de aplicação são absorvidos rapidamente pela pele." },
            hof: { nome: "Harmonização Orofacial (HOF)", descricao: "Planejamento global para equilibrar a estética e funcionalidade dos traços faciais.", tempo: "60 a 90 minutos", recuperacao: "Pequeno inchaço ou edema local por cerca de 48h." }
        }
    };

    function showTyping() {
        if (typingEl) typingEl.remove();
        typingEl = document.createElement("div");
        typingEl.className = "bot typing";
        typingEl.textContent = "Digitando...";
        chatBody.appendChild(typingEl);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function hideTyping() {
        if (typingEl) {
            typingEl.remove();
            typingEl = null;
        }
    }

    function botReply(text, delay = 900) {
        showTyping();
        setTimeout(() => {
            hideTyping();
            chatBody.innerHTML += `<div class="bot">${text.replace(/\n/g, "<br>")}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        }, delay + Math.random() * 500);
    }

    function userReply(text) {
        chatBody.innerHTML += `<div class="user">${text}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showOptions(options) {
        chatOptions.innerHTML = "";
        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.textContent = opt.label;
            btn.onclick = () => {
                userReply(opt.label);
                chatOptions.innerHTML = "";
                opt.action();
            };
            chatOptions.appendChild(btn);
        });
    }

    function startChat() {
        chatBody.innerHTML = "";
        chatOptions.innerHTML = "";
        botReply(knowledge.intro);
        setTimeout(askName, 1200);
    }

    function askName() {
        botReply("Antes de começarmos, como posso te chamar?");
        chatOptions.innerHTML = `
            <div class="chat-input-area">
                <input type="text" id="inputUser" placeholder="Digite seu nome" />
                <button id="sendBtn">Enviar</button>
            </div>
        `;

        const input = document.getElementById("inputUser");
        const btn = document.getElementById("sendBtn");

        btn.onclick = () => {
            if (!input.value.trim()) return;
            userReply(input.value);
            userData.nome = input.value.trim();
            chatOptions.innerHTML = "";
            botReply(`Prazer, ${userData.nome}! Como posso te ajudar hoje?`);
            setTimeout(mainMenu, 1200);
        };

        input.addEventListener("keydown", e => {
            if (e.key === "Enter") btn.click();
        });
    }

    function mainMenu() {
        showOptions([
            { label: "Conhecer procedimentos", action: menuProcedimentos },
            { label: "Horários de atendimento", action: () => replyAndReturn(knowledge.horarios) },
            { label: "Localização da clínica", action: () => replyAndReturn(knowledge.localizacao) },
            { label: "Falar com a clínica", action: whatsapp }
        ]);
    }

    function replyAndReturn(text) {
        botReply(text);
        setTimeout(mainMenu, 1800);
    }

    function menuProcedimentos() {
        botReply(`${userData.nome}, qual procedimento você gostaria de conhecer?`);
        showOptions(
            Object.keys(knowledge.procedimentos).map(key => ({
                label: knowledge.procedimentos[key].nome,
                action: () => mostrarProcedimento(key)
            })).concat([{ label: "Voltar", action: mainMenu }])
        );
    }

    function mostrarProcedimento(key) {
        const p = knowledge.procedimentos[key];
        botReply(`🔹 ${p.nome}\n\n${p.descricao}`);
        setTimeout(() => botReply(`⏱ Duração média: ${p.tempo}`), 1200);
        setTimeout(() => botReply(`🕊 Recuperação: ${p.recuperacao}`), 2200);

        setTimeout(() => {
            showOptions([
                { label: "Falar com a clínica", action: whatsapp },
                { label: "Ver outro procedimento", action: menuProcedimentos }
            ]);
        }, 3200);
    }

    function whatsapp() {
        botReply(`${userData.nome}, vou te direcionar para o WhatsApp da clínica.`);
        showOptions([
            {
                label: "Ir para o WhatsApp",
                action: () => window.open(
                    "https://wa.me/558198289582?text=Olá! Gostaria de informações sobre os procedimentos.",
                    "_blank"
                )
            },
            { label: "Voltar", action: mainMenu }
        ]);
    }

}); // FIM DO ÚNICO DOMCONTENTLOADED

// COPIAR EMAIL PARA ÁREA DE TRANSFERÊNCIA 
function copiarEmail() {
    const email = "iirclinica@gmail.com";
    navigator.clipboard.writeText(email);
    alert("E-mail copiado com sucesso!✅");
}