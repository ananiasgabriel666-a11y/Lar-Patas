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
        track.appendChild(copia);
    });
});

// ===== Ano do rodapé =====
const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();
