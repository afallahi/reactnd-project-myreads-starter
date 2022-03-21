import React, { Component } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import AllBooks from './books'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import Book from './Book'
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

export default BooksApp
