import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses, DrawerProps } from '@mui/material/Drawer';

interface CustomDrawerProps extends DrawerProps {
    width?: number;
}

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'width', 
  })<CustomDrawerProps>(({ theme, width }) => ({
    width: width || 300,
    flexShrink: 0,
    boxSizing: 'border-box',
    marginTop: theme.spacing(10),
    [`& .${drawerClasses.paper}`]: {
      width: width || 300,
      boxSizing: 'border-box',
      backgroundColor: 'inherit'
    },
}));

export default Drawer;
