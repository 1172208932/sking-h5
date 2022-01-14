(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.LotteryTiger = factory());
})(this, function () {
  "use strict";

  Object.assign =
    Object.assign ||
    function (target) {
      // We must check against these specific cases.
      if (target === undefined || target === null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError(
        "Super expression must either be null or a function, not " +
          typeof superClass
      );
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
    if (superClass)
      Object.setPrototypeOf
        ? Object.setPrototypeOf(subClass, superClass)
        : (subClass.__proto__ = superClass);
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    }

    return call && (typeof call === "object" || typeof call === "function")
      ? call
      : self;
  };

  var Events = (function () {
    function Events() {
      classCallCheck(this, Events);

      this._queue = [];
    }

    Events.prototype.on = function on(key, callback) {
      this._queue[key] = this._queue[key] || [];
      this._queue[key].push(callback);
      return this;
    };

    Events.prototype.off = function off(key, callback) {
      if (this._queue[key]) {
        var index =
          typeof callback === "undefined"
            ? -2
            : this._queue[key].indexOf(callback);
        if (index === -2) {
          delete this._queue[key];
        } else if (index !== -1) {
          this._queue[key].splice(index, 1);
        }
        if (this._queue[key] && this._queue[key].length === 0)
          delete this._queue[key];
      }
      return this;
    };

    Events.prototype.has = function has(key) {
      return !!this._queue[key];
    };

    Events.prototype.trigger = function trigger(key) {
      var _this = this;

      for (
        var _len = arguments.length,
          args = Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        args[_key - 1] = arguments[_key];
      }

      if (this._queue[key]) {
        this._queue[key].forEach(function (callback) {
          return callback.apply(_this, args);
        });
      }
      return this;
    };

    return Events;
  })();

  var animationEvent = (function () {
    var el = document.createElement("div");
    var animations = {
      animation: "animationend",
      webkitAnimation: "webkitAnimationEnd",
      msAnimation: "MSAnimationEnd",
      oAnimation: "oanimationend",
    };

    for (var t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }

    return null;
  })();

  /**
   * 处理animate动画结束时间
   * @param el 绑定事件目标元素
   * @param callback 回调函数
   * @param animateTime 当不支持animationend使用settimeout处理 延迟时间
   */
  var animationEnd = function (el, callback) {
    var animateTime =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    function bind() {
      callback();
      el.removeEventListener(animationEvent, bind);
    }

    animationEvent
      ? el.addEventListener(animationEvent, bind)
      : setTimeout(function () {
          return callback();
        }, animateTime);
  };

  var LotteryTigerRoller = (function () {
    function LotteryTigerRoller(elem) {
      classCallCheck(this, LotteryTigerRoller);

      this.elem = elem;
      this.items = elem.children;

      const len = this.items.length;
      for (let i = 0; i < len; i++) {
        this.elem.appendChild(this.items[i].cloneNode(true));
      }
      for (let i = 0; i < len; i++) {
        this.elem.appendChild(this.items[i].cloneNode(true));
      }

      // for (let i = 0; i < len; i++) {
      //   this.elem.appendChild(this.items[i].cloneNode(true));
      // }
      // console.log(a);
      // 克隆第一个节点 用于制作无限滚动效果
      // this.elem.appendChild(this.items[0].cloneNode(true));
    }

    LotteryTigerRoller.prototype.resize = function resize() {
      this.height = this.items[0].clientHeight;
      if (!this.elem.classList.contains("fx-roll") && this.index > 0)
        this.elem.style.marginTop = -this.index * this.height + "px";
    };

    LotteryTigerRoller.prototype.reset = function reset() {
      this.elem.classList.remove("fx-roll");
      this.elem.classList.remove("fx-bounce");
      this.elem.style.marginTop = 0;
      this.state = 0;
    };

    LotteryTigerRoller.prototype.start = function start() {
      var _this = this;

      var timeout =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this.state === 1) return;
      this.state = 1;
      setTimeout(function () {
        if (_this.state !== 1) return;
        _this.elem.classList.add("fx-roll");
        _this.elem.style.marginTop = 0;
      }, timeout);
    };

    LotteryTigerRoller.prototype.stop = function stop(index, callback) {
      var _this2 = this;

      var timeout =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (!this.height) this.height = this.items[0].clientHeight;
      setTimeout(function () {
        if (_this2.state !== 1) return;
        _this2.elem.classList.remove("fx-roll");
        _this2.elem.classList.add("fx-bounce");
        _this2.elem.style.marginTop =
          (-index + 1 - _this2.items.length / 3) * _this2.height + "px";
        animationEnd(_this2.elem, function () {
          _this2.state = 0;
          _this2.elem.classList.remove("fx-bounce");
          if (callback) callback.call(_this2, index);
        });
      }, timeout);
    };

    return LotteryTigerRoller;
  })();

  var LotteryTiger = (function (_Events) {
    inherits(LotteryTiger, _Events);

    function LotteryTiger(toggle, rollers, options) {
      classCallCheck(this, LotteryTiger);

      var _this3 = possibleConstructorReturn(this, _Events.call(this));

      _this3.options = Object.assign(
        {
          interval: 300, // 每个roller间动画间隔
          aniMinTime: 6000, // 动画执行最少时间
          resize: true, // roller大小是否是可变的
        },
        options
      );
      _this3.toggle = toggle;

      // 初始化滚轴
      _this3.rollerQueue = [];
      for (var i = 0; i < rollers.length; i++) {
        _this3.rollerQueue.push(new LotteryTigerRoller(rollers[i]));
      }

      // 如果大小是可变的就绑定resize事件
      if (_this3.options.resize) {
        window.addEventListener(
          "onorientationchange" in document ? "orientationchange" : "resize",
          function () {
            _this3.rollerQueue.forEach(function (roller) {
              return roller.resize();
            });
          }
        );
      }
      return _this3;
    }

    LotteryTiger.prototype.reset = function reset() {
      // this.toggle.classList.remove("z-active");
      for (var i = 0, l = this.rollerQueue.length; i < l; i++) {
        this.rollerQueue[i].reset();
      }
      this.trigger("reset");
    };

    LotteryTiger.prototype.setResult = function setResult(ret, data) {
      var _this4 = this;

      // 保证动画执行时间
      var endTime = new Date().getTime();
      setTimeout(
        function () {
          for (var i = 0, l = _this4.rollerQueue.length; i < l; i++) {
            _this4.rollerQueue[i].stop(
              ret[i],
              i === l - 1
                ? function () {
                    // _this4.toggle.classList.remove("z-active");
                    _this4.trigger("end", data);
                  }
                : null,
              i * _this4.options.interval
            );
          }
        },
        endTime - this._startTime > this.options.aniMinTime
          ? 0
          : this.options.aniMinTime - (endTime - this._startTime)
      );
    };

    LotteryTiger.prototype.draw = function draw() {
      // if (this.toggle.classList.contains("z-active")) return;
      if (this.has("start")) this.trigger("start");
      this._startTime = new Date().getTime();

      // this.toggle.classList.add("z-active");
      for (var i = 0, l = this.rollerQueue.length; i < l; i++) {
        this.rollerQueue[i].start(i * this.options.interval);
      }
    };

    return LotteryTiger;
  })(Events);

  return LotteryTiger;
});
