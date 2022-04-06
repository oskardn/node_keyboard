const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");

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
        // vSocket.emit('test');

        const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
        const eSession = aSessions.find((aValue) => {
            return aValue.name === "firefox.exe";
        });

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
}

module.exports = NodeAudio;