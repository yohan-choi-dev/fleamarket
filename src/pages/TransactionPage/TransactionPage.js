import React, { useContext, useEffect, useState } from 'react';
import './TransactionPage.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import TransactionHistory from '../../components/TransactionHistory/TransactionHistory';

// Utilities
import APIRoute from '../../vars/api-routes';
import { getData } from '../../utils/fetch-data';
import asyncForEach from '../../utils/async-for-each';

function TransactionPage(props) {
  const { appState } = useContext(AppContext);

  const [tradeList, setTradeList] = useState([]);

  const fetchTradesByUser = async (userId) => {
    const trades = await getData(`${APIRoute}/api/trades/${userId}`);
    let results = [];
    await asyncForEach(trades, async (trade) => {
      const userInfo = await getData(`${APIRoute}/api/users/${trade.userId}`);
      const itemInfo = await getData(`${APIRoute}/api/items/traded/${trade.itemId}`);
      const otherUserInfo = await getData(`${APIRoute}/api/users/${trade.otherUserId}`);
      const otherItemInfo = await getData(`${APIRoute}/api/items/traded/${trade.otherItemId}`);

      const result = {
        tradeId: trade.id,
        date: trade.createdAt,
        item: otherItemInfo.name,
        otherUserName: otherUserInfo.name,
        otherUserId: otherUserInfo.id
      }
      results.push(result);
    });
    console.log(results);
    setTradeList(results);
  }

  useEffect(() => {
    fetchTradesByUser(appState.user.id);
  }, []);

  return (
    <div className="TransactionPage">
      <Navigation />
      <ProfileCard profile={appState.user} />
      <TransactionHistory items={tradeList} otherClassNames="container" />
      <Footer />
    </div>
  );
}

export default TransactionPage;