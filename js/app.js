document.addEventListener("DOMContentLoaded", function() {
    const criarTabelaBtn = document.getElementById("criarTabela");
    criarTabelaBtn.addEventListener("click", criarTabela);

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

        const alunos = alunosInput.value.split("\n").map(linha => linha.trim()).filter(linha => linha !== "");

        if (alunos.length === 0) {
            alert("Insira ao menos um aluno.");
            return;
        }

        // Cabeçalho da tabela
        let cabecalho = '<tr><th>Nome</th>';
        for (let i = 0; i < numProvas; i++) {
            cabecalho += `<th contenteditable="true">Prova ${i + 1}</th>`;
        }
        cabecalho += '<th>Total</th></tr>';
        tabelaAlunos.innerHTML = cabecalho;

        // Linhas da tabela
        alunos.forEach(nome => {
            let linhaTabela = `<tr><td>${nome}</td>`;
            for (let i = 0; i < numProvas; i++) {
                linhaTabela += `<td><input type="number" class="nota" min="0" max="10" value="0" oninput="updateTotal(this.parentElement.parentElement)"></td>`;
            }
            linhaTabela += '<td class="total">0</td></tr>';
            tabelaAlunos.innerHTML += linhaTabela;
        });

        tabelaVisualizacao.style.display = 'block';
    }

    function updateTotal(row) {
        const totalCell = row.querySelector(".total");
        let total = 0;
        row.querySelectorAll(".nota").forEach(nota => {
            total += parseFloat(nota.value) || 0;
        });
        totalCell.textContent = total.toFixed(2);
    }

    // Função para salvar a tabela no sessionStorage e redirecionar para a visualização
    document.getElementById("salvarExcel").addEventListener("click", function() {
        const tabelaHtml = document.getElementById("tabelaAlunos").outerHTML;
        sessionStorage.setItem('tabelaNotas', tabelaHtml); // Salva a tabela no sessionStorage
        window.location.href = 'visualizacao.html'; // Redireciona para a página de visualização
    });
});
