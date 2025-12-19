var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var asyncTime = function () {
    return Math.floor(Math.random() * 2000 + 1000);
};
var yield2 = function () {
    return new Promise(function (resolve) {
        var delay = asyncTime();
        setTimeout(function () {
            resolve('yield1-' + delay);
        }, delay);
    });
};
var yield3 = function () {
    return new Promise(function (resolve, reject) {
        var delay = asyncTime();
        setTimeout(function () {
            resolve('yield2-' + delay);
        }, delay);
    });
};
// Generator<T, TResult, TNext>:
// 状态{done?: boolean; value: T} | {done: boolean; value: TResult}.next(...args: [] | [TNext])
var step = function (status, iterator, resolve, reject) {
    if (status.done) {
        resolve(status.value);
    }
    else {
        if (status.value instanceof Promise) {
            status.value.then(function (res) {
                step(iterator.next(res), iterator, resolve, reject);
            })["catch"](function (error) {
                iterator["throw"](error);
                reject(error);
            });
        }
        else {
            step(iterator.next(status.value), iterator, resolve, reject);
        }
    }
};
var executor = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var thisArg = args[0] instanceof Object ? args[0] : {};
    var argumentList = args.slice(1, args.length - 1);
    var generator = args[args.length - 1];
    return new Promise(function (resolve, reject) {
        var iterator = generator.apply(thisArg, argumentList);
        step(iterator.next(), iterator, resolve, reject);
    });
};
executor(window, 1, 2, 3, function (a, b, c) {
    var y1, y2, y3, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                console.log('generator', this, a, b, c);
                return [4 /*yield*/, 300];
            case 1:
                y1 = _a.sent();
                console.log('next-1', y1);
                return [4 /*yield*/, yield2()];
            case 2:
                y2 = _a.sent();
                console.log('next-2', y2);
                return [4 /*yield*/, yield3()];
            case 3:
                y3 = _a.sent();
                console.log('next-3', y3);
                return [2 /*return*/, Number(y3.split('-')[1]) > 1500 ? 'slow' : 'fast'];
            case 4:
                error_1 = _a.sent();
                console.dir(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}).then(function (res) {
    console.log(res);
})["catch"](function (error) {
    console.dir(error);
});
