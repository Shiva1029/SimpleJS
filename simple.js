function create(str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes[0];
}

function parent(el) {
    return el.parentNode;
}

function setAttr(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function addBefore(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function searchObj(obj, query) {
    query = query.toLowerCase();
    for (var key in obj) {
        var value = obj[key];
        if (typeof value === 'object') {
            if (searchObj(value, query)) {
                return true;
            }
        }
        else if (typeof value === 'string') {
            if (value.toLowerCase().search(query) >= 0) {
                return true
            }
        }
    }
    return false;
}

function loadHTML(selector, htmlfile, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', htmlfile, true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return;
        document.querySelector(selector).innerHTML = this.responseText;
        if (callback) {
            callback();
        }
    };
    xhr.send();
}

function postJSON(data, url, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (successCallback) {
                successCallback(xhr.response);
            }
        } else {
            if (xhr.status !== 200 && errorCallback) {
                errorCallback(xhr.status);
            }
        }
    }
    xhr.send(JSON.stringify(data));
}

function get(url, sucessCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (successCallback) {
                successCallback(xhr.response);
            }
        } else {
            if (xhr.status !== 200 && errorCallback) {
                errorCallback(xhr.status);
            }
        }
    }
    xhr.send(null);
}

function setCookie(name, val, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = 'expires='+ d.toUTCString();
    document.cookie = name + '=' + val + ';' + expires + ';path=/';
}

function getCookie(name) {
    var name = name + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function deleteCookie(name) {
  document.cookie = name + '=;expires=' + new Date(1970, 0, 1).toUTCString() + ';path=/'
}
