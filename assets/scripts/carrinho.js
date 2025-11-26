let HtmlConteudo = '';
let HtmlConteudo2 = '';
let container2 = document.getElementById('grid-cards-carrinho');
let container3 = document.getElementById('resumo-compra');
document.addEventListener("DOMContentLoaded", () => {
 carregarCarrinho();
});
async function carregarCarrinho() {
    const resposta = await fetch("assets/php/mostrarCarrinho.php");
    const carrinho = await resposta.json();
     HtmlConteudo2 = '';
     HtmlConteudo = '';
    console.table(carrinho)
  if (carrinho.length === 0) {
    HtmlConteudo = `
  <div class="elemento">
  <h3>SEU CARRINHO ESTÁ VAZIO !</h3>
  <img src="./assets/imgs/elementos/sacola_vazia.png" alt="">
  <p>Verifique o nosso catalogo, e adicione ao carrinho o produto que você deseja! </p>
  <a href="./catalogo.html">Voltar para o Catalogo</a>
</div>`
    HtmlConteudo2 = '';
  }
  let quantidadeTotal = 0
  carrinho.forEach((produto, index) => {
    quantidadeTotal += produto.quantidade
  }
  )
  if (quantidadeTotal === 0) {
    HtmlConteudo = `
  <div class="elemento">
  <h3>SEU CARRINHO ESTÁ VAZIO !</h3>
  <img src="./assets/imgs/elementos/sacola_vazia.png" alt="">
  <p>Verifique o nosso catalogo, e adicione ao carrinho o produto que você deseja! </p>
  <a href="./catalogo.html">Voltar para o Catalogo</a>
</div>`
    HtmlConteudo2 = '';
  }
  let total = 0
  carrinho.forEach((produto) => {
    total+=produto.subtotal
    if (produto.quantidade > 0) {
      HtmlConteudo += `
  <div class="produtos">
  <div class="container-produtos" id="produtos-card">
    <img src="${produto.url_img}" alt="">
    <div class="info-prod">
      <h3>Produto</h3>
      <span>Nome: ${produto.nome}</span>
      <span>Estoque: ${produto.estoque - produto.quantidade}</span>
      <span>Preço Unitario: R$ ${produto.preco_unitario}</span>
    </div>
  </div>
  <div class="info-quantidade">
    <h3>Quantidade</h3>
    <div class="container-produtos" id="produtos-quantidade"> 
      <button class="btn-acao" onclick="retirarProduto(${produto.id_produto})">-</button>
      <div class="quantidade">
        <p>${produto.quantidade}</p>
      </div>
      <button class="btn-acao" onclick="adicionarProduto(${produto.id_produto},${produto.estoque},${produto.quantidade})">+</button>
    </div>
    </div>
  <div class="info-subtotal">
    <h3>Subtotal</h3>
    <div class="container-produtos">
        <div class="subtotal">
          <span>R$ ${produto.subtotal}</span>      
      </div>
      </div>
  </div>
    <button class="deletar" onclick="removerProduto(${produto.id_produto})"><img class="icons-carrinho" src="./assets/imgs/icons/icone_lixeira.svg"></button>
</div>`
      HtmlConteudo2 = `<div class="frete">
          <h3>Calcular Frete</h3>
          <div class="container-frete">
            <input type="text" class="inputs" placeholder="CEP: 00000-000" />
            <button class="btn-frete">Calcular</button>
          </div>
          <a href="http://">Não sei meu CEP</a>
        </div>
        <div class="cupom">
          <h3>Cupom de Desconto</h3>
          <div class="container-cupom">
            <input type="text" class="inputs" placeholder="Digite Seu Cupom" />
             <button class="btn-cupom" >Aplicar</button>
          </div>
        </div>
        <div class="resumo">
          <h3>Resumo</h3>
          <div class="container-resumo">
            <div class="informacoes">
              <span >Valor dos Produtos</span>
              <span>R$ ${total}</span>
            </div>
            <div class="informacoes">
              <span>Frete</span>
              <span>Gratis</span>
            </div>
            <div class="informacoes">
              <span>Total de Descontos</span>
                <span class="desconto">-R$ 00,00 </span>
            </div>
             <div class="informacoes">
              <span>Total da Compra</span>
               <span>R$ ${total} </span>
            </div>
            <button class="comprar" onclick= "finalizarPedido()">Finalizar Compra</button>
          </div>
        </div>
`
    }
    if(produto.quantidade === 0){
      removerProduto(produto.id_produto)
    }
  }
  );
  container2.innerHTML = HtmlConteudo;
  container3.innerHTML = HtmlConteudo2;
}

async function adicionarProduto(id_produto,estoque,quantidade) {
  let formData = new FormData();
    if(quantidade<estoque){
      formData.append("id_produto", id_produto);
      formData.append("quantidade", 1);
  
      fetch("assets/php/adicionarCarrinho.php", {
          method: "POST",
          body: formData
      })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          carregarCarrinho()
      });
    }

}
async function retirarProduto(id_produto) {
      let formData = new FormData();
    formData.append("id_produto", id_produto);
    formData.append("quantidade", 1);

    fetch("assets/php/retirarProduto.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        carregarCarrinho();
    });
}
async function removerProduto(id_produto) {
    let formData = new FormData();
    formData.append("id_produto", id_produto);

fetch("assets/php/removerProduto.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        carregarCarrinho();
    });
}
