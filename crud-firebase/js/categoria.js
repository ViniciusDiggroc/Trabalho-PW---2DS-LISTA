const ref = db.ref("clientes");
 
$("#salvar").click(function () {
    let categoria = $("#categoria").val();
    let info = $("#info").val();
 
    if(categoria === "" || info === "") {
        alert("Preencha todos os campos!");
        return;
    }
 
    ref .push({categoria, info})
   
    limpar();
});
 
function limpar() {
    $("#categoria").val("");
    $("#info").val("");
    $("#categoria").focus();
};