function calcularTemperatura() {
    const tipo = document.getElementById("tipoTermopar").value;
    const tensao = parseFloat(document.getElementById("tensao").value);
    const resultado = document.getElementById("resultado");
    let tabela;

    // Tabelas de referência
    const tabelas = {
        'K': [[0, 0], [1, 25], [2, 50], [3, 75], [4, 100], [5, 125], [6, 150], [7, 175], [8, 200], [9, 225], [10, 250]],
        'J': [[0, 0], [1, 30], [2, 60], [3, 90], [4, 120], [5, 150], [6, 180], [7, 210], [8, 240], [9, 270], [10, 300]],
        'T': [[0, 0], [1, 15], [2, 30], [3, 45], [4, 60], [5, 75], [6, 90], [7, 105], [8, 120], [9, 135], [10, 150]],
        'E': [[0, 0], [1, 20], [2, 40], [3, 60], [4, 80], [5, 100], [6, 120], [7, 140], [8, 160], [9, 180], [10, 200]]
    };

    if (tabelas[tipo]) {
        tabela = tabelas[tipo];
        let temperatura;

        // Interpolação linear
        for (let i = 0; i < tabela.length - 1; i++) {
            if (tensao >= tabela[i][0] && tensao <= tabela[i + 1][0]) {
                let t1 = tabela[i][1];
                let t2 = tabela[i + 1][1];
                let v1 = tabela[i][0];
                let v2 = tabela[i + 1][0];
                
                temperatura = t1 + (tensao - v1) * (t2 - t1) / (v2 - v1);
                break;
            }
        }

        if (temperatura !== undefined) {
            resultado.innerText = `Temperatura correspondente: ${temperatura.toFixed(2)} °C`;
        } else {
            resultado.innerText = 'Erro: Tensão fora do intervalo da tabela.';
        }
    } else {
        resultado.innerText = 'Erro: Tipo de termopar desconhecido.';
    }
}

function mostrarTabela() {
    const tipo = document.getElementById("tipoTermopar").value;
    document.getElementById("tabelaK").classList.add("hidden");
    document.getElementById("tabelaJ").classList.add("hidden");
    document.getElementById("tabelaT").classList.add("hidden");
    document.getElementById("tabelaE").classList.add("hidden");

    document.getElementById(`tabela${tipo}`).classList.remove("hidden");
    document.getElementById("tabelaTermopares").classList.remove("hidden");
}

function mostrarDescricao() {
    document.getElementById("painelLateral").classList.remove("hidden");
    document.getElementById("painelSobre").classList.remove("hidden");
    document.getElementById("painelTabela").classList.add("hidden");
    document.getElementById("mainFlex").classList.add("painel-ativo");
}

function mostrarTabelaPainel() {
    document.getElementById("painelLateral").classList.remove("hidden");
    document.getElementById("painelSobre").classList.add("hidden");
    document.getElementById("painelTabela").classList.remove("hidden");
    document.getElementById("mainFlex").classList.add("painel-ativo");
    // Mostra a tabela do tipo selecionado
    const tipo = document.getElementById("tipoTermopar").value;
    document.getElementById("tabelaK").classList.add("hidden");
    document.getElementById("tabelaJ").classList.add("hidden");
    document.getElementById("tabelaT").classList.add("hidden");
    document.getElementById("tabelaE").classList.add("hidden");
    document.getElementById(`tabela${tipo}`).classList.remove("hidden");
}

function fecharPainelLateral() {
    document.getElementById("painelLateral").classList.add("hidden");
    document.getElementById("painelSobre").classList.add("hidden");
    document.getElementById("painelTabela").classList.add("hidden");
    document.getElementById("mainFlex").classList.remove("painel-ativo");
}

function mostrarHome() {
    fecharPainelLateral();
    // Se quiser esconder outros painéis, pode adicionar mais lógica aqui
}

// O menu mobile é controlado pelo botão ☰ no index.html