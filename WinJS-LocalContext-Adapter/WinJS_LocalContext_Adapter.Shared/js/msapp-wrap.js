
function msappWrapUnsafeFunction(method) {
  if (typeof MSApp === 'undefined') {
    return method;
  }
  return function () {
    var me, args, result;
    me = this;
    args = arguments;
    MSApp.execUnsafeLocalFunction(function () {
      result = method.apply(me, args);
    });
    return result;
  };
};
