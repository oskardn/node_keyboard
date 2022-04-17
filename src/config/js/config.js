$('button.accueil').on('click', function() {
    window.location.href = '../../home/vue/index.html';
})

$('.vPasswordVisibility').on('click', function() {
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