function DayItem({ orders }) {
  const no1Array = [];
  const no2Array = [];
  const no3Array = [];
  const no4Array = [];
  const no5Array = [];
  const no6Array = [];

  orders.map((order) => {
    no1Array.push(Number(order.no1));
    no2Array.push(Number(order.no2));
    no3Array.push(Number(order.no3));
    no4Array.push(Number(order.no4));
    no5Array.push(Number(order.no5));
    no6Array.push(Number(order.no6));
  });

  const sum1 = no1Array.reduce((partialSum, a) => partialSum + a, 0);
  const sum2 = no2Array.reduce((partialSum, a) => partialSum + a, 0);
  const sum3 = no3Array.reduce((partialSum, a) => partialSum + a, 0);
  const sum4 = no4Array.reduce((partialSum, a) => partialSum + a, 0);
  const sum5 = no5Array.reduce((partialSum, a) => partialSum + a, 0);
  const sum6 = no6Array.reduce((partialSum, a) => partialSum + a, 0);
  const totalSum = sum1 + sum2 + sum3 + sum4 + sum5 + sum6;
  const totalPrice =
    sum1 * orders[0].no1Price +
    sum2 * orders[0].no2Price +
    sum3 * orders[0].no3Price +
    sum4 * orders[0].no4Price +
    sum5 * orders[0].no5Price +
    sum6 * orders[0].no6Price;

  return (
    <div className='orderItems'>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{orders[0].no1Text}</div>
        <div className='orderItemInfo alignRight'>{sum1}</div>
        <div className='orderItemInfo alignRight'>{orders[0].no1Price},-</div>
      </div>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{orders[0].no2Text}</div>
        <div className='orderItemInfo alignRight'>{sum2}</div>
        <div className='orderItemInfo alignRight'>{orders[0].no2Price},-</div>
      </div>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{orders[0].no3Text}</div>
        <div className='orderItemInfo alignRight'>{sum3}</div>
        <div className='orderItemInfo alignRight'>{orders[0].no3Price},-</div>
      </div>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{orders[0].no4Text}</div>
        <div className='orderItemInfo alignRight'>{sum4}</div>
        <div className='orderItemInfo alignRight'>{orders[0].no4Price},-</div>
      </div>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{orders[0].no5Text}</div>
        <div className='orderItemInfo alignRight'>{sum5}</div>
        <div className='orderItemInfo alignRight'>{orders[0].no5Price},-</div>
      </div>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{orders[0].no6Text}</div>
        <div className='orderItemInfo alignRight'>{sum6}</div>
        <div className='orderItemInfo alignRight'>{orders[0].no6Price},-</div>
      </div>
      <hr />
      <div className='orderItemBox'>
        <div className='orderItemInfo'>
          <b>Total</b>
        </div>
        <div className='orderItemInfo alignRight'>
          <b>{totalSum}</b>
        </div>
        <div className='orderItemInfo alignRight'>
          <b>{totalPrice}</b>
        </div>
      </div>
    </div>
  );
}

export default DayItem;
