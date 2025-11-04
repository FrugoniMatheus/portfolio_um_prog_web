const login = document.getElementById('login')

function fecharLogin() {
        const usuario = document.getElementById("usuario");
        const senha = document.getElementById("senha");
        login.setAttribute('inert', '')
        login.style.opacity = 0
        senha.value = ''
        usuario.value = ''
        document.body.style.overflow = 'scroll';
}
function AbrirLogin() {
        const usuario = document.getElementById("usuario");
        const senha = document.getElementById("senha");
        login.removeAttribute('inert')
        senha.value = ''
        usuario.value = ''
        login.style.opacity = 1
        document.body.style.overflow = 'hidden';
}

function mostrarSenha() {
        const inputSenha = document.getElementById('senha')
        const olhoAberto = document.getElementById('olho-aberto')
        const olhoFechado = document.getElementById('olho-fechado')

        if (inputSenha.type === 'password') {
                inputSenha.type = 'text'
                olhoAberto.style.display = 'block'
                olhoFechado.style.display = 'none'
        }
        else if (inputSenha.type === 'text') {
                inputSenha.type = 'password'
                olhoAberto.style.display = 'none'
                olhoFechado.style.display = 'block'
        }
}
function validarSessao(){
        fetch("./assets/php/validaSessao.php")
          .then(res => res.json())
          .then(data => {
            if (data.logado) {
              console.log("Usuário logado:", data.nome);
              console.log("iniciais: ", data.iniciais)
              gerarAvatar(data.iniciais)
            } else {
              console.log("Nenhum usuário logado");
              AbrirLogin() 
            }
          })
          .catch(err => console.error("Erro ao verificar sessão:", err));
}


document.getElementById("form-login").addEventListener("submit", (e)=> {
    e.preventDefault();
    validarLogin()
});

async function validarLogin(){

        const usuario = document.getElementById("usuario").value.trim();
        const senha = document.getElementById("senha").value.trim();
        const botao = document.querySelector('.btn-submit');
        const msg = document.getElementById("imsg");

    if (!usuario || !senha) {
        msg.textContent = "Preencha todos os campos.";
        msg.style.color = "red";
        return;
    }

    botao.style.background = 'gray';
    botao.disabled = true;

    try {
        const response = await fetch("./assets/php/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  email: usuario, senha })
        });

        const data = await response.json();

        msg.textContent = data.mensagem;
        msg.style.color = data.sucesso ? "green" : "red";

        setTimeout(() => {
            msg.textContent = '';
            botao.style.background = "var(--cor-botao)";
            botao.disabled = false;
        }, 1500);

        if (data.sucesso) {
            botao.textContent = "Entrando...";
            botao.style.background = "var(--cor-botao)";
            setTimeout(() => {
                botao.textContent = "Entrar";
               window.location.href = "index.html";
                botao.disabled = false;
            }, 2000);
        }

    } catch (error) {
        msg.style.color = "red";
        msg.textContent = `Erro ao conectar com o servidor.`;
        setTimeout(() => {
            msg.textContent = '';
            botao.style.background = "var(--cor-botao)";
            botao.disabled = false;
        }, 1500);
        console.error("Erro:", error);
    }
}
function gerarAvatar(iniciais){
        const avatar = document.getElementById('avatar')
        const conta = document.getElementById('conta-icon')
        conta.style.display='none'
        avatar.innerHTML =  `
        <div class="avatar" onclick="encerrarSessao()">
        <h3>${iniciais}</h3>
        </div>
        `
}
 validarSessao()

 async function encerrarSessao(){
const valid = 1
         try {
             const response = await fetch("./assets/php/encerrarSessao.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({valid})
        });

        const data = await response.json();
 if (data.sucesso) {
            window.location.href = "index.html";
        }

    } catch (error) {
       alert("Erro:", error);
    }
}

