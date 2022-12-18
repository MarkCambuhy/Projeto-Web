const email = document.querySelector('input[name=email]'),
    password = document.querySelector('input[name=password]'),
    submit = document.querySelector('input[type=submit]');

let token = localStorage.getItem('token');
if (token) {
    form.style.display = 'none';
}

submit.addEventListener('click', async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    try {
        const response = await axios.post('./login', {
            email: email.value,
            password: password.value
        });

        if (response.data.token) {
            token = response.data.token;
            localStorage.setItem('token', token);
        }
    } catch (e) {
        console.log(e);
    }

    return false;
});

setInterval(async () => {
    try {
        const response = await axios.get('./profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        container.innerHTML = response.data.message;
    } catch (e) {
        container.innerHTML = 'Sem login não funciona';
    }
}, 5000);