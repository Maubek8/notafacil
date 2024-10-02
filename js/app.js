document.addEventListener("DOMContentLoaded", function() {
    const alunosInput = document.getElementById("alunosRAs");
    const numProvasInput = document.getElementById("numProvas");
    const colunasInputDiv = document.getElementById("colunas");
    const colunasInputSection = document.getElementById("colunasInput");
    const tabelaVisualizacao = document.getElementById("tabelaVisualizacao");
    const tabelaAlunos = document.getElementById("tabelaAlunos");

    document.getElementById("criarTabela").addEventListener("click", function() {
        const numProvas = numProvasInput.value;
        if (!alunosInput.value || numProvas < 1) {
            alert("Preencha os dados corretamente!");
            return;
        }

        // Limpa as colunas anteriores
        colunasInputDiv.innerHTML = '';

        for (let i = 1; i <= numProvas; i++) {
            const label = document.createElement("label");
            label.textContent = `Nome da Prova ${i}:`;
            const input = document.createElement("input");
            input.type = "text";
            input.name = `coluna${i}`;
            input.required = true;

            colunasInputDiv.appendChild(label);
            colunasInputDiv.appendChild(input);
            colunasInputDiv.appendChild(document.createElement("br"));
        }

        colunasInputSection.style.display = "block";
    });

    document.getElementById("gerarTabelaCompleta").addEventListener("click", function() {
        const alunosRAs = alunosInput.value.split("\n").map(linha => linha.split(","));
        const colunas = colunasInputDiv.querySelectorAll("input");

        tabelaAlunos.innerHTML = ''; // Limpar tabela anterior

        // Cabeçalho da Tabela
        const headerRow = document.createElement("tr");
        const nomeHeader = document.createElement("th");
        nomeHeader.textContent = "Nome";
        const raHeader = document.createElement("th");
        raHeader.textContent = "RA";
        headerRow.appendChild(nomeHeader);
        headerRow.appendChild(raHeader);

        colunas.forEach(coluna => {
            const colHeader = document.createElement("th");
            colHeader.textContent = coluna.value;
            headerRow.appendChild(colHeader);
        });

        const totalHeader = document.createElement("th");
        totalHeader.textContent = "Total";
        headerRow.appendChild(totalHeader);

        tabelaAlunos.appendChild(headerRow);

        // Corpo da Tabela
        alunosRAs.forEach(aluno => {
            const row = document.createElement("tr");

            const nomeCell = document.createElement("td");
            nomeCell.textContent = aluno[0];
            row.appendChild(nomeCell);

            const raCell = document.createElement("td");
            raCell.textContent = aluno[1];
            row.appendChild(raCell);

            colunas.forEach(() => {
                const notaCell = document.createElement("td");
                const notaInput = document.createElement("input");
                notaInput.type = "number";
                notaInput.min = "0";
                notaInput.max = "10";
                notaInput.addEventListener("input", calcularTotal);

                notaCell.appendChild(notaInput);
                row.appendChild(notaCell);
            });

            const totalCell = document.createElement("td");
            totalCell.classList.add("total");
            totalCell.textContent = "0";
            row.appendChild(totalCell);

            tabelaAlunos.appendChild(row);
        });

        tabelaVisualizacao.style.display = "block";
    });

    function calcularTotal() {
        const row = this.closest("tr");
        let total = 0;

        row.querySelectorAll("input").forEach(input => {
            total += parseFloat(input.value) || 0;
        });

        row.querySelector(".total").textContent = total.toFixed(2);
    }

    document.getElementById("salvarExcel").addEventListener("click", function() {
        // Lógica para salvar a tabela em Excel
    });

    document.getElementById("imprimirTabela").addEventListener("click", function() {
        window.print();
    });
});
