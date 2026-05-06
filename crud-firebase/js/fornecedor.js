const ref = db.ref("fornecedor");

    $("#cnpj").mask("00.000.000/0000-00");

$("#salvar").click(function () {
    let nome = $("#nome").val();
    let email = $("#email").val();
    let cnpj = $("#cnpj").val();
    let estado = $('input[name="estado"]:checked').val();

    if (nome === "" || email === "" || cnpj === "" || !estado) {
        alert('Preencha todos os campos');
        return
    }

    ref.push({ nome, email, cnpj, estado });

    limpar();

});

ref.on("value", dados_tabela => {
    $("#lista").empty();

  $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>CNPJ</th>
            <th>estado</th>
            <th colspan="2">Opções</th>
        </tr>
    `);

    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;

        $("#lista").append(`
            <tr> 
                <td>${id}</td>
                <td>${reg.nome}</td>
                <td>${reg.email}</td>
                <td>${reg.cnpj}</td>
                <td>${reg.estado}</td>
               <td>
                    <button class="btn btn-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
            
            `);
    })


});

function limpar() {
    $("#nome").val("");
    $("#email").val("");
    $("#cnpj").val(""),
    $('input[name="estado"]').prop('checked', false);
    $("#nome").focus();

};











