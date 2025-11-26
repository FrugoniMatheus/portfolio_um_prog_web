let HtmlConteudo3 ='';
let listaProdutos =[];
let container3= document.getElementById('grid-produtos-destaque');

function mostrarDestaque (){
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
             <p>ID:${produto.id}<P>
             <span class="preco-antigo">R$ ${produto.preco}</span><br />
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
     if(produto.estoque<=0 && produto.destaque === 'sim'){
        HtmlConteudo3 += `
         <div class="produtos-card">
           <img src="${produto.urlImg}" alt="${produto.nome}" class='indisponivel' />
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
}
);
container3.innerHTML= HtmlConteudo3;
}
async function addCarrinho(id_produto) {
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

 fetch("assets/php/loadProdutos.php")
.then(response => response.json()).then(data=>{
    listaProdutos = data
    mostrarDestaque()
})
   .catch(err => console.error("Erro ao verificar sessão:", err));

async function consultarCarrinho(id_produto){
   const resposta = await fetch("assets/php/mostrarCarrinho.php");
   const carrinho = await resposta.json();
   console.table(carrinho)
   let verificador=0;
  carrinho.forEach((i)=>{
      if(i.quantidade < i.estoque && i.id_produto === id_produto && verificador<1 ){
        addCarrinho(id_produto)
       verificador = 1
      }
      if(i.id_produto === id_produto){
        verificador = 2
      }
  })
    if(verificador === 0){
      addCarrinho(id_produto);
    }
}