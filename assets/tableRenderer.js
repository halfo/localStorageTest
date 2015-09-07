var tableRenderer = new function() {
    var parent = $("tbody"),
        table  = $("table");

    function makeRow(obj) {
        return '<tr class="' + obj.phoneNumber + '">' + '\n' +
               '<td class="serial-no">1</td>' + '\n' +
               '<td>' +  obj.firstName + '</td>' + '\n' +
               '<td>' +  obj.lastName + '</td>' + '\n' +
               '<td>' +  obj.email + '</td>' + '\n' +
               '<td class="tel">' +  obj.phoneNumber + '</td>' + '\n' +
               '<td>' +  obj.address + '</td>' + '\n' +
               '<td>' +  '\n' +
               '<a class="btn edit submit" data-tel=' + obj.phoneNumber + ' href="">Edit</a>' +  '\n' +
               '<a class="btn delete submit" data-tel=' + obj.phoneNumber + ' href="">Delete</a>' +  '\n'
               '</tr>' + '\n';
    }

    function insert(obj) {
        parent.prepend(makeRow(obj));
    }

    function remove(key) {
        parent.find("." + key).remove();
    }

    function update(obj) {
        remove(obj.phoneNumber);
        insert(obj);
    }

    function reRenderSN() {
        var serialNo = 1;
        table.find('td.serial-no').each(function() {
          $(this).html(serialNo++);
        });
    }

    return {
        insert: insert,
        remove: remove,        
        update: update,
        reRenderSN: reRenderSN
    };
};
