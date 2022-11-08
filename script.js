const btnLogar = document.querySelector('#account_show');
const logar = document.querySelector('.login');
const fechar = document.querySelector('.close');
const close_agenst = document.querySelector('.close_agenst');
const agentes_info = document.querySelector('.agentes_info');
const signin = document.querySelector('.signin');
const email = document.querySelector('.email');
const pass = document.querySelector('.pass');
const atualiza_input = document.querySelector('.procurar_api');
const imagem = document.querySelector('.imagem');
const name_agent = document.querySelector('.name_agent');
const description = document.querySelector('.description');
const email_err = document.querySelector('.email_err');
const pass_err = document.querySelector('.pass_err');

btnLogar.addEventListener('click', () => {
    logar.style.display = 'flex';
});

fechar.addEventListener('click', () => {
    logar.style.display = 'none';
});
close_agenst.addEventListener('click', function () {
    agentes_info.style.display = 'none';
});

signin.addEventListener('click', () => {
    email_err.innerHTML = '';
    pass_err.innerHTML = '';
    let xhr = new XMLHttpRequest();
    var data = {
        "email": email.value,
        "password": pass.value
    };
    if (verifica_email(email.value) && verifica_senha(pass.value)) {
        xhr.open('POST', 'https://reqres.in/api/login');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.addEventListener('load', function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                const res = JSON.parse(xhr.responseText);
                localStorage.setItem('logado', res.token);
                logar.style.display = 'none';
                verifica_inputSearch();
            } else {
                email_err.innerHTML = 'Email invalido';
                throw new Error('Bad request!');
            }
        });
        xhr.send(JSON.stringify(data));
    }
});

function verifica_inputSearch() {
    let aux = localStorage.getItem('logado');
    if (aux != null) {
        atualiza_input.style.display = 'inline';
    }
};

atualiza_input.addEventListener('keypress', function (event) {
    if(event.key === 'Enter'){
        let contador = 0;
        let agente_esc = document.querySelector('.procurar_api').value;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://valorant-api.com/v1/agents', true);
        xhr.addEventListener('load', function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                const res = JSON.parse(xhr.responseText);
                console.log(res);
                for (i = 0; i <= 20; i++) {
                    let agente = res.data[i].displayName;
                    if (agente.toLowerCase() === agente_esc.toLowerCase()) {
                        imagem.src = res.data[i].fullPortrait;
                        name_agent.innerHTML = res.data[i].displayName;
                        description.innerHTML = res.data[i].description;
                        agentes_info.style.display = 'flex';
                        break;
                    }
                    contador++;
                }
                if (contador > 20) {
                    imagem.src = 'https://cdn-icons-png.flaticon.com/512/56/56748.png';
                    name_agent.innerHTML = 'Invalido';
                    description.innerHTML = '';
                    agentes_info.style.display = 'flex';
                }
            } else {
                console.error('Bad request!');
            }
        });
        xhr.send();
    }
});

function verifica_email(email) {
    if (email.length > 3) {
        return true;
    }
    email_err.innerHTML = 'Email invalido';
    return false;
};
function verifica_senha(senha) {
    if (senha.length > 3) {
        return true;
    }
    pass_err.innerHTML = 'Senha incorreta';
    return false;
};
verifica_inputSearch();
