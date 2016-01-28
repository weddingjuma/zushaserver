var orders = [];

/**
 *
 * @param order
 */
exports.saveOrder = function (order) {
    orders[order.reference] = order;
};

/**
 *
 * @param reference
 * @returns {*}
 */
exports.getOrder = function (reference) {
    if(orders.hasOwnProperty(reference)){
        return orders[reference];
    }
    return null;
};
