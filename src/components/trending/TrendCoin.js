const TrendCoin = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`h-fit p-8 rounded-lg cursor-pointer ${
        props.theme === true
          ? "hover:bg-blue-grey-50"
          : "hover:bg-[#001e3c]"
      }`}
    >
      <img
        className="w-16 h-16 mx-auto"
        src={props.trendingImg}
        alt="img_trend"
      />
      <p className="text-xs text-blue-grey-700 tracking-wide text-center mt-2">
        {props.trendingName}
      </p>
    </div>
  );
};
export default TrendCoin;
