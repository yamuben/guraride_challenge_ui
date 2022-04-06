import logo from "./logo.svg";
import React, { useState} from"react";
import "./App.css";
import GoogleMap from "./components/MapChallenge";
import gurarideLogo from "./assets/download.png";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import GoogleMap from "./components/googleMap";
import {MyMapComponent} from "./components/Marker";

import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  const [data,setData]= useState({})
  const [radius,setRadius]=useState(40000)
  const [onChangeRadius,setOnChangeRadius]=useState(radius);
  return (
    <Provider store={store}>
      <div className="App">
        <div
          style={{
            height: "10vh",
            width: "100%",
            background: "white",
            top: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            position: "fixed",
            boxShadow: "2px 2px whiteSmoke",
            padding: "10px 30px",
          }}
        >
          <img
            src={gurarideLogo}
            alt="logo"
            height="70%"
            style={{ boxShadow: "10px 0px black", borderRadius: "200px" }}
          />
          <h1 style={{ fontSize: "50px" }}>Challenge</h1>
          {/* <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    > */}

          {/* <Stack spacing={2} direction="row">
            <TextField
              label="Radius Boundary /meters"
              id="outlined-size-small"
              defaultValue={onChangeRadius}
              size="small"
              onChange={(e)=>setOnChangeRadius(e.target.value)}
            />
            <Button variant="contained" onClick={()=>{setRadius(onChangeRadius); console.log(radius)}}>Update</Button>
           
          </Stack> */}
        </div>

        {/* <header className="App-header"> */}
        <GoogleMap data={{radius}} />
        {/* <MyMapComponent isMarkerShown={true}/> */}
        {/* </header> */}
      </div>
    </Provider>
  );
}

export default App;
