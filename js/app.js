function criarTabela() {
    let alunosRAs = document.getElementById('alunosRAs').value.split('\n');
    let numProvas = document.getElementById('numProvas').value;
    let tabela = document.getElementById('tabelaAlunos');
    tabela.innerHTML = ''; // Limpar tabela anterior

    let header = tabela.createTHead();
    let row = header.insertRow(0);
    row.insertCell(0).innerHTML = "<b>Nome</b>";
    row.insertCell(1).innerHTML = "<b>RA</b>";

    for (let i = 1; i <= numProvas; i++) {
        let nomeProva = prompt(`Digite o nome da prova ${i}:`);
        row.insertCell(i + 1).innerHTML = `<b>${nomeProva}</b>`;
    }
    row.insertCell(numProvas + 2).innerHTML = "<b>Nota Final</b>";

    alunosRAs.forEach((aluno, index) => {
        let [ra, nome] = aluno.split(' - ');
        let row = tabela.insertRow(index + 1);
        row.insertCell(0).innerHTML = nome.trim();
        row.insertCell(1).innerHTML = ra.trim();
        
        for (let j = 0; j < numProvas; j++) {
            let cell = row.insertCell(j + 2);
            let input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            input.max = '10';
            input.oninput = calcularTotal;
            cell.appendChild(input);
        }
        
        let totalCell = row.insertCell(numProvas + 2);
        totalCell.innerHTML = '0';
    });

    document.getElementById('tabelaSessao').style.display = 'block';
}

function calcularTotal() {
    let row = this.parentNode.parentNode;
    let total = 0;
    for (let i = 2; i < row.cells.length - 1; i++) {
        total += parseFloat(row.cells[i].childNodes[0].value) || 0;
    }
    row.cells[row.cells.length - 1].innerHTML = total.toFixed(2);
}

function salvarExcel() {
    alert("Funcionalidade 'Salvar em Excel' ainda não implementada.");
}

function visualizarTabela() {
    alert("Funcionalidade 'Visualizar Tabela' ainda não implementada.");
}
