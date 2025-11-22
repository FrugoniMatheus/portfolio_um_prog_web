async function finalizarPedido() {
    const resposta = await fetch("assets/php/gerarPedido.php");
    const dados = await resposta.json();
    if (dados.sucesso) {
        Toastify({
            text: `Pedido finalizado! Pedido ID: ${dados.pedido_id}`,
            className: "info",
            style: { background: "#429e04ff" },
        }).showToast();
        location.reload();
    } else {
        Toastify({
            text: "Erro: " + dados.msg,
            className: "info",
            style: { background: "#ff0303ff" },
        }).showToast();
    }

}