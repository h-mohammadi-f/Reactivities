
import { Group } from '@mui/icons-material';
import { Box, AppBar, Toolbar, Typography, Container, MenuItem, LinearProgress } from '@mui/material';
import { NavLink } from 'react-router';
import MenuItemLink from '../shared/components/MenuItemLink';
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';


export default function ButtonAppBar() {

  const { uiStore } = useStore()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative"
        sx={{ backgroundImage: 'linear-gradient(to right,rgb(17, 32, 241),rgb(175, 25, 245))' }}>
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
              <MenuItemLink to='/counter' >
                Counter
              </MenuItemLink>
            </Box>
            <MenuItem>
              user menue
            </MenuItem>
          </Toolbar>
        </Container>
        <Observer>
          {
            () => uiStore.isLoading ? (
              <LinearProgress color='secondary' sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 4
              }} />
            ) : (null)
          }
        </Observer>
      </AppBar>
    </Box>
  );
}
