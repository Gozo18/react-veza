function OrderItem({ order }) {
  const {
    no1,
    no1Price,
    no1Text,
    no2,
    no2Price,
    no2Text,
    no3,
    no3Price,
    no3Text,
    no4,
    no4Price,
    no4Text,
    no5,
    no5Price,
    no5Text,
    no6,
    no6Price,
    no6Text,
  } = order;

  const nu1 = Number(no1);
  const nu2 = Number(no2);
  const nu3 = Number(no3);
  const nu4 = Number(no4);
  const nu5 = Number(no5);
  const nu6 = Number(no6);

  const totalNo1Price = nu1 * no1Price;
  const totalNo2Price = nu2 * no2Price;
  const totalNo3Price = nu3 * no3Price;
  const totalNo4Price = nu4 * no4Price;
  const totalNo5Price = nu5 * no5Price;
  const totalNo6Price = nu6 * no6Price;
  const totalDayPrice =
    totalNo1Price +
    totalNo2Price +
    totalNo3Price +
    totalNo4Price +
    totalNo5Price +
    totalNo6Price;
  const totalNumber = nu1 + nu2 + nu3 + nu4 + nu5 + nu6;

  return (
    <div className='orderItems'>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{no1Text}</div>
        <div className='orderItemInfo alignRight'>{no1}</div>
        <div className='orderItemInfo alignRight'>{totalNo1Price}</div>
      </div>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{no2Text}</div>
        <div className='orderItemInfo alignRight'>{no2}</div>
        <div className='orderItemInfo alignRight'>{totalNo2Price}</div>
      </div>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{no3Text}</div>
        <div className='orderItemInfo alignRight'>{no3}</div>
        <div className='orderItemInfo alignRight'>{totalNo3Price}</div>
      </div>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{no4Text}</div>
        <div className='orderItemInfo alignRight'>{no4}</div>
        <div className='orderItemInfo alignRight'>{totalNo4Price}</div>
      </div>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{no5Text}</div>
        <div className='orderItemInfo alignRight'>{no5}</div>
        <div className='orderItemInfo alignRight'>{totalNo5Price}</div>
      </div>
      <div className='orderItemBox'>
        <div className='orderItemInfo'>{no6Text}</div>
        <div className='orderItemInfo alignRight'>{no6}</div>
        <div className='orderItemInfo alignRight'>{totalNo6Price}</div>
      </div>
      <hr />
      <div className='orderItemBox'>
        <div className='orderItemInfo'>
          <b>Total</b>
        </div>
        <div className='orderItemInfo alignRight'>
          <b>{totalNumber}</b>
        </div>
        <div className='orderItemInfo alignRight'>
          <b>{totalDayPrice}</b>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
