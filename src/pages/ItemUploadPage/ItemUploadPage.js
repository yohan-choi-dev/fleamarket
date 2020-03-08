import React, { useState, useEffect } from 'react';
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

function ItemUploadPage(props) {
  const [itemState, setItemState] = useState({
    itemName: '',
    itemCategory: 0,
    itemDescription: '',
    itemImages: []
  });

  useEffect(() => {

  }, [itemState]);

  const uploadItem = () => {
    // 1. Verify all information is valid

    // 2. Upload item to server

    // 3. Redirect user to the newly-created item's page
  }

  return (
    <div className="ItemUploadPage">
      <Navigation />
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
                      itemName: event.target.value.trim()
                    });
                  }
                }}
              />
              <div className="ItemUploadPage-upload-form-category-select">
                <p>Category</p>
                <DropdownButton onChangeHandler={(event) => {
                  setItemState({
                    ...itemState,
                    itemCategory: parseInt(event.target.value.trim())
                  });
                }}
                />
              </div>
            </div>
            <div className="ItemUploadPage-upload-form-item-description">
              <p>Item's Description</p>
              <LabeledTextField onChangeHandler={(event) => {
                setItemState({
                  ...itemState,
                  itemDescription: event.target.value.trim()
                });
              }} textFieldValue={itemState.itemDescription} />
            </div>
            <div className="ItemUploadPage-upload-form-item-images">
              <p>Item's Images</p>
              <input type="file" multiple={true} onChange={(event) => {
                console.log(event.target.files);
              }} />
            </div>
            <Button handleOnClick={uploadItem} otherClassNames="purple">Upload Item</Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemUploadPage;