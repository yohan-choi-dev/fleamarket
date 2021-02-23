import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './UpdateUserProfile.css';

import LabeledInputField from '../LabeledInputField/LabeledInputField';
import LabeledTextField from '../LabeledTextField/LabeledTextField';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import AppContext from '../../contexts/AppContext';

import APIRoute from '../../vars/api-routes';
import { getData } from '../../utils/fetch-data';

function UpdateUserProfile(props) {
  const location = useLocation();
  const { user } = location.state;
  const history = useHistory();

  const [newUserInfo, setNewUserInfo] = useState({
    name: user.name,
    description: user.description,
    profileImage: null
  });

  const { appState, setAppState } = useContext(AppContext);

  const updateProfile = async () => {
    const newUserName = newUserInfo.name.trim();
    const newUserDescription = newUserInfo.description.trim();

    if (
      newUserName != user.name ||
      newUserDescription != user.description ||
      newUserInfo.profileImage != null
    ) {
      const fd = new FormData();
      fd.append('newName', newUserName);
      fd.append('newDescription', newUserDescription);
      fd.append('image', newUserInfo.profileImage);

      const response = await fetch(`${APIRoute}/api/users/profile/${user.id}`, {
        method: 'PUT',
        body: fd
      });

      if (response.status >= 200 && response.status <= 299) {
        const response = await getData(`${APIRoute}/api/users/${user.id}`);

        setAppState({
          ...appState,
          user: {
            ...appState.user,
            name: newUserName,
            description: newUserDescription,
            image: response.image
          }
        })
        history.push('/profile');
      }
    }
  }

  return (
    <div className="UpdateUserProfile">
      <Modal title="Update Profile">
        <LabeledInputField
          className="UpdateUserProfile-name"
          label="Name"
          inputField={{
            id: 'UpdateUserProfile-Name-Input',
            name: 'UpdateUserProfile-Name-Input',
            type: 'text',
            placeholder: '',
            required: false,
            style: {},
            onChangeHandler: event => {
              const userInput = event.target.value;
              setNewUserInfo({
                ...newUserInfo,
                name: userInput
              });
            },
            value: newUserInfo.name
          }}
        />
        <LabeledTextField
          label="Description"
          id="ProfileEdit-description"
          onChangeHandler={event => {
            const userInput = event.target.value;
            setNewUserInfo({
              ...newUserInfo,
              description: userInput
            });
          }}
          textFieldValue={newUserInfo.description}
        />
        <div className="UpdateUserProfile-image-container">
          <p>Profile Image</p>
          <input
            type="file"
            accept=".jpg,.png"
            onChange={event => {
              setNewUserInfo({
                ...newUserInfo,
                profileImage: event.target.files[0]
              });
            }}
          />
        </div>
        <Button handleOnClick={updateProfile} otherClassNames="purple">Update</Button>

      </Modal>
    </div>
  );
}

export default UpdateUserProfile;
