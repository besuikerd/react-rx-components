'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_rx2.default.Observable.prototype.scanWithEvent = function (event$, onEvent, onNext) {
  return this.combineLatest(event$).scan(function (_ref, _ref2) {
    var acc = _ref.e;
    var prevClick = _ref.prevClick;

    var _ref3 = _slicedToArray(_ref2, 2);

    var e = _ref3[0];
    var click = _ref3[1];

    if (acc === undefined) {
      acc = e;
    }
    var next = undefined;
    if (click && click !== prevClick) {
      click.persist();
      next = onEvent(acc);
    } else {
      next = onNext ? onNext(acc) : acc;
    }
    return { e: next, prevClick: click };
  }, { e: null, prevClick: null }).map(function (item) {
    return item.e;
  });
};