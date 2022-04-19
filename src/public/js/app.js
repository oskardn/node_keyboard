$('button.accueil').on('click', () => {
    window.location.href = '../../home/vue/index.html';
});

const sToken = '1234', nPort = 3000;

let vSocket = io(`ws://localhost:${nPort}`, {
    auth: {
        token: `${sToken}`
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
        vIo.on('oAppBlocklist', (oAppBlocklist) => {
            if (oVal.name) {
                if (oAppBlocklist[`${oVal.name}`] == undefined || oAppBlocklist[`${oVal.name}`] == true) {
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
                        vIo.emit('vMuteButton', 
                        {
                            vApp: $(this).data('btn')
                        });
                        // alert("Bouton en cours de développement\nMerci à toi de patienter :)");
                        // window.location.href = "https://bit.ly/3x7indr"
                    });

                    vOtherSlider.on('touchmove mousemove', function() {
                        $(`[id="${ $(this).data('vol') }"]`).text($(this).val());
                        vIo.emit('ioVolumeApps', 
                        {
                            action: $(this).data('vol'),
                            volume: $(this).val()
                        });
                    });

                    vIo.on('vRefreshSliderValue', (vRefreshSliderValue) => {
                        if (oAppBlocklist[`${vRefreshSliderValue.sAppName}`] == undefined || oAppBlocklist[`${vRefreshSliderValue.sAppName}`] == true) {
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

$('button').on('click', function() {
    if ($(this).data('action') != 'vMuteMaster') {
        vIo.emit('ioActions', 
        {
            "action": $(this).data('action'),
        });
    } else if ($(this).data('action') == 'vMuteMaster') {
        vIo.emit('ioMasterMute', 
        {
            "action": $(this).data('action'),
        });
    };
});

$('input').on('touchmove mousemove', function() {
    vIo.emit('ioVolumeMaster',
    {
        "action": $(this).data(),
        "volume": $(this).val(),
    });
    $('#vVolumeValue').text(parseInt($('input.vMaster').val()));
});