class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('#forms-cadastro');
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();
    const cadastroValido =  await this.validCadastro();
   
    if(camposValidos && senhasValidas && cadastroValido) {
      await this.cadastrarCliente();
    }
  }

  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector('#senha');
    const repetirSenha = this.formulario.querySelector('#repetirSenha');

    if(senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, 'Campos senha e repetir senha precisar ser iguais.');
      this.criaErro(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
    }

    if(senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
    }

    return valid;
  }

  camposSaoValidos() {
    let valid = true;

    for(let errorText of this.formulario.querySelectorAll('.avisos')) {
      errorText.remove();
    }

    for(let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText;

      if(!campo.value) {
        this.criaErro(campo, `Campo "${label}" não pode estar em branco.`);
        valid = false;
      }

      if(campo.classList.contains('CPF')) {
        if(!this.validaCPF(campo)) valid = false;
      }
    }

    return valid;
  }
  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if(!cpf.valida()) {
      this.criaErro(campo, 'CPF inválido.');
      return false;
    }

    return true;
  }
  criaErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('avisos');
    campo.insertAdjacentElement('afterend', div);
  }

 async validCadastro(){
  const cpf = document.querySelector('#CPF').value;
  const email = document.querySelector('#email').value;
  try {
    const response = await fetch("./assets/php/validarCadastro.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, email })
    });

    const data = await response.json();

    if (data.sucesso) {
   return true;
    } else {
      Toastify({
      text:`${data.mensagem}`,
      className: "info",
      style: {
      background: "#ff0000",
      }
      }).showToast();
      return false;
    }

  } catch (err) {
    alert("Erro ao verificar sessão:");
    return false;
  }
 }
async cadastrarCliente() {
  const nome = this.formulario.querySelector('#nome').value;
  const email = this.formulario.querySelector('#email').value;
  const cpf = this.formulario.querySelector('#CPF').value;
  const telefone = this.formulario.querySelector('#telefone').value;
  const cep = this.formulario.querySelector('#CEP').value;
  const endereco = this.formulario.querySelector('#endereco').value;
  const senha = this.formulario.querySelector('#senha').value;

  try {
    const response = await fetch("./assets/php/cadastro.php", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf, nome, telefone, email, senha, cep, endereco })
    });

    // 👇 Lê apenas uma vez
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Resposta não é JSON:", text);
      throw new Error("O servidor retornou uma resposta inválida.");
    }

    if (data.sucesso) {
      Toastify({
        text: "Usuário cadastrado com sucesso!",
        className: "info",
        style: { background: "#429e04ff" },
      }).showToast();
      this.limparCampos()
    } else {
      Toastify({
        text: data.mensagem,
        className: "info",
        style: { background: "#ff0000" },
      }).showToast();
    }

  } catch (err) {
    console.error("Erro na requisição:", err);
    Toastify({
      text: "Erro na comunicação com o servidor.",
      className: "info",
      style: { background: "#ff0000" },
    }).showToast();
  }
}
limparCampos(){
  const nome = this.formulario.querySelector('#nome').value = ''
  const email = this.formulario.querySelector('#email').value = ''
  const cpf = this.formulario.querySelector('#CPF').value = ''
  const telefone = this.formulario.querySelector('#telefone').value = ''
  const cep = this.formulario.querySelector('#CEP').value = ''
  const endereco = this.formulario.querySelector('#endereco').value = ''
  const senha = this.formulario.querySelector('#senha').value = ''
  const repetirSenha = this.formulario.querySelector('#repetirSenha').value = ''
 setTimeout(() => {
               window.location.href = "index.html";
            }, 2000);
        }
}
const valida = new ValidaFormulario();