import React, { Component } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import AllBooks from './books'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

  bookshelves = [
    {key: 'currentlyReading', name: 'Currently Reading'},
    {key: 'wantToRead', name: 'Want To Read'},
    {key: 'read', name: 'Read'}
  ]

  state = {
    books: AllBooks
  }

  render() {
    const {books} = this.state
    return (
      <div className="app">
        <Routes>
          <Route exact path="/" element={<BookList bookshelves={this.bookshelves} books={books} />} />
          <Route path="/search" element={<BookSearch books={books} />} />
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
  const { book } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url(${book.imageLinks.thumbnail})' }}></div>
            <BookShelfChanger book={book} />
        </div>
        <div className="book-title">book.title</div>
        <div className="book-authors">book.authors</div>
      </div>
    </li>
  )
}

class BookShelfChanger extends Component {
  render() {
    return (
      <div className="book-shelf-changer">
      <select>
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
    return (
      <div className="search-books">
        <SearchBooksBar />
        <SearchBookResults />
      </div>
    )
  }
}

const CloseSearchButton = () => {
  return (
    <Link to="/" className="close-search">
      Close
    </Link>
  )
}

class SearchBooksInputWrapper extends Component {
  render() {
    return (
      <div className="search-books-input-wrapper">
        {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
        <input type="text" placeholder="Search by title or author" />

      </div>
    )
  }
}

class SearchBooksBar extends Component {
  render() {
    return (
      <div className="search-books-bar">
        <CloseSearchButton />
        <SearchBooksInputWrapper />
    </div>
    )
  }
}

const SearchBookResults = props => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        <Book />
      </ol>
  </div>
  )
}

export default BooksApp
