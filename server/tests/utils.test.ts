import { expect } from "chai";
import { isValidUrl, isUrlFriendly } from "../utils";

describe("isValidUrl()", function () {
    context("Missing domain", function () {
        it("Should return false", function () {
            const url = "https://www.";
            expect(isValidUrl(url)).to.be.false;
        });
    });

    context("Missing http/https", function () {
        it("Should return false", function () {
            const url = "www.google.com";
            expect(isValidUrl(url)).to.be.false;
        });
    });

    context("Valid Url", function () {
        it("Should return true", function () {
            const url = "https://www.google.com";
            expect(isValidUrl(url)).to.be.true;
        });
    });
});

describe("isUrlFriendly()", function () {
    context("Contains invalid characters", function () {
        it("Should return false", function () {
            const alias = "test|";
            expect(isUrlFriendly(alias)).to.be.false;
        });
    });

    context("Valid alias", function () {
        it("Should return true", function () {
            const alias = "test";
            expect(isUrlFriendly(alias)).to.be.true;
        });
    });
});
