import React from 'react'
import { Link } from 'react-router-dom'

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

export default CloseSearchButton