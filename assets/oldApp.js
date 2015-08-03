var forms    = $(".form form"),
    addForm  = forms[0],
    editForm = forms[1];

var addFormButtoms      = $(addForm).find('a'),
    addFormCancelButtom = addFormButtoms[0],
    addFormSubmitButtom = addFormButtoms[1],
    addFormUtils        = new FormUtils(addForm);

var editFormButtoms      = $(editForm).find('a'),
    editFormCancelButtom = editFormButtoms[0],
    editFormSubmitButtom = editFormButtoms[1],
    editFormUtils        = new FormUtils(editForm);

var table = $("table"), editObj = null;

(function loadTable() {
    for (var key in localStorage) {
        var formData = storageManager.getData(key);
        tableRenderer.insert(formData);
        addListener(formData);
    }
    tableRenderer.reRenderSN();
})();

// Add Form
$(addFormCancelButtom).on("click", function(event) {
    event.preventDefault();
    addFormUtils.clearForm();
    slider.nextSlide();
});

function addListener(formData) {
    var buttons = table.find('a').filter('[data-tel="' + formData.phoneNumber +'"]');
    console.log(buttons.filter('.edit'));

    buttons.filter('.edit').on('click', function(event) {
        event.preventDefault();

        editObj = this;
        editFormUtils.populateForm(storageManager.getData(formData.phoneNumber));
        slider.nextSlide();
      });

    buttons.filter('.delete').on('click', function(event) {
        event.preventDefault();

        storageManager.remove($(this).attr("data-tel"));
        tableRenderer.remove($(this).attr("data-tel"));
        tableRenderer.reRenderSN();
    });    
};

$(addFormSubmitButtom).on("click", function(event) {
    event.preventDefault();

    var formData = addFormUtils.getFormData();
    if (formData) {
      storageManager.insert(formData);
      tableRenderer.insert(formData);
      tableRenderer.reRenderSN();
      addFormUtils.clearForm();
      addListener(formData);

      slider.nextSlide();
    }
});

// Edit Form
$(editFormCancelButtom).on("click", function(event) {
    event.preventDefault();
    editFormUtils.clearForm();
    slider.prevSlide();  
});

$(editFormSubmitButtom).on("click", function(event) {
    event.preventDefault();

    var formData = editFormUtils.getFormData();
    if (formData) {
      storageManager.remove($(editObj).attr("data-tel"));
      tableRenderer.remove($(editObj).attr("data-tel"));

      storageManager.insert(formData);
      tableRenderer.insert(formData);
      tableRenderer.reRenderSN();
      editFormUtils.clearForm();
      addListener(formData);

      slider.prevSlide();
    }
});

// Table
var tableButtons = $(".table .btn"),
    tableButtonFav = $(tableButtons).filter('.fav'),
    tableButtonEdit = $(tableButtons).filter('.edit'),
    tableButtonDelete = $(tableButtons).filter('.delete');

tableButtonFav.on("click", function(event) {
    event.preventDefault();
    slider.prevSlide();
});

tableButtonEdit.on("click", function(event) {
    event.preventDefault();
    slider.nextSlide();
    $(this).attr("data-tel"); // prints index
});