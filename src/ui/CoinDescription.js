import React, { useCallback, useEffect, useState } from "react";
import { SingleCoin } from "../components/api";
import CoinChart from "./CoinChart";
import CurrDesc from "./CurrDesc";

const CoinDescription = (props) => {
  const [coinData, setCoinData] = useState("");
  const [isLoaded, setLoadingStatus] = useState(false);
  const [error, setError] = useState(null);

  const fetchingEachCoin = useCallback(async () => {
    setLoadingStatus(false);
    setError(null);
    try {
      let url = SingleCoin(props.coinName);
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Some thing Went Wrong");
      }
      let data = await response.json();
      let mainData = {
        image: data.image.large,
        name: data?.name,
        rank: data?.market_cap_rank,
        desc: data.description.en.split(". ")[0] + ".",
        sourceCode: data.links.repos_url.github[0],
        chat: data.links.chat_url[0],
        site: data.links.homepage[0],
        twitter: data.links.twitter_screen_name,
        announcement: data.links.announcement_url[0],
        lowtfprc: data.market_data.low_24h.usd?.toLocaleString(),
        hightfprc: data.market_data.high_24h.usd?.toLocaleString(),
        price: data.market_data.current_price.usd?.toLocaleString(),
        prcpertf: data.market_data.price_change_percentage_24h?.toFixed(2),
        market_cap: data.market_data.market_cap.usd?.toLocaleString(),
        total_vol: data.market_data.total_volume.usd?.toLocaleString(),
        circulating_supply:
          data.market_data.circulating_supply?.toLocaleString(),
      };
      setCoinData(mainData);
    } catch (error) {
      setError(error.message);
    }
    setLoadingStatus(true);
  }, [props.coinName]);

  useEffect(() => {
    fetchingEachCoin();
  }, [fetchingEachCoin]);

  return (
    <div
      className={`w-[95%] max-w-[900px] rounded-2xl fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-1/2 h-[88%] max-h-[700px] z-10 flex flex-col md:flex-row overflow-auto ${
        props.theme === true ? "bg-white" : "bg-[#0a1929] text-white"
      }`}
    >
      {!error && (
        <CurrDesc coinDeatiledData={coinData} loadedStatus={isLoaded} />
      )}
      <div className="md:overflow-y-auto md:w-[65%] md:border-l border-grey-600 p-4">
        <CoinChart
          themeStatus={props.theme}
          coinId={props.coinName}
          loadedStatus={isLoaded}
          coinDeatiledData={coinData}
        />
      </div>
    </div>
  );
};
export default CoinDescription;
