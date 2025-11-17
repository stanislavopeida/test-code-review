"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearWaitingInterval = exports.setWaitingInterval = void 0;
var map = new Map();
var waitingIntervalId = 0;
function getLastUntilOneLeft(arr) {
    if (arr.length > 1) {
        var item = arr.pop();
        return item;
    }
    return arr[0];
}
/**
 * This function mimics the behavior of setInterval with one key difference:
 * if the callback function takes too long to execute or if the browser throttles,
 * subsequent calls to the callback function will not occur.
 *
 * Additionally, we pass an array of timeouts to define an increasing delay period.
 * For example, given the array [16, 8, 4, 2], the delays will be 2, 4, 8, 16, 16, 16...
 */
function setWaitingInterval(handler, timeouts) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var currentWaitingIntervalId = ++waitingIntervalId;
    function internalHandler() {
        var argsInternal = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argsInternal[_i] = arguments[_i];
        }
        handler.apply(void 0, argsInternal);
        map.set(currentWaitingIntervalId, window.setTimeout.apply(window, __spreadArray([internalHandler, getLastUntilOneLeft(timeouts)], args, false)));
        console.log(timeouts);
    }
    map.set(currentWaitingIntervalId, window.setTimeout.apply(window, __spreadArray([internalHandler, getLastUntilOneLeft(timeouts)], args, false)));
    return currentWaitingIntervalId;
}
exports.setWaitingInterval = setWaitingInterval;
function clearWaitingInterval(intervalId) {
    var realTimeoutId = map.get(intervalId);
    if (typeof realTimeoutId === "number") {
        clearTimeout(realTimeoutId);
    }
}
exports.clearWaitingInterval = clearWaitingInterval;
