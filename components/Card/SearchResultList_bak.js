import React from "react";

const SearchResultList = ({
  propertyName,
  roomName,
  address,
  propertyType,
  images,
  price,
  index,
}) => {
  return (
    <div key={index}>
      <img src={images} alt={images} />
      <div>
        <div>
          <p>{address}</p>
          <h3>{propertyName}</h3>
          <p>{roomName}</p>
        </div>

        <div>
          <div>
            <p>
              <strong>{propertyType}</strong>
            </p>
          </div>
          <div>
            <h2>{price}</h2>
          </div>
        </div>
      </div>

      <p>____</p>
    </div>
  );
};

export default SearchResultList;
