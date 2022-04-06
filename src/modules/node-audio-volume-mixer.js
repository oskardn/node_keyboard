const { NodeAudioVolumeMixer } = require('node-audio-volume-mixer');

class NodeAudio {
    #vPrivateVar;
    vPublicVar;

    constructor(value = null) {};

    vShowProcessList(ioVolumeApps) {
        const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
        const eSession = aSessions.find((aValue) => {
            return aValue.name === ioVolumeApps.action;
        });

        NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(eSession.pid, ioVolumeApps.volume / 100);
    }

    vRefreshSliderValue(vSocket) {
        const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();

        aSessions.forEach(eElement => {
            if (eElement.name) {
                let sAppName = eElement.name;
                let vRefreshSliderValue = NodeAudioVolumeMixer.getAudioSessionVolumeLevelScalar(eElement.pid)
                vSocket.emit('vRefreshSliderValue', ({
                    sAppName: sAppName,
                    vRefreshSliderValue : vRefreshSliderValue * 100
                }));
            };
        });
    }

    vNodeAppMute(vMuteButton) {
        const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
        const eSession = aSessions.find((aValue) => {
            return aValue.name === vMuteButton.vApp;
        });

        if (NodeAudioVolumeMixer.isAudioSessionMuted(eSession.pid) == false) {
            NodeAudioVolumeMixer.setAudioSessionMute(eSession.pid, true);
        } else if (NodeAudioVolumeMixer.isAudioSessionMuted(eSession.pid) == true) {
            NodeAudioVolumeMixer.setAudioSessionMute(eSession.pid, false);
        };
    }
}

module.exports = NodeAudio;