class Produto {
  constructor(nome, precoAtual = 0, precoAntigo, urlImg, quantidade = 0,estoque) {
    this.nome = nome;
    this.precoAntigo = precoAntigo;
    this.precoAtual = precoAtual;
    this.urlImg = urlImg;
    this.quantidade = quantidade;
    this.estoque = estoque;
  }
  desconto(percentual) {
    this.precoAtual = (this.precoAntigo * (100 - percentual)) / 100;
  }
}
const container = document.getElementById('grids');
const info = document.getElementById('enviar');
let listaProdutos = [];
let htmlConteudo = '';

document.addEventListener("DOMContentLoaded", () => {
  listaProdutos = JSON.parse(localStorage.getItem('produto')) || [];
  mostrarProdutos();
});
info.addEventListener("click", () => {
  const nome = document.getElementById('nome').value.trim();
  const urlImg = document.getElementById('url').value.trim();
  const precoAntigo = parseFloat(document.getElementById('preco').value);
  const estoque = 20;

  if (!nome || !urlImg || isNaN(precoAntigo)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }
  listaProdutos = JSON.parse(localStorage.getItem('produto')) || [];
  const prod = new Produto(nome, 0, precoAntigo, urlImg,0,estoque);
  prod.desconto(10);
  listaProdutos.push(prod);
  
  localStorage.setItem('produto', JSON.stringify(listaProdutos));
  mostrarProdutos();
  limparCampos();
});

function mostrarProdutos() {
  htmlConteudo ='';
  const dadosProduto = JSON.parse(localStorage.getItem('produto')) || [];
  if (dadosProduto.length === 0) {
    container2.innerHTML = "<p>Nenhum produto cadastrado.</p>";
    return;
  }
  dadosProduto.forEach((produto, index) => {
    produto.id = index;
     if(produto.estoque>0 ){
       htmlConteudo += `
         <div class="produtos-card">
           <img src="${produto.urlImg}" alt="${produto.nome}" />
           <div class="descricao">
             <h3>${produto.nome}</h3>
             <p>ID:${index+1}<P>
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
}

function removerProduto(index) {
  index-=1
  const produtos = JSON.parse(localStorage.getItem('produto')) || [];
  produtos.splice(index, 1);
  localStorage.setItem('produto', JSON.stringify(produtos));
  mostrarProdutos();
}

function adicionarCarrinho(index){
const produto = JSON.parse(localStorage.getItem('produto')) || [];
if(produto[index].estoque<=0 ){
produto[index].estoque = 0
mostrarProdutos();
}
else{
  produto[index].estoque-= 1
  produto[index].quantidade+=1 
  localStorage.setItem('produto', JSON.stringify(produto));
  mostrarProdutos();
}
}
function limparCampos() {
  document.getElementById('nome').value = '';
  document.getElementById('url').value = '';
  document.getElementById('preco').value = '';
}
