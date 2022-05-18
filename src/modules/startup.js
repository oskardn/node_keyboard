const oPackageJSON = require('../../package.json');

class cStartup {
    vAsciiLogo() {
        console.log("\n");
        console.log("                  @@@@@@@@@@@@@@@");
        console.log("             @@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("         @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("       @@.....@@@@@@@@@.....@@@@@@@@@.....@@");
        console.log("     @@@@..#..@@@@@@@@@.....@@@@@@@@@.....@@@@");
        console.log("    @@@@@.....@@@@@@@@@.....@@@@@@@@@.....@@@@@");
        console.log("   @@@@@@.....@@@@@@@@@.....@@@@@@@@@.....@@@@@@");
        console.log("  @@@@@@@.....@@@@@@@@@.....@@@@@@@@@.....@@@@@@@");
        console.log("  @@@@@@@.....@@@@@@@@@.....@@@@@@@@@.....@@@@@@@");
        console.log("  @@@@@@@.....@@@@@@@@@..#..@@@@@@@@@.....@@@@@@@");
        console.log("  @@@@@@@.....@@@@@@@@@.....@@@@@@@@@.....@@@@@@@");
        console.log("  @@@@@@@.....@@@@@@@@@.....@@@@@@@@@.....@@@@@@@");
        console.log("   @@@@@@.....@@@@@@@@@.....@@@@@@@@@.....@@@@@@");
        console.log("    @@@@@.....@@@@@@@@@.....@@@@@@@@@.....@@@@@");
        console.log("     @@@@.....@@@@@@@@@.....@@@@@@@@@..#..@@@@");
        console.log("       @@.....@@@@@@@@@.....@@@@@@@@@.....@@");
        console.log("         @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("             @@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("                  @@@@@@@@@@@@@@@");

        console.log(`\n                 ${oPackageJSON.productName}  v${oPackageJSON.version}`);
        console.log(`                      by ${oPackageJSON.author.name}\n`);

        const nSocketIOVersion = oPackageJSON.dependencies['socket.io'];
        const nExpressVersion = oPackageJSON.dependencies['express'];

        console.log(`Socket.IO v${nSocketIOVersion.replace('^', '')} server started`);
        console.log(`ExpressJS v${nExpressVersion.replace('^', '')} server started`);
    }
}

module.exports = cStartup;
