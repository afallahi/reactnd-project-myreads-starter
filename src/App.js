import React, { Component } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import BookList from './BookList'
import './App.css'

class BooksApp extends Component {

  bookshelves = [
    {key: 'currentlyReading', name: 'Currently Reading'},
    {key: 'wantToRead', name: 'Want To Read'},
    {key: 'read', name: 'Read'}
  ]

  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({books: books})
    })
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

  bookMove = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
    })

    const booksUpdate = this.state.books.map(aBook => {
      if(aBook.id === book.id) {
        aBook.shelf = shelf
      }
      return aBook
    })

    this.setState({
      books: booksUpdate
    })
  }

  render() {
    const {books, searchBooks} = this.state
    return (
      <div className="app">
        <Routes>
          <Route exact path="/" element={<BookList 
                                          bookshelves={this.bookshelves} 
                                          books={books} 
                                          onMove={this.bookMove}
                                          />} />
          <Route path="/search" element={<BookSearch 
                                          books={searchBooks} 
                                          onSearch={this.bookSearchQuery} 
                                          onVoidSearch={this.voidSearch}
                                          onMove={this.bookMove}
                                          />} />
        </Routes>
      </div>
    )
  }
};

export default BooksApp
