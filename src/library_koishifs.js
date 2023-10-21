
addToLibrary({
  // override postsets
  $NODERAWFS__postset: '',
  $NODEFS__postset: '',
  // loaded in modules.js
  // $KOISHIFS__deps: ['$MEMFS', '$NODERAWFS'],
  $KOISHIFS__postset: `
    var VFS
    if (process.env.KOISHI_ENV !== 'browser') {
      NODEFS.staticInit();
      var _wrapNodeError = function(func) {
        return function() {
          try {
            return func.apply(this, arguments);
          } catch (e) {
            if (e.code) {
              throw new FS.ErrnoError(ERRNO_CODES[e.code]);
            }
            throw e;
          }
        }
      };
      VFS = Object.assign({}, FS);
      for (var _key in NODERAWFS) {
        FS[_key] = _wrapNodeError(NODERAWFS[_key]);
      }
    }
  `,
  $KOISHIFS: {},
}, { allowMissing: true })
