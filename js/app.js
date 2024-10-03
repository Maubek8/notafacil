document.addEventListener("DOMContentLoaded", function() {
    const criarTabelaBtn = document.getElementById("criarTabela");
    const imprimirTabelaBtn = document.getElementById("imprimirTabela");

    criarTabelaBtn.addEventListener("click", criarTabela);
    imprimirTabelaBtn.addEventListener("click", function() {
        atualizarTabelaParaExibicao();  // Prepara a tabela com as notas inseridas
        exibirTabelaEmNovaJanela();     // Exibe a tabela em uma nova janela
    });

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

        const alunos = alunosInput.value
            .split("\n")
            .map(linha => linha.trim())
            .filter(linha => linha !== "" && linha !== "0"); // Filtra linhas em branco e com "0"

        if (alunos.length === 0) {
            alert("Insira ao menos um aluno.");
            return;
        }

        // Cabeçalho da tabela
        let cabecalho = '<tr><th>Nome</th>';
        for (let i = 0; i < numProvas; i++) {
            cabecalho += `<th>Prova ${i + 1}</th>`;
        }
        cabecalho += '<th>Total</th></tr>';
        tabelaAlunos.innerHTML = cabecalho;

        //
