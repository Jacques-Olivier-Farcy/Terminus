var dialog=[];
var lang='fr';
String.prototype.printf = function (obj) {
  var useArguments = false;
  var _arguments = arguments;
  var i = -1;
  if (typeof _arguments[0] == "string") {
    useArguments = true;
  }
  if (obj instanceof Array || useArguments) {
    return this.replace(/\%s/g,
    function (a, b) {
      i++;
      if (useArguments) {
        if (typeof _arguments[i] == 'string') {
          return _arguments[i];
        }
        else {
          throw new Error("Arguments element is an invalid type");
        }
      }
      return obj[i];
    });
  }
  else {
    return this.replace(/{([^{}]*)}/g,
    function (a, b) {
      var r = obj[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    });
  }
};
function _(str,vars=[]) {
  if (str in dialog[lang]) {
    return dialog[lang][str].printf(vars);
  }
  return str;
}
