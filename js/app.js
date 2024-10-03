document.addEventListener("DOMContentLoaded", function() {
    const criarTabelaBtn = document.getElementById("criarTabela");
    const exibirTabelaBtn = document.getElementById("imprimirTabela");

    criarTabelaBtn.addEventListener("click", criarTabela);
    exibirTabelaBtn.addEventListener("click", function() {
        atualizarTabelaParaExibicao();  // Prepara a tabela com os valores das provas
        exibirTabelaEmNovaJanela();     // Exibe a tabela em uma nova janela com opção de imprimir
    });

    function criarTabela() {
        const alunosInput = document.getElementById("alunosRAs");
        const numProvasInput = document.getElementById("numProvas");
        const tabelaVisualizacao = document.getElementById("tabelaVisualizacao");
        const tabelaAlunos = document.getElementById("tabelaAlunos");

        tabelaAlunos.innerHTML = ''; // Limpa a tabela anterior

        const numProvas = parseInt(numProvasInput.value, 10);
        if (isNaN(numProvas) || numProvas < 1) {
            alert("Insira um número válido de provas.");
            return;
        }

        const alunos = alunosInput.value
            .split("\n")
            .map(linha => linha.trim())
            .filter(linha => linha !== "" && linha !== "0"); // Filtra linhas em branco e com "0"

        if (alunos.length === 0) {
            alert("Insira ao menos um aluno.");
            return;
        }

        // Cabeçalho da tabela
        let cabecalho = '<tr><th>Nome</th>';
        for (let i = 0; i < numProvas; i++) {
            cabecalho += `<th>Prova ${i + 1}</th>`;
        }
        cabecalho += '<th>Total</th></tr>';
        tabelaAlunos.innerHTML = cabecalho;

        // Linhas da tabela
        alunos.forEach(nome => {
            let linhaTabela = `<tr><td>${nome}</td>`;
            for (let i = 0; i < numProvas; i++) {
                linhaTabela += `<td><input type="number" class="nota" min="0" max="10" value="0"></td>`;
            }
            linhaTabela += '<td class="total">0</td></tr>';
            tabelaAlunos.innerHTML += linhaTabela;
        });

        tabelaVisualizacao.style.display = 'block';

        // Adicionando evento para atualizar o total quando uma nota é alterada
        document.querySelectorAll('.nota').forEach(input => {
            input.addEventListener('input', function() {
                const row = this.parentNode.parentNode;
                updateTotal(row);
            });
        });
    }

    function updateTotal(row) {
        const notas = row.querySelectorAll('.nota');
        let total = 0;
        notas.forEach(nota => {
            total += parseFloat(nota.value) || 0;
        });
        row.querySelector('.total').textContent = total.toFixed(2);
    }

    // Função para atualizar a tabela substituindo os campos de input pelos valores inseridos
    function atualizarTabelaParaExibicao() {
        const tabelaAlunos = document.getElementById("tabelaAlunos");
        const linhas = tabelaAlunos.querySelectorAll("tr");

        linhas.forEach(linha => {
            const celulas = linha.querySelectorAll("td");
            celulas.forEach(celula => {
                const input = celula.querySelector("input");
                if (input) {
                    const valor = input.value || "0"; // Coleta o valor do input
                    celula.textContent = valor; // Substitui o input pelo valor
                }
            });
        });
    }

    // Função para exibir a tabela em uma nova janela com botão de imprimir
    function exibirTabelaEmNovaJanela() {
        const tabelaHtml = document.getElementById("tabelaVisualizacao").innerHTML;
        const novaJanela = window.open('', '', 'width=800,height=600');
        novaJanela.document.write('<html><head><title>Visualização da Tabela</title>');
        novaJanela.document.write('<style>table {width: 100%; border-collapse: collapse;} th, td {border: 1px solid #ccc; padding: 5px; font-size: 12px; text-align: left;} button {margin-top: 20px; padding: 10px;}</style>');
        novaJanela.document.write('</head><body>');
        novaJanela.document.write(tabelaHtml);
        novaJanela.document.write('<button onclick="window.print()">Imprimir</button>');  // Botão de impressão
        novaJanela.document.write('</body></html>');
        novaJanela.document.close();
    }
});
