document.addEventListener("DOMContentLoaded", function() {
    const alunosInput = document.getElementById("alunosRAs");
    const numProvasInput = document.getElementById("numProvas");
    const tabelaVisualizacao = document.getElementById("tabelaVisualizacao");
    const tabelaAlunos = document.getElementById("tabelaAlunos");

    document.getElementById("criarTabela").addEventListener("click", function() {
        const numProvas = numProvasInput.value;
        const alunosRAs = alunosInput.value.split("\n").map(linha => {
            let parts = linha.split(',');
            return { nome: parts[0].trim(), ra: parts[1].trim() };
        });

        tabelaAlunos.innerHTML = '<tr><th>Nome</th><th>RA</th>';
        for (let i = 0; i < numProvas; i++) {
            tabelaAlunos.innerHTML += `<th>Prova ${i + 1}</th>`;
        }
        tabelaAlunos.innerHTML += '<th>Nota Final</th></tr>';

        alunosRAs.forEach(aluno => {
            let row = `<tr><td>${aluno.nome}</td><td>${aluno.ra}</td>`;
            for (let i = 0; i < numProvas; i++) {
                row += '<td><input type="number" min="0" max="10" value="0"></td>';
            }
            row += '<td class="total">0</td></tr>';
            tabelaAlunos.innerHTML += row;
        });

        tabelaVisualizacao.style.display = 'block';
    });

    // Implementação das outras funcionalidades conforme necessário
});
