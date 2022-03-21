import React, { Component } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import AllBooks from './books'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

  bookshelves = [
    {key: 'currentlyReading', name: 'Currently Reading'},
    {key: 'wantToRead', name: 'Want To Read'},
    {key: 'read', name: 'Read'}
  ]

  state = {
    books: AllBooks,
    searchBooks: []
  }

  voidSearch = () => {
    this.setState({searchBooks: []})
  }

  bookSearchQuery = query => {
    if(query.length <= 0) {
      this.setState({searchBooks: []})
    } else {
      BooksAPI.search(query).then(books => {
        if(books.error) {
          this.setState({searchBooks: []})
        } else {
          this.setState({searchBooks: books})
        }
      })  
    }
  }

  render() {
    const {books, searchBooks} = this.state
    return (
      <div className="app">
        <Routes>
          <Route exact path="/" element={<BookList bookshelves={this.bookshelves} books={books} />} />
          <Route path="/search" element={<BookSearch 
                                          books={searchBooks} 
                                          onSearch={this.bookSearchQuery} 
                                          onVoidSearch={this.voidSearch}
                                          />} />
        </Routes>
      </div>
    )
  }
}

const Bookcase = props => {
  const {bookshelves, books} = props;
  return (
    <div className="list-bookcase">
      <div>
        {bookshelves.map(shelf => (
          <Bookshelf key={shelf.key} shelf={shelf} books={books} />
        ))}
      </div>
    </div>
  )
}

const Bookshelf = props => {
  const {shelf, books} = props
  const shelfBooksList = books.filter(book => book.shelf === shelf.key)
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          { shelfBooksList.map(book => (
            <Book key={book.id} book={book} shelf={shelf.key} />
          )) }
        </ol>
      </div>
    </div>
  )
}

const Book = props => {
  const { book, shelf } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`, }} />
            <BookShelfChanger book={book} shelf={shelf} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  )
}

class BookShelfChanger extends Component {
  render() {
    return (
      <div className="book-shelf-changer">
      <select value={this.props.shelf}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
    )
  }
}

const OpenSearchButton = () => {
  return (
    <div className="open-search">
      <Link to="search">
        <button>Add a Book</button>
      </Link>
    </div>
  )
}

class BookList extends Component {
  render() {
    const {bookshelves, books} = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Bookcase bookshelves={bookshelves} books={books} />
        <OpenSearchButton />
      </div>
    )
  }
}

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

export default BooksApp
