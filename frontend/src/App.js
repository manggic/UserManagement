import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { callApi } from "./common/api";
import CircularProgress from "@mui/material/CircularProgress";
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import ModalForm from "./components/ModalForm";


const rows = [
  { id:'steeel', name: "Snow", firstName: "Jon", age: 35, delete:'iocn' },
  { id: 's', name: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, name: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, name: "Stark", firstName: "Arya", age: 16 },
  { id: 5, name: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, name: "Melisandre", firstName: null, age: 150 },
  { id: 7, name: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, name: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, name: "Roxie", firstName: "Harvey", age: 65 },
];
export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ isModalOpen, setIsModalOpen ] =useState(false);
  const [dataToEdit, setDataToEdit] =  useState({})

  const handleClick = async (e, value) => {
    console.log('cliked', value);
    let response = await callApi(`http://localhost:3001/delete/${value.row._id}`, 'delete')
    console.log('delete response', response)
  
    setUsers( users.filter(user => user._id!==value.row._id) )
  }


  const handleChange =(e) => {
    setDataToEdit({...dataToEdit , [e.target.name]: e.target.value})
    console.log('diss', e.target.value, e.target.name)
}

  const handleOpen = (e, value) =>  {
    console.log('value', value);
      setDataToEdit(value.row)
      setIsModalOpen(true);
  } 
  const handleClose = async() => {


    let response = await callApi(`http://localhost:3001/update/${dataToEdit._id}`, 'put', dataToEdit)
     
    setUsers(users.map(user => {
      if(user._id === dataToEdit._id){
           return {...dataToEdit}
      }else{
        return user
      }
    }))

    setIsModalOpen(false);
  }
  useEffect(async () => {
    console.log("App useEffect");
    setLoading(true);
    let response = await callApi("http://localhost:3001/getAll");

    console.log('user date', response[0].DOB)


    setUsers(response.map(res => ({...res, DOB: new Date(res.DOB).toISOString().split('T')[0]})))
    // setUsers(response.map(res => ({...res, DOB: new Date(res.DOB).toLocaleDateString("en-US", {  year: 'numeric', month: 'long', day: 'numeric' })})));
    setLoading(false);
    console.log("Call Api response", response);
  }, []);

  const columns = [
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 250 },
    { field: "mobile", headerName: "Mobile", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "DOB",
      headerName: "Dob",
      type: "date",
      width: 150,
    },
    {
      field: 'delete',
      headerName: "Delete",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Button  variant='contained' onClick={(event) => {
            handleClick(event, cellValues);
          }} color="error">delete</Button>
  
        );
      }
    },
  {
      field: 'update',
      headerName: "Update",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Button  variant='contained' color='warning' onClick={(event) => {
            handleOpen(event, cellValues);
          }}>update</Button>
  
        );
      }
    }
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>

      <ModalForm isModalOpen={isModalOpen}  dataToEdit={dataToEdit} handleClose={handleClose}  handleOpen={handleOpen} handleChange={handleChange} />
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
        editMode="row"
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          sx={{
            color: "white",
          }}
        />
      )}
    </div>
  );
}
