let HtmlConteudo ='';
let HtmlConteudo2 ='';
let container2= document.getElementById('grid-cards-carrinho');
let container3= document.getElementById('resumo-compra');
document.addEventListener("DOMContentLoaded", () => {
mostrarCarrinho();
});
function mostrarCarrinho(){
HtmlConteudo ='';
const carrinho =JSON.parse(localStorage.getItem('produto')) || [];
if(carrinho.length===0){
   HtmlConteudo=`
  <div class="elemento">
  <h3>SEU CARRINHO ESTÁ VAZIO !</h3>
  <img src="./assets/imgs/elementos/sacola_vazia.png" alt="">
  <p>Verifique o nosso catalogo, e adicione ao carrinho o produto que você deseja! </p>
  <a href="./catalogo.html">Voltar para o Catalogo</a>
</div>`
  HtmlConteudo2='';
}
let quantidadeTotal=0
carrinho.forEach((produto,index) => {
  quantidadeTotal+=produto.quantidade
}
)
if(quantidadeTotal === 0){
HtmlConteudo=`
  <div class="elemento">
  <h3>SEU CARRINHO ESTÁ VAZIO !</h3>
  <img src="./assets/imgs/elementos/sacola_vazia.png" alt="">
  <p>Verifique o nosso catalogo, e adicione ao carrinho o produto que você deseja! </p>
  <a href="./catalogo.html">Voltar para o Catalogo</a>
</div>`
HtmlConteudo2='';
}
let total = 0
let precoAntigo = 0
let descontos = 0 
carrinho.forEach((produto,index) => {
  if(produto.quantidade> 0 ){
    const subtotal = produto.quantidade*produto.precoAtual;
    total+=subtotal;
    precoAntigo+=(produto.precoAntigo*produto.quantidade);
    descontos+=((produto.precoAntigo*produto.quantidade)-subtotal)
    HtmlConteudo+= `
  <div class="produtos">
  <div class="container-produtos" id="produtos-card">
    <img src="${produto.urlImg}" alt="">
    <div class="info-prod">
      <h3>Produto</h3>
      <span>Nome: ${produto.nome}</span>
      <span>Estoque: ${produto.estoque}</span>
      <span>Preço Unitario: R$ ${produto.precoAtual.toFixed(2).replace(".",",")}</span>
    </div>
  </div>
  <div class="info-quantidade">
    <h3>Quantidade</h3>
    <div class="container-produtos"> 
      <button class="btn-acao" onclick="retirar(${index})">-</button>
      <div class="quantidade">
        <p>${produto.quantidade}</p>
      </div>
      <button class="btn-acao" onclick="adicionar(${index})">+</button>
    </div>
    </div>
  <div class="info-subtotal">
    <h3>Subtotal</h3>
    <div class="container-produtos">
        <div class="subtotal">
          <span>R$ ${subtotal.toFixed(2).replace(".",",")}</span>      
      </div>
      </div>
  </div>
    <button class="deletar" onclick="remover(${index})"><img class="icons-carrinho" src="./assets/imgs/icons/icone_lixeira.svg"></button>
</div>`
HtmlConteudo2 =`<div class="frete">
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
              <span>R$ ${precoAntigo.toFixed(2).replace(".",",")}</span>
            </div>
            <div class="informacoes">
              <span>Frete</span>
              <span>Gratis</span>
            </div>
            <div class="informacoes">
              <span>Total de Descontos</span>
                <span class="desconto">-R$ ${descontos.toFixed(2).replace(".",",")}</span>
            </div>
             <div class="informacoes">
              <span>Total da Compra</span>
               <span>R$ ${total.toFixed(2).replace(".",",")}</span>
            </div>
            <button class="comprar">Finalizar Compra</button>
          </div>
        </div>
`
  }
    }
    );
    container2.innerHTML = HtmlConteudo;
    container3.innerHTML =HtmlConteudo2;
}
// function resumoCarrinho(total, desconto,precoAntigo){
// if(total === 0 || desconto === 0 || precoAntigo)
// }
function retirar(index){
const produto=JSON.parse(localStorage.getItem('produto'))
if(produto[index].quantidade<=0){
produto[index].quantidade = 0
}
else{
  produto[index].estoque+= 1
  produto[index].quantidade-=1 
  localStorage.setItem('produto', JSON.stringify(produto));
  mostrarCarrinho();
}
}

function remover(index){
const produto=JSON.parse(localStorage.getItem('produto'));
produto[index].estoque += produto[index].quantidade;
produto[index].quantidade = 0;
localStorage.setItem('produto', JSON.stringify(produto));
mostrarCarrinho();
}

function adicionar(index){
const produto=JSON.parse(localStorage.getItem('produto'));
if(produto[index].estoque<=0){
produto[index].estoque = 0
localStorage.setItem('produto', JSON.stringify(produto));
mostrarCarrinho();
}
else{
  produto[index].estoque-= 1
  produto[index].quantidade+=1 
  localStorage.setItem('produto', JSON.stringify(produto));
  mostrarCarrinho();
}
}
