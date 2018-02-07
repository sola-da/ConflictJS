// Author: Michael Pradel, Jibesh Patra

(function () {

    const childProcess = require("child_process");
    const config = require('../config');
    let browserCmd;
    let browserProcess;

    function hasCommand(cmd) {
        let cp = require("child_process");
        let result = cp.execSync("whereis " + cmd, {encoding: "utf8"});
        let regExp = new RegExp(cmd, "g");
        return result.match(regExp).length > 1;
    }

    function start() {
        // check which browser is available and open it
        browserCmd = hasCommand(config.browserName) ? config.browserName : "google-chrome";
        browserProcess = childProcess.spawn(browserCmd, [""]);
    }

    function close() {
        browserProcess.kill();
    }

    function loadURL(url) {
        console.log("Loading URL in browser: " + url);
        let process = childProcess.spawn(browserCmd, [url], {detached: true});
        return process;
    }

    exports.loadURL = loadURL;
    exports.start = start;
    exports.close = close;

})();