const oConfig = require('../public/data/config.json');

const { NodeAudioVolumeMixer } = require('node-audio-volume-mixer');

class cNodeAudio {
    vShowProcessList(ioVolumeApps, sPassword) {
        const sEnvPassword = oConfig.TOKEN;

        const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
        const eSession = aSessions.find((aValue) => {
            return aValue.name === ioVolumeApps.action;
        });

        if (sPassword == sEnvPassword) {
            NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(eSession.pid, ioVolumeApps.volume / 100);
        };
    }

    vRefreshSliderValue(vSocket) {
        const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();

        aSessions.forEach(eElement => {
            if (eElement.name) {
                let sAppName = eElement.name;
                let vRefreshSliderValue = NodeAudioVolumeMixer.getAudioSessionVolumeLevelScalar(eElement.pid);
                let vIsAppMute = NodeAudioVolumeMixer.isAudioSessionMuted(eElement.pid);

                vSocket.emit('vRefreshSliderValue', ({
                    sAppName: sAppName,
                    vRefreshSliderValue: vRefreshSliderValue * 100,
                    vIsAppMute: vIsAppMute
                }));
            };
        });
    }

    vNodeAppMute(vMuteButton, sPassword) {
        const sEnvPassword = oConfig.TOKEN;

        const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
        const eSession = aSessions.find((aValue) => {
            return aValue.name === vMuteButton.vApp;
        });

        if (sPassword == sEnvPassword) {
            if (NodeAudioVolumeMixer.isAudioSessionMuted(eSession.pid) == false) {
                NodeAudioVolumeMixer.setAudioSessionMute(eSession.pid, true);
            } else if (NodeAudioVolumeMixer.isAudioSessionMuted(eSession.pid) == true) {
                NodeAudioVolumeMixer.setAudioSessionMute(eSession.pid, false);
            };
        };
    }

    vIsAppMute(sPassword) { }
}

module.exports = cNodeAudio;