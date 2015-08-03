var storageManager = new function() {
    function insert(obj) {
        var key = obj.phoneNumber,
            val = JSON.stringify(obj);

        localStorage.setItem(key, val);
    }

    function remove(key) {
        localStorage.removeItem(key);
    }

    function getData(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    function getAllData() {
        var formDatas = [];
        for (var key in localStorage)
            formDatas.push(getData(key));

        return formDatas;
    }

    function update(obj) {
        insert(obj);
    }

    return {
        insert: insert,
        remove: remove,
        getData: getData,
        getAllData: getAllData,
        update: update
    };
}();