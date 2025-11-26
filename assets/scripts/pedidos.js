let htmlConteudo6 = '';
let htmlConteudo5 = '';
let containerPed = document.querySelector('.container-pedidos')
let ped = [];
let item = [];
function pedidos() {
  htmlConteudo5 = '';
  if (ped.length === 0) {
    htmlConteudo5 = `
<div class="elemento">
<h3>NENHUM PEDIDO FOI ENCONTRADO!</h3>
<img src="./assets/imgs/elementos/sacola_vazia.png" alt="">
<p>Verifique o nosso catalogo, e adicione ao carrinho o produto que você deseja, ao final finalize o seu pedido! </p>
<a href="./catalogo.html">Voltar para o Catalogo</a>
</div>`
  }
  else {

    ped.forEach(pedi => {
      htmlConteudo5 += `
    <div class="produtos")">
            <h3>Pedido N°${pedi.id_pedido} | ${pedi.data.slice(0, 10)}</h3>
             <div class="container-produtos" id="${pedi.id_pedido}" >
            </div> 
            <div class="resumo-pedido">
              <div class="info-pedido">
                <strong>Subtotal</strong>
                <span>R$${pedi.total}</span>
              </div>
               <div class="info-pedido">
                <strong>Total de Descontos</strong>
                <span>R$00,00</span>
              </div>
                 <div class="info-pedido">
                <strong>Frete</strong>
                <span>R$00,00</span>
              </div>
                <div class="info-pedido">
                <strong>Total</strong>
                <span>R$${pedi.total}</span>
              </div>
            </div>
            <button class='botao-detalhes' onclick="mostrarItens(${pedi.id_pedido})" id="btn-${pedi.id_pedido}">Detalhar Pedido</button>
          </div> `
      pedi.itens.forEach(itens => {
        const produto = {
          id_pedido: pedi.id_pedido,
          data: pedi.data.slice(0, 10),
          nome: itens.nome,
          quantidade: itens.quantidade,
          preco: itens.preco_unitario,
          url: itens.url_img
        }
        item.push(produto)
      })
    })
  }
  containerPed.innerHTML = htmlConteudo5;
}
function mostrarItens(id_pedido) {
  htmlConteudo6 = '';
  item.forEach(itens => {
    if (itens.id_pedido === id_pedido) {
      htmlConteudo6 += `
    <div class="produtos-pedido">
    <img src="${itens.url}" alt="" />
        <div class="info-prod">
          <strong>Produto: </strong>
          <span>${itens.nome}</span>
        </div>
        <div class="info-prod">
          <strong>Quantidade:</strong>
          <span>${itens.quantidade}</span>
        </div>
        <div class="info-prod">
          <strong>Preco Unitario:</strong>
          <span>R$ ${itens.preco}</span>
        </div>
        <div class="info-prod">
          <strong>Subtotal:</strong>
          <span>R$ ${itens.preco * itens.quantidade}</span>
        </div>
      </div> 
      </div> 
`
    }
  })
  document.getElementById(`${id_pedido}`).innerHTML = htmlConteudo6;
}
fetch("assets/php/loadPedidos.php")
  .then(response => response.json())
  .then(data => {
    ped = data.pedidos
    pedidos()
  }
  )