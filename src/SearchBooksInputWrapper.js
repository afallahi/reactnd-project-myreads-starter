import React, { Component } from 'react'


  class SearchBooksInputWrapper extends Component {
    state = {
      value: ''
    }
  
    didSearchChange = event => {
      const eventVal = event.target.value
      this.setState({value: eventVal}, () => {
        this.props.onSearch(eventVal)
      })
    }
  
    render() {
      return (
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            placeholder="Search by title or author" 
            value={this.state.value}
            onChange={this.didSearchChange}
          />
        </div>
      )
    }
  }


export default SearchBooksInputWrapper