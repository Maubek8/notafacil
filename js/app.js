document.addEventListener("DOMContentLoaded", function() {
    const criarTabelaBtn = document.getElementById("criarTabela");
    criarTabelaBtn.addEventListener("click", criarTabela);
});

function criarTabela() {
    const alunosInput = document.getElementById("alunosRAs");
    const numProvasInput = document.getElementById("numProvas");
    const tabelaVisualizacao = document.getElementById("tabelaVisualizacao");
    const tabelaAlunos = document.getElementById("tabelaAlunos");

    // Limpa tabela anterior
    tabelaAlunos.innerHTML = '';

    const numProvas = parseInt(numProvasInput.value, 10);
    if (isNaN(numProvas) || numProvas < 1) {
        alert("Insira um número válido de provas.");
        return;
    }

    const alunosRAs = alunosInput.value.split("\n").filter(line => line.trim() !== "").map(linha => {
        let parts = linha.split(',');
        return { nome: parts[0].trim(), ra: parts[1] ? parts[1].trim() : 'N/A' };
    });

    if (alunosRAs.length === 0) {
        alert("Insira ao menos um aluno.");
        return;
    }

    // Cabeçalho da tabela
    let cabecalho = '<tr><th>Nome</th><th>RA</th>';
    for (let i = 0; i < numProvas; i++) {
        cabecalho += `<th>Prova ${i + 1}</th>`;
    }
    cabecalho += '<th>Nota Final</th></tr>';
    tabelaAlunos.innerHTML = cabecalho;

    // Linhas da tabela
    alunosRAs.forEach(aluno => {
        let linha = `<tr><td>${aluno.nome}</td><td>${aluno.ra}</td>`;
        for (let i = 0; i < numProvas; i++) {
            linha += `<td><input type="number" class="nota" min="0" max="10" value="0" oninput="updateTotal(this.parentElement.parentElement)"></td>`;
        }
        linha += '<td class="total">0</td></tr>';
        tabelaAlunos.innerHTML += linha;
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
