import Tags from "./Tags";
import Skeleton from "react-loading-skeleton";
import parse from "html-react-parser";
import CoinLinks from "./CoinLinks";

const CurrDesc = (props) => {
  return (
    <div className="h-full md:w-[35%] p-5 md:overflow-y-auto">
      {props.loadedStatus && (
        <div className="w-full flex flex-col items-center">
          <img
            src={props.coinDeatiledData.image}
            alt="coin_img"
            className="w-12 h-12"
          />
          <h1 className="text-3xl font-semibold text-center mt-2">
            {props.coinDeatiledData.name}
          </h1>
        </div>
      )}
      {!props.loadedStatus && <Skeleton className="h-[5.25rem]" />}
      {props.loadedStatus && (
        <div className="w-full gap-2 flex mt-2 items-center justify-center">
          <Tags className="text-white bg-blue-grey-500 font-medium">
            Rank #{props.coinDeatiledData.rank}
          </Tags>
          <Tags>Coins</Tags>
        </div>
      )}
      {!props.loadedStatus && <Skeleton className="h-8 mt-2" />}
      {props.loadedStatus && <CoinLinks coinData={props.coinDeatiledData} />}
      {!props.loadedStatus && <Skeleton className="h-16 mt-4" />}
      <div className="p-2 w-full mt-4">
        {props.loadedStatus && (
          <p className="text-justify font-light text-sm ">
            {parse(props.coinDeatiledData.desc)}
          </p>
        )}
        {!props.loadedStatus && <Skeleton className="h-36 mt-4" />}
      </div>
    </div>
  );
};
export default CurrDesc;
