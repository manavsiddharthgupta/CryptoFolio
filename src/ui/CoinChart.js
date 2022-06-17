import React, { Fragment, useCallback, useEffect, useState } from "react";
import { HistoricalChart } from "../components/api";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Skeleton from "react-loading-skeleton";
import Tags from "./Tags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
let chooseDays = [
  { label: "1D", value: 1 },
  { label: "1M", value: 30 },
  { label: "6M", value: 180 },
  { label: "1Y", value: 365 },
];
let priceandmktCap = [
  { label: "Prices", value: "prices" },
  { label: "MarketCap", value: "market_caps" },
];
const CoinChart = (props) => {
  const [historicalData, setHistoricalData] = useState("");
  const [isLoaded, setloadStatus] = useState(false);
  const [days, setDays] = useState(1);
  const [dataName, setData] = useState("Prices");

  const fetchingHistoricalData = useCallback(async () => {
    setloadStatus(false);
    let url = HistoricalChart(props.coinId, days, "usd");
    let response = await fetch(url);
    let data = await response.json();
    if (dataName === "Prices") {
      setHistoricalData(data.prices);
    } else {
      setHistoricalData(data.market_caps);
    }
    setloadStatus(true);
  }, [props.coinId, days, dataName]);

  useEffect(() => {
    fetchingHistoricalData();
  }, [fetchingHistoricalData]);

  const onSetdataHandler = (e) => {
    let day = +e.target.value;
    setDays(day);
  };

  const onSetDataNameHandler = (e) => {
    setData(e.target.value);
  };
  return (
    <Fragment>
      <div>
        {props.loadedStatus && (
          <p className="w-full text-xs text-grey-600 text-left">
            {props.coinDeatiledData.name} Price
          </p>
        )}
        {!props.loadedStatus && <Skeleton className="w-full h-16 mb-2" />}
        {props.loadedStatus && (
          <div className="py-2 flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              ${props.coinDeatiledData.price}
            </h1>
            <span
              className={`text-sm py-1 px-2 h-fit text-white rounded-md ${
                props.coinDeatiledData.prcpertf > 0
                  ? "bg-light-green-500"
                  : "bg-red-500"
              }`}
            >
              {props.coinDeatiledData.prcpertf < 0 && (
                <FontAwesomeIcon className="mr-1" icon={faAngleDown} />
              )}
              {props.coinDeatiledData.prcpertf > 0 && (
                <FontAwesomeIcon className="mr-1" icon={faAngleUp} />
              )}
              {props.coinDeatiledData.prcpertf}%
            </span>
          </div>
        )}
        {!props.loadedStatus && <Skeleton className="w-full h-6 mb-2" />}
        {props.loadedStatus && (
          <div className="py-2 flex justify-between items-center">
            <p className="text-xs text-grey-500">
              Low:
              <span
                className={`font-bold ${
                  props.themeStatus === true ? "text-black" : "text-white"
                }`}
              >
                ${props.coinDeatiledData.lowtfprc}
              </span>
            </p>
            <Tags>24h</Tags>
            <p className="text-xs text-grey-500">
              High:
              <span
                className={`font-bold ${
                  props.themeStatus === true ? "text-black" : "text-white"
                }`}
              >
                ${props.coinDeatiledData.hightfprc}
              </span>
            </p>
          </div>
        )}
        {!props.loadedStatus && <Skeleton className="w-full h-28 mb-2" />}
        {props.loadedStatus && (
          <div className="mb-6">
            <div className="py-1 flex justify-between items-center">
              <span className="text-xs tracking-wide text-grey-700">
                Market Cap
              </span>
              <span className="font-medium">
                ${props.coinDeatiledData.market_cap}
              </span>
            </div>
            <div className="py-1 flex justify-between items-center">
              <span className="text-xs tracking-wide text-grey-700">
                Volume
              </span>
              <span className="font-medium">
                ${props.coinDeatiledData.total_vol}
              </span>
            </div>
            <div className="py-1 flex justify-between items-center">
              <span className="text-xs tracking-wide text-grey-700">
                Circulating Supply
              </span>
              <span className="font-medium">
                ${props.coinDeatiledData.circulating_supply}
              </span>
            </div>
          </div>
        )}
      </div>

      {!isLoaded && <Skeleton className="w-full h-10 mb-6" />}
      {isLoaded && (
        <div
          className={`rounded-md mb-1 flex justify-between items-center font-bold text-xs p-2 ${
            props.themeStatus === true
              ? "bg-blue-grey-100"
              : "bg-[#001e3c] text-blue-grey-700"
          }`}
        >
          <div className="flex gap-1">
            {priceandmktCap.map((option) => {
              return (
                <button
                  onClick={onSetDataNameHandler}
                  value={option.label}
                  key={option.value}
                  className={`p-1 rounded-sm cursor-pointer hover:bg-white ${
                    dataName === option.label ? "bg-white" : ""
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-1">
            {chooseDays.map((option) => {
              return (
                <button
                  onClick={onSetdataHandler}
                  value={option.value}
                  key={option.value}
                  className={`p-1 rounded-sm cursor-pointer hover:bg-white ${
                    days === option.value ? "bg-white" : ""
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {!isLoaded && <Skeleton className="w-full h-[400px] p-2" />}
      {isLoaded && (
        <div className="rounded-xl">
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.map((coin) => {
                    return coin[1];
                  }),
                  label: `${dataName} from Past ${days} days in usd`,
                  borderColor: "#1E90FF",
                  borderWidth: 1,
                  hoverBorderColor: "#002244",
                  hoverBorderJoinStyle: "round",
                  fill: true,
                  backgroundColor: "rgba(210, 228, 241, 0.8)",
                  borderJoinStyle: "round",
                },
              ],
            }}
            height={240}
            options={{
              elements: {
                point: {
                  radius: 2,
                  backgroundColor: "#002244",
                },
              },
            }}
          />
        </div>
      )}
    </Fragment>
  );
};
export default React.memo(CoinChart);
