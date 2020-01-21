import React from 'react';
import { FlatList } from 'react-native';

import { Coin } from '../models/coin.model';
import CoinCard from './coin-card.component';
import Loader from './loader.component';

interface IProps {
  coins: Coin[];
  fromHome: boolean;
  header: () => JSX.Element;
}

const CoinList: React.FC<IProps> = ({ coins, fromHome, header }) => {
  return coins.length > 0 ? (
    <FlatList
      style={{ paddingRight: 20 }}
      ListHeaderComponent={header}
      data={coins}
      renderItem={({ item }) => {
        const coin = new Coin(item);
        return <CoinCard coin={coin} isPreview fromHome={fromHome} />;
      }}
      keyExtractor={(item: any) => item.symbol}
    />
  ) : (
    <>{fromHome ? <Loader /> : header()}</>
  );
};

export default CoinList;
