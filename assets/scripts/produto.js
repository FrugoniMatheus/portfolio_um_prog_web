
const container = document.getElementById('grids');
const container3 = document.getElementById('grid-tenis-esportivos');
const info = document.getElementById('enviar');
let htmlConteudo = '';
let htmlConteudo3 = '';
let htmlConteudo4 = '';
let listaProdutos = [];
let valor = 0
const prodCarrinho = [];
function mostrarProdutos() {
  htmlConteudo = '';
  listaProdutos.forEach((produto, index) => {
    if (produto.estoque > 0 && produto.tipo === 'casual') {
      htmlConteudo += `
         <div class="produtos-card">
           <img src="${produto.urlImg}" alt="${produto.nome}" />
           <div class="descricao">
             <h3>${produto.nome}</h3>
             <p>ID:${produto.id}<P>
             <span class="preco-antigo">R$ ${produto.preco.replace(".", ",")}</span><br />
             <span>R$ ${produto.preco.replace(".", ",")}</span>
           </div>
           <div class="posi-botoes">
           <button class="compra" onclick="comprar(${produto.id})">Comprar</button>
           <a onclick="consultarCarrinho(${produto.id})">
             <img class="icons-catalogo" src="./assets/imgs/icons/icone_compras_preto.svg" alt="">
           </a>
           </div>
         </div>`;
    }
    else if (produto.estoque > 0 && produto.tipo === 'esportivo') {
      htmlConteudo3 += `
         <div class="produtos-card">
           <img src="${produto.urlImg}" alt="${produto.nome}" />
           <div class="descricao">
             <h3>${produto.nome}</h3>
             <p>ID:${index + 1}<P>
             <span class="preco-antigo">R$ ${produto.preco.replace(".", ",")}</span><br />
             <span>R$ ${produto.preco.replace(".", ",")}</span>
           </div>
           <div class="posi-botoes">
           <button class="compra" onclick="comprar(${produto.id})">Comprar</button>
           <a onclick="consultarCarrinho(${produto.id})">
             <img class="icons-catalogo" src="./assets/imgs/icons/icone_compras_preto.svg" alt="">
           </a>
           </div>
         </div>`;
    }
    else if (produto.estoque <= 0 && produto.tipo === 'esportivo') {
      htmlConteudo3 += `
         <div class="produtos-card">
           <img src="${produto.urlImg}" alt="${produto.nome}" class='indisponivel'/>
           <div class="descricao">
             <h3>${produto.nome}</h3>
             <p>ID:${produto.id}<P>
             <p>Estoque: Indisponivel<P>
           </div>
           Produto Temporariamente Indisponivel
           </div>
         </div>`;
    }
    else if (produto.estoque <= 0 && produto.tipo === 'casual') {
      htmlConteudo += `
         <div class="produtos-card">
           <img src="${produto.urlImg}" alt="${produto.nome}" class='indisponivel'/>
           <div class="descricao">
             <h3>${produto.nome}</h3>
             <p>ID:${produto.id}<P>
             <p>Estoque: Indisponivel<P>
           </div>
           <div>
           <p>Produto Temporariamente Indisponivel</p>
           </div>
         </div>`;
    }
  });
  container.innerHTML = htmlConteudo;
  container3.innerHTML = htmlConteudo3;
}
async function adicionarCarrinho(id_produto) {
  let formData = new FormData();
  formData.append("id_produto", id_produto);
  formData.append("quantidade", 1);
  fetch("assets/php/adicionarCarrinho.php", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      window.location.href = "carrinho.html";
    });
}
async function consultarCarrinho(id_produto) {
  const resposta = await fetch("assets/php/mostrarCarrinho.php");
  const carrinho = await resposta.json();
  console.table(carrinho)
  let verificador = 0;
  carrinho.forEach((i) => {
    if (i.quantidade < i.estoque && i.id_produto === id_produto && verificador < 1) {
      adicionarCarrinho(id_produto)
      verificador = 1
    }
    if (i.id_produto === id_produto) {
      verificador = 2
    }
  })
  if (verificador === 0) {
    adicionarCarrinho(id_produto);
  }
}
fetch("assets/php/loadProdutos.php")
  .then(response => response.json()).then(data => {
    listaProdutos = data
    mostrarProdutos()
  })
  .catch(err => console.error("Erro ao verificar sessão:", err));
