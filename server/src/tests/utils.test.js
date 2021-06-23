"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var utils_1 = require("../utils");
describe('isValidUrl()', function () {
    context('Missing domain', function () {
        it('Should return false', function () {
            var url = "https://www.";
            chai_1.expect(utils_1.isValidUrl(url)).to.be.false;
        });
    });
    context('Missing http/https', function () {
        it('Should return false', function () {
            var url = "www.google.com";
            chai_1.expect(utils_1.isValidUrl(url)).to.be.false;
        });
    });
    context('Valid Url', function () {
        it('Should return true', function () {
            var url = "https://www.google.com";
            chai_1.expect(utils_1.isValidUrl(url)).to.be.true;
        });
    });
});
describe('isUrlFriendly()', function () {
    context('Contains invalid characters', function () {
        it('Should return false', function () {
            var alias = "test|";
            chai_1.expect(utils_1.isUrlFriendly(alias)).to.be.false;
        });
    });
    context('Valid alias', function () {
        it('Should return true', function () {
            var alias = "test";
            chai_1.expect(utils_1.isUrlFriendly(alias)).to.be.true;
        });
    });
});
