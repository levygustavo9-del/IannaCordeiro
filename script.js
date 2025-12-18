
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

// 🔒 FECHA O MENU MOBILE AO CLICAR EM QUALQUER LINK
document.querySelectorAll("#menuMobile a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("ativo");
        btn.classList.remove("ativo");
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
        const procedureLinks = document.querySelectorAll(
            '.procedures-dropdown a, .menu-mobile a[data-slide-index]'
        );

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

                        // 1️⃣ Move o slide SEM animação
                        proceduresSwiper.slideTo(slideIndex, 0);

                        // 2️⃣ Aguarda o layout mobile estabilizar
                        setTimeout(() => {

                            // Scroll correto
                            proceduresSection.scrollIntoView({ behavior: 'auto' });

                            // 3️⃣ FORÇA o Swiper a recalcular tudo
                            proceduresSwiper.update();
                            proceduresSwiper.updateSlides();
                            proceduresSwiper.updateSize();

                        }, 300); // tempo crítico para mobile
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

// ===== Cabeçalho que desaparece ao rolar para baixo =====
let lastScroll = 0;
const header = document.querySelector("header");

const SHOW_GHOST_AFTER = 180;
const LOCK_AT_TOP = 20;
const THRESHOLD = 6;
const GHOST_DURATION = 900;

let isInteracting = false;
let hideTimeout = null;

// Interações
header.addEventListener("mouseenter", () => {
    isInteracting = true;
    header.classList.remove("hidden");
    header.classList.add("floating");
});

header.addEventListener("mouseleave", () => {
    isInteracting = false;
});

header.addEventListener("touchstart", () => {
    isInteracting = true;
    header.classList.remove("hidden");
    header.classList.add("floating");
});

header.addEventListener("touchend", () => {
    isInteracting = false;
});

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // 🔝 Topo real
    if (currentScroll <= LOCK_AT_TOP) {
        header.className = "fixed-top";
        lastScroll = currentScroll;
        return;
    }

    header.classList.remove("fixed-top");

    if (Math.abs(currentScroll - lastScroll) < THRESHOLD) return;

    // ⬇️ Descendo → some (se não estiver interagindo)
    if (currentScroll > lastScroll && currentScroll > SHOW_GHOST_AFTER) {
        if (!isInteracting) {
            header.className = "hidden";
        }
    }

    // ⬆️ Subindo → aparece temporariamente
    else if (currentScroll < lastScroll) {
        header.className = "floating";

        clearTimeout(hideTimeout);

        hideTimeout = setTimeout(() => {
            if (!isInteracting && window.pageYOffset > LOCK_AT_TOP + 40) {
                header.className = "hidden";
            }
        }, GHOST_DURATION);
    }

    lastScroll = currentScroll;
});


const chatToggle = document.getElementById("chatToggle");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("closeChat");
const chatBody = document.getElementById("chatBody");
const chatOptions = document.getElementById("chatOptions");

chatToggle.onclick = () => chatbot.classList.toggle("hidden");
closeChat.onclick = () => chatbot.classList.add("hidden");

