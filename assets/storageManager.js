var storageManager = new function() {
    function insert(obj) {
        var key = obj.phoneNumber,
            val = JSON.stringify(obj);

        localStorage.setItem(key, val);
    }

    function erase(key) {
        localStorage.removeItem(key);
    }

    function get(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    function getAll() {
        var formData = [];
        for (var key in localStorage)
            formData.push(get(key));

        return formData;
    }

    return {
        insert: insert,
        erase: erase,
        get: get,
        getAll: getAll,
    };
};
