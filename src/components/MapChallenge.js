import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { compose, withProps, lifecycle } from "recompose";

import { MyMapComponent } from "./Marker";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
} from "react-google-maps";

import { getAllDevicesAction, checkDevice } from "../redux/actions";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MapChallenge = (props) => {
  const dispatch = useDispatch();

  const [showingInfoWindow, setShowingInfoWindow] = useState(true);
  const [activeMarker, setActiveMarker] = useState({});
  const [radius, setRadius] = useState(props.data.radius);
  const [message, setMessage] = useState("");

  const initialPoint = {
    lat: -1.958198,
    lng: 30.111122,
    
    // lat:-1.9814616696121945, lng:30.136438113606097
  };
  const onMarkerClick = (marker) => {
    console.log(marker);

    // setSelectedPlace({loaded:false,google:marker.google});
    // setActiveMarker(undefined);
    setShowingInfoWindow(true);
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = async (position, id) => {
    console.log("+++++++++", position);
    await checkDevice(id, { coordinates: [position.lat, position.lng] })(
      dispatch
    );
    setOpen(true);
  };
  const refs = {};
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onMarkDragged = (props, marker, e) => {
    console.log("am dragged");
  };
  const onClose = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };
  const { loading, devices, status } = useSelector(({ devices }) => devices);

  //   console.log("kkkkkkkkkkk: ",devices)
  const dd = [1, 2, 3, 4];
  useEffect(() => {
    getAllDevicesAction({ distance: 5000 })(dispatch);
  }, []);

  return (
    // <GoogleMap
    //   google={props.google}
    //   zoom={14}
    //   style={mapStyles}
    //   initialCenter={initialPoint}
    // >
    // {!status ? (
    //   <Circle center={initialPoint} radius={radius} visible={true} />
    // ) : (
    //   <></>
    // )}

    //   {/* <MyMapComponent isMarkerShown={true} /> */}
    // {devices?.map((d, index) => (
    //   <Marker
    //     // onClick={(e) => {console.log(e); }}
    //     ref={onMarkerMounted}
    //     onPositionChanged={onPositionChanged}
    //     name={d?.name}
    //     // onPositionChanged={(e) => {console.log(e)}}
    //     icon={
    //       index === 0
    //         ? "https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/000000/external-office-business-tulpahn-outline-color-tulpahn.png"
    //         : "https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-bike-healthy-wanicon-flat-wanicon.png"
    //     }
    //     title={d?.name}
    //     draggable={index === 0 ? false : true}
    //     position={{
    //       lat: d.deviceLocation.coordinates[0],
    //       lng: d.deviceLocation.coordinates[1],
    //     }}
    //   />
    // ))}
    //   <Snackbar
    //     open={open}
    //     autoHideDuration={3000}
    //     onClose={handleClose}
    //     anchorOrigin={{ vertical: "top", horizontal: "center" }}
    //   >
    //     <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
    //       This is a success message!
    //     </Alert>
    //   </Snackbar>
    // </GoogleMap>
    <GoogleMap defaultZoom={10} defaultCenter={initialPoint}>
      {!status ? (
        <Circle center={initialPoint} radius={radius} visible={true} />
      ) : (
        <></>
      )}
      {devices?.map((d, index) => {
        let position=null;
        const onMarkerMounted = (ref) => {
          refs.marker = ref;
        };
        const onPositionChanged = (props) => {
          // console.log("<<<<<<<<<<<QQQ:", props);
           position = refs.marker.getPosition();
          console.log(position.toString());
        };
        const onDragEnd = () => {
           position = refs.marker.getPosition();
          console.log("llll", position.toString());
        };
        return (
          <Marker
            // onClick={(e) => {console.log(e); }}
            ref={onMarkerMounted}
            onPositionChanged={onPositionChanged}
            onDragEnd={onDragEnd}
            name={d?.name}
            // onPositionChanged={(e) => {console.log(e)}}
            icon={
              index === 0
                ? "https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/000000/external-office-business-tulpahn-outline-color-tulpahn.png"
                : "https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-bike-healthy-wanicon-flat-wanicon.png"
            }
            title={d?.name}
            draggable={index === 0 ? false : true}
            position={{
              lat: d.deviceLocation.coordinates[0],
              lng: d.deviceLocation.coordinates[1],
            }}
            // ref={props.onMarkerMounted}
            // onPositionChanged={props.onPositionChanged}
          />
        );
      })}
      <Marker position={{lat:-2.065853780551209, lng:29.80945638540387}} draggable={true} ref={props.onMarkerMounted} onPositionChanged={props.onPositionChanged} />
    </GoogleMap>
  );
};

//   export default MapChallenge;
export default compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCes4CwutakemAIDaiw9FhlH-xBYsd9Cl4&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
      componentWillMount() {
          const refs = {}

          this.setState({
              position: null,
              onMarkerMounted: ref => {
                  refs.marker = ref;
              },

              onPositionChanged: () => {
                  const position = refs.marker.getPosition();
                  console.log(position.toString());
              }
          })
      },
  }),
  withScriptjs,
  withGoogleMap
)(MapChallenge);

// compose(
//   withProps({
//   apiKey: "AIzaSyCes4CwutakemAIDaiw9FhlH-xBYsd9Cl4",
// })
