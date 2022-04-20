$('button.accueil').on('click', function () {
    window.location.href = '../../home/vue/index.html';
});

$('.vPasswordVisibility').unbind('click');
$('.vPasswordVisibility').on('click', () => {
    if ($('#sToken').attr('type') == 'password') {
        $('#sToken').attr('type', 'text');

        $('.vShow').removeClass('cache');
        $('.vHide').addClass('cache');
    } else if ($('#sToken').attr('type') == 'text') {
        $('#sToken').attr('type', 'password');

        $('.vHide').removeClass('cache');
        $('.vShow').addClass('cache');
    };
});

$('#nPortButton').unbind('click');
$('#nPortButton').on('click', function() {
    let nPort = $('#nPort').val();
    
    $.post(`http://localhost:3000/port`,
        {
            data: nPort
        }
    );
});

$('#sTokenButton').unbind('click');
$('#sTokenButton').on('click', function() {
    let sToken = $('#sToken').val();

    $.post(`http://localhost:3000/token`,
        {
            data: sToken
        }
    );
});