import React from 'react';
import './AboutUsPage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

const AboutUsPage = (props) => {
  return (
    <div className="AboutUsPage">
      <Navigation />
      <div className="AboutUsPage-content container">
        <h2>About FleaMarket</h2>
        <p>Even though the second-hand trading market has boomed for the last years, people still have trouble to find buyers. Of course, they can wait for the next flea market, but it is still uncomfortable. Besides, everyone has their standard to value products, and the price tags do not always fill their needs successfully.</p>
        <p>On the other hand, the success of the sharing economy assistances people to start their own business easily; however, it only affects the limited area such as Uber, Airbnb. If technology can connect the local neighbourhood closely, it will generate a new type of market. For instance, the use of 3d printers will promote the production of domestically produced goods. In the past, to start their own business, they needed to rent a store near a local market. It means starting a business is costly and risky. But if they can open a local online store, they do not have to rent a commercial property. They can sell products from their 3d printers easily.</p>
        <p>As you can imagine, connecting the local neighbours will help to barter and trading with information technology. It will generate a new market and contribute to the local society.</p>
        <p>This application helps people to trade their possessions and productions in their local neighbourhood. A user can enroll their items on the application with brief descriptions. The application categorizes each item on the database. Based on location information, the application displays the list of the items near their location. But it does not show the exact location. Once the user set location and category or detailed items, they can start to explore the items on the application. A user swipes the item on the list. Users can choose a trade button. If both users choose the trade button for the target items, they can start chatting to deal with their trading. The application will also have a separate section for businesses. Users can order or buy products from companies in the local business section. Also, they can rate other users after trading. The system also supports payment systems to facilitate trading.</p>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUsPage;