/*
 * json-to-less
 * https://github.com/blunsh/json-to-less
 *
 * Copyright (c) 2016 Liubov Bilogurova
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {


  grunt.registerMultiTask('json_to_less', 'Compile your json files into less file', function() {

    // Iterate over all specified file groups.

    // exclude nonexisting files
    this.files.map(function (fileGroup) {
        return {
            src: fileGroup.src.filter(function (fileSrc) {
                if (!grunt.file.exists(fileSrc)) {
                    grunt.log.warn('Source file "' + fileSrc + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }),
            dest: fileGroup.dest
        }
    })

    // get data from json files
    .map(function (fileGroup) {
        return {
            destData: fileGroup.src.map(function (path) {
                return parseJSONFile(path, grunt.file.read(path))
            }).join('\n'),
            destFile: fileGroup.dest
        };
    })

    // write data to destination files
    .forEach(function (fileGroup) {
        
        // Write the destination file.
        grunt.file.write(fileGroup.destFile, fileGroup.destData);
        
        // Print a success message.
        grunt.log.writeln('File "' + fileGroup.destFile + '" created.');
    });

};


function parseJSONFile(path, dataString) {
    var json = JSON.parse(dataString),
        lines = [];

    for (var property in json){
        lines.push('@' + property + ': ' + json[property] + ';');
    }

    return lines.join('\n');
};