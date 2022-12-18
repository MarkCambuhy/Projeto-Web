const btnPesquisar = document.querySelector('#btnPesquisar');
const imagem = document.querySelector('.imagem');
const name_agent = document.querySelector('.name_agent');
const description = document.querySelector('.description');
const agentes_info = document.querySelector('.agentes_info');

btnPesquisar.addEventListener('click', function (event) {
    let contador = 0;
    let agente_esc = document.querySelector('#procurar_api').value;
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

});