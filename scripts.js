
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

/* ===== FORMULÁRIO DE ADOÇÃO: select de pets ===== */

const selectPet = document.getElementById('pet');

if (selectPet) {

    // 1. Cria uma <option> para cada pet do array
    pets.forEach((pet) => {
        const opcao = document.createElement('option');

        opcao.value = pet.id;
        opcao.textContent = `${pet.nome} (${pet.especie.toLowerCase()}) - ${pet.ong}`;

        selectPet.appendChild(opcao);
    });

    // 2. Lê o parâmetro ?pet=ID da URL e pré-seleciona o pet
    const idDaUrl = new URLSearchParams(window.location.search).get('pet');

    if (idDaUrl && pets.some((pet) => String(pet.id) === idDaUrl)) {
        selectPet.value = idDaUrl;
    }
}

/* ===== FORMULÁRIO DE ADOÇÃO: slider de horas ===== */

const sliderTempo = document.getElementById('tempo');
const saidaTempo = document.getElementById('tempo-valor');

if (sliderTempo && saidaTempo) {

    // Atualiza o número sempre que o slider se mexe
    sliderTempo.addEventListener('input', () => {
        saidaTempo.textContent = sliderTempo.value;
    });

    // Quando o formulário é limpo, volta o número para o valor inicial
    sliderTempo.form.addEventListener('reset', () => {
        saidaTempo.textContent = sliderTempo.defaultValue;
    });
}
/* ===== VALIDAÇÃO: funções de apoio (servem para todos os formulários) ===== */

// Mostra uma mensagem de erro logo depois do campo (ou de um elemento "âncora")
function mostrarErro(campo, mensagem, ancora = campo) {
    campo.classList.add('is-invalid');

    const aviso = document.createElement('div');
    aviso.className = 'invalid-feedback d-block';
    aviso.textContent = mensagem;

    ancora.insertAdjacentElement('afterend', aviso);
}

// Apaga todos os erros do formulário antes de validar de novo
function limparErros(formulario) {
    formulario.querySelectorAll('.invalid-feedback').forEach((aviso) => aviso.remove());
    formulario.querySelectorAll('.is-invalid').forEach((campo) => campo.classList.remove('is-invalid'));
}

// Calcula a idade a partir de um texto "AAAA-MM-DD"
function calcularIdade(dataTexto) {
    const [ano, mes, dia] = dataTexto.split('-').map(Number);
    const hoje = new Date();

    let idade = hoje.getFullYear() - ano;
    const jaFezAniversario =
        hoje.getMonth() + 1 > mes ||
        (hoje.getMonth() + 1 === mes && hoje.getDate() >= dia);

    if (!jaFezAniversario) idade--;

    return idade;
}


/* ===== FORMULÁRIO DE ADOÇÃO: validação e envio ===== */

const formAdocao = document.getElementById('form-adocao');

if (formAdocao) {

    formAdocao.addEventListener('submit', (evento) => {

        // Impede o envio padrão (recarregar a página)
        evento.preventDefault();
        limparErros(formAdocao);

        const campos = formAdocao.elements;   // acesso aos campos pelo atributo name
        let valido = true;
        let primeiroErro = null;

        function erro(campo, mensagem, ancora = campo) {
            valido = false;
            if (!primeiroErro) primeiroErro = campo;
            mostrarErro(campo, mensagem, ancora);
        }

        // Nome: pelo menos duas palavras
        const nome = campos.nome.value.trim();
        if (nome.length < 5 || nome.split(/\s+/).length < 2) {
            erro(campos.nome, 'Informe seu nome completo.');
        }

        // E-mail
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.value.trim())) {
            erro(campos.email, 'Informe um e-mail válido.');
        }

        // Telefone: 10 ou 11 dígitos (com DDD)
        const digitos = campos.telefone.value.replace(/\D/g, '');
        if (digitos.length < 10 || digitos.length > 11) {
            erro(campos.telefone, 'Informe o telefone com DDD.');
        }

        // Data de nascimento: obrigatória e maior de 18 anos (regra da Política de Adoção)
        if (!campos.nascimento.value) {
            erro(campos.nascimento, 'Informe sua data de nascimento.');
        } else if (calcularIdade(campos.nascimento.value) < 18) {
            erro(campos.nascimento, 'É preciso ter 18 anos ou mais para adotar.');
        }

        // Pet de interesse
        if (!campos.pet.value) {
            erro(campos.pet, 'Escolha o pet de interesse.');
        }

        // Quantidade de animais: entre 0 e 20
        const quantidade = Number(campos.qtdPets.value);
        if (campos.qtdPets.value === '' || quantidade < 0 || quantidade > 20) {
            erro(campos.qtdPets, 'Informe um número entre 0 e 20.');
        }

        // Tipo de moradia (radio): o erro aparece depois do grupo inteiro
        if (!campos.moradia.value) {
            const primeiroRadio = document.getElementById('moradia-casa');
            erro(primeiroRadio, 'Escolha o tipo de moradia.', primeiroRadio.closest('.d-flex'));
        }

        // Motivo
        if (campos.motivo.value.trim().length < 10) {
            erro(campos.motivo, 'Conte um pouco mais (mínimo de 10 caracteres).');
        }

        // Termos
        if (!campos.termos.checked) {
            erro(campos.termos, 'É preciso aceitar a Política de Adoção.', campos.termos.parentElement);
        }

        // Se algo falhou, leva o foco ao primeiro erro e para por aqui
        if (!valido) {
            primeiroErro.focus();
            return;
        }

        // Tudo certo: mostra os dados numa caixa de diálogo (requisito 7)
        const pet = campos.pet.options[campos.pet.selectedIndex].textContent;
        const nascimento = campos.nascimento.value.split('-').reverse().join('/');

        alert(
            'Pedido de adoção enviado!\n\n' +
            `Nome: ${nome}\n` +
            `E-mail: ${campos.email.value.trim()}\n` +
            `Telefone: ${campos.telefone.value.trim()}\n` +
            `Nascimento: ${nascimento}\n` +
            `Pet de interesse: ${pet}\n` +
            `Animais em casa: ${quantidade}\n` +
            `Horas por dia para o pet: ${campos.tempo.value}\n` +
            `Moradia: ${campos.moradia.value}\n` +
            `Motivo: ${campos.motivo.value.trim()}`
        );

        formAdocao.reset();
    });
}

