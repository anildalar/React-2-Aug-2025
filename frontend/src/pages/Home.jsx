//1. Import area
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';



//2. Function defination area
export default function Home() {
    //2.1 Hooks/State Variable Area
    const [payload,setPayload] = useState({
                                            "data": {
                                                "fname": "",
                                                "lname": ""
                                            }
                                            });

    //2.2 functiond defination are
    //Fat arrow
    let handleChange = (e)=>{
        //console.log("Hi");
            ///  object.member
            //2. object.method()
            //1. object?.property
        console.log(e?.target?.value);
        setPayload({
            ...payload,
            "data":{
                ...payload.data,
                [e?.target?.name]:e?.target?.value
            }
        })
    }
    let saveData = () =>{
        console.log(payload);
    }

    //2.3 Return statement
    return (
        <>
            <TextField onChange={handleChange} name="fname" id="standard-basic" label="Enter your firstName" variant="standard" />
            <TextField onChange={handleChange}  name="lname" id="standard-basic" label="Enter your lastName" variant="standard" />
            <Button variant="outlined" onClick={saveData}>Save To Strapi</Button>
        </>
    )
}
