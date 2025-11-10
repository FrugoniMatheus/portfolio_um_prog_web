let HtmlConteudo3 ='';
let container3= document.getElementById('grid-produtos-destaque');
document.addEventListener("DOMContentLoaded", () => {
  mostrarDestaque();
});
function mostrarDestaque (){
const listaProdutos = JSON.parse(localStorage.getItem('produto'))||[];
if(listaProdutos.length === 0){
HtmlConteudo3 = `<p>Sem produtos cadastrados<p>`
}
listaProdutos.forEach((produto,index) => {
    if(produto.estoque>0 && produto.destaque === 'sim'){
        HtmlConteudo3 += `
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
           <a href="./carrinho.html" onclick="addCarrinho(${index})">
             <img class="icons-catalogo" src="./assets/imgs/icons/icone_compras_preto.svg" alt="">
           </a>
           </div>
         </div>`;
    }
     if(produto.estoque<=0 && produto.destaque === 'sim'){
        HtmlConteudo3 += `
         <div class="produtos-card">
           <img src="${produto.urlImg}" alt="${produto.nome}" class='indisponivel' />
           <div class="descricao">
             <h3>${produto.nome}</h3>
             <p>ID:${index + 1}<P>
             <p>Estoque: Indisponivel<P>
           </div>
          <div>
           <p>Produto Temporariamente Indisponivel</p>
           </div>
         </div>`;
    }
}
);
container3.innerHTML= HtmlConteudo3;
}
function addCarrinho(index) {
     const produto = JSON.parse(localStorage.getItem('produto')) || [];
  if (produto[index].estoque <= 0) {
    produto[index].estoque = 0
  }
  else {
    produto[index].estoque -= 1
    produto[index].quantidade += 1
    localStorage.setItem('produto', JSON.stringify(produto));
    mostrarDestaque();
  }
}

