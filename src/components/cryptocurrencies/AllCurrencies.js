import React, { Fragment, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Pagination } from "@mui/material";
import Coin from "./Coin";
import CoinsTableHead from "./CoinsTableHead";

const ALlCurrencies = (props) => {
  const [page, setPageNum] = useState(1);

  return (
    <Fragment>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-[700px] mx-auto mt-8">
          <CoinsTableHead />
          {!props.loadingStatus && (
            <tbody>
              {props.allCoins
                .slice((page - 1) * 20, (page - 1) * 20 + 20)
                .map((each, index) => {
                  return (
                    <Coin
                      themeStatus={props.theme}
                      key={each.id}
                      num={index + 1 + (page - 1) * 20}
                      eachData={each}
                      onSetOpenModal={props.onCloseModalHandler}
                    />
                  );
                })}
            </tbody>
          )}
        </table>
        {props.loadingStatus && (
          <div className="z-0">
            <Skeleton className="h-12 my-2" count={20} />
          </div>
        )}
        {!props.loadingStatus && props.errorCoin && (
          <div className="text-center font-medium">
            <p>{props.errorCoin}</p>
          </div>
        )}
      </div>
      <div className="flex z-0 justify-center">
        <Pagination
          className="w-fit"
          count={+(props.allCoins?.length / 20).toFixed(0)}
          variant="outlined"
          color="primary"
          size="small"
          onChange={(e, val) => {
            setPageNum(val);
          }}
        />
      </div>
    </Fragment>
  );
};
export default ALlCurrencies;
