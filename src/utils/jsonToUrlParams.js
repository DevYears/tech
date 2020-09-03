export default function (a) {
  const s = [];
  const add = (k, v) => {
    let val = typeof v === 'function' ? v() : v;
    // eslint-disable-next-line
    val = val === null ? '' : val === undefined ? '' : val;
    s[s.length] = `${encodeURIComponent(k)}=${encodeURIComponent(val)}`;
  };
  const buildParams = (prefix, obj) => {
    let i; let len; let
      key;

    if (prefix) {
      if (Array.isArray(obj)) {
        // eslint-disable-next-line no-plusplus
        for (i = 0, len = obj.length; i < len; i++) {
          buildParams(
            `${prefix}[${typeof obj[i] === 'object' && obj[i] ? i : ''}]`,
            obj[i],
          );
        }
      } else if (String(obj) === '[object Object]') {
        // eslint-disable-next-line
        for (key in obj) {
          buildParams(`${prefix}[${key}]`, obj[key]);
        }
      } else {
        add(prefix, obj);
      }
    } else if (Array.isArray(obj)) {
      // eslint-disable-next-line no-plusplus
      for (i = 0, len = obj.length; i < len; i++) {
        add(obj[i].name, obj[i].value);
      }
    } else {
      // eslint-disable-next-line
      for (key in obj) {
        buildParams(key, obj[key]);
      }
    }
    return s;
  };

  return buildParams('', a).join('&');
}
