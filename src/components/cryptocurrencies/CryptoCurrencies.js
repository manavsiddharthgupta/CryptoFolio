import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@material-tailwind/react";
import { CoinList } from "../api";
import "react-loading-skeleton/dist/skeleton.css";
import ALlCurrencies from "./AllCurrencies";

const CryptoCurrencies = (props) => {
  const [constantData, setData] = useState([]);
  const [allCryptoCoin, setCryptoCoin] = useState([]);
  const [isLoading, setLoadingState] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchingData = useCallback(async () => {
    setLoadingState(true);
    setError(null);
    try {
      let url = CoinList("usd");
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Some thing Went Wrong");
      }
      let data = await response.json();
      setCryptoCoin(data);
      // console.log(data);
      setData(data);
    } catch (error) {
      setError(error.message);
    }
    setLoadingState(false);
  }, []);

  useEffect(() => {
    fetchingData();
  }, [fetchingData]);

  useEffect(() => {
    let id = setTimeout(() => {
      setCryptoCoin(
        constantData.filter((each) => {
          return each.id.includes(search.toLowerCase().trim());
        })
      );
    }, 600);
    return () => {
      clearTimeout(id);
    };
  }, [search, constantData]);

  const onSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-8 max-w-[1300px] mx-auto">
      <Input
        onChange={onSearchHandler}
        value={search}
        size="lg"
        label="Search Crypto"
      />
      <ALlCurrencies
        theme={props.themeStatus}
        allCoins={allCryptoCoin}
        onCloseModalHandler={props.onsetModal}
        errorCoin={error}
        loadingStatus={isLoading}
      />
    </div>
  );
};
export default CryptoCurrencies;
