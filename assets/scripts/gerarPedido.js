async function finalizarPedido() {
    const resposta = await fetch("assets/php/gerarPedido.php");
    const dados = await resposta.json();
    if (dados.sucesso) {
        window.location.href=`pedidos.html`
    } 
}