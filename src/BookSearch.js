import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class BookSearch extends Component {
    render() {
      const { books, onSearch, onVoidSearch } = this.props
      return (
        <div className="search-books">
          <SearchBooksBar onSearch={onSearch} onVoidSearch={onVoidSearch} />
          <SearchBookResults books={books} />
        </div>
      )
    }
  }

  const SearchBooksBar = props => {
    const {onSearch, onVoidSearch} = props;
      return (
        <div className="search-books-bar">
          <CloseSearchButton onVoidSearch={onVoidSearch} />
          <SearchBooksInputWrapper onSearch={onSearch} />
      </div>
      );
  }
  
  const SearchBookResults = props => {
    const {books} = props
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map(book => (
            <Book key={book.id} book={book} shelf="none" />
          ))}
        </ol>
    </div>
    )
  }
  
  const CloseSearchButton = props => {
    const {onVoidSearch} = props
    return (
      <Link to="/">
        <button className="close-search" onClick={onVoidSearch} >
          Close
        </button>
      </Link>
    )
  }
  

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
  

  export default BookSearch
  