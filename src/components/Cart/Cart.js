import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import ProductDetails from './ProductDetails';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getProductDetails } from '../lib/Service';
import Header from '../Header/Header';

import styles from './Cart.module.css';

const Cart = (props) => {

  const[details, setDetails] = useState('');
  const[showLaoder, setLaoderState] = useState(true);

  useEffect(() => {
    (async () => {
      const id = props.match.params.id
      const details = await getProductDetails(id);
      setDetails(details);
      setLaoderState(false);
    })();
  },[]);

  return (
    <div >
      <Header />
      { showLaoder && (
         <CircularProgress
           className={styles.loader}
         />
      )}
      { !showLaoder && (
        <Paper className={styles.paper}>
          <ProductDetails details={details} />
        </Paper>
      )}
    </div>
  );
}

export default Cart;