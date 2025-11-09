
const container = document.getElementById('grids');
const container3 = document.getElementById('grid-tenis-esportivos');
const info = document.getElementById('enviar');
let htmlConteudo = '';
let htmlConteudo3 = '';
let htmlConteudo4 = '';
let listaProdutos = [];
let valor = 0
const produtos =
  [{ nome: 'Tenis Casual Adidas', precoAtual: 650, precoAntigo: 700, urlImg: './assets/imgs/tennis/adidas/casual_tenis1.png', quantidade: 0, estoque: 15, tipo: 'casual', destaque: 'nao' },
  { nome: 'Tenis Casual fila', precoAtual: 690, precoAntigo: 800, urlImg: './assets/imgs/tennis/fila/casual_tenis2.png', quantidade: 0, estoque: 20, tipo: 'casual', destaque: 'sim' },
  { nome: 'Tenis Casual Fila', precoAtual: 400, precoAntigo: 550, urlImg: './assets/imgs/tennis/fila/casual_tenis1.png', quantidade: 0, estoque: 10, tipo: 'casual', destaque: 'nao' },
  { nome: 'Tenis Esportivo Adidas', precoAtual: 1000, precoAntigo: 1200, urlImg: './assets/imgs/tennis/adidas/tenis_esportivo2.png', quantidade: 0, estoque: 15, tipo: 'esportivo', destaque: 'sim' },
  { nome: 'Tenis Esportivo Adidas', precoAtual: 1599.99, precoAntigo: 1750, urlImg: './assets/imgs/tennis/adidas/tenis_esportivo3.png', quantidade: 0, estoque: 20, tipo: 'esportivo', destaque: 'nao' },
  { nome: 'Tenis Esportivo Fila', precoAtual: 599.99, precoAntigo: 800, urlImg: './assets/imgs/tennis/fila/corrida_tenis1.png', quantidade: 0, estoque: 10, tipo: 'esportivo', destaque: 'sim' }];

document.addEventListener("DOMContentLoaded", () => {
  listaProdutos = JSON.parse(localStorage.getItem('produto')) || [];
  if (listaProdutos.length === 0) {
    localStorage.setItem('produto', JSON.stringify(produtos));
  }
  mostrarProdutos();
});

function mostrarProdutos() {
  htmlConteudo = '';
  const dadosProduto = JSON.parse(localStorage.getItem('produto')) || [];
  dadosProduto.forEach((produto, index) => {
    produto.id = index;
    if (produto.estoque > 0 && produto.tipo === 'casual') {
      htmlConteudo += `
         <div class="produtos-card">
           <img src="${produto.urlImg}" alt="${produto.nome}" />
           <div class="descricao">
             <h3>${produto.nome}</h3>
             <p>ID:${index + 1}<P>
             <p>Estoque: ${produto.estoque}<P>
             <span class="preco-antigo">R$ ${produto.precoAntigo.toFixed(2).replace('.', ',')}</span><br />
             <span>R$ ${produto.precoAtual.toFixed(2).replace('.', ',')}</span>
           </div>
           <div class="posi-botoes">
           <button class="compra" onclick="comprar(${produto.id})">Comprar</button>
           <a href="./carrinho.html" onclick="adicionarCarrinho(${produto.id})">
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
             <p>Estoque: ${produto.estoque}<P>
             <span class="preco-antigo">R$ ${produto.precoAntigo.toFixed(2).replace('.', ',')}</span><br />
             <span>R$ ${produto.precoAtual.toFixed(2).replace('.', ',')}</span>
           </div>
           <div class="posi-botoes">
           <button class="compra" onclick="comprar(${produto.id})">Comprar</button>
           <a href="./carrinho.html" onclick="adicionarCarrinho(${produto.id})">
             <img class="icons-catalogo" src="./assets/imgs/icons/icone_compras_preto.svg" alt="">
           </a>
           </div>
         </div>`;
    }
  });
  container.innerHTML = htmlConteudo;
  container3.innerHTML = htmlConteudo3;
}

function removerProduto(index) {
  index -= 1
  const produtos = JSON.parse(localStorage.getItem('produto')) || [];
  produtos.splice(index, 1);
  localStorage.setItem('produto', JSON.stringify(produtos));
  mostrarProdutos();
}


function adicionarCarrinho(index) {
  const produto = JSON.parse(localStorage.getItem('produto')) || [];
  if (produto[index].estoque <= 0) {
    produto[index].estoque = 0
    mostrarProdutos();
  }
  else {
    produto[index].estoque -= 1
    produto[index].quantidade += 1
    localStorage.setItem('produto', JSON.stringify(produto));
    mostrarProdutos();
  }
}
