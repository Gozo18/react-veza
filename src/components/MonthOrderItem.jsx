function MonthOrderItem({ orders, value }) {
  const orderedMonth = [];
  const monthAmount = [];
  const monthTotal = [];

  orders.map((order) => {
    if (order.data.date.toDate().getMonth() + 1 === value.getMonth() + 1) {
      orderedMonth.push(order);
    }

    return orderedMonth;
  });

  /* console.log(orderedMonth); */

  orderedMonth.map((order) => {
    const amount =
      Number(order.data.no1) +
      Number(order.data.no2) +
      Number(order.data.no3) +
      Number(order.data.no4) +
      Number(order.data.no5) +
      Number(order.data.no6);
    monthAmount.push(amount);

    return monthAmount;
  });

  orderedMonth.map((order) => {
    const amount =
      Number(order.data.no1) * order.data.no1Price +
      Number(order.data.no2) * order.data.no2Price +
      Number(order.data.no3) * order.data.no3Price +
      Number(order.data.no4) * order.data.no4Price +
      Number(order.data.no5) * order.data.no5Price +
      Number(order.data.no6) * order.data.no6Price;
    monthTotal.push(amount);

    return monthTotal;
  });

  return (
    <div className='orderItems'>
      <div className='orderItemBox'>
        <div className='orderItemInfoText'>
          <b>Celkem za {value.getMonth() + 1}. měsíc</b>
        </div>
        <div className='orderItemInfo alignRight'>
          <b>{monthAmount.reduce((partialSum, a) => partialSum + a, 0)}</b>
        </div>
        <div className='orderItemInfo alignRight'>
          <b>{monthTotal.reduce((partialSum, a) => partialSum + a, 0)},-</b>
        </div>
      </div>
    </div>
  );
}

export default MonthOrderItem;
