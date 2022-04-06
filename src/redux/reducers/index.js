import { combineReducers } from "redux";
import devices from "./devices";
import chekDevice from "./checkDevice";

export default combineReducers({ devices:devices,checkDevice:chekDevice });
