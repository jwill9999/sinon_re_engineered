const Synon = {
  /*= ==========================================
                    SPY FUNCTION
    ============================================= */
  spy: (obj, name, stub = null) => {
    let prev;
    function noop() {}

    function wrap(...args) {
      const meta = {
        arguments: args,
        context: this
      };

      try {
        meta.returns = (stub || prev || noop)(...args);
      } catch (error) {
        meta.error = error;
      }

      wrap.log.push(meta);
      return meta.returns;
    }
    wrap.log = [];

    if (obj) {
      prev = obj[name];
      obj[name] = wrap;
      wrap.restore = function restore() {
        obj[name] = prev;
      };
    }

    return wrap;
  },

  /*= ==========================================
                   STUB FUNCTION
    ============================================= */

  stub: (obj, name, stub) => {
    const wrap = Synon.spy.call(this, obj, name, stub);
    return wrap;
  }
};

module.exports = Synon;
