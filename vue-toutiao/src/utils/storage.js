const ls = window.localStorage;
const ss = window.sessionStorage;
const getStoredValue = require('./storage-value');

export const Cookie = {
    get (key) {
        let arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].trim().split('=');
            if (arr2[0] == key) {
                return arr2[1]
            }
        }
        return ''
    },
    set (key, value, day) {
        let setting = arguments[0]
        let expires = ''
        if (typeof day === 'number') {
            let oDate = new Date()
            oDate.setDate(oDate.getDate() + day)
            expires = ';expires=' + oDate.toUTCString()
        }
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
            for (let i in setting) {
                document.cookie = i + '=' + setting[i] + expires
            }
        } else {
            document.cookie = key + '=' + value + expires
        }
    },
    remove (key) {
        let setting = arguments[0]
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Array') {
            setting.forEach( key => {
                this.set(key, 1, -1)
            })
        }else{
            this.set(key, 1, -1)
        }
        
    }
};


export const Local = {
    get(key) {
        return getStoredValue(ls, key)
    },
    set(key, val) {
        const setting = arguments[0]
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
            for (const i in setting) {
                ls.setItem(i, JSON.stringify(setting[i]))
            }
        } else {
            ls.setItem(key, JSON.stringify(val))
        }
    },
    remove(key) {
        ls.removeItem(key)
    },
    clear() {
        ls.clear()
    }
};


export const Session = {
    get(key) {
        return getStoredValue(ss, key)
    },
    set(key, val) {
        const setting = arguments[0]
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
            for (const i in setting) {
                ss.setItem(i, JSON.stringify(setting[i]))
            }
        } else {
            ss.setItem(key, JSON.stringify(val))
        }
    },
    remove(key) {
        ss.removeItem(key)
    },
    clear() {
        ss.clear()
    }
}
