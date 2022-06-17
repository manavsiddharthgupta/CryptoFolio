import React, { useCallback, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import Skeleton from "react-loading-skeleton";
import TrendCoin from "./TrendCoin";
import { TrendingCoins } from "../api";
import TrendingHead from "./TrendingHead";

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
      <TrendingHead />
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
              <TrendCoin
                key={eachCoin.id}
                theme={props.themeStatus}
                onClick={() => {
                  props.onsetModal(eachCoin.id);
                }}
                trendingImg={eachCoin.image}
                trendingName={eachCoin.name}
              />
            );
          })}
        </AliceCarousel>
      )}
    </div>
  );
};
export default Trending;
