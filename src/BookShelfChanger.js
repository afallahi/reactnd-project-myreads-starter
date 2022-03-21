import React, {Component} from 'react'

class BookShelfChanger extends Component {
  state = {
    shelfVal: this.props.shelf
  }

  handleShelfChange = event => {
    this.setState({shelfVal: event.target.value})
    this.props.onMove(this.props.book, event.target.value)
  }

    render() {
      return (
        <div className="book-shelf-changer">
        <select value={this.state.shelfVal} onChange={this.handleShelfChange} >
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

export default BookShelfChanger