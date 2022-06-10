const oPackageJSON = require('../../package.json');

class Startup {
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

        console.log(`Socket.IO v${nSocketIOVersion.replace('^', '')} server started`);
    }
}

module.exports = Startup;
