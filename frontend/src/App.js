import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { callApi } from "./common/api";
import CircularProgress from "@mui/material/CircularProgress";
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from "@mui/material/Button";
import ModalForm from "./components/ModalForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const rows = [
  { id: "steeel", name: "Snow", firstName: "Jon", age: 35, delete: "iocn" },
  { id: "s", name: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, name: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, name: "Stark", firstName: "Arya", age: 16 },
  { id: 5, name: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, name: "Melisandre", firstName: null, age: 150 },
  { id: 7, name: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, name: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, name: "Roxie", firstName: "Harvey", age: 65 },
];

const inputFields = ["name", "email", "age", "mobile", "DOB"];
export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createData, setCreateData] = useState({});

  const handleClick = async (e, value) => {
    console.log("cliked", value);
    let response = await callApi(
      `http://localhost:3001/delete/${value.row._id}`,
      "delete"
    );
    console.log("delete response", response);

    setUsers(users.filter((user) => user._id !== value.row._id));

    toast.warning('User is deleted')
  };

  // handle input change on create
  const handleCreateChange = (e) => {
    setCreateData({ ...createData, [e.target.name]: e.target.value });
    console.log("single create data", e.target.value, e.target.name);
  };

  // handle input change on update
  const handleChange = (e) => {
    setDataToEdit({ ...dataToEdit, [e.target.name]: e.target.value });
    console.log("diss", e.target.value, e.target.name);
  };

  const handleOpen = (e, value) => {
    console.log("value", value);
    setDataToEdit(value.row);
    setIsModalOpen(true);
  };

  // call when update modal is closed
  const updateDataIntoDataBase = async () => {
    console.log("closed chala");

    if (validation(dataToEdit, inputFields)) {
      let response = await callApi(
        `http://localhost:3001/update/${dataToEdit._id}`,
        "put",
        dataToEdit
      );

      setUsers(
        users.map((user) => {
          if (user._id === dataToEdit._id) {
            return { ...dataToEdit };
          } else {
            return user;
          }
        })
      );

      setIsModalOpen(false);
    }


    toast.info('User is updated')

  };

  // call on UI load
  useEffect(async () => {
    console.log("App useEffect");
    setLoading(true);
    let response = await callApi("http://localhost:3001/getAll");

    console.log("user date", response?.length && response[0]?.DOB);

    if (response?.length) {
      setUsers(
        response.map((res) => ({
          ...res,
          DOB: new Date(res.DOB).toISOString().split("T")[0],
        }))
      );
    }

    // setUsers(response.map(res => ({...res, DOB: new Date(res.DOB).toLocaleDateString("en-US", {  year: 'numeric', month: 'long', day: 'numeric' })})));
    setLoading(false);
    console.log("Call Api response", response);
  }, []);

  // columns of the table
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
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
            color="error"
          >
            delete
          </Button>
        );
      },
    },
    {
      field: "update",
      headerName: "Update",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="warning"
            onClick={(event) => {
              handleOpen(event, cellValues);
            }}
          >
            update
          </Button>
        );
      },
    },
  ];

  const validation = (data, fields) => {
    console.log("inside validation function");

    let validationCheck = fields;
    let totalCheck = 0;

    validationCheck.every((field) => {
      try {
        console.log("createData.field", data[field], data);
        if (data[field]) {
          totalCheck = totalCheck + 1;
        }
      } catch (e) {
        console.log("error", e);
        console.log("please fill all the details");
        toast.error("Please fill all the details");
        return false;
      }
      return true;
    });
    if (totalCheck !== fields?.length) {
      console.log("totalCheck", totalCheck);
      toast.error("Please fill all the details");
      return false;
    }
    return true;
  };

  const createDataIntoDatabase = async () => {
    console.log("calling validation function");

    if (validation(createData, inputFields)) {
      let res = await callApi(
        "http://localhost:3001/add",
        "post",
        createData
      );
      console.log("create res =====", res);

      if(res?.error){
         toast.error(res?.msg)
         return
      }

       res =  res?.data
     
      console.log('res.DOB', res.DOB  )
      console.log("final Users", [...users,  {...res  ,  DOB: new Date(res.DOB).toISOString().split("T")[0] }]);
      setUsers([...users,  {...res  ,  DOB: new Date(res.DOB).toISOString().split("T")[0] }]);
      setIsCreateModalOpen(false);
      setCreateData({});
      toast.success('User is successfully created')

    }
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // fill random data in the form
  const fillRandomData = () => {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + month + "-" + day;
    setCreateData({
      name: "mnaya",
      email: "manya@gmail.com",
      mobile: 902922,
      age: 12,
      DOB: today,
    });
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsCreateModalOpen(false);
  };


  const deleteAllData = async () => {

    if(users?.length){
      const res =  await axios.delete('http://localhost:3001/deleteAll')    
      console.log('deleteAllData response', res);
      setUsers([])
    }else{
      toast.info('No data is available')
    }
    
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <ToastContainer />

      <h1
        style={{ textAlign: "center", color: "bisque", position: "relative" }}
      >
        User Management
      </h1>

      <Button
        onClick={deleteAllData}
        style={{
          // float: "right",
          position: "absolute",
          top: "25px",
          right: "210px",
          background: "red",
        }}
        variant="contained"
        color="success"
      >
        Delete All
      </Button>
      <Button
        onClick={openCreateModal}
        style={{
          float: "right",
          position: "absolute",
          top: "25px",
          right: "40px",
          background: "darkviolet",
        }}
        variant="contained"
        color="success"
      >
        Create User
      </Button>

      <ModalForm
        isModalOpen={isModalOpen}
        dataToEdit={dataToEdit}
        handleClose={handleClose}
        // handleOpen={handleOpen}
        handleChange={handleChange}
        onSaveButtonClick={updateDataIntoDataBase}
      />
      <ModalForm
        fillRandomData={fillRandomData}
        create={true}
        isModalOpen={isCreateModalOpen}
        dataToEdit={createData}
        handleClose={handleClose}
        // handleOpen={handleOpen}
        handleChange={handleCreateChange}
        onSaveButtonClick={createDataIntoDatabase}
      />
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
