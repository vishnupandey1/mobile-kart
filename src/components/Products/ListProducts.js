import React from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PreviewCard from './PreviewCard';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { getCards } from '../lib/Service';

import styles from './ListProducts.module.css';

const custStyles = {
  load_more: {
    backgroundColor: '#2c3e50',
    color: 'white',
    margin: '20px',
    left: '45%'
  }
}

class ListProducts extends React.Component {

  state = {
    items:[],
    page:1,
    showLaodMore: true,
    showLaoder: true,
  }
 
   async componentDidMount () {
    const items = await getCards(this.state.page);
    this.setState({
      items:  items.products,
      showLaoder: false
    });
   }

    getGridListCols = () => {
     if (isWidthUp('lg', this.props.width)) {
       return 4;
     }
     if (isWidthUp('md', this.props.width)) {
       return 2;
     }
     return 1;
    }

   onLoadMore = async () => {
     let page = this.state.page + 1;
     let items = this.state.items;
     
     const updatedItem = await getCards(page);
     if (updatedItem.products.length === 0){
       this.setState({
         showLaodMore: false,
         showLaoder: false,
       });
       return;
     }
     items = items.concat(updatedItem.products);
     this.setState({items, page, showLaoder: false });
     
   }
  render () {
    const { items, showLaodMore, showLaoder } = this.state;

    return (
     <React.Fragment>
      <Grid xs item className={styles.grid}>
        <GridList
          spacing={20}
          className={styles.grid_list}
          cellHeight="auto"
          cols={this.getGridListCols()}
        >
          { items.map(tile => (
            <GridListTile
              className={styles.grid_list_tile}
              key={tile._id}
            >
              <PreviewCard 
                cardData={tile}
              />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
      { showLaoder && (
        <Grid xs={12} item >
          <CircularProgress
            className={styles.loader} 
          />
        </Grid>
      )}
      <Grid xs={12} item >
        { showLaodMore && (
          <Button
            variant="outlined"
            size="medium"
            style={custStyles.load_more}
            onClick={ () => this.setState({ showLaoder: true }, this.onLoadMore)}
          >
            LOAD MORE
          </Button>
        )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withWidth()(ListProducts);