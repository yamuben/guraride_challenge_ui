import axios from "axios";

const BASE_URL="http://localhost:9050/guraride/api/v1";

var config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const getAllDevices = async (distance)=>{
  
      try{
          return await axios.get(BASE_URL+"/device/"+distance,config);
  
      }catch(e){
          console.log("failed: ",e)
      }
  
  }

  const checkDevice = async (id,payload)=>{

    try{
        return await axios.post(BASE_URL+"/device/"+id,payload,config);

    }catch(e){
        console.log("failed: ",e)
    }

}
  

export default {getAllDevices,checkDevice};