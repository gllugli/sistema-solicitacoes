const API_URL = "/solicitacoes";

const formSolicitacao = document.getElementById("form-solicitacao");
const inputTitulo = document.getElementById("titulo");
const inputSolicitante = document.getElementById("solicitante");
const selectStatus = document.getElementById("status");
const selectFiltro = document.getElementById("filtro");
const tabelaSolicitacoes = document.getElementById("tabela-solicitacoes");
const totalPendentes = document.getElementById("total-pendentes");
const totalConcluidas = document.getElementById("total-concluidas");

let solicitacoes = [];

async function carregarSolicitacoes() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar solicitações.");
        }

        solicitacoes = await resposta.json();

        renderizarTabela();
        atualizarResumo();
    } catch (erro) {
        alert("Não foi possível carregar as solicitações.");
        console.error(erro);
    }
}

function renderizarTabela() {
    tabelaSolicitacoes.innerHTML = "";

    const statusFiltro = selectFiltro.value;

    const solicitacoesFiltradas = statusFiltro === "Todos"
        ? solicitacoes
        : solicitacoes.filter(solicitacao => solicitacao.status === statusFiltro);

    solicitacoesFiltradas.forEach(solicitacao => {
        const linha = document.createElement("tr");

        const statusConcluido = solicitacao.status === "Concluída";

        linha.innerHTML = `
            <td>${solicitacao.id}</td>
            <td>${solicitacao.titulo}</td>
            <td>${solicitacao.solicitante}</td>
            <td>${solicitacao.status}</td>
            <td>
                <button 
                    onclick="alterarStatus(${solicitacao.id})"
                    ${statusConcluido ? "disabled" : ""}
                >
                    ${statusConcluido ? "Concluída" : "Marcar como concluída"}
                </button>
            </td>
        `;

        tabelaSolicitacoes.appendChild(linha);
    });
}

function atualizarResumo() {
    const pendentes = solicitacoes.filter(solicitacao => solicitacao.status === "Pendente").length;
    const concluidas = solicitacoes.filter(solicitacao => solicitacao.status === "Concluída").length;

    totalPendentes.textContent = pendentes;
    totalConcluidas.textContent = concluidas;
}

async function cadastrarSolicitacao(event) {
    event.preventDefault();

    const novaSolicitacao = {
        titulo: inputTitulo.value.trim(),
        solicitante: inputSolicitante.value.trim(),
        status: selectStatus.value
    };

    if (!novaSolicitacao.titulo || !novaSolicitacao.status) {
        alert("Título e status são obrigatórios.");
        return;
    }

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaSolicitacao)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar solicitação.");
        }

        formSolicitacao.reset();

        await carregarSolicitacoes();
    } catch (erro) {
        alert("Não foi possível cadastrar a solicitação.");
        console.error(erro);
    }
}

async function alterarStatus(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: "Concluída"
            })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar status.");
        }

        await carregarSolicitacoes();
    } catch (erro) {
        alert("Não foi possível atualizar o status da solicitação.");
        console.error(erro);
    }
}

formSolicitacao.addEventListener("submit", cadastrarSolicitacao);

selectFiltro.addEventListener("change", renderizarTabela);

carregarSolicitacoes();