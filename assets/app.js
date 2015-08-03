var app = new function() {
    var forms    = $(".form form"),
        addForm  = forms[0],
        editForm = forms[1],

        addFormButtons      = $(addForm).find('a'),
        addFormCancelButton = addFormButtons[0],
        addFormSubmitButton = addFormButtons[1],
        addFormUtils        = new FormUtils(addForm),

        editFormButtons       = $(editForm).find('a'),
        editFormCancelButton  = editFormButtons[0],
        editFormSubmitButton  = editFormButtons[1],
        editFormUtils         = new FormUtils(editForm),
        currentEditingDataKey = null,
        editObj = null,

        table          = $("table"),
        tableFavButton = $(".table .btn");

    (function constructor() {
        addAddFormCancelButtonListener();
        addAddFormSubmitButtonListener();

        addEditFormCancelButtonListener();
        addEditFormSubmitButtonListener();

        addTableFavButtonListener();
        loadTable();

        addSearchBarListener();
    })();

    function loadTable() {
        var formDatas = storageManager.getAllData();
        for (var i = formDatas.length - 1; i >= 0; i--) {
            var formData = formDatas[i];
            currentEditingDataKey = formData.phoneNumber;
            addNewDataInTable(formData);
        }

        tableRenderer.reRenderSN();
    }

    function addNewDataInTable(formData) {
        tableRenderer.insert(formData);

        var rowButtons = table.find('a').filter('[data-tel="' + currentEditingDataKey +'"]');
        addTableEditButtonListener(rowButtons.filter('.edit'));
        addTableDeleteButtonListener(rowButtons.filter('.delete'));
    }

    function removeDataFromTable() {
        storageManager.remove(currentEditingDataKey);
        tableRenderer.remove(currentEditingDataKey);
    }

    function addAddFormCancelButtonListener() {
        $(addFormCancelButton).on("click", function(event) {
            event.preventDefault();

            addFormUtils.clearForm();
            slider.nextSlide();
        });
    }

    function addAddFormSubmitButtonListener() {
        $(addFormSubmitButton).on("click", function(event) {
            event.preventDefault();

            var formData = addFormUtils.getFormData();
            if (formData) {
                addFormUtils.clearForm();

                storageManager.insert(formData);

                currentEditingDataKey = formData.phoneNumber;
                addNewDataInTable(formData);
                tableRenderer.reRenderSN();

                slider.nextSlide();
            }
        });  
    }

    function addTableFavButtonListener() {
        tableFavButton.on("click", function(event) {
            event.preventDefault();

            slider.prevSlide();
        });
    }

    function addTableEditButtonListener(editButton) {
        editButton.on('click', function(event) {
            event.preventDefault();

            currentEditingDataKey = $(this).attr("data-tel");
            editFormUtils.populateForm(storageManager.getData(currentEditingDataKey));
            slider.nextSlide();
        });
    }

    function addTableDeleteButtonListener(deleteButton) {
        deleteButton;
        deleteButton.on('click', function(event) {
            event.preventDefault();

            storageManager.remove($(this).attr("data-tel"));
            tableRenderer.remove($(this).attr("data-tel"));
            tableRenderer.reRenderSN();
        });      
    }

    function addEditFormCancelButtonListener() {
        $(editFormCancelButton).on("click", function(event) {
            event.preventDefault();

            editFormUtils.clearForm();
            slider.prevSlide();
        });
    }

    function addEditFormSubmitButtonListener() {
        $(editFormSubmitButton).on("click", function(event) {
            event.preventDefault();

            var formData = editFormUtils.getFormData();
            if (formData) {
                addFormUtils.clearForm();

                removeDataFromTable();
                storageManager.insert(formData);

                currentEditingDataKey = formData.phoneNumber;
                addNewDataInTable(formData);
                tableRenderer.reRenderSN();

                slider.prevSlide();
            }
        });
    }

    function addSearchBarListener() {
        $('.search-bar input[type="text"]').keyup(function(event) {
            if (event.keyCode == 27) $(this).val("");
            var inputText = $(this).val(),
                inputTextLength = inputText.length;

            $("table .tel").each(function() {
                var phoneNumber = $(this).text(),
                    j = 0;

                for (var i in phoneNumber) {
                    if (inputTextLength == j) break;
                    if (phoneNumber[i].toLowerCase() == inputText[j] ||
                        phoneNumber[i] == inputText[j])
                        ++j;
                }
                $(this).parent("tr").toggle(inputTextLength == j);
            });
        });  
    }
}();