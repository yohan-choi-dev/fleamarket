import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './ItemUploadPage.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import LabeledInputField from '../../components/LabeledInputField/LabeledInputField';
import DropdownButton from '../../components/DropdownButton/DropdownButton';
import LabeledTextField from '../../components/LabeledTextField/LabeledTextField';
import Button from '../../components/Button/Button';

import APIRoute from '../../vars/api-routes';
import axios from 'axios';

function ItemUploadPage(props) {
  // States
  const [itemState, setItemState] = useState({
    itemName: '',
    itemCategory: 0,
    itemDescription: '',
    itemImages: []
  });

  const [isValid, setIsValid] = useState(false);

  // Hooks
  const history = useHistory();

  useEffect(() => {
    setIsValid(
      itemState.itemName != '' &&
        itemState.itemCategory != 0 &&
        itemState.itemDescription != '' &&
        itemState.itemImages != null
    );
  }, [itemState]);

  const uploadItem = async () => {
    // 1. Verify all information is valid
    if (isValid) {
      // 2. Upload item to server
      let response;

      try {
        const fd = new FormData();
        fd.append('name', itemState.itemName);
        fd.append('category', itemState.itemCategory);
        fd.append('description', itemState.itemDescription);
        fd.append('image', itemState.itemImages, itemState.itemImages.name);
        response = await axios.post(`${APIRoute}/api/items`, fd, {
          onUploadProgress: progressEvent => {
            console.log(
              'Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total) * 100
            );
          }
        });
        console.log(response);
      } catch (err) {
        console.error(err);
      }
      return response;

      // 3. Redirect user to the newly-created item's page
      // For now, let's just redirect the user to homepage
      // until the item page is completed.
      //     history.push('/');
    } else {
      // For now, let's just put up an alert message
      if (itemState.itemName == '') {
        alert("Item's name is missing. Please complete the form.");
      } else if (itemState.itemCategory == 0) {
        alert("Item's category is invalid. Please complete the form.");
      } else if (itemState.itemDescription == '') {
        alert("Item's description is missing. Please complete the form.");
      } else if (itemState.itemImages.length == 0) {
        alert('There must be at least 1 image of the item. Please try again.');
      }
    }
  };

  return (
    <div className="ItemUploadPage">
      <div className="ItemUploadPage-upload-form-container container">
        <div className="ItemUploadPage-upload-form">
          <h3>Upload Item</h3>
          <form className="ItemUploadPage-upload-form-inner">
            <div className="ItemUploadPage-upload-form-name-category">
              <LabeledInputField
                label="Item's Name"
                inputField={{
                  id: 'ItemUpload-item-name-input',
                  name: 'ItemUpload-item-name-input',
                  type: 'text',
                  required: true,
                  autoFocus: true,
                  value: itemState.itemName,
                  onChangeHandler: event => {
                    setItemState({
                      ...itemState,
                      itemName: event.target.value
                    });
                  }
                }}
              />
              <div className="ItemUploadPage-upload-form-category-select">
                <p>Category</p>
                <DropdownButton
                  onChangeHandler={event => {
                    setItemState({
                      ...itemState,
                      itemCategory: event.target.value.trim()
                    });
                  }}
                />
              </div>
            </div>
            <div className="ItemUploadPage-upload-form-item-description">
              <p>Item's Description</p>
              <LabeledTextField
                onChangeHandler={event => {
                  setItemState({
                    ...itemState,
                    itemDescription: event.target.value
                  });
                }}
                textFieldValue={itemState.itemDescription}
              />
            </div>
            <div className="ItemUploadPage-upload-form-item-images">
              <p>Item's Images</p>
              <input
                type="file"
                multiple={true}
                onChange={event => {
                  console.log(event.target.files[0]);
                  setItemState({
                    ...itemState,
                    itemImages: event.target.files[0]
                  });
                }}
              />
            </div>
          </form>
          <div className="ItemUploadPage-actions">
            <Button disabled={!isValid} handleOnClick={uploadItem} otherClassNames="purple">
              Upload
            </Button>
            <Link to="/profile">
              <Button handleOnClick={() => {}} otherClassNames="grey">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemUploadPage;
