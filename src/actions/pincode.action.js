import axios from "../helpers/axios";
import { pincodeConstants } from "./constants";

export const getAllPincodes = () =>{

    return async dispatch =>{


        dispatch({
            type:pincodeConstants.GET_ALL_PINCODES_REQUEST
        });

        const res = await axios.get('/pincode');
        if(res.status === 200){
           const {Pincodes} = res.data;
            dispatch({
                type: pincodeConstants.GET_ALL_PINCODES_SUCCESS,
                payload: {pincodes: Pincodes}
            });
        }else{

            dispatch({
                type:pincodeConstants.GET_ALL_PINCODES_FAILURE,
                payload:{error: res.data.error}
            });
        }
    }
}

export const addPincodes =(pincodes) =>{
    return async dispatch =>{
        dispatch({type: pincodeConstants.ADD_PINCODE_REQUEST});
           try{

            const res = await axios.post('/pincode/add',{pincodes});
            if(res.status === 200){
                const added = res.data.docs.ops;
                dispatch({
                    type: pincodeConstants.ADD_PINCODE_SUCCESS,
                    payload: {pincodes: added}
                });
            }else{
                dispatch({
                    type:pincodeConstants.ADD_PINCODE_FAILURE,
                    payload:  res.data.error
                });
            }

           }catch(error){
             
               console.log(error.response);
           }
   
       
    }
}

export const deletePincodesAction =(pincode) =>{
    return async dispatch =>{
       dispatch({type: pincodeConstants.DELETE_PINCODE_BY_ID_REQUEST});
        const res = await axios.delete(`/pincode/delete/${pincode}`);
        if(res.status == 200){
            dispatch({type: pincodeConstants.DELETE_PINCODE_BY_ID_SUCCESS, payload: {deletedPincode: pincode}});
        }else{
            const {error} = res.data;
            dispatch({type: pincodeConstants.DELETE_PINCODE_BY_ID_FAILURE, payload: {error}});
            
        }

       
    }
}
