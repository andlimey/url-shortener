"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var utils_1 = require("./utils");
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var domain = "localhost";
var port = 5000;
var db;
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use(express_1.default.json()); // for parsing application/json
app.get("/:shortUrl", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var original;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.getActualUrl(db, request.params.shortUrl)];
            case 1:
                original = _a.sent();
                if (original.length === 0) {
                    return [2 /*return*/, response.status(404).json({ info: "No such alias exists" })];
                }
                return [2 /*return*/, response.redirect(301, original)];
        }
    });
}); });
app.post("/shortenUrl", function (request, response, next) {
    var data = request.body;
    if (!utils_1.isValidUrl(data.url)) {
        return response.status(400).json({ info: "Url given is not valid" });
    }
    if (data.alias && !utils_1.isUrlFriendly(data.alias)) {
        return response
            .status(400)
            .json({ info: "Alias given is not url-friendly" });
    }
    var alias = "";
    data.alias ? (alias = data.alias) : (alias = utils_1.generateAlias());
    var result = db_1.addShortenedUrl(db, alias, data.url);
    if (!result) {
        return response.status(500).json({ info: "Could not fulfil request" });
    }
    return response
        .status(200)
        .json({ shortenedUrl: "http://" + domain + ":" + port + "/" + alias });
});
app.listen(port, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.initialiseTable()];
            case 1:
                db = _a.sent();
                console.log("App running on port " + port + ".");
                return [2 /*return*/];
        }
    });
}); });
