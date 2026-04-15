const ref = db.ref("Fornecedor");

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

function limpar() {
    $("#nome").val("");
    $("#email").val("");
    $("#cnpj").val(""),
    $('input[name="estado"]').prop('checked', false);
    $("#nome").focus();

};











