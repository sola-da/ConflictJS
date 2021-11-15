/**
 * Created by Jibesh Patra on 28-Mar-2017.
 */
(function () {
  const fs = require("fs");
  const config = require("../config");
  const constructFileName = require("./constructFileName").constructFilename;

  /**
   * Return a random color from the CSS_COLOR_NAMES array
   * Use case example, iframe body background
   * */
  function getRandomColor() {
    const cssColors = [
      "AliceBlue",
      "AntiqueWhite",
      "Aqua",
      "Aquamarine",
      "Azure",
      "Beige",
      "Bisque",
      "Black",
      "BlanchedAlmond",
      "Blue",
      "BlueViolet",
      "Brown",
      "BurlyWood",
      "CadetBlue",
      "Chartreuse",
      "Chocolate",
      "Coral",
      "CornflowerBlue",
      "Cornsilk",
      "Crimson",
      "Cyan",
      "DarkBlue",
      "DarkCyan",
      "DarkGoldenRod",
      "DarkGray",
      "DarkGrey",
      "DarkGreen",
      "DarkKhaki",
      "DarkMagenta",
      "DarkOliveGreen",
      "Darkorange",
      "DarkOrchid",
      "DarkRed",
      "DarkSalmon",
      "DarkSeaGreen",
      "DarkSlateBlue",
      "DarkSlateGray",
      "DarkSlateGrey",
      "DarkTurquoise",
      "DarkViolet",
      "DeepPink",
      "DeepSkyBlue",
      "DimGray",
      "DimGrey",
      "DodgerBlue",
      "FireBrick",
      "FloralWhite",
      "ForestGreen",
      "Fuchsia",
      "Gainsboro",
      "GhostWhite",
      "Gold",
      "GoldenRod",
      "Gray",
      "Grey",
      "Green",
      "GreenYellow",
      "HoneyDew",
      "HotPink",
      "IndianRed",
      "Indigo",
      "Ivory",
      "Khaki",
      "Lavender",
      "LavenderBlush",
      "LawnGreen",
      "LemonChiffon",
      "LightBlue",
      "LightCoral",
      "LightCyan",
      "LightGoldenRodYellow",
      "LightGray",
      "LightGrey",
      "LightGreen",
      "LightPink",
      "LightSalmon",
      "LightSeaGreen",
      "LightSkyBlue",
      "LightSlateGray",
      "LightSlateGrey",
      "LightSteelBlue",
      "LightYellow",
      "Lime",
      "LimeGreen",
      "Linen",
      "Magenta",
      "Maroon",
      "MediumAquaMarine",
      "MediumBlue",
      "MediumOrchid",
      "MediumPurple",
      "MediumSeaGreen",
      "MediumSlateBlue",
      "MediumSpringGreen",
      "MediumTurquoise",
      "MediumVioletRed",
      "MidnightBlue",
      "MintCream",
      "MistyRose",
      "Moccasin",
      "NavajoWhite",
      "Navy",
      "OldLace",
      "Olive",
      "OliveDrab",
      "Orange",
      "OrangeRed",
      "Orchid",
      "PaleGoldenRod",
      "PaleGreen",
      "PaleTurquoise",
      "PaleVioletRed",
      "PapayaWhip",
      "PeachPuff",
      "Peru",
      "Pink",
      "Plum",
      "PowderBlue",
      "Purple",
      "Red",
      "RosyBrown",
      "RoyalBlue",
      "SaddleBrown",
      "Salmon",
      "SandyBrown",
      "SeaGreen",
      "SeaShell",
      "Sienna",
      "Silver",
      "SkyBlue",
      "SlateBlue",
      "SlateGray",
      "SlateGrey",
      "Snow",
      "SpringGreen",
      "SteelBlue",
      "Tan",
      "Teal",
      "Thistle",
      "Tomato",
      "Turquoise",
      "Violet",
      "Wheat",
      "White",
      "WhiteSmoke",
      "Yellow",
      "YellowGreen",
    ];
    return cssColors[Math.floor(Math.random() * cssColors.length)];
  }

  /* Generate HTML files to test if inclusion of single library crashes */
  function filterInclusionCrashLibs(validationTest) {
    let htmltemplate = fs.readFileSync(
      validationTest.fragmentDir + "/filterInclusionCrash.html",
      { encoding: "utf8" }
    );

    let libraryName = validationTest.libraryNames[0];
    let htmlFileNameInclLib = libraryName + validationTest.name + ".html";
    let libFilePath = validationTest.generatedDir + htmlFileNameInclLib;
    let librarySrc =
      ".." +
      config.benchmarkDir +
      "/" +
      libraryName +
      "/" +
      validationTest.libraryPaths[libraryName];
    let resultfile = validationTest.resultFilePath;
    let typeOfTest = libraryName + validationTest.name;

    let src = "\t<script src='" + librarySrc + "'></script>";

    htmltemplate = htmltemplate
      .split("<!--__RESULT_FILE__PATH-->")
      .join(resultfile);
    htmltemplate = htmltemplate
      .split("<!--__TYPE_OF_TEST__-->")
      .join(typeOfTest);
    htmltemplate = htmltemplate.split("<!--SRC-->").join(src);
    htmltemplate = htmltemplate.split("<!--NAME-->").join(libraryName);

    validationTest.jobIds.add(typeOfTest);
    validationTest.htmlURLs[typeOfTest] =
      validationTest.urlprefix + htmlFileNameInclLib;
    fs.writeFileSync(libFilePath, htmltemplate);
  }

  /* To generate single inclusion tests and global write analysis*/
  function globalWriteAnalysis(validationTest) {
    let htmltemplate = fs.readFileSync(
      validationTest.fragmentDir + "/analyze.html",
      { encoding: "utf8" }
    );

    let libraryName = validationTest.libraryNames[0];
    let htmlFileNameInclLib = libraryName + validationTest.name + ".html";
    let libFilePath = validationTest.generatedDir + htmlFileNameInclLib;
    let librarySrc =
      ".." +
      config.benchmarkDir +
      "/" +
      libraryName +
      "/" +
      validationTest.libraryPaths[libraryName];
    let resultfile = validationTest.resultFilePath;
    let typeOfTest = libraryName + validationTest.name;

    let src = "\t<script src='" + librarySrc + "'></script>";

    htmltemplate = htmltemplate.split("<!--SRC-->").join(src);
    htmltemplate = htmltemplate.split("<!--NAME-->").join(libraryName);
    htmltemplate = htmltemplate
      .split("<!--__RESULT_FILE__PATH-->")
      .join(resultfile);
    htmltemplate = htmltemplate
      .split("<!--__TYPE_OF_TEST__-->")
      .join(typeOfTest);

    validationTest.jobIds.add(typeOfTest);
    validationTest.htmlURLs[typeOfTest] =
      validationTest.urlprefix + htmlFileNameInclLib;
    fs.writeFileSync(libFilePath, htmltemplate);
  }

  /**
   * First generate a HTML file that contains the library. Write the HTML file back to disk.
   * Include the this in an iframe and return it.
   *
   * @param librarySrc {string}: Source path of the library in the benchmark folder
   * @param name {string}: name of the library
   * @param libFilePath : path where it html file including the library gets written
   * @param libFileURL : url that is used in the iframe
   * @return {string}
   */
  function generateiframes(
    librarySrc,
    name,
    libFilePath,
    libFileURL,
    LibraryClientCode,
    fragmentDir
  ) {
    let libIframeTemplate = fs.readFileSync(fragmentDir + "/library.html", {
      encoding: "utf8",
    });
    let src = "\t<script src='" + librarySrc + "'></script>";
    libIframeTemplate = libIframeTemplate.split("<!--SRC-->").join(src);
    libIframeTemplate = libIframeTemplate.split("<!--NAME-->").join(name);
    libIframeTemplate = libIframeTemplate
      .split("<!--__CLIENT_CODE__-->")
      .join(LibraryClientCode);
    libIframeTemplate = libIframeTemplate.split("COLOR").join(getRandomColor());

    fs.writeFileSync(libFilePath, libIframeTemplate);
    return (
      "\n\t<iframe src=" +
      libFileURL +
      ' frameborder="0" width="200" height="50" scrolling="no">iframes-not-supported</iframe>'
    );
  }

  // Generate iframes that contain two libraries lib1,lib2 and lib2,lib1
  function generateCombinedIframes(
    validationTest,
    LibraryClientCode,
    fragmentDir
  ) {
    let libIframeTemplate = fs.readFileSync(fragmentDir + "/library.html", {
      encoding: "utf8",
    });
    let lib1_name = validationTest.libraryNames[0];
    let lib1_src =
      "\t<script src='" +
      ".." +
      config.benchmarkDir +
      "/" +
      lib1_name +
      "/" +
      validationTest.libraryPaths[lib1_name] +
      "'></script>\n";
    let lib2_name = validationTest.libraryNames[1];
    let lib2_src =
      "\t<script src='" +
      ".." +
      config.benchmarkDir +
      "/" +
      lib2_name +
      "/" +
      validationTest.libraryPaths[lib2_name] +
      "'></script>\n";

    // lib1 - lib2
    let iframeFileName =
      lib1_name + lib2_name + validationTest.name + "_iframe.html";
    let iframeFilePath = validationTest.generatedDir + iframeFileName;
    let iframeURL = validationTest.urlprefix + iframeFileName;

    libIframeTemplate = libIframeTemplate
      .split("<!--SRC-->")
      .join(lib1_src + lib2_src);
    libIframeTemplate = libIframeTemplate
      .split("<!--NAME-->")
      .join(lib1_name + lib2_name);
    libIframeTemplate = libIframeTemplate
      .split("<!--__CLIENT_CODE__-->")
      .join(LibraryClientCode);
    libIframeTemplate = libIframeTemplate.split("COLOR").join(getRandomColor());
    fs.writeFileSync(iframeFilePath, libIframeTemplate);
    validationTest.libIframes[lib1_name + lib2_name] =
      "\n\t<iframe src=" +
      iframeURL +
      ' frameborder="0" width="200" height="50" scrolling="no">iframes-not-supported</iframe>';

    // lib2 - lib1
    libIframeTemplate = fs.readFileSync(fragmentDir + "/library.html", {
      encoding: "utf8",
    });
    iframeFileName =
      lib2_name + lib1_name + validationTest.name + "_iframe.html";
    iframeFilePath = validationTest.generatedDir + iframeFileName;
    iframeURL = validationTest.urlprefix + iframeFileName;

    libIframeTemplate = libIframeTemplate
      .split("<!--SRC-->")
      .join(lib2_src + lib1_src);
    libIframeTemplate = libIframeTemplate
      .split("<!--NAME-->")
      .join(lib2_name + lib1_name);
    libIframeTemplate = libIframeTemplate
      .split("<!--__CLIENT_CODE__-->")
      .join(LibraryClientCode);
    libIframeTemplate = libIframeTemplate.split("COLOR").join(getRandomColor());
    fs.writeFileSync(iframeFilePath, libIframeTemplate);
    validationTest.libIframes[lib2_name + lib1_name] =
      "\n\t<iframe src=" +
      iframeURL +
      ' frameborder="0" width="200" height="50" scrolling="no">iframes-not-supported</iframe>';
  }

  /* All experiments use the same HTML templates. Generate the templates in the beginning with space for client generation
     As of now, six different templates gets generated for each pair of libraryNames.
     Say the library pair is (Lib1, Lib2)
     One =>
     Lib1 vs Lib2

     Two =>
     Lib1 vs Lib1
     Lib2

     Three =>
     Lib2 vs Lib1
     Lib1

     Four =>
     Lib1 vs Lib2
     Lib2

     Five =>
     Lib2 vs Lib2
     Lib1

     Six =>
     Lib1 vs Lib2
     Lib2    Lib1
     */
  function generateTemplate(
    validationTest,
    hostingPageClient,
    LibraryClientCode
  ) {
    let fragmentDir = validationTest.fragmentDir;
    let hostinghtmlTemplate = fs.readFileSync(
      fragmentDir + "/hosting-page.html",
      { encoding: "utf8" }
    );
    let libfilename, libFilePath, libFileURL;

    validationTest.libraryNames.forEach((libraryName) => {
      let src =
        ".." +
        config.benchmarkDir +
        "/" +
        libraryName +
        "/" +
        validationTest.libraryPaths[libraryName];
      libfilename = libraryName + validationTest.name + "_iframe.html";
      libFilePath = validationTest.generatedDir + libfilename;
      libFileURL = validationTest.urlprefix + libfilename;
      validationTest.libIframes[libraryName] = generateiframes(
        src,
        libraryName,
        libFilePath,
        libFileURL,
        LibraryClientCode,
        fragmentDir
      );
    });
    let lib1 = validationTest.libraryNames[0];
    let lib2 = validationTest.libraryNames[1];
    let accessPath = validationTest.accessPath;
    let resultfile = validationTest.resultFilePath;

    // Generates iframes that contain both lib1-lib2 and lib2-lib1
    generateCombinedIframes(validationTest, LibraryClientCode, fragmentDir);

    // Common for all hosting pages
    hostinghtmlTemplate = hostinghtmlTemplate
      .split("<!--CLIENT_SCRIPT-->")
      .join(hostingPageClient);
    hostinghtmlTemplate = hostinghtmlTemplate
      .split("<!--__RESULT_FILE__PATH-->")
      .join(resultfile);
    let generatedHTML, typeOfTest;

    //    One =>
    typeOfTest = constructFileName(
      validationTest.name,
      [lib1, lib2],
      accessPath
    );
    populateHTMLStats(validationTest, typeOfTest);
    generatedHTML = hostinghtmlTemplate
      .split("<!--LIB_IFRAME_HOLDER-->")
      .join(validationTest.libIframes[lib1] + validationTest.libIframes[lib2]);
    generatedHTML = generatedHTML
      .split("<!--__TYPE_OF_TEST__-->")
      .join(typeOfTest);
    fs.writeFileSync(validationTest.htmlFilePaths[typeOfTest], generatedHTML);

    //    Two =>
    typeOfTest = constructFileName(
      validationTest.name,
      [lib1, lib2, lib1],
      accessPath
    );
    populateHTMLStats(validationTest, typeOfTest);
    generatedHTML = hostinghtmlTemplate
      .split("<!--LIB_IFRAME_HOLDER-->")
      .join(
        validationTest.libIframes[lib1 + lib2] + validationTest.libIframes[lib1]
      );
    generatedHTML = generatedHTML
      .split("<!--__TYPE_OF_TEST__-->")
      .join(typeOfTest);
    fs.writeFileSync(validationTest.htmlFilePaths[typeOfTest], generatedHTML);

    //    Three =>
    typeOfTest = constructFileName(
      validationTest.name,
      [lib2, lib1, lib1],
      accessPath
    );
    populateHTMLStats(validationTest, typeOfTest);
    generatedHTML = hostinghtmlTemplate
      .split("<!--LIB_IFRAME_HOLDER-->")
      .join(
        validationTest.libIframes[lib2 + lib1] + validationTest.libIframes[lib1]
      );
    generatedHTML = generatedHTML
      .split("<!--__TYPE_OF_TEST__-->")
      .join(typeOfTest);
    fs.writeFileSync(validationTest.htmlFilePaths[typeOfTest], generatedHTML);

    //    Four =>
    typeOfTest = constructFileName(
      validationTest.name,
      [lib1, lib2, lib2],
      accessPath
    );
    populateHTMLStats(validationTest, typeOfTest);
    generatedHTML = hostinghtmlTemplate
      .split("<!--LIB_IFRAME_HOLDER-->")
      .join(
        validationTest.libIframes[lib1 + lib2] + validationTest.libIframes[lib2]
      );
    generatedHTML = generatedHTML
      .split("<!--__TYPE_OF_TEST__-->")
      .join(typeOfTest);
    fs.writeFileSync(validationTest.htmlFilePaths[typeOfTest], generatedHTML);

    //    Five =>
    typeOfTest = constructFileName(
      validationTest.name,
      [lib2, lib1, lib2],
      accessPath
    );
    populateHTMLStats(validationTest, typeOfTest);
    generatedHTML = hostinghtmlTemplate
      .split("<!--LIB_IFRAME_HOLDER-->")
      .join(
        validationTest.libIframes[lib2 + lib1] + validationTest.libIframes[lib2]
      );
    generatedHTML = generatedHTML
      .split("<!--__TYPE_OF_TEST__-->")
      .join(typeOfTest);
    fs.writeFileSync(validationTest.htmlFilePaths[typeOfTest], generatedHTML);

    //    Six =>
    typeOfTest = constructFileName(
      validationTest.name,
      [lib1, lib2, lib2, lib1],
      accessPath
    );
    populateHTMLStats(validationTest, typeOfTest);
    generatedHTML = hostinghtmlTemplate
      .split("<!--LIB_IFRAME_HOLDER-->")
      .join(
        validationTest.libIframes[lib1 + lib2] +
          validationTest.libIframes[lib2 + lib1]
      );
    generatedHTML = generatedHTML
      .split("<!--__TYPE_OF_TEST__-->")
      .join(typeOfTest);
    fs.writeFileSync(validationTest.htmlFilePaths[typeOfTest], generatedHTML);
  }

  function populateHTMLStats(validationTest, typeOfTest) {
    let htmlFileName = typeOfTest + ".html";
    validationTest.jobIds.add(typeOfTest);
    validationTest.htmlFilePaths[typeOfTest] =
      validationTest.generatedDir + htmlFileName;
    validationTest.htmlURLs[typeOfTest] =
      validationTest.urlprefix + htmlFileName;
  }

  exports.filterInclusionCrashLibs = filterInclusionCrashLibs;
  exports.globalWriteAnalysis = globalWriteAnalysis;
  exports.generateTemplate = generateTemplate;
})();
