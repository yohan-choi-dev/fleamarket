
import React from 'react'
import ReactSearchBox from 'react-search-box'
import './SearchBox.css'
import SearchButton from "../SearchButton/SearchButton.js"


class SearchBox extends React.Component {
  
  data = [
    {
      key: 'john',
      value: 'John Doe',
    },
    {
      key: 'jane',
      value: 'Jane Doe',
    },
    {
      key: 'mary',
      value: 'Mary Phillips',
    },
    {
      key: 'robert',
      value: 'Robert',
    },
    {
      key: 'karius',
      value: 'Karius',
    },
  ]

  render() {
    return (
        <div id='ReactSearchBox'>
            <ReactSearchBox
                placeholder="What are you looking for today"
                data={this.data}
                inputBoxFontSize="15px"
                inputBoxBorderColor = "white" // when we have backgroud pic change to white
            />
            <SearchButton />
        </div>
    )
  }
}

export default SearchBox;