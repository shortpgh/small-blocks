/**
this module is a collection of functions that help compose other functions.

a module by nik mihalick
**/
var fs = require('fs');

/*
universal append data handler for easier creation.

example: 
    var filename = "test.txt";
    var append_to_file = append_handler(filename);
    append_to_file("some string");
*/
var append_handler = function(filename) {
    return function(data) {
        return function() {
            fs.appendFileSync(filename, data);
        }
    }
};
module.exports.append_handler = append_handler;

/*
a curried handler to writeFileSync.
*/
var create_file_handler = function(data) {
    return function(filename) {
        return fs.writeFileSync(filename, data);
    }
};
module.exports.create_file_handler = create_file_handler;

/*
creates the new empty file, replacing any existing files.
*/
var create_empty_file = create_file_handler('');
module.exports.create_empty_file = create_empty_file;

/*
appends one string to another.
*/
var append_string_to_string = function(append) {
    return function (to) {
        return append + to;
    }
};
module.exports.append_string_to_string = append_string_to_string;

/*
reads a file and returns the entire contents
*/
var read_file = function(filename) {
    return fs.readFileSync(filename, {encoding: "utf8"});
};
module.exports.read_file = read_file;

/*
runs the passed function on the file if it exists.
*/
var if_file = function(func) {
    return function(filename) {
        if (fs.existsSync(filename)) {
            return func(filename);
        }
    }
};
module.exports.if_file = if_file;
