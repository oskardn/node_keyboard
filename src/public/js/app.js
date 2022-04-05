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

// vIo.on('vRefreshSliderValue', (vRefreshSliderValue) => {
//     console.log(vRefreshSliderValue);
// });

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
        
                    /**
                     * Attention pour tester sur odinateur il faut simuler
                     * un toucher comme sur un smartphone
                     */
                    vOtherSlider.on('touchmove', function() {
                        vIo.emit('ioVolumeApps', 
                        {
                            action: $(this).data('vol'),
                            volume: $(this).val()
                        });
                    });

                    vIo.on('vRefreshSliderValue', (vRefreshSliderValue) => {
                        if (oAppBlacklist[`${vRefreshSliderValue.sAppName}`] == undefined || oAppBlacklist[`${vRefreshSliderValue.sAppName}`] == true) {
                            if (vRefreshSliderValue.sAppName == oVal.name) {
                                $(`[name="${oVal.name}"]`).val(vRefreshSliderValue.vRefreshSliderValue  )
                            }
                        }
                    })
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

    eSlider.addEventListener('touchmove', (slide) => {
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