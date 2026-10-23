
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


/* ===== ANO DO RODAPÉ ===== */

const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
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

}

//todo os pets
const pets = [
    //Cachorros
    { id: 1, nome: 'Belinha', especie: 'Cachorro', porte: 'Pequeno', idade: '2 meses', ong: 'Anjos de Focinho', img: 'Midias/cachorros/Belina.jpg' },
    { id: 2, nome: 'Bento', especie: 'Cachorro', porte: 'Pequeno', idade: '6 meses', ong: 'Anjos de Focinho', img: 'Midias/cachorros/Bento.jpg' },
    { id: 3, nome: 'Billy', especie: 'Cachorro', porte: 'Médio', idade: '3 anos', ong: 'Novo Lar Pet', img: 'Midias/cachorros/Billy.jpg' },
    { id: 4, nome: 'Fred', especie: 'Cachorro', porte: 'Médio', idade: '4 anos', ong: 'VetVida', img: 'Midias/cachorros/Fred.jpg' },
    { id: 5, nome: 'Frida e Apollo', especie: 'Cachorro', porte: 'Médio', idade: '2 anos', ong: 'Novo Lar Pet', img: 'Midias/cachorros/Frida e Apollo.jpg' },
    { id: 6, nome: 'Jade', especie: 'Cachorro', porte: 'Grande', idade: '4 anos', ong: 'Amigo Vet', img: 'Midias/cachorros/Jade.jpg' },
    { id: 7, nome: 'Kiara', especie: 'Cachorro', porte: 'Grande', idade: '2 anos', ong: 'Amigo Vet', img: 'Midias/cachorros/Kiara.jpg' },
    { id: 8, nome: 'Luna', especie: 'Cachorro', porte: 'Pequeno', idade: '5 anos', ong: 'Amigo Vet', img: 'Midias/cachorros/Luna.jpg' },
    { id: 9, nome: 'Maia', especie: 'Cachorro', porte: 'Grande', idade: '2 anos', ong: 'Anjos de Focinho', img: 'Midias/cachorros/Maia.jpg' },
    { id: 10, nome: 'Marley', especie: 'Cachorro', porte: 'Médio', idade: '2 anos', ong: 'Amigo Vet', img: 'Midias/cachorros/Marley.jpg' },
    { id: 11, nome: 'Neguinha', especie: 'Cachorro', porte: 'Grande', idade: '3 anos', ong: 'Novo Lar Pet', img: 'Midias/cachorros/Neguinha.jpg' },
    { id: 12, nome: 'Paçoca', especie: 'Cachorro', porte: 'Grande', idade: '2 anos', ong: 'Novo Lar Pet', img: 'Midias/cachorros/Paçoca.jpg' },
    { id: 13, nome: 'Pingo', especie: 'Cachorro', porte: 'Médio', idade: '5 anos', ong: 'Anjos de Focinho', img: 'Midias/cachorros/Pingo.jpg' },
    { id: 14, nome: 'Pirata', especie: 'Cachorro', porte: 'Pequeno', idade: '7 meses', ong: 'Anjos de Focinho', img: 'Midias/cachorros/Pirata.jpg' },
    { id: 15, nome: 'Sasha', especie: 'Cachorro', porte: 'Médio', idade: '1 ano', ong: 'Novo Lar Pet', img: 'Midias/cachorros/sasha.jpg' },

    //Gatos
    { id: 16, nome: 'Bella Hadid', especie: 'Gato', porte: 'Médio', idade: '2 anos', ong: 'Anjos de Focinho', img: 'Midias/gatos/Bella.jpg' },
    { id: 17, nome: 'Breu', especie: 'Gato', porte: 'Médio', idade: '2 anos', ong: 'Anjos de Focinho', img: 'Midias/gatos/Breu.jpg' },
    { id: 18, nome: 'Bruno', especie: 'Gato', porte: 'Grande', idade: '4 anos', ong: 'Anjos de Focinho', img: 'Midias/gatos/Bruno.jpg' },
    { id: 19, nome: 'Flores', especie: 'Gato', porte: 'Pequeno', idade: '5 meses', ong: 'Novo Lar Pet', img: 'Midias/gatos/Flores.jpg' },
    { id: 20, nome: 'Kira', especie: 'Gato', porte: 'Médio', idade: '2 anos', ong: 'VetVida', img: 'Midias/gatos/Kira.jpg' },
    { id: 21, nome: 'Mimi', especie: 'Gato', porte: 'Pequeno', idade: '6 meses', ong: 'Novo Lar Pet', img: 'Midias/gatos/Mimi.jpg' },
    { id: 22, nome: 'Mingau', especie: 'Gato', porte: 'Grande', idade: '1 ano', ong: 'Amigo Vet', img: 'Midias/gatos/Mingau.jpg' },
    { id: 23, nome: 'Perola', especie: 'Gato', porte: 'Grande', idade: '3 anos', ong: 'Amigo Vet', img: 'Midias/gatos/Perola.jpg' },
    { id: 24, nome: 'Romeo', especie: 'Gato', porte: 'Pequeno', idade: '1 ano', ong: 'Amigo Vet', img: 'Midias/gatos/Romeo.jpg' },
    { id: 25, nome: 'Salem', especie: 'Gato', porte: 'Médio', idade: '2 anos', ong: 'Anjos de Focinho', img: 'Midias/gatos/Salem.jpg' },
    { id: 26, nome: 'Scar', especie: 'Gato', porte: 'Pequeno', idade: '1 ano', ong: 'Amigo Vet', img: 'Midias/gatos/Scar.jpg' },
    { id: 27, nome: 'Zoe', especie: 'Gato', porte: 'Grande', idade: '3 anos', ong: 'Novo Lar Pet', img: 'Midias/gatos/Zoe.jpg' },
];

