const btnSign = document.querySelector('.signin');
const btnCont = document.querySelector('#account_show');
const logar = document.querySelector('.login');
const criando = document.querySelector('.criando_conta');
const fechar = document.querySelector('.close');
const fechar_criando_conta = document.querySelector('.close_criando_conta');
const criar = document.querySelector('.create_account');

const name_criar = document.querySelector('.name_criar');
const email_criar = document.querySelector('.email_criar');
const pass_criar = document.querySelector('.pass_criar');
const passrepeat_criar = document.querySelector('.passrepeat_criar');
const btn_criar = document.querySelector('.btn_criar');

const val_nome = document.querySelector('.val_nome');
const val_email = document.querySelector('.val_email');
const val_senha = document.querySelector('.val_senha');

const signin = document.querySelector('.signin');
const email = document.querySelector('.email');
const pass = document.querySelector('.pass');

const atualiza_input = document.querySelector('.procurar_api');

btnSign.addEventListener('click', function () {
    console.log(document.querySelector('.email').value);
    console.log(document.querySelector('.pass').value);
});

btnCont.addEventListener('click', function () {
    logar.className = 'login show';
});

fechar.addEventListener('click', () => {
    logar.className = 'login';
});

fechar_criando_conta.addEventListener('click', () => {
    criando.className = 'criando_conta noshow';
})

criar.addEventListener('click', () => {
    logar.className = 'login';
    criando.className = 'criando_conta show';
});

signin.addEventListener('click', () => {
    let aux_email = email.value;
    let aux_senha = pass.value;
    let aux_load = localStorage.getItem('logando');

    if (aux_email.localeCompare(aux_load.email)) {
        if (aux_senha.localeCompare(aux_load.password)) {
            console.log('Logado com sucesso');
            let autualizar = {
                logado: 'true'
            };
            localStorage.setItem("logar", JSON.stringify(autualizar));
            verifica_inputSearch();
            logar.className = 'login';
        }
    }
});


btn_criar.addEventListener('click', () => {
    val_email.innerHTML = '';
    val_nome.innerHTML = '';
    val_senha.innerHTML = '';
    if (verifica_email(email_criar.value) && verifica_senha(pass_criar.value, passrepeat_criar.value) && verifica_nome(name_criar.value)) {
        var newUser = {
            name: name_criar.value,
            email: email_criar.value,
            password: pass_criar.value,
            logado: false
        };

        let req = new XMLHttpRequest();

        req.open('POST', 'https://reqres.in/api/users');
        req.setRequestHeader('Content-Type', 'application/json');

        req.addEventListener('load', function () {
            if (req.status === 201 && req.readyState === 4) {
                const res = JSON.parse(req.responseText);
            } else {
                throw new Error('Bad request!');
            }
        });
        localStorage.setItem('logando', JSON.stringify(newUser));
        req.send(JSON.stringify(newUser));
        logar.className = 'login show';
        criando.className = 'criando_conta noshow';
    }
});


function verifica_email(email) {
    if (email.length > 3) {
        var aux = /\S+@\S+\.\S+/;
        return aux.test(email);
    }
    val_email.innerHTML = 'email invalido';
    return false;
};
function verifica_senha(senha, senha2) {
    if (senha.length > 3 && senha.localeCompare(senha2) == 0) {
        return true;
    }
    val_senha.innerHTML = 'As senhas devem ser iguais';
    return false;
};
function verifica_nome(nome) {
    if (nome.length > 3) {
        return true;
    }
    val_nome.innerHTML = 'Nome invalido';
    return false;
};

function verifica_inputSearch() {
    let aux = JSON.parse(localStorage.getItem('logar'));
    if(aux.logado == 'true'){
        console.log('verificou');
        atualiza_input.style.display = 'inline';
    }
};
//  atualiza_input.style.display = 'inline';
verifica_inputSearch();
