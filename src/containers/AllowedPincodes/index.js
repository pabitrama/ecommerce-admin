import React, { useEffect, useState } from 'react'
import Layout from "../../components/Layout";
import { Button, Container,Table } from "react-bootstrap";
import Input from "../../components/UI Component/inputs";
import "./style.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "../../helpers/axios";
import { useDispatch, useSelector } from 'react-redux';
import { addPincodes, deletePincodesAction, getAllPincodes } from '../../actions/pincode.action';


const AllowedPincodes = () => {
const data = useSelector((state) => state.pincode)
const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllPincodes());
    },[])
    const [pincodes, setPincodes] = useState('')
    const submitPincodes = async () => {
        if(!pincodes.length) return;
        dispatch(addPincodes(pincodes))
        setPincodes('')
    }
    const confirmDelete = (pincode) => {
        confirmAlert({
            message: `Do you really want to delete pincode ${pincode} from the eligible list?`,
            buttons: [
              {
                label: 'Yes, Delete it!',
                onClick: () => deletePincode(true, pincode)
              },
              {
                label: "No, Cancel!",
                onClick: () => deletePincode(false)
              }
            ]
          });
    }
    const deletePincode = (confirm, pincode=null) =>{
        if(!confirm) return;
        dispatch(deletePincodesAction(pincode));
    }
  return (
    <Layout sidebar>
      <Container>
        <div className='inputBox'>
        <span className='inputLabel'>Enter the pincodes that you want to allow:</span>
        <Input onChange={(e)=> setPincodes(e.target.value)} placeholder="Eg: 751024, 751021" value={pincodes} />
        </div>
      <Button onClick={submitPincodes}>Allow</Button>
      
      </Container>
      <Container className='container2'>
      {data.pincodes.length ? 
        <Container>
            <span className='tableLabel'> List of eligible pincodes:</span>
            <div className='tableContainer'>
                <Table style={{ fontSize: 16, width: '100%'}} responsive="sm" striped borderless hover className='pincodeTable'>
                    <thead>
                        <tr>
                            <th>Pincode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.pincodes.map((pin, index)=>(
                        <tr key={pin._id}>
                            <td>{pin.pincode}</td>
                            <td >
                                    <button
                                        className="delete-btn"
                                        onClick={() => confirmDelete(pin.pincode)}>
                                        Delete
                                    </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </Container>
      : <span className='tableLabel'>No pincodes registered yet! <br/> Enter the pincode in the field above and click the button to add the same.</span>}
      </Container>
      </Layout>
  )
}

export default AllowedPincodes