function botMessage(text) {
    chatBody.innerHTML += `<div class="bot">${text}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showOptions(options) {
    chatOptions.innerHTML = "";
    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt.label;
        btn.onclick = opt.action;
        chatOptions.appendChild(btn);
    });
}

// ===== FLUXOS =====

document.addEventListener("DOMContentLoaded", () => {

    const chatToggle = document.getElementById("chatToggle");
    const chatbot = document.getElementById("chatbot");
    const closeChat = document.getElementById("closeChat");
    const chatBody = document.getElementById("chatBody");
    const chatOptions = document.getElementById("chatOptions");

    const userData = {};

    chatToggle.onclick = () => {
        chatbot.classList.toggle("hidden");
        if (!chatbot.dataset.started) {
            startChat();
            chatbot.dataset.started = "true";
        }
    };

    closeChat.onclick = () => chatbot.classList.add("hidden");

    // ===============================
    // BASE DE CONHECIMENTO
    // ===============================
    const knowledge = {
        intro: `
Olá! Sou a assistente virtual da Dra. Ianna Cordeiro 😊
Estou aqui para te orientar sobre os procedimentos estéticos
e esclarecer suas dúvidas iniciais.
`,
        horarios: `
Atendemos de segunda a sexta-feira, das 9h às 18h.
`,
        localizacao: `
Rua Eng. Mário de Gusmão, 988 – Ponta Verde, Maceió – AL
`,
        procedimentos: {
            ultraformer: {
                nome: "Ultraforme MPT",
                descricao: "Tecnlogia de ultrassom de última geração para lifting facial, firmeza e estímulo de colágeno.",
                tempo: "30 a 60 minutos",
                recuperacao: "Atividades normais no mesmo dia ou no dia seguinte."
            },
            botox: {
                nome: "Botox",
                descricao: "Indicado para suavizar linhas de expressão e prevenir rugas dinâmicas.",
                tempo: "20 a 30 minutos",
                recuperacao: "Retorno imediato às atividades, evitando deitar-se nas primeiras 4 horas."
            },
            hof: {
                nome: "Harmonização Orofacial (HOF)",
                descricao: "Conjunto de procedimentos integrados para equilibrar a estética e funcionalidade da face.",
                tempo: "Variável",
                recuperacao: "Depende da combinação de técnicas, geralmente retorno rápido à rotina."
            },
            bioestimulador: {
                nome: "Bioestimulador de Colágeno",
                descricao: "Substâncias que estimulam a produção natural de colágeno, melhorando a espessura e firmeza da pele.",
                tempo: "30 a 40 minutos",
                recuperacao: "Pode haver leve inchaço inicial, com retorno rápido à rotina."
            },
            peim: {
                nome: "PEIM (Secagem de Vazinhos)",
                descricao: "Procedimento Injetável para Microvasos, focado na eliminação de telangiectasias (vasos finos).",
                tempo: "30 minutos",
                recuperacao: "Evitar exposição solar direta e exercícios físicos intensos por 24h a 48h."
            },
            lavieen: {
                nome: "Lavieen",
                descricao: "Laser de Thulium que trata textura, manchas e poros, proporcionando efeito de pele de porcelana (BB Glow).",
                tempo: "20 a 30 minutos",
                recuperacao: "Pele levemente avermelhada por 24h, sem necessidade de afastamento."
            },
            pdrn: {
                nome: "PDRN",
                descricao: "Bioestimulador derivado do DNA do salmão que promove regeneração celular e hidratação profunda.",
                tempo: "30 minutos",
                recuperacao: "Pequenas pápulas podem ser visíveis por algumas horas após a aplicação."
            },
            skinbooster: {
                nome: "Skinbooster",
                descricao: "Hidratação injetável profunda com ácido hialurônico para melhorar o viço e a elasticidade.",
                tempo: "30 minutos",
                recuperacao: "Retorno imediato, podendo haver pequenos pontos de hematoma."
            },
            mesclas: {
                nome: "Mesclas / Enzimas",
                descricao: "Combinação de ativos injetáveis para tratar gordura localizada, flacidez ou manchas.",
                tempo: "20 a 30 minutos",
                recuperacao: "Retorno imediato, com possibilidade de leve edema no local aplicado."
            },
            labios: {
                nome: "Preenchimento Labial",
                descricao: "Uso de ácido hialurônico para realçar contorno, dar volume e hidratação aos lábios.",
                tempo: "30 a 40 minutos",
                recuperacao: "Inchaço leve nos primeiros 3 dias, com retorno imediato às atividades."
            },
            fios: {
                nome: "Fios de Sustentação",
                descricao: "Fios absorvíveis que promovem efeito lifting imediato e estímulo contínuo de colágeno.",
                tempo: "40 a 60 minutos",
                recuperacao: "Cuidados leves com movimentos faciais por alguns dias, sem afastamento."
            },
            preenchimento: {
                nome: "Preenchimento Facial",
                descricao: "Reposição de volumes em áreas como olheiras, maçãs do rosto e mandíbula.",
                tempo: "30 a 50 minutos",
                recuperacao: "Retorno imediato, com cuidados básicos para evitar pressão no local."
            },
            profhilo: {
                nome: "Profhilo",
                descricao: "Biorremodelador celular que recupera a estrutura da pele sem alterar o volume facial.",
                tempo: "20 a 30 minutos",
                recuperacao: "Retorno imediato; os pontos de aplicação são absorvidos rapidamente pelo tecido."
            }
        }
    };
    // ===============================
    // DIGITAÇÃO REAL (SEM BUG)
    // ===============================
    let typingEl = null;

    function showTyping() {
        hideTyping();
        typingEl = document.createElement("div");
        typingEl.className = "bot typing";
        typingEl.innerText = "Digitando...";
        chatBody.appendChild(typingEl);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function hideTyping() {
        if (typingEl) {
            typingEl.remove();
            typingEl = null;
        }
    }

    function replyAndReturnToMenu(text, delay = 900) {
        botReply(text, delay);

        setTimeout(() => {
            mainMenu();
        }, delay + 1200);
    }


    function botReply(text, delay = 900) {
        showTyping();

        setTimeout(() => {
            hideTyping();
            chatBody.innerHTML += `<div class="bot">${text.replace(/\n/g, "<br>")}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        }, delay + Math.random() * 600);
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

    // ===============================
    // FLUXO
    // ===============================
    function startChat() {
        chatBody.innerHTML = "";
        botReply(knowledge.intro);

        setTimeout(() => {
            askName();
        }, 1200);
    }

    function askName() {
        botReply("Antes de começarmos, como posso te chamar?");
        chatOptions.innerHTML = `
            <div class="chat-input-area">
            <input type="text" id="inputUser" placeholder="Digite seu nome" />
            <button id="sendBtn">Enviar</button>
        </div>
        `;
        document.getElementById("sendBtn").onclick = () => {
            const input = document.getElementById("inputUser");
            if (!input.value.trim()) return;

            userReply(input.value);
            userData.nome = input.value.trim();
            chatOptions.innerHTML = "";

            botReply(`Prazer, ${userData.nome}! Como posso te ajudar hoje?`);
            setTimeout(mainMenu, 1200);
        };
    }

    function mainMenu() {
        showOptions([
            {
                label: "Conhecer procedimentos",
                action: menuProcedimentos
            },
            {
                label: "Horários de atendimento",
                action: () => replyAndReturnToMenu(knowledge.horarios)
            },
            {
                label: "Localização da clínica",
                action: () => replyAndReturnToMenu(knowledge.localizacao)
            },
            {
                label: "Falar com a clínica",
                action: whatsapp
            }
        ]);
    }

    function menuProcedimentos() {
        botReply(`${userData.nome}, qual procedimento você gostaria de conhecer melhor?`);

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
        botReply(`${userData.nome}, vou te direcionar para o WhatsApp da clínica para um atendimento personalizado.`);

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

});
