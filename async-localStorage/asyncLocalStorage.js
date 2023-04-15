// pseudo code
// By storing the transaction object in AsyncLocalStorage,
// you can ensure that it is only accessible within the context of the current request or operation,
//and that it will not interfere with other requests or operations that may be running in parallel.
// Additionally, using AsyncLocalStorage provides a more clear and explicit way of managing your transactions,
//making your code easier to read, debug, and maintain.

const { AsyncLocalStorage } = require("async_hooks");
const asyncLocalStorage = new AsyncLocalStorage();

async function executeInTransaction(callback) {
  const transaction = new Transaction();
  asyncLocalStorage.run(transaction, async () => {
    try {
      await transaction.begin();
      const result = await callback();
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  });
}

async function createOrderWithItems(orderData, itemsData) {
  return executeInTransaction(async () => {
    const order = new Order(orderData);
    await order.save();

    const orderItems = await Promise.all(
      itemsData.map(async (itemData) => {
        const item = new OrderItem(itemData);
        item.order = order._id;
        await item.save();
        return item;
      })
    );

    return { order, orderItems };
  });
}
