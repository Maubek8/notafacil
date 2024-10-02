window.onload = function() {
    // Carregar a tabela salva (simulação de dados)
    const tabela = sessionStorage.getItem('tabelaNotas');
    if (tabela) {
        document.getElementById('tabelaAlunos').innerHTML = tabela;
    } else {
        document.getElementById('tabelaAlunos').innerHTML = '<tr><td>Nenhuma tabela encontrada.</td></tr>';
    }

    // Botão para voltar à edição
    document.getElementById('editarTabela').addEventListener('click', function() {
        window.location.href = 'index.html'; // Site de edição
    });

    // Botão para imprimir apenas a tabela
    document.getElementById('imprimirTabela').addEventListener('click', function() {
        const tabela = document.getElementById('tabelaVisualizacao').innerHTML;
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write('<html><head><title>Imprimir Tabela</title>');
        printWindow.document.write('<style>table {width: 100%; border-collapse: collapse;} th, td {border: 1px solid #ccc; padding: 10px; text-align: left;}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(tabela);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });

    // Botão para novo documento
    document.getElementById('novoDocumento').addEventListener('click', function() {
        window.location.href = 'index.html'; // Redirecionar ao site inicial
    });
};
