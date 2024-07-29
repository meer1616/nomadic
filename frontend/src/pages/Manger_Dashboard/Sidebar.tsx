import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ListIcon from '@mui/icons-material/List';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '../../Context/Context';

const ManagerDashboardsidebar: React.FC = () => {
  const navigate = useNavigate();
  const { setFilter } = useFilter();

  const handleNavigation = (filter: string, path: string) => {
    setFilter(filter);
    navigate(path);
  };

  return (
    <Box sx={{ display: { xs: 'none', md: 'block' }, width: 250, background: grey[900], color: 'white', p: 2, boxShadow: '0px 0px 5px rgba(0, 0, 0, 1)'}} style={{background: "rgb(5 16 54)"}}>
      <List sx={{position: 'sticky', top: 80}}>
        <ListItem button onClick={() => handleNavigation('all', '/manage')}>
          <ListItemIcon sx={{ color: 'white' }}>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Listings" />
        </ListItem>
        <ListItem button onClick={() => navigate('/manage/create-package')}>
          <ListItemIcon sx={{ color: 'white' }}>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Tour Package" />
        </ListItem>
        <ListItem button onClick={() => navigate('/manage/add-tour')}>
          <ListItemIcon sx={{ color: 'white' }}>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Tour" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('', '/manage')}>
          <ListItemIcon sx={{ color: 'white' }}>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Active Tours" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('inactive', '/manage')}>
          <ListItemIcon sx={{ color: 'white' }}>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Inactive Tours" />
        </ListItem>
      </List>
    </Box>
  );
}

export default ManagerDashboardsidebar;

