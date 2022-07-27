import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container,Paper,Button} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function BasicTextFields() {
  const paperStyle={padding:'50px 20px', width:500,margin:"20px auto"}
  const tableStyle={padding:'50px 20px', width:800,margin:"20px auto"}

  const [name,setname]=useState('');
  const [address,setaddress]=useState('');
  const [students,setstudents]=useState([]);



  const handleClick=(e)=>{
    e.preventDefault()
    const student={name,address}
    console.log(student)

    fetch("http://localhost:8090/student/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)
    }).then(()=>{
      console.log("ESTUDIANTE GURDADO")
    })
  }

  useEffect(()=>{
    fetch("http://localhost:8090/student/listar")
    .then(res=>res.json())
    .then((result)=>{
      setstudents(result);
    }
    )      
  },[])


  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Registrar Estudiantes</h1>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Nombre" variant="outlined"  
      value={name}
      onChange={(e)=>setname(e.target.value)}
      />
      <TextField id="outlined-basic" label="Direccion" variant="outlined" 
      value={address}
      onChange={(e)=>setaddress(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>Registrar</Button>
    </Box>
    </Paper>  
      <h2>Lista de Estudiantes</h2>
    <Paper elevation={3} style={tableStyle}>
      
    <TableContainer >
      <Table sx={{ minWidth:500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Direccion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </Container>
  );
}
