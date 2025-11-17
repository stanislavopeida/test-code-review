"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setWaitingInterval_1 = require("./setWaitingInterval");
var delays = [16, 8, 4, 2];
(0, setWaitingInterval_1.setWaitingInterval)(function () { return console.log("Hello, World!"); }, delays);
