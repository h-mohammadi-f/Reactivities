
import { Group } from '@mui/icons-material';
import { Box, AppBar, Toolbar, Typography, Container, MenuItem } from '@mui/material';
import { NavLink } from 'react-router';
import MenuItemLink from '../shared/components/MenuItemLink';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(to right,rgb(17, 32, 241),rgb(175, 25, 245))' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem component={NavLink} to='/' sx={{ display: 'flex', gap: '2' }}>
                <Group fontSize='large' />
                <Typography variant="h4" fontWeight={"bold"}>
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <MenuItemLink to='/activities' >
                Activities
              </MenuItemLink>
              <MenuItemLink to='/createActivity' >
                Create Activity
              </MenuItemLink>
            </Box>
            <MenuItem>
              user menue
            </MenuItem>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
