import React from 'react'
import Bookshelf from './Bookshelf'


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

export default Bookcase