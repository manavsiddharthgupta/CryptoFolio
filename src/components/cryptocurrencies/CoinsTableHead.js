const CoinsTableHead = () => {
  return (
    <thead className="border-solid border-b-[1px] border-grey-400">
      <tr>
        <th className="pl-2 py-4 w-16 text-left">#</th>
        <th className="py-4 w-[19em] text-left">Coins</th>
        <th className="py-4 w-52 text-right">Price</th>
        <th className="py-4 w-24 text-right">24h</th>
        <th className="py-4 w-[16rem] text-right">Volume(24h)</th>
        <th className="pr-2 py-4 w-[17rem] text-right">Market Cap</th>
      </tr>
    </thead>
  );
};
export default CoinsTableHead;
