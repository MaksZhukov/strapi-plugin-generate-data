"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
/*
 *
 * HomePage
 *
 */
var react_1 = require("react");
var Select_1 = require("@strapi/design-system/Select");
var Typography_1 = require("@strapi/design-system/Typography");
var Box_1 = require("@strapi/design-system/Box");
var faker_1 = require("@faker-js/faker");
var Layout_1 = require("@strapi/design-system/Layout");
var Flex_1 = require("@strapi/design-system/Flex");
var Button_1 = require("@strapi/design-system/Button");
var NumberInput_1 = require("@strapi/design-system/NumberInput");
var Checkbox_1 = require("@strapi/design-system/Checkbox");
var Alert_1 = require("@strapi/design-system/Alert");
var GeneratedDataTable_1 = require("../../components/GeneratedDataTable");
var axiosInstance_1 = require("../../utils/axiosInstance");
var COUNT_PAGINATION_ROWS = 25;
var COUNT_UPLOADED_DATA_ONCE = 25;
var includeTypes = ['integer', 'string', 'richtext'];
var HomePage = function () {
    var _a = (0, react_1.useState)([]), contentTypes = _a[0], setContentTypes = _a[1];
    var _b = (0, react_1.useState)(false), isUploadingData = _b[0], setIsUploadingData = _b[1];
    var _c = (0, react_1.useState)(false), showAlert = _c[0], setShowAlert = _c[1];
    var _d = (0, react_1.useState)(null), selectedTypeUID = _d[0], setSelectedTypeUID = _d[1];
    var _e = (0, react_1.useState)(null), values = _e[0], setValues = _e[1];
    var _f = (0, react_1.useState)(10), count = _f[0], setCount = _f[1];
    var _g = (0, react_1.useState)([]), checkedAttributes = _g[0], setCheckedAttributes = _g[1];
    var _h = (0, react_1.useState)([]), generatedData = _h[0], setGeneratedData = _h[1];
    var _j = (0, react_1.useState)(false), isFlushedPreviousData = _j[0], setIsFlashedPreviousData = _j[1];
    (0, react_1.useEffect)(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axiosInstance_1["default"].get('/content-type-builder/content-types')];
                    case 1:
                        data = (_a.sent()).data.data;
                        setContentTypes(data.filter(function (item) { return item.uid.startsWith('api'); }));
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    var selectedType = contentTypes.find(function (item) { return item.uid === selectedTypeUID; });
    var attributes = selectedType
        ? Object.keys(selectedType.schema.attributes).reduce(function (prev, key) {
            var _a;
            return includeTypes.includes(selectedType.schema.attributes[key].type)
                ? __assign(__assign({}, prev), (_a = {}, _a[key] = selectedType.schema.attributes[key], _a)) : prev;
        }, {})
        : null;
    (0, react_1.useEffect)(function () {
        if (attributes && !values) {
            var obj_1 = {};
            var newCheckedAttributes_1 = [];
            Object.keys(attributes).forEach(function (key) {
                if (attributes[key].type === 'integer') {
                    obj_1[key] = { min: 0, max: 10 };
                }
                if (attributes[key].type === 'string' ||
                    'richtext' === attributes[key].type) {
                    obj_1[key] = { count: 10 };
                }
                newCheckedAttributes_1.push(key);
            });
            setCheckedAttributes(newCheckedAttributes_1);
            setValues(obj_1);
        }
    }, [attributes, values]);
    var handleChangeSelect = function (newTypeUID) {
        setValues(null);
        setSelectedTypeUID(newTypeUID);
    };
    var handleClickGenerate = function () {
        var data = [];
        if (attributes && values) {
            var _loop_1 = function (i) {
                var obj = {};
                Object.keys(attributes)
                    .filter(function (key) { return checkedAttributes.includes(key); })
                    .forEach(function (key) {
                    if (attributes[key].type === 'integer') {
                        var _a = values[key], min = _a.min, max = _a.max;
                        obj[key] = faker_1.faker.datatype.number({ min: min, max: max });
                    }
                    if (attributes[key].type === 'string' ||
                        'richtext' === attributes[key].type) {
                        var count_1 = values[key].count;
                        obj[key] = faker_1.faker.random.words(count_1);
                    }
                });
                // @ts-ignore
                data.push(obj);
            };
            for (var i = 0; i < count; i++) {
                _loop_1(i);
            }
        }
        setGeneratedData(data);
    };
    var handleValueChange = function (key, field) { return function (value) {
        var _a, _b;
        if (value > 0) {
            // @ts-ignore
            setValues(__assign(__assign({}, values), (_a = {}, _a[key] = (_b = {}, _b[field] = value, _b), _a)));
        }
    }; };
    var handleChangeChecked = function (key) { return function () {
        if (checkedAttributes.includes(key)) {
            setCheckedAttributes(checkedAttributes.filter(function (item) { return item !== key; }));
        }
        else {
            setCheckedAttributes(__spreadArray(__spreadArray([], checkedAttributes, true), [key], false));
        }
    }; };
    var handleChangeIsFlushedPreviousData = function () {
        setIsFlashedPreviousData(!isFlushedPreviousData);
    };
    var handleUploadData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var uploadData_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsUploadingData(true);
                    setShowAlert(false);
                    if (!selectedType) return [3 /*break*/, 6];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!isFlushedPreviousData) return [3 /*break*/, 3];
                    return [4 /*yield*/, axiosInstance_1["default"].post("/generate-data/flush/".concat(selectedType.uid))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    uploadData_1 = function (data) { return __awaiter(void 0, void 0, void 0, function () {
                        var dataByCount;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!data.length) {
                                        return [2 /*return*/];
                                    }
                                    dataByCount = data.slice(0, COUNT_UPLOADED_DATA_ONCE);
                                    return [4 /*yield*/, Promise.all(dataByCount.map(function (item) {
                                            return axiosInstance_1["default"].post("/content-manager/collection-types/".concat(selectedType.uid), item);
                                        }))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, uploadData_1(data.slice(COUNT_UPLOADED_DATA_ONCE))];
                            }
                        });
                    }); };
                    return [4 /*yield*/, uploadData_1(generatedData)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    return [3 /*break*/, 6];
                case 6:
                    setIsUploadingData(false);
                    setShowAlert(true);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCloseAlert = function () {
        setShowAlert(false);
    };
    var renderStringInput = function (key) { return ((0, jsx_runtime_1.jsxs)(Flex_1.Flex, __assign({ gap: '10px', alignItems: 'center' }, { children: [(0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, { onChange: handleChangeChecked(key), checked: checkedAttributes.includes(key) }), (0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ variant: 'beta' }, { children: key })), (0, jsx_runtime_1.jsx)(NumberInput_1.NumberInput, { disabled: !checkedAttributes.includes(key), onValueChange: handleValueChange(key, 'count'), 
                // @ts-ignore
                value: values[key].count, label: 'Count words' })] }))); };
    var getAttributeInputs = function (key) {
        var _a;
        return _a = {},
            _a['integer'] = ((0, jsx_runtime_1.jsxs)(Flex_1.Flex, __assign({ gap: '10px' }, { children: [(0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, { checked: checkedAttributes.includes(key) }), (0, jsx_runtime_1.jsx)(Typography_1.Typography, __assign({ variant: 'beta' }, { children: key })), (0, jsx_runtime_1.jsx)(NumberInput_1.NumberInput, { disabled: !checkedAttributes.includes(key), onValueChange: handleValueChange(key, 'min'), 
                        // @ts-ignore
                        value: values[key].min, label: 'min' }), (0, jsx_runtime_1.jsx)(NumberInput_1.NumberInput, { disabled: !checkedAttributes.includes(key), onValueChange: handleValueChange(key, 'max'), 
                        // @ts-ignore
                        value: values[key].max, label: 'max' })] }))),
            _a['richtext'] = renderStringInput(key),
            _a['string'] = renderStringInput(key),
            _a;
    };
    var pageCount = Math.floor(generatedData.length / COUNT_PAGINATION_ROWS);
    return ((0, jsx_runtime_1.jsxs)(Layout_1.Layout, { children: [(0, jsx_runtime_1.jsx)(Layout_1.HeaderLayout, { title: 'Generate data', subtitle: 'Generate data for your content types', as: 'h1' }), (0, jsx_runtime_1.jsxs)(Layout_1.ContentLayout, { children: [(0, jsx_runtime_1.jsx)(Select_1.Select, __assign({ placeholder: 'Select your content type', value: selectedTypeUID, onChange: handleChangeSelect }, { children: contentTypes.map(function (item) { return ((0, jsx_runtime_1.jsx)(Select_1.Option, __assign({ value: item.uid }, { children: item.apiID }), item.uid)); }) })), attributes &&
                        values &&
                        Object.keys(attributes).map(function (key) { return getAttributeInputs(key)[attributes[key].type]; }), selectedType && ((0, jsx_runtime_1.jsx)(Box_1.Box, __assign({ paddingTop: '10px', paddingBottom: '10px' }, { children: (0, jsx_runtime_1.jsxs)(Flex_1.Flex, __assign({ alignItems: 'end', gap: '20px' }, { children: [(0, jsx_runtime_1.jsx)(NumberInput_1.NumberInput, { value: count, onValueChange: setCount, label: 'Count' }), (0, jsx_runtime_1.jsx)(Button_1.Button, __assign({ onClick: handleClickGenerate }, { children: "Generate" }))] })) }))), !!generatedData.length && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(GeneratedDataTable_1["default"], { data: generatedData }), (0, jsx_runtime_1.jsxs)(Flex_1.Flex, __assign({ alignItems: 'center', marginTop: '20px', marginBottom: '20px', gap: '20px' }, { children: [(0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, __assign({ disabled: isUploadingData, checked: isFlushedPreviousData, onChange: handleChangeIsFlushedPreviousData }, { children: "Flush previous content type data before upload" })), (0, jsx_runtime_1.jsx)(Button_1.Button, __assign({ loading: isUploadingData, onClick: handleUploadData }, { children: "Upload data" }))] }))] })), showAlert && selectedType && ((0, jsx_runtime_1.jsxs)(Alert_1.Alert, __assign({ className: 'hello', variant: 'success', onClose: handleCloseAlert, closeLabel: 'Close alert', title: 'Uploaded Alert' }, { children: ["The data for ", (0, jsx_runtime_1.jsx)("b", { children: selectedType.apiID }), " was uploaded"] })))] })] }));
};
exports["default"] = HomePage;
