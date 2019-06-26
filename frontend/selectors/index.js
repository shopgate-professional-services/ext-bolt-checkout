import { createSelector } from 'reselect';
import { getUserData } from '@shopgate/pwa-common/selectors/user';
import { REDUX_NAMESPACE_BOLT_CART_TOKEN } from '../constants';

/**
 * @param {Object} state state
 * @return {Object}
 */
export const getBoltCartTokenState = state => state.extensions[REDUX_NAMESPACE_BOLT_CART_TOKEN];

export const getBoltCartToken = createSelector(
  getBoltCartTokenState,
  ({ cartToken }) => cartToken
);

const getUserAddressBook = (state) => {
  const collection = state.extensions['@shopgate/user/UserReducers'];

  return collection.addressBook || null;
};

const getUserDefaultAddress = createSelector(
  getUserAddressBook,
  (addressBook) => {
    if (
      !(
        addressBook
        && addressBook.addresses
        && addressBook.addresses.length
        && addressBook.default
        && addressBook.default.shipping
      )
    ) {
      return null;
    }

    const defaultShipping = addressBook.default.shipping;

    return addressBook.addresses.find(el => el.id === defaultShipping);
  }
);

export const getPrefill = createSelector(
  getUserData,
  getUserDefaultAddress,
  (userData, addr) => {
    if (!(userData && addr)) {
      return null;
    }

    const prefill = {};
    prefill.email = userData.mail;
    prefill.firstName = addr.firstName;
    prefill.lastName = addr.lastName;
    if (addr.customAttributes) {
      // Mage special?
      prefill.phone = addr.customAttributes.telephone;
    }
    prefill.addressLine1 = addr.street1;
    prefill.addressLine2 = addr.street2;
    prefill.city = addr.city;
    prefill.state = addr.province;
    prefill.country = addr.country;
    prefill.zip = addr.zipCode;

    return prefill;
  }
);
