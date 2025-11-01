const login = document.getElementById('login')


function fecharLogin(a) {
        login.setAttribute('inert', '')
        login.style.opacity = 0
        document.body.style.overflow = 'scroll';
}
function AbrirLogin(a) {
        login.removeAttribute('inert')
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
        else if (inputSenha.type === 'text'){
                inputSenha.type ='password'
                olhoAberto.style.display = 'none'
                olhoFechado.style.display = 'block'
        }

}