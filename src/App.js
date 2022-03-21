import React, { Component } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import AllBooks from './books'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import Book from './Book'
import BookList from './BookList'
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
};

export default BooksApp
