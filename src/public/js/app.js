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

let aAppList = [];

vIo.on('vRefreshSliderValue', (vRefreshSliderValue) => {
    // console.log(vRefreshSliderValue);
    aAppList.push(vRefreshSliderValue)
    console.log(aAppList);

});

vIo.on('vWindowsVolumeChange', (vWindowsVolumeChange) => {
    $('#vVolumeValue').text(vWindowsVolumeChange);
    $('#vMaster').val(vWindowsVolumeChange);
});

vIo.on('aSessions', (aSessions) => {
    $.each(aSessions, (nIndex, oVal) => {
        vIo.on('oAppBlacklist', (oAppBlacklist) => {
            if (oVal.name) {
                if (oAppBlacklist[`${oVal.name}`] == undefined || oAppBlacklist[`${oVal.name}`] == true) {
                    $('.vOtherSliders').append(`<br> <label for="${oVal.name}">${oVal.name}</label> <input class="vApp" id="vApp" type="range" min="0" max="100" step="1" name="${oVal.name}" data-vol="${oVal.name}">`);
        
                    let vOtherSlider = $(`[name="${oVal.name}"]`);
        
                    vOtherSlider.on('mousemove', function() {
                        vIo.emit('ioVolumeApps', 
                        {
                            action: $(this).data('vol'),
                            volume: $(this).val()
                        });
                    });
                };
            };
        });
    });
});

let eButtons = $('button');
for (let i = 0; i < eButtons.length; i++) {
    let eButton = eButtons[i];
    
    eButton.addEventListener('click', (event) => {
        vIo.emit('ioActions', 
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