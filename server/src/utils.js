"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAlias = exports.isUrlFriendly = exports.isValidUrl = void 0;
var strings_1 = __importDefault(require("@supercharge/strings"));
var isValidUrl = function (url) {
    var pattern = new RegExp("((http|https)://)(www.)?" + // Starts with http/https, followed by "://www."
        "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" + // Subdomain
        "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)" // Top level domain
    );
    return !!pattern.test(url);
};
exports.isValidUrl = isValidUrl;
var isUrlFriendly = function (alias) {
    var pattern = new RegExp("^[a-zA-Z0-9_-]*$");
    return pattern.test(alias);
};
exports.isUrlFriendly = isUrlFriendly;
var generateAlias = function () {
    return strings_1.default.random(8); // Randomly generates an alias of length 8
};
exports.generateAlias = generateAlias;
