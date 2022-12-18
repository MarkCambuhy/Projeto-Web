
var pesquisa = document.getElementById('search-api');
var admin = document.getElementById('admin');


function verifica(){
    const accessToken = document.cookie;
    if (accessToken){
        pesquisa.style.display = 'flex';
        admin.style.display = 'flex';
    } 
}

verifica();