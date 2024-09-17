import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteMake, fetchMakes } from "../redux/actions";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Container, Menu, MenuItem, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const Import = (props) => {
  // fill out this component

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleDelete = () => {
    props.deleteMake(selectedIndex);
    handleClose();
  };

  useEffect(() => {
    props.fetchMakes();
  });
  return (
    <Container>
        <h2>COUNT: {props.makes.length}</h2>
      <Button variant="contained" color="primary" onClick={props.fetchMakes}>
        Import
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Make</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.makes.map((make, index) => (
            <TableRow key={index}>
              <TableCell>{make.MakeId}</TableCell>
              <TableCell>{make.MakeName}</TableCell>
              <TableCell>
                {/* Add any actions you want here */}
                <IconButton onClick={(event) => handleClick(event, index)}>
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    makes: state.makes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMakes: () => dispatch(fetchMakes()),
    deleteMake: (index) => dispatch(deleteMake(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Import);