/* ===== VALIDAÇÃO: estrutura reutilizável ===== */

const emailValido = (texto) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto.trim());

/*
  idFormulario: id do <form>
  validar(campos, erro): confere os campos e chama erro(campo, mensagem) para cada problema
  aoEnviar(campos): roda só se não houver nenhum erro
*/
function tratarFormulario(idFormulario, validar, aoEnviar) {
    const formulario = document.getElementById(idFormulario);
    if (!formulario) return;

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        limparErros(formulario);

        const erros = [];
        const erro = (campo, mensagem, ancora = campo) => {
            erros.push({ campo, mensagem, ancora });
        };

        validar(formulario.elements, erro);

        if (erros.length > 0) {
            erros.forEach((e) => mostrarErro(e.campo, e.mensagem, e.ancora));
            erros[0].campo.focus();
            return;
        }

        aoEnviar(formulario.elements);
        formulario.reset();
    });
}


/* ===== FALE CONOSCO ===== */

tratarFormulario(
    'form-contato',

    (campos, erro) => {
        if (campos.nome.value.trim().length < 3) {
            erro(campos.nome, 'Informe seu nome.');
        }
        if (!emailValido(campos.email.value)) {
            erro(campos.email, 'Informe um e-mail válido.');
        }
        if (!campos.assunto.value) {
            erro(campos.assunto, 'Escolha um assunto.');
        }
        if (campos.mensagem.value.trim().length < 10) {
            erro(campos.mensagem, 'Escreva uma mensagem com pelo menos 10 caracteres.');
        }
    },

    (campos) => {
        const assunto = campos.assunto.options[campos.assunto.selectedIndex].textContent;

        alert(
            'Mensagem enviada!\n\n' +
            `Nome: ${campos.nome.value.trim()}\n` +
            `E-mail: ${campos.email.value.trim()}\n` +
            `Assunto: ${assunto}\n` +
            `Mensagem: ${campos.mensagem.value.trim()}`
        );
    }
);


/* ===== LOGIN ===== */

tratarFormulario(
    'form-login',

    (campos, erro) => {
        if (!emailValido(campos.email.value)) {
            erro(campos.email, 'Informe um e-mail válido.');
        }
        if (campos.senha.value.length < 6) {
            erro(campos.senha, 'A senha tem pelo menos 6 caracteres.');
        }
    },

    () => {
        alert('Login realizado com sucesso!');
        window.location.href = 'perfil.html';
    }
);


/* ===== CADASTRO ===== */

tratarFormulario(
    'form-cadastro',

    (campos, erro) => {
        if (campos.nome.value.trim().split(/\s+/).length < 2) {
            erro(campos.nome, 'Informe seu nome completo.');
        }
        if (!emailValido(campos.email.value)) {
            erro(campos.email, 'Informe um e-mail válido.');
        }
        if (campos.senha.value.length < 6) {
            erro(campos.senha, 'A senha deve ter pelo menos 6 caracteres.');
        }
        if (campos.confirma.value !== campos.senha.value) {
            erro(campos.confirma, 'As senhas não são iguais.');
        }
    },

    (campos) => {
        alert(`Conta criada! Bem-vindo(a), ${campos.nome.value.trim()}.`);
    }
);

/* ===== PERFIL: tabela de pedidos via AJAX (tabela.json) ===== */

const corpoPedidos = document.getElementById('corpo-pedidos');

if (corpoPedidos) {

    fetch('tabela.json')
        .then((resposta) => {
            if (!resposta.ok) throw new Error('Arquivo não encontrado');
            return resposta.json();
        })
        .then((pedidos) => {
            corpoPedidos.innerHTML = '';

            pedidos.forEach((pedido) => {
                const linha = document.createElement('tr');

                linha.innerHTML = `
                    <td>${pedido.pet}</td>
                    <td>${pedido.ong}</td>
                    <td>${pedido.data}</td>
                    <td><span class="perfil-status ${pedido.classe}">${pedido.status}</span></td>
                `;

                corpoPedidos.appendChild(linha);
            });
        })
        .catch(() => {
            corpoPedidos.innerHTML = `
                <tr>
                    <td colspan="4">Não foi possível carregar os pedidos.</td>
                </tr>`;
        });
}