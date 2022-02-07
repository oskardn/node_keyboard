let socket = io();

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonURL = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonURL);
};

let token;
let decrypJwt;
let queryString = window.location.search;

let urlParams = new URLSearchParams(queryString);
let tokenSearch = urlParams.get('token');

if (tokenSearch == null || tokenSearch === "") {
    socket.on('cryptedtoken', (tokencrypt) => {
        if (tokenSearch != tokencrypt) {
            window.location.href = '/auth';
        }
    });
} else {
    decrypJwt = parseJwt(tokenSearch);
    token = decrypJwt.token;
    sessionStorage.setItem("token", token);
};

if ((new Date().getTime() / 1000) > decrypJwt.exp) {
    socket.emit('newtoken');
    window.alert("Token expiré")
    window.location.href = '/auth';
};

socket.emit('token', token);

socket.on('auth', () => {
    window.location.href = '/auth';
});

socket.on('authtoken', (newtoken) => {
    token = newtoken;
});

socket.on('volume change', (volchange) => {
    $('#volume_value').text(volchange);
    $('#volume').val(volchange);
});

let buttons = $('button');
for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    
    button.addEventListener('click', (event) => {
        socket.emit('action', 
        {
            "action": button.dataset.action,
            "token": token,
            "exp": decrypJwt.exp
        });
    });
};

let sliders = $('input');
for (let i = 0; i < sliders.length; i++) {
    let slider = sliders[i];

    slider.addEventListener('change', (slide) => {
        socket.emit('volume',
        {
            "volume": slider.value,
            "token": token,
            "exp": decrypJwt.exp
        });
        $('#volume_value').text(parseInt(slider.value));
    });
};