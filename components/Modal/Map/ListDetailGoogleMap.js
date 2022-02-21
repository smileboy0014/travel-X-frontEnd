import React, { useEffect, useState, Fragment, useCallback } from "react";
import { GoogleMap, useLoadScript, LoadScript, Marker, OverlayView, MarkerClusterer } from '@react-google-maps/api';
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import SearchMobileCard from "../../Card/SearchMobileCard";
import Style from "../../../styles/ListDetailMap.module.css"

const containerStyle = {
  width: '100%',
  height: "100%",
  position:'absolute',
	top:0,
	left:0,
	right:0,
	bottom:0
};

const options = {
  imagePath: 
    // 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
    'https://m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};

  
const DetailMap = ({ lat, lng, onRequestClosed }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBVi31CDrC3Dyi8f166yV_-6WKocsk7I8E"
  });
  const searchDataValue = useSelector(({ searchResult }) => searchResult.data);
  const [roomData, setRoomData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(-1);
  const [mobileWindows, setMobileWindows] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: lat, lng: lng});
  const [markerLabels, setMarkerLabels] = React.useState([]);

  const addRoomMapMarker = () => {
    console.log(searchDataValue[0]);
    if (searchDataValue[0] !== undefined && searchDataValue[0].length > 0 && isLoaded) {
      let tmpMarkers = [];
      let tmpMobileWindows = [];
      searchDataValue[0].map((room) => {
        let marker = {
          id: room.roomId + room.useType,
          position: {
            lat: room.location.lat,
            lng: room.location.lon
          },
          price: room.price
        }

        let mobileContent = [
          {
            img: room.images[0],
            type: room.propertyType,
            name: room.propertyName,
            averageScore: room.reviewSummary.averageScore,
            reviewCount: room.reviewSummary.reviewCount,
            price: room.basePrice,
          },
          {
            img: room.images[0],
            type: room.propertyType,
            name: room.propertyName,
            averageScore: room.reviewSummary.averageScore,
            reviewCount: room.reviewSummary.reviewCount,
            price: room.basePrice,
          }
        ];
        
        tmpMobileWindows.push(mobileContent);
        tmpMarkers.push(marker);
      });

      setMapCenter({
        lat: searchDataValue[0][0].location.lat,
        lng: searchDataValue[0][0].location.lon
      });
      setMarkers(tmpMarkers);
      setMobileWindows(tmpMobileWindows);
    }
  };

  const handleActiveMarker = (index) => {
    setRoomData(mobileWindows[index]);
    setActiveMarker(index);
  };

  const createKey = (location) => {
    return location.lat + location.lng;
  };
  
  const getPixelPositionOffset = (offsetWidth, offsetHeight, labelAnchor) => {
    return {
        x: offsetWidth + labelAnchor.x,
        y: offsetHeight + labelAnchor.y,
    };
  };

  const cx = (...classNames) => classNames.join(' ');

  useEffect(() => {
    console.log(activeMarker);
  }, [activeMarker])

  const markerLabelsHandler = (clusterer) => {
    const markerLabelsList = [];
    let allClusters = clusterer.clusters;
    allClusters.map((cluster, clusterIndex) => {
      // console.log(cluster)
      let markersLength = cluster.getMarkers().length;

      let labelAnchor = { x: -100, y: -43 }
      markerLabelsList.push(
        <OverlayView
          key={clusterIndex}
          position={cluster.getMarkers()[0].position}
          mapPaneName= {OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={(x, y) => getPixelPositionOffset(x, y, labelAnchor)}
        >
          <button className={Style.MapPin} onClick={() => handleActiveMarker(clusterIndex)}>
            {markersLength > 1 ? 
              (activeMarker === clusterIndex ? 
                <span className={cx(Style.MapPin_count,Style.is_Active_MapPin_count)}>{markersLength}</span> :
                <span className={Style.MapPin_count}>{markersLength}</span>)
            : null}
            <span 
              className={activeMarker == clusterIndex ? cx(Style.MapPin_price,Style.is_Active_MapPin_price) : Style.MapPin_price}
            >
              78,000
            </span>
          </button>
        </OverlayView>
      );
    });
    setMarkerLabels(markerLabelsList)
   }

  useEffect(() => {
    setMarkers([]);
    addRoomMapMarker();
  }, [searchDataValue, isLoaded]);

  // useEffect(() => {
  //   console.log(roomData);
  // }, [roomData])

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          id='list-detail-map'
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={15}
        >
          <MarkerClusterer 
            ignoreHidden={true}
            onClusteringEnd={markerLabelsHandler}
            options={options}
            averageCenter
            enableRetinaIcons
            gridSize={0}
            maxZoom={20}
            zoomOnClick={false} 
          >
            {(clusterer) =>
              markers.map((marker, index) => (
                <Fragment key={index}>
                  <Marker
                    icon=''
                    key={createKey(marker.position)}
                    position={marker.position}
                    onClick={() => handleActiveMarker(index)}
                    clusterer={clusterer}
                  >
                  </Marker>
                </Fragment>
              ))
            }
          </MarkerClusterer>
          {markerLabels}
          <SearchMobileCard
            data={roomData}
            closeModal={(value) => {
              onRequestClosed(value);
            }}
          />
        </GoogleMap>
      ) : null}
      {loadError ? null : null}
    </div>
  );
};

export default DetailMap;
