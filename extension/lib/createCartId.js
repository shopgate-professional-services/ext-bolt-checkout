const createCartId = async (context, { magentoCartId }) => {
  /*
  The method that creates the order in Magento Bolt API endpoint uses:
  return explode("|", $transaction->order->cart->display_id)[1];

  And the method that builds that display_id when order is created at Bold looks like:
  'display_id'      => $quote->getReservedOrderId().'|'.$quote->getId(),

   We should not care of the first part, as we do not have $quote->getReservedOrderId() in the App, but we do have $quote->getId() available.
   */
  return {
    cartId: `shopgate|${magentoCartId}`
  }
}

module.exports = createCartId
