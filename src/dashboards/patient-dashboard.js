import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { CssBaseline, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SignIn from '../../pages/login';
import Router from 'next/router';
import DemoTable from '../tables/DemoTable';
import BrandListTable from '../tables/BrandListTable';

import logout from '../logout';
import { FormControlLabel } from '@material-ui/core';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function PatientDashboard(props) {
  const [isOrient, setIsOrient] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('isOrient', isOrient);
  }, [isOrient])

  var handleChange = (change) => {
    setIsOrient(change.target.value);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          
          {/* Dashboard Title */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
            onClick={() => {
              Router.push({
                pathname: '/dashboard'
              })
            }}
          >
            Dashboard
          </Typography>

          {/* Apppointment Button */}
          <Typography>
            <MenuItem onClick={() => {
              Router.push({
                pathname: '/appointment'
              })
            }}
            >
              Appointment
            </MenuItem>
          </Typography>
                  
          {/* Log Out Button */}
          <Typography>
            <MenuItem onClick={logout}>
              Log Out
            </MenuItem>
          </Typography>
          
            <Box sx={{ minWidth: 120, paddingTop: '1%', paddingBottom: '1%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={isOrient}
                label="Database"
                onChange={handleChange}
              >
                <MenuItem value={false}>Polystore</MenuItem>
                <MenuItem value={true}>Multimodel</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
        <Box sx={{ my: 2, marginLeft: '20px', marginRight: '20px' }}>
          {props.children}
        </Box>
    </Box>
  );
}
