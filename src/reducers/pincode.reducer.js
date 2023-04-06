import { getAllByPlaceholderText } from "@testing-library/react";
import { pincodeConstants } from "../actions/constants"

const initState = {

    error: null,
    loading: false,
    pincodes: {}
}

export default (state = initState, action) =>{
    switch(action.type){
        case pincodeConstants.GET_ALL_PINCODES_REQUEST:
            state ={
                ...state,
                loading:true
            }
        break;
        case pincodeConstants.GET_ALL_PINCODES_SUCCESS:
            state ={
                ...state,
                pincodes: action.payload.pincodes,
                loading:false
            }
        break;
        case pincodeConstants.GET_ALL_PINCODES_FAILURE:
            state ={
                ...state,
                loading:false,
                error: action.payload.error
            }
        break;
        case pincodeConstants.ADD_PINCODE_REQUEST:
            state ={
                ...state,
                loading:true
            }
        break;
        case pincodeConstants.ADD_PINCODE_SUCCESS:
            console.log((state));
            state ={
                ...state,
                pincodes:  [...state.pincodes, ...action.payload.pincodes],
                loading:false
            }
        break;
        case pincodeConstants.ADD_PINCODE_FAILURE:
            state ={
                ...state,
                loading:false,
                error: action.payload.error
            }
        break;
        case pincodeConstants.DELETE_PINCODE_BY_ID_REQUEST:
            state ={
                ...state,
                loading:true
            }
        break;
        case pincodeConstants.DELETE_PINCODE_BY_ID_SUCCESS:
            state ={
                ...state,
                pincodes: state.pincodes.filter((item)=>item.pincode != action.payload.deletedPincode),
                loading:false
            }
        break;
        case pincodeConstants.DELETE_PINCODE_BY_ID_FAILURE:
            state ={
                ...state,
                loading:false,
                error: action.payload.error
            }
        break;
    }
    return state;
}