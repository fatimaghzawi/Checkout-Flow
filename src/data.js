export const orderItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89,
      qty: 1,
    },
    {
      id: 2,
      name: "USB-C Charger",
      price: 29,
      qty: 1,
    },
  ];
  
  export const calculateTotal = () => {
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  
    const tax = subtotal * 0.1;
  
    return {
      subtotal,
      tax,
      total: subtotal + tax,
    };
  };