# ConflictJS ⚔

ConflictJS is an approach that analyzes and finds conflicts between JavaScript libraries. Such conflicts may arise because libraries write to the same global memory location. If you want to include multiple libraries in a web application and are unsure whether they conflict with each other, ConflictJS can check for possible conflicts.

For details on the approach, please refer to this paper:

[ConflictJS: Finding and Understanding Conflicts Between JavaScript Libraries](http://mp.binaervarianz.de/icse2018.pdf)  
Jibesh Patra, Pooja N. Dixit, Michael Pradel  
International Conference on Software Engineering (ICSE), 2018

## How does it work?

The following steps are performed by ConflictJS to detect conflicts:

1. Filter libraries that fail when included alone.
2. Find global writes performed by each library.
3. Find potentially conflicting libraries.
4. Validate the potentially conflicting libraries using the following experiments:

  - Check if including a pair of libraries causes an exception to occur _(Inclusion test)_.
  - If two libraries share the same global variable, check if they belong to the same type _(Type test)_.
  - If two libraries share the same global variable, and the type of variable is a non-function, check if the value of the variable is the same for both libraries _(Value test)_.
  - If two libraries share the same global variable, and the type of variable is a function, check if the behavior of variable is equivalent for both libraries _(Behavior test)_.


## Requirements and Setup
We have tested ConflictJS on an Ubuntu 16.04 machine using Node.js version 7 and
the Chromium browser.
All dependencies must be installed before running the experiments.

We provide a script *init.sh* that performs all the steps mentioned below. You can
either use the script or manually execute the following commands to install all dependencies.

```shell
# Install the chromium-browser
sudo apt install chromium-browser

# Install the needed node modules
npm install

# jalangi in particular needs some extra modules to be installed
cd node_modules/jalangi2
npm install

# Come back to the start directory
cd ../../

# Now, create two new directory called benchmarks and results
mkdir -p benchmarks
mkdir -p results
```


## How to run a basic example?

Let's assume that you want check whether two libraries _jsurl_ and _urljs_ are conflicting. All experiments should be run from the current directory
1. Copy both library folders from _./benchmarks_all_ to _./benchmarks_
```shell
cp -r benchmarks_all/jsurl/ benchmarks
cp -r benchmarks_all/urljs/ benchmarks
```
2. Change the _exports.benchmarkDir_ & _resultDir_ configurations in the file _src/config.js_ to the following

  ```javascript
  let resultDir = "results";
  ...
  exports.benchmarkDir = "/benchmarks";
  ```

3. Issue the following command

  ```shell
  node src/runExperiments.js
  ```

This command needs to be run over and over until all experiments have finished. For this
particular case, the command needs to run in total four times.
The final results can be found in _resultDir_, as specified in the configuration file.

## Interpreting the results

At the end of the experiments, several files and directories are created in the _resultDir_. The summary of all results is the content of _validated-conflicts.json_. For the particular example libraries the content of _validated-conflicts.json_ is something like the following:

```json
{"typeTestßjsurl,urljs°Url":"ERROR object,Function"}
```

The easiest way to check is to run the python3 script

```shell
python src/utilities/getValidatedConflicts.py results/validated-conflicts.json
```

### Interpreting _validated-conflicts.json_

- Each _key_ in the JSON file represents a combination of library names and an access path. The _value_ represents the reason for the conflict.
- The substring before the ß character denotes the experiment that found the conflict. For the example, the experiment is _typeTest_ (Refer to Section 3.2.4 of the paper).
- Next, the names of the libraries are separated by a comma (,). For the example, the names of the libraries are jsurl and urljs.
- After the ° character comes the name of the access path over which the libraries conflict. For the example, the name of the access path is _Url_
- Finally, there can be some message that give details about the cause of the conflict. For the example, the type of accesspath _Url_  differs between the two libraries. For one library, it is an _object_ while for the other it is _Function_

The choice of such characters like ß and ° is driven by the fact that common characters
like $ and \_ are used by accesspaths or library names and we needed an easy way of
separation. You can change the separation characters in the file _src/config.js_.

## How to run ConflictJS on any set of libraries?

Copy any libraries for which you want to detect conflicts to the _benchmarks_ directory and repeat the previous steps.

## How to run ConflictJS for a library not present in the *benchmarks_all* directory?

Let's assume we want to include a library not present in the *benchmarks_all* directory. Let's call this new library as _test-lib_.

- Create a new folder called _test-lib_ in the _benchmarks_ folder.
- Copy the library file _test-lib.js_ to this newly created folder.
- Create a new file called _libraryInfo.json_ with the following content.

  ```json
  {
  "name": "test-lib",
  "urls": [
    "./test-lib.js"
  ]
  }
  ```

- You may now run the experiments as mentioned in the previous steps.

## Directory structure
- ./benchmarks_all
    - Contains all libraries that has been used to test our approach.

- ./src/config.js

  - Contains configurable values for the experiments.

- ./src/runExperiments.js

  - The main script that starts all experiments one after the other.

- ./src/evaluation/experiments

  - This folder contains the experiments that are used for the test of conflicts. runExperiments.js invokes the scripts in this directory.

- ./src/evaluation/validation-tests

  - Helper scripts for the final validation experiments namely, Inclusion, Type, Value (Non functions) and Behavior (Functions)

- ./src/htmlfragments

  - Fragments directory that contains HTML file templates used for running different experiments.

- ./src/utilities

  - This directory contains the helper scripts for all experiments. The most important scripts in this directory are _testGeneration.js_ used for generating tests for functions and _globalWritesAnalysis.js_ used for finding the list of global writes of a library.

## Known issues

- [ ] For some libraries, the global writes analysis has bugs and
might take very long time to finish.
- [ ] Generated tests do not get serialized for some libraries.
- [ ] For some access paths, the tool crashes.
