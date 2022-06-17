const Coin = (props) => {
  let priceChangePercentage = props.eachData.price_change_percentage_24h;
  priceChangePercentage = priceChangePercentage.toFixed(2);

  let symbol = props.eachData.symbol.toUpperCase();

  let price = props.eachData.current_price.toLocaleString();

  let totalVol = props.eachData.total_volume.toLocaleString();

  let marktCap = props.eachData.market_cap.toLocaleString();

  function coinDetailHandler() {
    props.onSetOpenModal(props.eachData.id);
    // console.log(props.eachData.id);
  }
  return (
    <tr
      className={`border-b-[1px] ${
        props.themeStatus === true
          ? "border-grey-200 hover:bg-grey-100"
          : "hover:bg-[#001e3c] border-blue-grey-600"
      }`}
    >
      <td className="pl-2 py-6 font-medium text-sm">{props.num}</td>
      <td>
        <div className="flex items-center">
          <img
            alt="coin_icon"
            className="w-6 h-6 cursor-pointer"
            onClick={coinDetailHandler}
            src={props.eachData.image}
          />
          <span
            className="ml-3 font-medium text-base hover:underline cursor-pointer first-letter:uppercase"
            onClick={coinDetailHandler}
          >
            {props.eachData.id}
          </span>
          <span
            className="ml-4 font-medium text-xs text-grey-500 cursor-pointer"
            onClick={coinDetailHandler}
          >
            {symbol}
          </span>
        </div>
      </td>
      <td className="text-right py-6 font-medium text-sm">${price}</td>
      <td
        className={`text-right py-6 font-medium text-sm ${
          priceChangePercentage > 0 ? "text-green-400" : "text-red-500"
        }`}
      >
        {priceChangePercentage}%
      </td>
      <td className="text-right py-6 font-medium text-sm">${totalVol}</td>
      <td className="pr-2 text-right py-6 font-medium text-sm">${marktCap}</td>
    </tr>
  );
};
export default Coin;
