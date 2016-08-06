"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Publish = function (_React$Component) {
    _inherits(Publish, _React$Component);

    function Publish() {
        _classCallCheck(this, Publish);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Publish).apply(this, arguments));
    }

    _createClass(Publish, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "publish" },
                _react2.default.createElement(
                    "div",
                    { className: "weui_cells weui_cells_form m-t-0" },
                    _react2.default.createElement(
                        "div",
                        { className: "weui_cell" },
                        _react2.default.createElement(
                            "div",
                            { className: "weui_cell_bd weui_cell_primary" },
                            _react2.default.createElement("input", { className: "weui_input", type: "number", pattern: "[0-9]*", placeholder: "标题" })
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "weui_cell" },
                        _react2.default.createElement(
                            "div",
                            { className: "weui_cell_bd weui_cell_primary" },
                            _react2.default.createElement("textarea", { className: "weui_textarea", placeholder: "描述", rows: "3" }),
                            _react2.default.createElement(
                                "div",
                                { className: "weui_textarea_counter" },
                                _react2.default.createElement(
                                    "span",
                                    null,
                                    "0"
                                ),
                                "/200"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "weui_cell" },
                        _react2.default.createElement(
                            "div",
                            { className: "weui_cell_bd weui_cell_primary" },
                            _react2.default.createElement("input", { className: "weui_input", type: "number", pattern: "[0-9]*", placeholder: "价格" })
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "weui_cell weui_cell_select" },
                        _react2.default.createElement(
                            "div",
                            { className: "weui_cell_bd weui_cell_primary" },
                            _react2.default.createElement(
                                "select",
                                { className: "weui_select", name: "select1" },
                                _react2.default.createElement(
                                    "option",
                                    { selected: "", value: "1" },
                                    "微信号"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "2" },
                                    "QQ号"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "3" },
                                    "Email"
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "weui_cell" },
                        _react2.default.createElement(
                            "div",
                            { className: "weui_cell_bd weui_cell_primary" },
                            _react2.default.createElement("i", { className: "fa fa-location-arrow", "aria-hidden": "true" }),
                            _react2.default.createElement(
                                "span",
                                { className: "m-l-10" },
                                "广东省深圳市"
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "weui_cells weui_cells_form" },
                    _react2.default.createElement(
                        "div",
                        { className: "weui_cell" },
                        _react2.default.createElement(
                            "div",
                            { className: "weui_cell_bd weui_cell_primary" },
                            _react2.default.createElement(
                                "div",
                                { className: "weui_uploader" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "weui_uploader_hd weui_cell" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "weui_cell_bd weui_cell_primary" },
                                        "图片上传"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "weui_cell_ft" },
                                        "0/2"
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "weui_uploader_bd" },
                                    _react2.default.createElement(
                                        "ul",
                                        { className: "weui_uploader_files" },
                                        _react2.default.createElement("li", { className: "weui_uploader_file", style: { 'background-url': './images/photo.jpg' } }),
                                        _react2.default.createElement("li", { className: "weui_uploader_file" }),
                                        _react2.default.createElement("li", { className: "weui_uploader_file" }),
                                        _react2.default.createElement(
                                            "li",
                                            { className: "weui_uploader_file weui_uploader_status" },
                                            _react2.default.createElement(
                                                "div",
                                                { className: "weui_uploader_status_content" },
                                                _react2.default.createElement("i", { className: "weui_icon_warn" })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "li",
                                            { className: "weui_uploader_file weui_uploader_status" },
                                            _react2.default.createElement(
                                                "div",
                                                { className: "weui_uploader_status_content" },
                                                "50%"
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "weui_uploader_input_wrp" },
                                        _react2.default.createElement("input", { className: "weui_uploader_input", type: "file", accept: "image/jpg,image/jpeg,image/png,image/gif", multiple: "" })
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "weui_btn_area" },
                    _react2.default.createElement(
                        "a",
                        { className: "weui_btn weui_btn weui_btn_plain_primary", href: "javascript:", id: "showTooltips" },
                        "确认发布"
                    )
                )
            );
        }
    }]);

    return Publish;
}(_react2.default.Component);

exports.default = Publish;

//# sourceMappingURL=Publish-compiled.js.map