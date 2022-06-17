import React, { useState } from "react";
import CryptoCurrencies from "./components/cryptocurrencies/CryptoCurrencies";
import NavBar from "./components/navbar/NavBar";
import Trending from "./components/trending/Trending";
import Modal from "./ui/Modal";

function App() {
  const [modalStatus, setModalStatus] = useState(false);
  const [coinId, setCurrenCoinid] = useState("");
  const [themeLight, setTheme] = useState(true);

  const onsetThemeHandler = () => {
    setTheme((status) => !status);
  };

  const onCloseModalHandler = (id) => {
    setModalStatus((status) => !status);
    if (!id) {
      setCurrenCoinid("");
    } else {
      setCurrenCoinid(id);
    }
  };
  return (
    <div className={`${themeLight === true ? "" : "bg-[#0a1929] text-white"}`}>
      <NavBar themeStatus={themeLight} onSetTheme={onsetThemeHandler} />
      <Trending themeStatus={themeLight} onsetModal={onCloseModalHandler} />
      <CryptoCurrencies
        themeStatus={themeLight}
        onsetModal={onCloseModalHandler}
      />
      {modalStatus && (
        <Modal
          themeStatus={themeLight}
          onCoinId={coinId}
          onsetModal={onCloseModalHandler}
        />
      )}
    </div>
  );
}

export default App;
