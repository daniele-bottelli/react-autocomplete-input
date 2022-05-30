"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var textarea_caret_1 = __importDefault(require("textarea-caret"));
var get_input_selection_1 = __importStar(require("get-input-selection"));
require("./AutoCompleteTextField.css");
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_RETURN = 13;
var KEY_ENTER = 14;
var KEY_ESCAPE = 27;
var KEY_TAB = 9;
var OPTION_LIST_Y_OFFSET = 10;
var OPTION_LIST_MIN_WIDTH = 100;
var AutocompleteTextField = /** @class */ (function (_super) {
    __extends(AutocompleteTextField, _super);
    function AutocompleteTextField(props) {
        var _this = _super.call(this, props) || this;
        _this.isTrigger = _this.isTrigger.bind(_this);
        _this.arrayTriggerMatch = _this.arrayTriggerMatch.bind(_this);
        _this.getMatch = _this.getMatch.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleChangeEvent = _this.handleChangeEvent.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this.handleResize = _this.handleResize.bind(_this);
        _this.handleSelection = _this.handleSelection.bind(_this);
        _this.updateCaretPosition = _this.updateCaretPosition.bind(_this);
        _this.updateHelper = _this.updateHelper.bind(_this);
        _this.resetHelper = _this.resetHelper.bind(_this);
        _this.renderAutocompleteList = _this.renderAutocompleteList.bind(_this);
        _this.state = {
            helperVisible: false,
            left: 0,
            trigger: null,
            matchLength: 0,
            matchStart: 0,
            options: [],
            selection: 0,
            top: 0,
            value: null,
            caret: 0,
        };
        _this.refInput = react_1.createRef();
        _this.recentValue = props.defaultValue;
        _this.enableSpaceRemovers = false;
        return _this;
    }
    AutocompleteTextField.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.handleResize);
    };
    AutocompleteTextField.prototype.componentDidUpdate = function (prevProps) {
        var options = this.props.options;
        var caret = this.state.caret;
        if (options.length !== prevProps.options.length) {
            this.updateHelper(this.recentValue, caret, options);
        }
    };
    AutocompleteTextField.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.handleResize);
    };
    AutocompleteTextField.prototype.getMatch = function (str, caret, providedOptions) {
        var _a = this.props, trigger = _a.trigger, matchAny = _a.matchAny, regex = _a.regex;
        var re = new RegExp(regex);
        var triggers;
        if (!Array.isArray(trigger)) {
            triggers = new Array(trigger);
        }
        else {
            triggers = trigger;
        }
        triggers.sort();
        var providedOptionsObject = providedOptions;
        if (Array.isArray(providedOptions)) {
            triggers.forEach(function (triggerStr) {
                providedOptionsObject[triggerStr] = providedOptions;
            });
        }
        var triggersMatch = this.arrayTriggerMatch(triggers, re);
        var slugData = null;
        for (var triggersIndex = 0; triggersIndex < triggersMatch.length; triggersIndex++) {
            var _b = triggersMatch[triggersIndex], triggerStr = _b.triggerStr, triggerMatch = _b.triggerMatch, triggerLength = _b.triggerLength;
            var _loop_1 = function (i) {
                var substr = str.substring(i, caret);
                var match = substr.match(re);
                var matchStart = -1;
                if (triggerLength > 0) {
                    var triggerIdx = triggerMatch ? i : i - triggerLength + 1;
                    if (triggerIdx < 0) { // out of input
                        return "break";
                    }
                    if (this_1.isTrigger(triggerStr, str, triggerIdx)) {
                        matchStart = triggerIdx + triggerLength;
                    }
                    if (!match && matchStart < 0) {
                        return "break";
                    }
                }
                else {
                    if (match && i > 0) { // find first non-matching character or begin of input
                        return "continue";
                    }
                    matchStart = i === 0 && match ? 0 : i + 1;
                    if (caret - matchStart === 0) { // matched slug is empty
                        return "break";
                    }
                }
                if (matchStart >= 0) {
                    var triggerOptions = providedOptionsObject[triggerStr];
                    if (triggerOptions == null) {
                        return "continue";
                    }
                    var matchedSlug_1 = str.substring(matchStart, caret);
                    var options = triggerOptions.filter(function (slug) {
                        var idx = slug.toLowerCase().indexOf(matchedSlug_1.toLowerCase());
                        return idx !== -1 && (matchAny || idx === 0);
                    });
                    var currTrigger = triggerStr;
                    var matchLength = matchedSlug_1.length;
                    if (slugData === null) {
                        slugData = {
                            trigger: currTrigger,
                            matchStart: matchStart, matchLength: matchLength, options: options,
                        };
                    }
                    else {
                        slugData = __assign(__assign({}, slugData), { trigger: currTrigger, matchStart: matchStart, matchLength: matchLength, options: options });
                    }
                }
            };
            var this_1 = this;
            for (var i = caret - 1; i >= 0; --i) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
        }
        return slugData;
    };
    AutocompleteTextField.prototype.arrayTriggerMatch = function (triggers, re) {
        var triggersMatch = triggers.map(function (trigger) { return ({
            triggerStr: trigger,
            triggerMatch: trigger.match(re),
            triggerLength: trigger.length,
        }); });
        return triggersMatch;
    };
    AutocompleteTextField.prototype.isTrigger = function (trigger, str, i) {
        if (!trigger || !trigger.length) {
            return true;
        }
        if (str.substr(i, trigger.length) === trigger) {
            return true;
        }
        return false;
    };
    AutocompleteTextField.prototype.handleChange = function (e) {
        var onChangeAdapter = this.props.onChangeAdapter;
        this.handleChangeEvent(onChangeAdapter(e, this.refInput));
    };
    AutocompleteTextField.prototype.handleChangeEvent = function (e) {
        var _a = this.props, onChange = _a.onChange, options = _a.options, spaceRemovers = _a.spaceRemovers, spacer = _a.spacer, value = _a.value;
        var old = this.recentValue;
        var str = e.target.value;
        var caret = get_input_selection_1.default(e.target).end;
        if (!str.length) {
            this.setState({ helperVisible: false });
        }
        this.recentValue = str;
        this.setState({ caret: caret, value: e.target.value });
        if (!str.length || !caret) {
            return onChange(e.target.value);
        }
        // '@wonderjenny ,|' -> '@wonderjenny, |'
        if (this.enableSpaceRemovers && spaceRemovers.length && str.length > 2 && spacer.length) {
            for (var i = 0; i < Math.max(old.length, str.length); ++i) {
                if (old[i] !== str[i]) {
                    if (i >= 2
                        && str[i - 1] === spacer
                        && spaceRemovers.indexOf(str[i - 2]) === -1
                        && spaceRemovers.indexOf(str[i]) !== -1
                        && this.getMatch(str.substring(0, i - 2), caret - 3, options)) {
                        var newValue = ("" + str.slice(0, i - 1) + str.slice(i, i + 1) + str.slice(i - 1, i) + str.slice(i + 1));
                        this.updateCaretPosition(i + 1);
                        this.refInput.current.value = newValue;
                        if (!value) {
                            this.setState({ value: newValue });
                        }
                        return onChange(newValue);
                    }
                    break;
                }
            }
            this.enableSpaceRemovers = false;
        }
        this.updateHelper(str, caret, options);
        if (!value) {
            this.setState({ value: e.target.value });
        }
        return onChange(e.target.value);
    };
    AutocompleteTextField.prototype.handleKeyDown = function (event) {
        var _a = this.state, helperVisible = _a.helperVisible, options = _a.options, selection = _a.selection;
        var _b = this.props, onKeyDown = _b.onKeyDown, passThroughEnter = _b.passThroughEnter;
        if (helperVisible) {
            switch (event.keyCode) {
                case KEY_ESCAPE:
                    event.preventDefault();
                    this.resetHelper();
                    break;
                case KEY_UP:
                    event.preventDefault();
                    this.setState({ selection: ((options.length + selection) - 1) % options.length });
                    break;
                case KEY_DOWN:
                    event.preventDefault();
                    this.setState({ selection: (selection + 1) % options.length });
                    break;
                case KEY_ENTER:
                case KEY_RETURN:
                    if (!passThroughEnter) {
                        event.preventDefault();
                    }
                    this.handleSelection(selection);
                    break;
                case KEY_TAB:
                    this.handleSelection(selection);
                    break;
                default:
                    onKeyDown(event);
                    break;
            }
        }
        else {
            onKeyDown(event);
        }
    };
    AutocompleteTextField.prototype.handleResize = function () {
        this.setState({ helperVisible: false });
    };
    AutocompleteTextField.prototype.handleSelection = function (idx) {
        var _a = this.props, spacer = _a.spacer, onSelect = _a.onSelect, changeOnSelect = _a.changeOnSelect;
        var _b = this.state, matchStart = _b.matchStart, matchLength = _b.matchLength, options = _b.options, trigger = _b.trigger;
        var slug = options[idx];
        var value = this.recentValue;
        var part1 = trigger.length === 0 ? '' : value.substring(0, matchStart - trigger.length);
        var part2 = value.substring(matchStart + matchLength);
        var event = { target: this.refInput.current };
        var changedStr = changeOnSelect(trigger, slug);
        event.target.value = "" + part1 + changedStr + spacer + part2;
        this.handleChangeEvent(event);
        onSelect(event.target.value);
        this.resetHelper();
        this.updateCaretPosition(part1.length + changedStr.length + 1);
        this.enableSpaceRemovers = true;
    };
    AutocompleteTextField.prototype.updateCaretPosition = function (caret) {
        var _this = this;
        this.setState({ caret: caret }, function () { return get_input_selection_1.setCaretPosition(_this.refInput.current, caret); });
    };
    AutocompleteTextField.prototype.updateHelper = function (str, caret, options) {
        var input = this.refInput.current;
        var slug = this.getMatch(str, caret, options);
        if (slug) {
            var caretPos = textarea_caret_1.default(input, caret);
            var rect = input.getBoundingClientRect();
            var top_1 = caretPos.top + input.offsetTop;
            var left = Math.min(caretPos.left + input.offsetLeft - OPTION_LIST_Y_OFFSET, input.offsetLeft + rect.width - OPTION_LIST_MIN_WIDTH);
            var _a = this.props, minChars = _a.minChars, onRequestOptions = _a.onRequestOptions, requestOnlyIfNoOptions = _a.requestOnlyIfNoOptions;
            if (slug.matchLength >= minChars
                && (slug.options.length > 1
                    || (slug.options.length === 1
                        && slug.options[0].length !== slug.matchLength))) {
                this.setState(__assign({ helperVisible: true, top: top_1,
                    left: left }, slug));
            }
            else {
                if (!requestOnlyIfNoOptions || !slug.options.length) {
                    onRequestOptions(str.substr(slug.matchStart, slug.matchLength));
                }
                this.resetHelper();
            }
        }
        else {
            this.resetHelper();
        }
    };
    AutocompleteTextField.prototype.resetHelper = function () {
        this.setState({ helperVisible: false, selection: 0 });
    };
    AutocompleteTextField.prototype.renderAutocompleteList = function () {
        var _this = this;
        var _a = this.state, helperVisible = _a.helperVisible, left = _a.left, matchStart = _a.matchStart, matchLength = _a.matchLength, options = _a.options, selection = _a.selection, top = _a.top, value = _a.value;
        if (!helperVisible) {
            return null;
        }
        var _b = this.props, maxOptions = _b.maxOptions, offsetX = _b.offsetX, offsetY = _b.offsetY;
        if (options.length === 0) {
            return null;
        }
        if (selection >= options.length) {
            this.setState({ selection: 0 });
            return null;
        }
        var optionNumber = maxOptions === 0 ? options.length : maxOptions;
        var helperOptions = options.slice(0, optionNumber).map(function (val, idx) {
            var highlightStart = val.toLowerCase().indexOf(value.substr(matchStart, matchLength).toLowerCase());
            return (react_1.default.createElement("li", { className: idx === selection ? 'active' : null, key: val, onClick: function () { _this.handleSelection(idx); }, onMouseEnter: function () { _this.setState({ selection: idx }); } },
                val.slice(0, highlightStart),
                react_1.default.createElement("strong", null, val.substr(highlightStart, matchLength)),
                val.slice(highlightStart + matchLength)));
        });
        return (react_1.default.createElement("ul", { className: "react-autocomplete-input", style: { left: left + offsetX, top: top + offsetY } }, helperOptions));
    };
    AutocompleteTextField.prototype.render = function () {
        var _a = this.props, Component = _a.Component, defaultValue = _a.defaultValue, disabled = _a.disabled, onBlur = _a.onBlur, value = _a.value, rest = __rest(_a, ["Component", "defaultValue", "disabled", "onBlur", "value"]);
        var stateValue = this.state.value;
        var propagated = Object.assign({}, rest);
        Object.keys(AutocompleteTextField.defaultProps).forEach(function (k) { delete propagated[k]; });
        var val = '';
        if (typeof value !== 'undefined' && value !== null) {
            val = value;
        }
        else if (stateValue) {
            val = stateValue;
        }
        else if (defaultValue) {
            val = defaultValue;
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Component, __assign({ disabled: disabled,
                onBlur: onBlur, onChange: this.handleChange, onKeyDown: this.handleKeyDown, ref: this.refInput, value: val }, propagated)),
            this.renderAutocompleteList()));
    };
    AutocompleteTextField.defaultProps = {
        Component: 'textarea',
        defaultValue: '',
        disabled: false,
        maxOptions: 6,
        onBlur: function () { },
        onChange: function () { },
        onChangeAdapter: function (e) { return e; },
        onKeyDown: function () { },
        onRequestOptions: function () { },
        onSelect: function () { },
        changeOnSelect: function (trigger, slug) { return trigger + slug; },
        options: [],
        regex: '^[A-Za-z0-9\\-_]+$',
        matchAny: false,
        minChars: 0,
        requestOnlyIfNoOptions: true,
        spaceRemovers: [',', '.', '!', '?'],
        spacer: ' ',
        trigger: '@',
        offsetX: 0,
        offsetY: 0,
        value: null,
        passThroughEnter: false,
    };
    return AutocompleteTextField;
}(react_1.default.Component));
// AutocompleteTextField.defaultProps = defaultProps;
exports.default = AutocompleteTextField;
//# sourceMappingURL=AutoCompleteTextField.js.map