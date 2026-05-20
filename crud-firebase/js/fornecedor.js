const ref = db.ref("fornecedor");

let idcapturado = null;
$("#cancelar").hide();

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


    if (idcapturado) {//editar
        ref.child(idcapturado).update({ nome, email, cnpj, estado });
        idcapturado = null;
        $("#salvar").text("Salvar");

        $("#cancelar").hide();
        $("#salvar").removeClass("btn-success").addClass("btn-primary");
        $("#status").text("");
    } else {//salvar
        ref.push({ nome, email, cnpj, estado });
    }



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
                    <button class="btn btn-warning btn-sm"
                     onclick="editar('${id}','${reg.nome}','${reg.email}','${reg.cnpj}','${reg.estado}')">
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

function editar(id, nome, email, cnpj, estado) {
    $("#nome").val(nome);
    $("#email").val(email);
    $("#cnpj").val(cnpj);
    $("#estado").val(estado);
    idcapturado = id;

    $("#cancelar").show();

    $("#salvar")
        .text("Atualizar")
        .removeClass("btn-primary")
        .addClass("btn-success");

    $("#status").text("Editando registro...");
}