/*elementos do DOM*/
const gridPets = document.getElementById('gridPets');
const filtroOng = document.getElementById('filtroOng');
const filtroEspecie = document.getElementById('filtroEspecie');
const filtroPorte = document.getElementById('filtroPorte');
const btnlimpar = document.getElementById('btnLimpar');

if (gridPets) {
    if (!filtroOng || !filtroEspecie || !filtroPorte || !btnlimpar) {
        throw new Error('A vitrine de pets precisa dos controles de filtro e do botão para limpar.');
    }

    /*Função para desenhar os cards na tela*/
    function renderizarPets(lista) {
        gridPets.innerHTML = '';

        if (lista.length === 0) {
            gridPets.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="fs-5 text-muted">Nenhum pet encontrado com os filtros selecionados.</p>
                </div>`;
            return;
        }

        lista.forEach(pet => {
            const cardHTML = `
                <div class="col">
                    <div class="card h-100 border-0 shadow-sm pet-card">
                        <img src="${pet.img}" class="card-img-top pet-img" alt="Foto de ${pet.nome}">
                        <div class="card-body d-flex flex-column">
                            <small class="text-uppercase fw-bold text-warning mb-1" style="font-size: 0.75rem;">
                                ${pet.ong}
                            </small>
                            <h4 class="card-title fw-bold mb-1">${pet.nome}</h4>
                            <p class="card-text text-muted small mb-3">
                                ${pet.porte} | ${pet.especie} | ${pet.idade}
                            </p>
                            <a href="adocao.html?pet=${pet.id}" class="btn-adotar mt-auto w-100 py-2 text-center text-decoration-none">Quero adotar</a>
                        </div>
                    </div>
                </div>
            `;
            gridPets.innerHTML += cardHTML;
        });
    }

    /*funçao para aplicar os filtros combinados*/
    function aplicarFiltros() {
        const ongSelecionada = filtroOng.value;
        const especieSelecionada = filtroEspecie.value;
        const porteSelecionado = filtroPorte.value;

        const resultado = pets.filter(pet => {
            const atendeOng = (ongSelecionada === 'todas') || (pet.ong === ongSelecionada);
            const atendeEspecie = (especieSelecionada === 'todas') || (pet.especie === especieSelecionada);
            const atendePorte = (porteSelecionado === 'todos') || (pet.porte === porteSelecionado);

            return atendeOng && atendeEspecie && atendePorte;
        });

        renderizarPets(resultado);
    }

    /*event Listeners para filtrar em tempo real ao mudar a opção*/
    filtroOng.addEventListener('change', aplicarFiltros);
    filtroEspecie.addEventListener('change', aplicarFiltros);
    filtroPorte.addEventListener('change', aplicarFiltros);

    /*Resetar filtros */
    btnlimpar.addEventListener('click', () => {
        filtroOng.value = 'todas';
        filtroEspecie.value = 'todas';
        filtroPorte.value = 'todos';
        aplicarFiltros();
    });

    /*inicialização da pagina */
    renderizarPets(pets);
}