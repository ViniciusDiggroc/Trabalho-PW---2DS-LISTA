const ref = db.ref("categoria");
 
let idcapturado = null;
$("#cancelar").hide();

$("#salvar").click(function () {
    let categoria = $("#categoria").val();
    let informacaos = $("#info").val();
 
     if (idcapturado) {//editar
        ref.child(idcapturado).update({ categoria, informacaos });
        idcapturado = null;
        $("#salvar").text("Salvar");

        $("#cancelar").hide();
        $("#salvar").removeClass("btn-success").addClass("btn-primary");
        $("#status"). text("");
    } else {//salvar
        ref.push({ categoria, informacaos });
    }
 
 
    limpar();
});
 
ref.on("value", dados_tabela => {
    $("#lista").empty();
 
    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Categoria</th>
            <th>Informações</th>
            <th colspan="2">Opções</th>
        </tr>
    `);
   
    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;
 
        $("#lista").append(`
            <tr>
                <td>${id}</td>
                <td>${reg.categoria}</td>
                <td>${reg.informacaos}</td>
                <td>
                    <button class="btn btn-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editar('${id}', '${reg.categoria}', '${reg.informacaos}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
        `);
    });
});
 
function limpar() {
    $("#categoria").val("");
    $("#info").val("");
    $("#categoria").focus();
}

function editar(id, categoria, informacaos) {
    $("#categoria").val(categoria);
    $("#info").val(informacaos);

    idcapturado = id;

    $("#cancelar").show();

    $("#salvar")
        .text("Atualizar")
        .removeClass("btn-primary")
        .addClass("btn-success");

    $("#status"). text("Editando registro...");
}