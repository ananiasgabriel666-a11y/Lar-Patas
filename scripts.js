// ===== Carrosséis que passam sozinhos =====
document.querySelectorAll("[data-carrossel]").forEach((carrossel) => {
    const track = carrossel.querySelector(".carrossel-track");
    const slides = Array.from(track.children);
    const dotsBox = carrossel.querySelector(".carrossel-dots");
    const intervalo = Number(carrossel.dataset.autoplay) || 4000;
    let atual = 0;
    let timer = null;

    // Bolinhas de navegação
    const dots = slides.map((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", `Ir para o slide ${i + 1}`);
        b.addEventListener("click", () => { ir(i); reiniciar(); });
        dotsBox.appendChild(b);
        return b;
    });

    function ir(i) {
        atual = (i + slides.length) % slides.length; // volta ao início no fim
        track.style.transform = `translateX(-${atual * 100}%)`;
        dots.forEach((d, n) => d.setAttribute("aria-current", n === atual));
    }

    function iniciar() { timer = setInterval(() => ir(atual + 1), intervalo); }
    function parar() { clearInterval(timer); }
    function reiniciar() { parar(); iniciar(); }

    carrossel.querySelector(".prev").addEventListener("click", () => { ir(atual - 1); reiniciar(); });
    carrossel.querySelector(".next").addEventListener("click", () => { ir(atual + 1); reiniciar(); });

    // Pausa ao passar o mouse ou focar
    carrossel.addEventListener("mouseenter", parar);
    carrossel.addEventListener("mouseleave", iniciar);
    carrossel.addEventListener("focusin", parar);
    carrossel.addEventListener("focusout", iniciar);

    // Gesto de arrastar no celular
    let inicioX = 0;
    carrossel.addEventListener("touchstart", (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
    carrossel.addEventListener("touchend", (e) => {
        const dx = e.changedTouches[0].clientX - inicioX;
        if (Math.abs(dx) > 40) { ir(atual + (dx < 0 ? 1 : -1)); reiniciar(); }
    });

    ir(0);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) iniciar();
});

// ===== Faixa de parceiros (duplica os itens para o loop ficar contínuo) =====
document.querySelectorAll(".marquee-track").forEach((track) => {
    Array.from(track.children).forEach((li) => {
        const copia = li.cloneNode(true);
        copia.setAttribute("aria-hidden", "true");
        copia.querySelector("img").alt = "";


/* ===== CARROSSÉIS AUTOMÁTICOS ===== */

document.querySelectorAll("[data-carrossel]").forEach((carrossel) => {

    const track = carrossel.querySelector(".carrossel-track");
    const viewport = carrossel.querySelector(".carrossel-viewport");
    const dotsBox = carrossel.querySelector(".carrossel-dots");

    if (!track || !viewport) return;

    const slides = Array.from(track.children);
    if (!slides.length) return;

    const intervalo = Number(carrossel.dataset.autoplay) || 4000;

    const isHistorias = carrossel.classList.contains("carrossel-historias");

    const reduzirMovimento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let atual = 0;
    let timer = null;

    /* Quantidade de imagens visíveis */
    function visiveis() {
        if (isHistorias && window.innerWidth > 768) {
            return 2;
        }
        return 1;
    }

    /* Última posição permitida */
    function maxIndice() {
        return Math.max(0, slides.length - visiveis());
    }

    /* Criar bolinhas */
    const dots = slides.map((_, i) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.setAttribute("aria-label", `Ir para o slide ${i + 1}`);

        dot.addEventListener("click", () => {
            ir(i);
            reiniciar();
        });

        if (dotsBox) dotsBox.appendChild(dot);

        return dot;
    });

    /* Movimentar carrossel */
    function ir(indice) {

        const max = maxIndice();

        if (indice > max) {
            atual = 0;
        } else if (indice < 0) {
            atual = max;
        } else {
            atual = indice;
        }

        const deslocamento =
            slides[atual].offsetLeft - slides[0].offsetLeft;

        track.style.transform = `translateX(-${deslocamento}px)`;

        /* Atualizar bolinhas */
        dots.forEach((dot, i) => {
            dot.setAttribute(
                "aria-current",
                String(i === atual)
            );

            dot.hidden = i > max;
        });
    }

    /* Controle automático */
    function iniciar() {
        if (reduzirMovimento || timer || maxIndice() === 0) return;

        timer = setInterval(() => {
            ir(atual + 1);
        }, intervalo);
    }

    function parar() {
        clearInterval(timer);
        timer = null;
    }

    function reiniciar() {
        parar();
        iniciar();
    }

    /* Botões anterior e próximo */
    carrossel.querySelector(".prev")?.addEventListener("click", () => {
        ir(atual - 1);
        reiniciar();
    });

    carrossel.querySelector(".next")?.addEventListener("click", () => {
        ir(atual + 1);
        reiniciar();
    });

    /* Pausar ao passar o mouse */
    carrossel.addEventListener("mouseenter", parar);
    carrossel.addEventListener("mouseleave", iniciar);

    /* Pausar ao receber foco */
    carrossel.addEventListener("focusin", parar);

    carrossel.addEventListener("focusout", (e) => {
        if (!carrossel.contains(e.relatedTarget)) {
            iniciar();
        }
    });

    /* Navegação por toque */
    let inicioX = 0;

    carrossel.addEventListener("touchstart", (e) => {
        inicioX = e.touches[0].clientX;
        parar();
    }, { passive: true });

    carrossel.addEventListener("touchend", (e) => {
        const dx = e.changedTouches[0].clientX - inicioX;

        if (Math.abs(dx) > 40) {
            ir(atual + (dx < 0 ? 1 : -1));
        }

        iniciar();
    });

    /* Ajustar ao redimensionar */
    window.addEventListener("resize", () => {
        ir(Math.min(atual, maxIndice()));
    });

    /* Inicialização */
    ir(0);
    iniciar();
});


/* ===== FAIXA DE PARCEIROS ===== */

document.querySelectorAll(".marquee-track").forEach((track) => {

    Array.from(track.children).forEach((li) => {

        const copia = li.cloneNode(true);

        copia.setAttribute("aria-hidden", "true");

        const imagem = copia.querySelector("img");

        if (imagem) {
            imagem.alt = "";
        }
        
        track.appendChild(copia);
    });
});


// ===== Ano do rodapé =====
if (document.getElementById("ano")) (document.getElementById("ano")).textContent = new Date().getFullYear();

/* ===== ANO DO RODAPÉ ===== */

const ano = document.getElementById("ano");

if (document.getElementById("ano")) {
    (document.getElementById("ano")).textContent = new Date().getFullYear();
}


/* ===== ANIMAÇÃO DOS NÚMEROS ===== */

const numeros = document.querySelectorAll(".stat-num");

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        const elemento = entrada.target;
        const valorFinal = Number(elemento.dataset.target);
        const duracao = 2000; // 2 segundos

        let inicio = null;

        function animar(tempo) {
            if (inicio === null) inicio = tempo;

            const progresso = Math.min(
                (tempo - inicio) / duracao,
                1
            );

            // Desacelera perto do valor final
            const suavizacao = 1 - Math.pow(1 - progresso, 3);

            const valorAtual = Math.floor(
                suavizacao * valorFinal
            );

            elemento.textContent = valorAtual + "+";

            if (progresso < 1) {
                requestAnimationFrame(animar);
            } else {
                elemento.textContent = valorFinal + "+";
            }
        }

        requestAnimationFrame(animar);

        // Executa apenas uma vez
        observador.unobserve(elemento);
    });
}, {
    threshold: 0.5
});

numeros.forEach((numero) => {
    observador.observe(numero);
});


/* ===== MENU HAMBÚRGUER ===== */

const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principal");

if (botaoMenu && menu) {

    botaoMenu.addEventListener("click", () => {

        // Abre ou fecha o menu
        const aberto = menu.classList.toggle("ativo");

        // Atualiza o estado do botão
        botaoMenu.setAttribute("aria-expanded", String(aberto));

    });
};
