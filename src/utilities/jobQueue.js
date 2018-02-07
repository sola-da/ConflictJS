// Author: Michael Pradel

(function () {

    var assert = require("assert");
    var resultDir = require("process").cwd() + '/' + require('../config').resultsDirectory + '/';
    const childProcess = require("child_process");
    const pathExists = require('./pathExists.js').pathExists;
    const fs = require('fs');
    const timeout_kill_job = require('../config').timeout_kill_job;

    var idToJob = {};
    var jobQueue = [];    // ids
    var runningJobs = {}; // ids -> true
    var doneJobs = {};    // ids -> true
    let killedJobs = previousKilledJobs(); // Ids of jobs killed because they took too much time
    let killedjobIds = new Set();

    var alreadyKilledJobs = resultDir + 'killed-jobs.json';

    var maxConcurrentJobs = require('os').cpus().length;

    var finalize;

    function Job(id, dependences, onExecute, onDone) {
        this.id = id;
        this.dependences = dependences; // array of regular expressions
        this.onExecute = onExecute;
        this.onDone = onDone;
        this.state = {};
        this.delegationTime = new Date();
        this.process = null;
        this.resultFilePath = null;

        assert(!idToJob.hasOwnProperty(id));
        idToJob[id] = this;
        jobQueue.push(id);
    }

    function newJob(id, dependences, onExecute, onDone) {
        new Job(id, dependences, onExecute, onDone);
    }

    function execute() {
        console.log(runningJobs);
        console.log("Jobs: " + Object.keys(runningJobs).length + " running, " + jobQueue.length + " waiting");
        checkLongRunningJobs();

        if (Object.keys(runningJobs).length >= maxConcurrentJobs) return;

        if (jobQueue.length === 0) {
            if (Object.keys(runningJobs).length === 0) terminate();
            return;
        }

        // go through queue and trigger first job that has no open dependences
        for (var i = 0; i < jobQueue.length; i++) {
            var jobID = jobQueue[i];
            var job = idToJob[jobID];
            var hasOpenDependence = false;
            killedJobs = previousKilledJobs();
            if (killedJobs.has(jobID)) {
                console.log("Skipping: -------> In last run " + jobID + ' took too much TIME');
                jobQueue.splice(i, 1);
                continue;
            }
            // check if any (to be) scheduled job is a dependence for this job
            openDependenceCheck: for (var j = 0; j < job.dependences.length; j++) {
                var dependence = job.dependences[j];
                for (var k = 0; k < jobQueue.length; k++) {
                    var jobInQueue = jobQueue[k];
                    if (dependence.test(jobInQueue.id)) {
                        hasOpenDependence = true;
                        break openDependenceCheck;
                    }
                }
                var runningJobsIDs = Object.keys(runningJobs);
                for (var k = 0; k < runningJobsIDs.length; k++) {
                    var runningJobID = runningJobsIDs[k];
                    if (dependence.test(runningJobID)) {
                        hasOpenDependence = true;
                        break openDependenceCheck;
                    }
                }
            }

            // start job if all dependences are done
            if (!hasOpenDependence) {
                console.log("\n>>> Starting job: " + job.id + " <<<\n");
                jobQueue.splice(i, 1);
                runningJobs[job.id] = true;
                job.delegationTime = new Date();
                let process = job.onExecute.bind(null, job);
                setTimeout(process);
                return;
            }
        }

    }

    function checkLongRunningJobs() {
        for (const jobId in runningJobs) {
            let job = idToJob[jobId];
            let timeRunning = new Date() - job.delegationTime;

            //  Check if a job is running for too long
            if (timeRunning > timeout_kill_job) {
                killedJobs = previousKilledJobs();
                killedJobs.add(jobId);
                fs.writeFileSync(alreadyKilledJobs, JSON.stringify([...killedJobs]));
                console.error("\n\t KILLING job " + jobId + " ran > " + timeout_kill_job + ' ms' /*+ ' PID ' + proc.pid*/);

                /* Apart from removing from the running job id report the result as empty */
                let resultFile = job.resultFilePath;
                let result = {};

                if (pathExists(resultFile)) {
                    result = JSON.parse(fs.readFileSync(resultFile, {encoding: "utf8"}));
                }
                result[job.id] = 'RAN TOO LONG > ' + timeout_kill_job + ' ms';

                fs.writeFileSync(resultFile, JSON.stringify(result));
                // proc.kill('SIGKILL');
                // console.log("\t Killed: " + proc.killed);
                // Kill the process
                // childProcess.spawnSync('kill', ['-9', job.pid]);
                // console.log(process.connected);
                // console.log(process);
                markDone(jobId);
            }
        }
    }

    function previousKilledJobs() {
        if (pathExists(alreadyKilledJobs)) {
            let jobIds = JSON.parse(fs.readFileSync(alreadyKilledJobs, 'utf8'));
            return new Set(jobIds);
        }
        return new Set();
    }

    function markDone(id) {
        if (killedjobIds.has(id)) {
            return;
        }
        console.log("\n=== Job done: " + id + " ===\n");
        assert(idToJob.hasOwnProperty(id));
        assert(jobQueue.indexOf(id) === -1);
        assert(runningJobs.hasOwnProperty(id));
        assert(!doneJobs.hasOwnProperty(id));

        var job = idToJob[id];
        if (job.onDone) job.onDone(job.state);
        delete runningJobs[id];
        doneJobs[id] = true;
        
        killedjobIds.add(id);
        // trigger next job
        setTimeout(execute);
    }


    function setFinalize(f) {
        finalize = f;
    }

    function terminate() {
        clearInterval(executeJobInterval);
        finalize();
    }

    // regularly check for jobs to execute
    var executeJobInterval = setInterval(execute, 3000);

    exports.newJob = newJob;
    exports.execute = execute;
    exports.markDone = markDone;
    exports.setFinalize = setFinalize;

})();