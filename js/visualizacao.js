window.onload = function() {
    // Carregar a tabela salva do sessionStorage
    const tabela = sessionStorage.getItem('tabelaNotas');
    if (tabela) {
        document.getElementById('tabelaAlunos').innerHTML = tabela; // Exibe a tabela salva
        addInputListeners(); // Adiciona ouvintes aos campos de nota para recalcular os totais
    } else {
        document.getElementById('tabelaAlunos').innerHTML = '<tr><td>Nenhuma tabela encontrada.</td></tr>';
    }

    // Botão para salvar a tabela editada
    document.getElementById('salvarTabela').addEventListener('click', function() {
        const tabelaHtml = document.getElementById('tabelaAlunos').outerHTML;
        sessionStorage.setItem('tabelaNotas', tabelaHtml); // Salva a tabela editada no sessionStorage
        alert("Tabela salva com sucesso!"); // Mensagem de confirmação
    });

    // Botão para imprimir apenas a tabela
    document.getElementById('imprimirTabela').addEventListener('click', function() {
        const tabela = document.getElementById('tabelaVisualizacao').innerHTML;
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write('<html><head><title>Imprimir Tabela</title>');
        printWindow.document.write('<style>table {width: 100%; border-collapse: collapse;} th, td {border: 1px solid #ccc; padding: 5px; font-size: 12px; text-align: left;}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(tabela);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });

    // Botão para novo documento (voltar ao site inicial)
    document.getElementById('novoDocumento').addEventListener('click', function() {
        window.location.href = 'index.html'; // Redireciona para o site inicial
    });
};

// Adiciona listeners para recalcular os totais ao alterar as notas
function addInputListeners() {
    const inputs = document.querySelectorAll('.nota');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            updateTotal(this.parentElement.parentElement); // Atualiza o total da linha correspondente
        });
    });
}

// Recalcula o total de cada linha
function updateTotal(row) {
    const totalCell = row.querySelector(".total");
    let total = 0;
    row.querySelectorAll(".nota").forEach(nota => {
        total += parseFloat(nota.value) || 0;
    });
    totalCell.textContent = total.toFixed(2); // Mostra o total com duas casas decimais
}
