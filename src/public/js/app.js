let vSocket = io({
    auth: {
        token: '1234'
    }
});

let vIo = vSocket;

vIo.on('connect_error', (err) => {
    console.log(err.message);
});

vIo.on('vWindowsActualVolume', (vWindowsActualVolume) => {
    $('#vVolumeValue').text(vWindowsActualVolume);
    $('#vMaster').val(vWindowsActualVolume);
});

vIo.on('vWindowsVolumeChange', (vWindowsVolumeChange) => {
    $('#vVolumeValue').text(vWindowsVolumeChange);
    $('#vMaster').val(vWindowsVolumeChange);
})

let eButtons = $('button');
for (let i = 0; i < eButtons.length; i++) {
    let eButton = eButtons[i];
    
    eButton.addEventListener('click', (event) => {
        vIo.emit('vActions', 
        {
            "action": eButton.dataset.action,
            // "token": token,
            // "exp": decrypJwt.exp
        });
    });
};

let eSliders = $('input');
for (let i = 0; i < eSliders.length; i++) {
    let eSlider = eSliders[i];

    eSlider.addEventListener('mousemove', (slide) => {
        vIo.emit('ioVolumeMaster',
        {
            "action": eSlider.dataset,
            "volume": eSlider.value,
            // "token": token,
            // "exp": decrypJwt.exp
        });
        $('#vVolumeValue').text(parseInt($('input.vMaster').val()));
    });
};