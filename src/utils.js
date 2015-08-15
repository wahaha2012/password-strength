//{{{lib}}}
    var utils = {
        getCharLength: function (str) {
            var charLen = 0;
            for (var i = 0, len = str.length; i < len; i++) {
                if (str.charCodeAt(i) > 255) {
                    charLen += 2;
                } else {
                    charLen += 1;
                }
            }
            return charLen;
        },

        getMaxLengthString: function(str, maxLength, subfix) {
            var currentStr = "";
            for (var i = 0, len = str.length; i < len; i++) {
                currentStr += str.charAt(i);
                if (getCharLength(currentStr) > maxLength) {
                    return str.substr(0, i) + subfix;
                }
            }
            return str;
        }
    };