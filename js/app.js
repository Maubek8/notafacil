document.addEventListener("DOMContentLoaded", function() {
    const alunosInputDiv = document.getElementById("alunosInput");
    const colunasInputDiv = document.getElementById("colunasInput");
    const resultadoFinalDiv = document.getElementById("resultadoFinal");

    document.getElementById("addAlunos").addEventListener("click", function() {
        const numAlunos = document.getElementById("numAlunos").value;
        alunosInputDiv.innerHTML = '';

        for (let i = 1; i <= numAlunos; i++) {
            const label = document.createElement("label");
            label.textContent = `Nome do Aluno ${i}:`;

            const input = document.createElement("input");
            input.type = "text";
            input.name = `aluno${i}`;
            input.required = true;

            const raLabel = document.createElement("label");
            raLabel.textContent = `RA do Aluno ${i}:`;

            const raInput = document.createElement("input");
            raInput.type = "text";
            raInput.name = `ra${i}`;
            raInput.required = true;

            alunosInputDiv.appendChild(label);
            alunosInputDiv.appendChild(input);
            alunosInputDiv.appendChild(raLabel);
            alunosInputDiv.appendChild(raInput);
            alunosInputDiv.appendChild(document.createElement("br"));
        }
    });

    document.getElementById("addColunas").addEventListener("click", function() {
        const numColunas = document.getElementById("numColunas").value;
        colunasInputDiv.innerHTML = '';

        for (let i = 1; i <= numColunas; i++) {
            const label = document.createElement("label");
            label.textContent = `Nome da Prova ${i}:`;

            const input = document.createElement("input");
            input.type = "text";
            input.name = `prova${i}`;
            input.required = true;

            colunasInputDiv.appendChild(label);
            colunasInputDiv.appendChild(input);
            colunasInputDiv.appendChild(document.createElement("br"));
        }
    });

    document.getElementById("calcularNotaFinal").addEventListener("click", function() {
        const numAlunos = document.getElementById("numAlunos").value;
        const numColunas = document.getElementById("numColunas").value;
        let resultadoHTML = '<h3>Notas Finais</h3>';

        for (let i = 1; i <= numAlunos; i++) {
            let totalNota = 0;

            for (let j = 1; j <= numColunas; j++) {
                const notaInput = document.querySelector(`input[name="prova${j}"]`);
                if (notaInput) {
                    totalNota += parseFloat(notaInput.value);
                }
            }

            const media = totalNota / numColunas;
            resultadoHTML += `<p>Aluno ${i}: Média Final = ${media.toFixed(2)}</p>`;
        }

        resultadoFinalDiv.innerHTML = resultadoHTML;
    });

    document.getElementById("salvarPdf").addEventListener("click", function() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        pdf.text(resultadoFinalDiv.textContent, 10, 10);
        pdf.save("notas-finais.pdf");
    });
});
