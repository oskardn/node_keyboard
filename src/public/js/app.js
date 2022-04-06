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
});

vIo.on('aSessions', (aSessions) => {
    $.each(aSessions, (nIndex, oVal) => {
        vIo.on('oAppBlacklist', (oAppBlacklist) => {
            if (oVal.name) {
                if (oAppBlacklist[`${oVal.name}`] == undefined || oAppBlacklist[`${oVal.name}`] == true) {
                    $('.vOtherSliders table tbody').append(`
                        <tr>
                            <td>
                                <label for="${oVal.name}">${oVal.name}</label>
                            </td>
                            <td>
                                <input class="vApp" id="vApp" type="range" min="0" max="100" step="1" name="${oVal.name}" data-vol="${oVal.name}">
                            </td>
                            <td>
                                <span id="${oVal.name}"></span>
                            </td>
                            <td>
                                <button class="vApp vMute" data-btn="${oVal.name}">
                                    <i class="fas fa-volume-mute fa-2x"></i>
                                </button>
                            </td>
                        </tr>`
                    );

                    /**
                     * Attention pour tester sur ordinateur il faut simuler
                     * un toucher comme sur un smartphone ou tablette
                     */
                    let vOtherSlider = $(`[name="${oVal.name}"]`);
                    let vMuteButtons = $('button.vMute')

                    vMuteButtons.unbind().click(function() {
                        console.error($(this).data('btn'));
                        vIo.emit('vMuteButton', 
                        {
                            vApp: $(this).data('btn')
                        });
                        // alert("Bouton en cours de développement\nMerci à toi de patienter :)");
                        // window.location.href = "https://bit.ly/3x7indr"
                    });

                    vOtherSlider.on('touchmove', function() {
                        $(`[id="${ $(this).data('vol') }"]`).text($(this).val());
                        vIo.emit('ioVolumeApps', 
                        {
                            action: $(this).data('vol'),
                            volume: $(this).val()
                        });
                    });

                    vIo.on('vRefreshSliderValue', (vRefreshSliderValue) => {
                        if (oAppBlacklist[`${vRefreshSliderValue.sAppName}`] == undefined || oAppBlacklist[`${vRefreshSliderValue.sAppName}`] == true) {
                            if (vRefreshSliderValue.sAppName == oVal.name) {
                                $(`[name="${oVal.name}"]`).val(vRefreshSliderValue.vRefreshSliderValue);
                                $(`[id="${oVal.name}"]`).text(Math.round(vRefreshSliderValue.vRefreshSliderValue))
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