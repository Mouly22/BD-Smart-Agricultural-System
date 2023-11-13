import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';

const AddAdminsButton: React.FC = () => {
  return (
    <>
    <Typography variant="h4" component="div" gutterBottom>
          Add New Admin
    </Typography>
    <Link to="/add_admins">
      <Button variant="contained" color="primary">
        Add Admins
      </Button>
    </Link>
    </>
  );
};

export default AddAdminsButton;