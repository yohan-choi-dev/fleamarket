import React from 'react';
import './TranscationHistory.css';
import '../../vars/style.css';
import TranscationStatus from '../TranscationStatus/TranscationStatus';



function TranscationHistory(props) {
  const { items } = props;

  const list = items.map(item => {
    return (
      <tr>
        <th>{item.name}</th>   {/*need to be a link*/}
        <th>{item.date}</th>
        <th>{item.buyer}</th>  {/*link to the user's profile*/}
        <th className={item.status}><TranscationStatus status={item.status}/></th>  
      </tr>
    );
  });

  return (
    <div className="TranscationHistory">
      <h1>Transcation History</h1>
      <div className="Content">
        <table className='Transcation-Table'>
          <tr className='Title'>
            <th>Item</th>
            <th>Date</th>
            <th>User</th>
            <th>Status</th>
          </tr>
          {list}
        </table>
      </div>
    </div>
  );
}

export default TranscationHistory;
