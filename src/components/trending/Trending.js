import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import Skeleton from "react-loading-skeleton";
import { TrendingCoins } from "../api";

const responsiveSettings = {
  0: {
    items: 2,
  },
  580: {
    items: 3,
  },
};

const Trending = (props) => {
  const [trendingCoins, setTrendingCoins] = useState("");
  const [isLoaded, setTrendingStatus] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrendingCoins = useCallback(async () => {
    try {
      setTrendingStatus(false);
      setError(null);
      let url = TrendingCoins("usd");
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      let data = await response.json();
      setTrendingCoins(data);
      console.log(data);
      setTrendingStatus(true);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchTrendingCoins();
  }, [fetchTrendingCoins]);
  //
  return (
    <div className="mt-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-[95% max-w-[1200px] mx-auto rounded-md p-6">
      <div className="flex items-center mb-4">
        <FontAwesomeIcon className="text-green-700" icon={faArrowTrendUp} />
        <p className="ml-4 font-bold">Trending</p>
        <FontAwesomeIcon className="ml-12 text-blue-500" icon={faAngleRight} />
      </div>
      {!isLoaded && <Skeleton className="h-32 w-full" />}
      {isLoaded && !error && (
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsiveSettings}
          autoPlay
        >
          {trendingCoins.map((eachCoin) => {
            return (
              <div
                key={eachCoin.id}
                onClick={() => {
                  props.onsetModal(eachCoin.id);
                }}
                className={`h-fit p-8 rounded-lg cursor-pointer ${
                  props.themeStatus === true
                    ? "hover:bg-blue-grey-50"
                    : "hover:bg-[#001e3c]"
                }`}
              >
                <img
                  className="w-16 h-16 mx-auto"
                  src={eachCoin.image}
                  alt="img_trend"
                />
                <p className="text-xs text-blue-grey-700 tracking-wide text-center mt-2">
                  {eachCoin.name}
                </p>
              </div>
            );
          })}
        </AliceCarousel>
      )}
    </div>
  );
};
export default Trending;
