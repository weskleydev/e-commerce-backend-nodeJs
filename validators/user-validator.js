'use strict';

let errors = [];
function UserValidator() {
  errors = [];
}

UserValidator.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0)
    errors.push({ message: message });
}

UserValidator.prototype.hasMinLen = (value, min, message) => {
  if (!value || value.length < min)
    errors.push({ message: message });
}

UserValidator.prototype.hasMaxLen = (value, max, message) => {
  if (!value || value.length > max)
    errors.push({ message: message });
}

UserValidator.prototype.isFixedLen = (value, len, message) => {
  if (value.length != len)
    errors.push({ message: message });
}

UserValidator.prototype.isEmail = (value, message) => {
  var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(value))
    errors.push({ message: message });
}

UserValidator.prototype.errors = () => {
  return errors;
}

UserValidator.prototype.clear = () => {
  errors = [];
}

UserValidator.prototype.isValid = () => {
  return errors.length == 0;
}

module.exports = UserValidator;