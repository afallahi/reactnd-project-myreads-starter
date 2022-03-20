import React, { Component } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

  bookshelves = [
    {key: 'currentlyReading', name: 'Currently Reading'},
    {key: 'wantToRead', name: 'Want To Read'},
    {key: 'read', name: 'Read'}
  ]

  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path="/" element={<BookList bookshelves={this.bookshelves}/>} />
          <Route path="/search" element={<BookSearch />} />
        </Routes>
      </div>
    )
  }
}

const Bookcase = props => {
  const {bookshelves} = props;
  return (
    <div className="list-bookcase">
      <div>
        {bookshelves.map(shelf => (
          <Bookshelf key={shelf.key} shelf={shelf} />
        ))}
      </div>
    </div>
  )
}

const Bookshelf = props => {
  const {shelf} = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books"></div>
      <ol className="books-grid">
        <Book book={{}} />
      </ol>
    </div>
  )
}

const Book = props => {
  const { book } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' }}></div>
            <BookShelfChanger />
        </div>
        <div className="book-title">The Adventures of Tom Sawyer</div>
        <div className="book-authors">Mark Twain</div>
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
    const {bookshelves} = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Bookcase bookshelves={bookshelves} />
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
