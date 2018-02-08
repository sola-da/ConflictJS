# ConflictJS ⚔

ConflictJS is an approach that analyses and finds conflicts between JavaScript libraries.

## How it works?

The following experiments are run by our approach.

1. Filter libraries that fail when included alone.
2. Find global writes for each library that do not fail when included alone.
3. Find potentially conflicting libraries.
4. Validate the potentially conflicting libraries using the following experiments:

  - Check if including a pair of libraries causes an exception to occur _(Inclusion test)_.
  - If a pair of libraries share the same global variable, check if they belong to the same type _(Type test)_.
  - If a pair of libraries share the same global variable, and the type of variable is a non-function, check if the value of the variable is same for both libraries _(Value test)_.
  - If a pair of libraries share the same global variable, and the type of variable is a function, check if the behavior of variable is equivalent for both libraries _(Behavior test)_.


## Requirements and installation

The tool has been tested to run on an Ubuntu 16.04 machine using Node.js 7\. The dependencies should be installed before running the experiments. Use the following commands to install all dependencies.

```shell
# Install the needed modules
npm install

# jalangi in particular needs some extra modules to be install  ed
cd node_modules/jalangi2
npm install

# Come back to the start directory
cd ../../
```

## How to run a basic example?

Let's assume that the approach needs to verify if two libraries _jsurl_ and _urljs_ are conflicting. All experiments should be run from the current directory
1. Create two new directory called _benchmarks_ and _results_
2. Copy both library folders from _./benchmarks_all_ to _./benchmarks_
3. Also change the _exports.benchmarkDir_ & _resultDir_ configurations in the file _src/config.js_ to the following

  ```javascript
  let resultDir = "results";
  ...
  exports.benchmarkDir = "/benchmarks";
  ```

4. Now, issue the following command

  ```shell
  node src/runExperiments.js
  ```

This command needs to be run over and over unless all experiments finishes. The final results can be found in the _resultDir_ as specified in the configuration file.

## Interpreting results

At the end of the experiments, several files and directories gets created in the _resultDir_. The summary of all results is the content of _validated-conflicts.json_. For the particular example libraries the content of _validated-conflicts.json_ is something like the following:

```json
{"typeTestßjsurl,urljs°Url":"ERROR object,Function"}
```

The easiest way to check is to run the script

```shell
python src/utilities/getValidatedConflicts.py results/validated-conflicts.json
```

### Interpreting _validated-conflicts.json_

- Each _key_ in the JSON file represents a combination of library names and accesspath. The _value_ represents the reason for the conflict
- The substring before the ß character denotes the experiment that found the conflict. For this case, the experiment is _typeTest_ (Refer to Section 3.2.4 of the paper).
- Next, the names of the libraries are separated by a comma (,). Here, the names of the libraries are jsurl and urljs.
- After the ° character comes the name of the access path over which the libraries conflict. In this case, the name of the access path is _Url_
- Finally, there can be some message that gives some details about the cause of the conflict. For this case,  the type of accesspath _Url_  is different in the libraries. For one library, it is an _object_ while for the other it is _Function_

The choice of such characters like ß and ° is driven by the fact that common characters like $ and _are used by accesspaths or library names and we needed an easy way of separation. One may of-course change the separation characters in the file _src/config.js_.

## How to run any set of libraries?

Copy the libraries for which potential conflicts needs to tested to the _benchmarks_ directory and repeat the previous steps.

## How to run for a library not present in the _benchmarks_all_ directory?

Let's assume we want to include a library not present in the _benchmarks_all_ directory. Let's call this new library as _test-lib_.

- Create a new folder called _test-lib_ in the _benchmarks_ folder
- Copy the library file _test-lib.js_ to this newly created folder
- Create a new file called _libraryInfo.json_ with the following content

  ```json
  {
  "name": "test-lib",
  "urls": [
    "./test-lib.js"
  ]
  }
  ```

- You may now run the experiments as mentioned in the previous steps

## Directory structure

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

- ./src/supporting-scripts

  - Contains scripts used for plotting data and finding out other statistics about different experiments.

## Known issues

- [ ] For some libraries, the global writes analyses has bug and
might take very long time to finish
- [ ] Generated tests do not get serialized for some libraries
- [ ] For some access paths, the tool crashes
