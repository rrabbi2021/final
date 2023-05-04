import React from 'react'

const FavoriteButtons = ({ isFavorite, handleAddFavorite, handleRemoveFavorite }) => {

  return (
    (isFavorite ?
        <button className="btn btn-lg p-3 text-white btn-outline-danger" onClick={handleRemoveFavorite}>
          REMOVE FAVORITE
        </button>
      :
        <button className="btn btn-lg p-3 text-white btn-outline-primary" onClick={handleAddFavorite}>
          Add Favorite
        </button>
    )
  )
}

export default FavoriteButtons