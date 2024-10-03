document.addEventListener("DOMContentLoaded", function() {
    const criarTabelaBtn = document.getElementById("criarTabela");
    criarTabelaBtn.addEventListener("click", criarTabela);

    function criarTabela() {
        const alunosInput = document.getElementById("alunosRAs");
        const numProvasInput = document.getElementById("numProvas");
        const tabelaAlunos = document.getElementById("tabelaAlunos");
        const tabelaVisualizacao = document.getElementById("tabelaVisualizacao");

        tabelaAlunos.innerHTML = '';
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

        let cabecalho = '<tr><th>Nome</th>';
        for (let i = 0; i < numProvas; i++) {
            cabecalho += `<th>Prova ${i + 1}</th>`;
        }
        cabecalho += '<th>Total</th></tr>';
        tabelaAlunos.innerHTML = cabecalho;

        alunos.forEach(nome => {
            let linhaTabela = `<tr><td>${nome}</td>`;
            for (let i = 0; i < numProvas; i++) {
                linhaTabela += `<td><input type="number" class="nota" min="0" max="10" value="0"></td>`;
            }
            linhaTabela += '<td class="total">0</td></tr>';
            tabelaAlunos.innerHTML += linhaTabela;
        });

        tabelaVisualizacao.style.display = 'block';

        document.querySelectorAll('.nota').forEach(input => {
            input.addEventListener('input', function() {
                const row = this.parentNode.parentNode;
                const notas = row.querySelectorAll('.nota');
                const totalCell = row.querySelector('.total');
                let total = 0;
                notas.forEach(nota => {
                    total += parseFloat(nota.value) || 0;
                });
                totalCell.textContent = total.toFixed(2);
            });
        });
    }
});
