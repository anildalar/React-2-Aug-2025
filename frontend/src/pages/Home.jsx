//1. Import area
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
//import DefaultImport from 'some lib/loc';
import axios from 'axios';
import toastr from 'toastr';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//import { NamedImport } from '../somelocation';
import { BASE_URL } from '../lib/Helper';


//2. Function defination area
export default function Home() {
    //2.1 Hooks/State Variable Area
    const [rows, setRows] = useState([]);
    const [payload,setPayload] = useState({
                                            "data": {
                                                "fname": "",
                                                "lname": ""
                                            }
                                            });
    useEffect(()=>{
        //Runs on every render
        //Runs on every page reload
        axios.get(`${BASE_URL}/api/friends`)
        .then(function (response) {
            // handle success
            console.log(response.data.data);
            setRows(response?.data?.data);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    },[])
    
    
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
        //I want to call api here...
        //axiox.post().then().then().then()....catch().finally();
        //axiox.post('url',options).then().then().then()....catch().finally();
        axios.post(`${BASE_URL}/api/friends`,payload,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function(response){ 

            console.log(response.data)
            toastr.success('Have fun storming the castle!', 'Miracle Max Says')
        }).catch(()=>{
            toastr.error('Something went wrong', 'Inconceivable!')
        });


    }

    //2.3 Return statement
    return (
        <>
            <TextField onChange={handleChange} name="fname" id="standard-basic" label="Enter your firstName" variant="standard" />
            <TextField onChange={handleChange}  name="lname" id="standard-basic" label="Enter your lastName" variant="standard" />
            <Button variant="outlined" onClick={saveData}>Save To Strapi</Button>
            <hr/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>FirstName</TableCell>
                        <TableCell align="right">LastName</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.fname}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.fname}
                        </TableCell>
                        <TableCell align="right">{row.lname}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>    
        </>
    )
}
