
import React from 'react';

function FavoriteSpotItem({ favorite }) {

    
  return (
    <div className="favorite-spot-item">
        <ul>
     <ol> <p>Name: {favorite.name}</p>
     <p>Address: {favorite.address}</p></ol>
      </ul>
      <br></br>
    </div>
   
  );
}

export default FavoriteSpotItem;

