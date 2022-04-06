import {
  GET_ALL_DEVICES,
  CHECK_DEVICE_LOCATION,
  LOADING,
} from "../actionTypes";
import Alert from '@mui/material/Alert';

import backendServices from "../../services/backend";

export const getAllDevicesAction = (payload) => async (dispatch) => {
  dispatch({ type: LOADING, payload: { loading: true ,status:null} });
  try {
      const devices = await backendServices.getAllDevices(payload?.distance);
      console.log(devices)
      if(devices?.status=== 200){
        dispatch({ type: LOADING, payload: { loading: false} });
      dispatch({ type: GET_ALL_DEVICES, payload: { devices:devices.data.data.data} ,status:200 });
   
      return (
        <Alert severity="success">received</Alert>)
    }
    return (
        <Alert severity="error">This is an error alert — check it out!</Alert>)

  } catch (error) {

    console.log(">>>Error>>: ",error);
      
  }
};

export const checkDevice = (id,payload) => async (dispatch) => {
  dispatch({ type: LOADING, payload: { loading: true ,status:null} });
  try {
      const device = await backendServices.checkDevice(id, payload);
      
    console.log("********************************:",device)
      if(device?.status=== 200){ 
        dispatch({ type: LOADING, payload: { loading: false} });
      dispatch({ type: CHECK_DEVICE_LOCATION, payload: { devices:device.data.data,message:device.data.message} ,status:200 });
   
      return (
        <Alert severity="success">received</Alert>)
    }
    return (
        <Alert severity="error">This is an error alert — check it out!</Alert>)

  } catch (error) {

    console.log(">>>Error>>: ",error);
      
  }
};
