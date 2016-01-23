'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (ComposedComponent, propName) {
  return function (_ComposedComponent) {
    _inherits(_class, _ComposedComponent);

    function _class(props) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props));

      _this.__stateProp = propName || 'state$';
      _this.error$ = new _rx2.default.Subject();
      return _this;
    }

    _createClass(_class, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        if (_get(Object.getPrototypeOf(_class.prototype), 'componentWillMount', this)) {
          _get(Object.getPrototypeOf(_class.prototype), 'componentWillMount', this).call(this);
        }
        if (!this.props[this.stateProp]) {
          var name = this.__proto__.__proto__.constructor.name;
          if (name === '_class') {
            //anonymous class
            name = 'unnamed';
          }
          throw new Error('[RxComponent] - no state prop attached to ' + name + ' component. Component should have an observable prop called ' + this.__stateProp);
        }

        var state$ = this.props[this.__stateProp];
        this.__stateSubscription = state$.subscribe(function (e) {
          return _this2.setState(e);
        }, function (err) {
          return error$.onNext(err);
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (_get(Object.getPrototypeOf(_class.prototype), 'componentWillUnmount', this)) {
          _get(Object.getPrototypeOf(_class.prototype), 'componentWillUnmount', this).call(this);
        }
        this.__stateSubscription.unsubscribe();
      }
    }]);

    return _class;
  }(ComposedComponent);
};