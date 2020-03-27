"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var constants_1 = require("./config/constants");
var app = express_1.default();
var path = require('path');
app.use(express_1.default.json());
app.listen(constants_1.PORT, function () {
    console.log("Server listening on port " + constants_1.PORT);
});
app.get('/connect', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'test.html'));
});
