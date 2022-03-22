import React, { Component } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import BookList from './BookList'
import './App.css'

const bookshelves = [
  {key: 'currentlyReading', name: 'Currently Reading'},
  {key: 'wantToRead', name: 'Want To Read'},
  {key: 'read', name: 'Read'}
]

class BooksApp extends Component {

  state = {
    existingBooks: [],
    searchBooks: [],
    networkError: false
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({existingBooks: books})
    })
    .catch(error => {
      this.setState({networkError: true})
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
    BooksAPI.update(book, shelf)
    .catch(error => {
      this.setState({networkError: true})
    })

    let booksUpdate = this.state.existingBooks.filter(aBook => aBook.id !== book.id)

    if(shelf !== 'none') {
      book.shelf = shelf
      booksUpdate = booksUpdate.concat(book)
    }

    this.setState({
      existingBooks: booksUpdate
    })
  }

  render() {
    const {existingBooks, searchBooks, networkError} = this.state
    if(networkError) {
      return <div>Network Error</div>
    }
    return (
      <div className="app">
        <Routes>
          <Route exact path="/" element={<BookList 
                                          bookshelves={bookshelves} 
                                          books={existingBooks} 
                                          onMove={this.bookMove}
                                          />} />
          <Route path="/search" element={<BookSearch 
                                          existingBooks={existingBooks} 
                                          searchBooks={searchBooks}
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
