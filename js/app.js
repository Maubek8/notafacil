document.addEventListener("DOMContentLoaded", function() {
    const alunosInput = document.getElementById("alunosRAs");
    const numProvasInput = document.getElementById("numProvas");
    const criarTabelaBtn = document.getElementById("criarTabela");
    const tabelaVisualizacao = document.getElementById("tabelaVisualizacao");
    const tabelaAlunos = document.getElementById("tabelaAlunos");

    criarTabelaBtn.addEventListener("click", function() {
        const numProvas = parseInt(numProvasInput.value, 10);
        if (isNaN(numProvas) || numProvas < 1) {
            alert("Por favor, insira um número válido de provas.");
            return;
        }

        const alunosRAs = alunosInput.value.split("\n").filter(line => line.trim() !== "").map(linha => {
            let parts = linha.split(',');
            return { nome: parts[0].trim(), ra: parts[1] ? parts[1].trim() : 'N/A' };
        });

        if (alunosRAs.length === 0) {
            alert("Por favor, insira ao menos um aluno.");
            return;
        }

        tabelaAlunos.innerHTML = '<tr><th>Nome</th><th>RA</th>';
        for (let i = 0; i < numProvas; i++) {
            tabelaAlunos.innerHTML += `<th>Prova ${i + 1}</th>`;
        }
        tabelaAlunos.innerHTML += '<th>Nota Final</th></tr>';

        alunosRAs.forEach(aluno => {
            let row = `<tr><td>${aluno.nome}</td><td>${aluno.ra}</td>`;
            for (let i = 0; i < numProvas; i++) {
                row += `<td><input type="number" class="nota" min="0" max="10" value="0" onchange="updateTotal(this)"></td>`;
            }
            row += '<td class="total">0</td></tr>';
            tabelaAlunos.innerHTML += row;
        });

        tabelaVisualizacao.style.display = 'block';
    });
});

function updateTotal(element) {
    const row = element.closest("tr");
    const totalCell = row.querySelector(".total");
    let total = 0;
    row.querySelectorAll(".nota").forEach(nota => {
        total += parseFloat(nota.value) || 0;
    });
    totalCell.textContent = total.toFixed(2);
}
