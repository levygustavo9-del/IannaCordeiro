
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

    // ===============================
    // MODAL DE PROCEDIMENTOS (CARDS)
    // ===============================

    const procedureData = {
        botox: {
            title: "Botox (Toxina Botulínica)",
            description: "Suaviza rugas dinâmicas e previne o envelhecimento, promovendo um semblante mais descansado.",
            indication: "Rugas na testa, pés de galinha, linhas entre as sobrancelhas e arqueamento de sobrancelha.",
            time: "20 a 30 minutos",
            recovery: "Retorno imediato às atividades"
        },
        ultraformer: {
            title: "Ultraformer MPT",
            description: "Tecnologia de ultrassom de última geração que combina efeito lifting com a quebra de gordura localizada.",
            indication: "Flacidez facial, papada, contorno mandibular indefinido e flacidez corporal.",
            time: "30 a 60 minutos",
            recovery: "Atividades normais no mesmo dia"
        },
        hof: {
            title: "Harmonização Orofacial (HOF)",
            description: "Planejamento personalizado que utiliza diversas técnicas para equilibrar a estética e funcionalidade da face.",
            indication: "Assimetrias faciais, perda de volume global, desproporção entre nariz, queixo e mandíbula.",
            time: "60 a 90 minutos",
            recovery: "Pequeno inchaço local por 48h"
        },
        bioestimulador: {
            title: "Bioestimulador de Colágeno",
            description: "Substâncias que ativam a produção natural de colágeno pelo próprio organismo de forma progressiva.",
            indication: "Perda de firmeza (derretimento facial), pele fina, flacidez no pescoço e interno de braços/coxas.",
            time: "30 a 45 minutos",
            recovery: "Retorno imediato, evitar sol e esforço físico por 24h"
        },
        peim: {
            title: "PEIM (Secagem de Vasinhos)",
            description: "Microinjeções de substâncias esclerosantes para eliminar pequenos vasos superficiais.",
            indication: "Telangiectasias (vasinhos estéticos) nas pernas e microvarizes.",
            time: "30 minutos",
            recovery: "Evitar exposição solar direta e exercícios intensos por 48h"
        },
        pdrn: {
            title: "PDRN (Regenerador Celular)",
            description: "Bioestimulador de última geração derivado do DNA do salmão que recupera a saúde da pele.",
            indication: "Cicatrizes de acne, poros abertos, manchas, olheiras escuras e envelhecimento precoce.",
            time: "30 a 40 minutos",
            recovery: "Pequenas pápulas que desaparecem em até 24h"
        },
        skinbooster: {
            title: "SkinBooster",
            description: "Banho de hidratação profunda com ácido hialurônico que atua nas camadas internas da derme.",
            indication: "Pele ressecada, desvitalizada, rugas finas ao redor dos olhos e do 'código de barras'.",
            time: "30 minutos",
            recovery: "Retorno imediato"
        },
        mesclas: {
            title: "Mesoterapia / Mesclas",
            description: "Aplicação direta de ativos farmacológicos para tratar queixas específicas de forma localizada.",
            indication: "Gordura localizada, queda capilar (alopecia), celulite e melasma.",
            time: "20 a 40 minutos",
            recovery: "Retorno imediato"
        },
        labios: {
            title: "Preenchimento Labial",
            description: "Refinamento do contorno e volume labial, mantendo a naturalidade e a hidratação dos tecidos.",
            indication: "Lábios finos, perda de contorno, assimetria labial e rugas periorais.",
            time: "40 a 60 minutos",
            recovery: "Edema (inchaço) leve nos primeiros 2 a 5 dias"
        },
        fios: {
            title: "Fios de Sustentação / PDO",
            description: "Fios absorvíveis que criam uma malha de sustentação e estimulam a produção de colágeno.",
            indication: "Queda da bochecha (buldogue), sobrancelhas caídas e flacidez leve a moderada.",
            time: "45 a 60 minutos",
            recovery: "Repouso relativo de atividades físicas por 7 dias"
        },
        preenchimento: {
            title: "Preenchimento Facial",
            description: "Reposição de volumes perdidos com ácido hialurônico para sustentar e rejuvenescer a face.",
            indication: "Sulco nasogeniano (bigode chinês), olheiras profundas e perda de volume nas maçãs do rosto.",
            time: "30 a 60 minutos",
            recovery: "Retorno imediato, evitar massagear a área"
        },
        profhilo: {
            title: "Profhilo",
            description: "Biorremodelador celular que melhora a qualidade da pele através da máxima hidratação e elasticidade.",
            indication: "Laxidão da pele, perda de viço, aspecto 'craquelado' e envelhecimento do pescoço e mãos.",
            time: "20 a 30 minutos",
            recovery: "Retorno imediato"
        }
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

            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modalIndication.textContent = data.indication;
            modalTime.textContent = data.time;
            modalRecovery.textContent = data.recovery;

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    // FECHAR
    modal.addEventListener("click", e => {
        if (
            e.target.classList.contains("procedure-modal-overlay") ||
            e.target.classList.contains("procedure-modal-close")
        ) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
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

    /* ===============================
       ELEMENTOS
    =============================== */
    const chatToggle = document.getElementById("chatToggle");
    const chatbot = document.getElementById("chatbot");
    const closeChat = document.getElementById("closeChat");
    const chatBody = document.getElementById("chatBody");
    const chatOptions = document.getElementById("chatOptions");
    const chatOverlay = document.getElementById("chatOverlay");
    const clearChatBtn = document.getElementById("clearChat");

    let userData = {};
    let typingEl = null;


    /* ===============================
       ABRIR / FECHAR CHAT
    =============================== */
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

    chatToggle.addEventListener("click", openChat);
    closeChat.addEventListener("click", closeChatFn);
    chatOverlay.addEventListener("click", closeChatFn);

    /* ===============================
       LIMPAR CONVERSA (DESKTOP + MOBILE)
    =============================== */
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


    /* ===============================
       BASE DE CONHECIMENTO
    =============================== */
    const knowledge = {
        intro: `
Olá! Sou a assistente virtual da Dra. Ianna Cordeiro.
Estou aqui para te orientar sobre os procedimentos estéticos
e esclarecer suas dúvidas iniciais.
        `,
        horarios: `
Atendemos de segunda a sexta-feira, das 9h às 18h,
sempre mediante agendamento prévio.
        `,
        localizacao: `
Rua Eng. Mário de Gusmão, 988 – Ponta Verde  
Maceió – AL | Record Offices
        `,
        procedimentos: {
            ultraformer: {
                nome: "Ultraformer MPT",
                descricao: "Tecnologia de ultrassom micro e macrofocado para firmeza, lifting e estímulo de colágeno.",
                tempo: "30 a 60 minutos",
                recuperacao: "Atividades normais no mesmo dia."
            },
            botox: {
                nome: "Botox",
                descricao: "Suaviza linhas de expressão e previne o envelhecimento dinâmico.",
                tempo: "20 a 30 minutos",
                recuperacao: "Retorno imediato, com cuidados nas primeiras horas."
            },
            hof: {
                nome: "Harmonização Orofacial",
                descricao: "Conjunto de procedimentos para equilíbrio estético e funcional da face.",
                tempo: "Variável",
                recuperacao: "Depende do protocolo, geralmente retorno rápido."
            },
            bioestimulador: {
                nome: "Bioestimulador de Colágeno",
                descricao: "Estimula a produção natural de colágeno, melhorando firmeza e qualidade da pele.",
                tempo: "30 a 40 minutos",
                recuperacao: "Leve inchaço inicial, com retorno rápido."
            },
            pdrn: {
                nome: "PDRN",
                descricao: "Bioestimulador regenerador e hidratante profundo.",
                tempo: "30 minutos",
                recuperacao: "Pequenas pápulas temporárias."
            },
            skinbooster: {
                nome: "Skinbooster",
                descricao: "Hidratação profunda para viço e elasticidade da pele.",
                tempo: "30 minutos",
                recuperacao: "Retorno imediato."
            },
            labios: {
                nome: "Preenchimento Labial",
                descricao: "Realça contorno, volume e hidratação dos lábios.",
                tempo: "30 a 40 minutos",
                recuperacao: "Inchaço leve nos primeiros dias."
            },
            fios: {
                nome: "Fios de PDO",
                descricao: "Efeito lifting imediato com estímulo contínuo de colágeno.",
                tempo: "40 a 60 minutos",
                recuperacao: "Cuidados leves por alguns dias."
            },
            preenchimento: {
                nome: "Preenchimento Facial",
                descricao: "Reposição de volume facial com ácido hialurônico.",
                tempo: "30 a 50 minutos",
                recuperacao: "Retorno imediato com cuidados básicos."
            },
            Limpeza: {
                nome: "Limpeza de Pele Profunda",
                descricao: "Remoção de impurezas, cravos e células mortas, promovendo a desintoxicação e renovação da pele.",
                tempo: "60 a 90 minutos",
                recuperacao: "Leve vermelhidão por algumas horas, evitar sol nas primeiras 48h."
            },
            profhilo: {
                nome: "Profhilo",
                descricao: "Biorremodelador celular para melhora da qualidade da pele.",
                tempo: "20 a 30 minutos",
                recuperacao: "Pontos absorvidos rapidamente."
            },
        }
    };

    /* ===============================
       DIGITAÇÃO REAL
    =============================== */
    function showTyping() {
        hideTyping();
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

    /* ===============================
       FLUXO
    =============================== */
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

});

// COPIAR EMAIL PARA ÁREA DE TRANSFERÊNCIA 
function copiarEmail() {
    const email = "iirclinica@gmail.com";
    navigator.clipboard.writeText(email);
    alert("E-mail copiado com sucesso!✅");
}