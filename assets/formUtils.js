var FormUtils = function(form) {
    var firstName      = "",
        lastName       = "",
        email          = "",
        phoneNumber    = "",
        address        = "",
        isValid        = true,

        firstNameObj   = $(form).find('input[name="first-name"]')[0],
        lastNameObj    = $(form).find('input[name="last-name"]')[0],
        emailObj       = $(form).find('input[name="email"]')[0],
        phoneNumberObj = $(form).find('input[name="phone"]')[0],
        addressObj     = $(form).find('textarea')[0];

    function validateText(textObj) {
        var text = textObj.value;
        if (!text) isValid = false;
        return text;
    }

    function setValue(obj, val) {
        obj.value = val;
    }

    function clearField(textObj) {
        textObj.value = "";
    }

    function validateFirstName() {
        firstName = validateText(firstNameObj);
    }

    function validateLastName() {
        lastName = validateText(lastNameObj);
    }

    function validateEmail() {
        email = validateText(emailObj);
        if (/\S+@\S+\.\S+/.test(email) == false) {
          clearField(emailObj);
          isValid = false;
        }
    }

    function validatePhoneNumber() {
        phoneNumber = validateText(phoneNumberObj);
        if (/^[0-9()-]+$/.test(phoneNumber) == false) {
          clearField(phoneNumberObj);
          isValid = false;
        }
    }

    function validateAddress() {
        address = validateText(addressObj);
    }

    function validateForm() {
        validateFirstName();
        validateLastName();
        validateEmail();
        validatePhoneNumber();
        validateAddress();
    }

    function clearForm() {
        clearField(firstNameObj);
        clearField(lastNameObj);
        clearField(emailObj);
        clearField(phoneNumberObj);
        clearField(addressObj);
    }

    function getFormData() {
        isValid = true;

        validateForm();

        if (!isValid) return null;
        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            address: address
        };
    }

    function populateForm(formData) {
        setValue(firstNameObj, formData.firstName);
        setValue(lastNameObj, formData.lastName);
        setValue(emailObj, formData.email);
        setValue(phoneNumberObj, formData.phoneNumber);
        setValue(addressObj, formData.address);
    }

    return {
        getFormData: getFormData,
        populateForm: populateForm,
        clearForm: clearForm
    };
};
