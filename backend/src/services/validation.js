const isUUIDV4 = (uuid) => {
  var pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!pattern.test(uuid)) {
    throw { code: 422, message: `parameter ${uuid} is Not a UUID` };
  }

  return true;
};

const isValidName = (name) => {
  if (name === undefined || name == null) {
    throw { code: 422, message: "name cannot be left empty" };
  } else if (!isNaN(name[0])) {
    throw { code: 422, message: "name cannot start with a number" };
  }

  return true;
};

const isValidContact = (contact) => {
  if (contact === undefined || contact == "") {
    throw { code: 422, message: "contact cannot be left empty" };
  } else if (isNaN(contact)) {
    throw { code: 422, message: "contact is not valid" };
  }

  return true;
};

const isValidAddress = (address) => {
  if (address === undefined || address == null) {
    throw { code: 422, message: "address cannot be left empty" };
  }
  return true;
}

const isValidEntity = (entity) => {
  const { id, userId, name, address, contact } = entity;

  if (id && !isUUIDV4(id)) {
    return false;
  } else if (isUUIDV4(userId) && isValidName(name) && isValidContact(contact) && isValidAddress(address)) {
    return true;
  }

  return false;
};

const validation = {
  isUUIDV4,
  isValidEntity,
  isValidContact,
  isValidAddress
};

module.exports = validation;
