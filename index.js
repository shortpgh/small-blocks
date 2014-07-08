/**
this module is a collection of functions that help compose other functions.

a module by nik mihalick
**/
var fs = require('fs');

/*
universal append data handler for easier creation.

example: 
    var filename = "test.txt";
    var append_to_file = append_to_file(filename);
    append_to_file("some string");
*/
var append_to_file = function(filename) {
    return function(data) {
        return function() {
            fs.appendFileSync(filename, data);
        }
    }
};
module.exports.append_to_file = append_to_file;

/*
a curried handler to writeFileSync.
*/
var write_to_file = function(data) {
    return function(filename) {
        return fs.writeFileSync(filename, data);
    }
};
module.exports.write_to_file = write_to_file;

/*
creates the new empty file, replacing any existing files.
*/
var create_empty_file = write_to_file('');
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
TODO: can these two functions be converted to an if_true and if_false,
then use those to build these two functions.
*/
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

/*
runs the passed function on the file if it doesn't exists.
*/
var if_not_file = function(func) {
    return function(filename) {
        if (!fs.existsSync(filename)) {
            return func(filename);
        }
    }
};
module.exports.if_not_file = if_not_file;


/*
capitalizes the first letter of every word in the string.
*/
var capitalize_each_word = function(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
module.exports.capitalize_each_word = capitalize_each_word;


