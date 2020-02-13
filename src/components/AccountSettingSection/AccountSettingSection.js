import React from 'react';
import './AccountSettingSection.css';
import '../../vars/style.css';
import Overview from '../Overview/Overview';
import ChangeEmail from '../ChangeEmail/ChangeEmail';
import UpdateContact from '../UpdateContact/UpdateContact';
import UpdatePayment from '../UpdatePayment/UpdatePayment';
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import ChangePassword from '../ChangePassword/ChangePassword';

class AccountSettingSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.content) {
      case 'Overview':
        return <Overview />;
        break;
      case 'ChangeEmail':
        return <ChangeEmail />;
        break;
      case 'ChangePassword':
        return <ChangePassword />;
        break;
      case 'UpdateContact':
        return <UpdateContact />;
        break;
      case 'UpdatePayment':
        return <UpdatePayment />;
        break;
      case 'DeleteAccount':
        return <DeleteAccount />;
        break;
    }
  }
}

export default AccountSettingSection;
