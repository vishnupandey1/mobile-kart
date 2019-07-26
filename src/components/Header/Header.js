import React from 'react';
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import styles from './Header.module.css';

const Header = () => {
  return (
   <AppBar color="default" position="fixed">
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6">
            <Link 
              className={styles.link}
              to={'/'}
            >
              E-KART
            </Link>
          </Typography>
          <div>
            <Link 
              className={styles.link}
              to={'/'}
            >
              <Button
                color="inherit"
              >
                HOME
              </Button>
            </Link>
            <Button color="inherit">ABOUT</Button>
            <Button color="inherit">CONTACT</Button>
            <Button color="inherit">BAG</Button>
          </div>
        </Toolbar>
      </AppBar>
  );
}

export default Header;