import React from 'react';
import idx from 'idx';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Carousel } from 'react-responsive-carousel';
import { getProductVariation } from '../lib/helper';

import styles from './ProductDetails.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const custStyles = {
  divider: {
    margin: '10px 30px 10px 0px',
  },
  active: {
    marginRight: '16px',
    marginBottom: '10px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    fontWeight: '500'
  },
  inactive: {
    marginRight: '16px',
    marginBottom: '10px',
  },
  paper: {
    width: '350px',
    height: '400px',
    borderRadius:'10%',
    margin: 'auto'
  },
  grid: {
    display: 'flex',
    justifyContent: 'center'
  }
};

class ProductDetails extends React.Component {

  state = {
    name: idx(this.props.details, _ => _.primary_product.name) || '',
    attributes: idx(this.props.details, _ => _.attributes) || [],
    options: idx(this.props.details, _ => _.options) || [],
    desc: idx(this.props.details, _ => _.primary_product.desc) || [],
    mark_price: idx(this.props.details, _ => _.primary_product.mark_price) || '',
    sale_price: idx(this.props.details, _ => _.primary_product.sale_price) || '',
    images: idx(this.props.details, _ => _.primary_product.images) || [],
    selected_option_ids: idx(this.props.details, _ => _.selected_option_ids) || [],
  }

  componentDidMount () {
    this.updatedItemDetail(this.state.selected_option_ids)
  }

  handleActiveTabChange = (id, tabName) => (e) => {

    let { selected_option_ids } = this.state;
    if (tabName === 'Storage') {
     selected_option_ids[0] = id;
    } else {
      selected_option_ids[1] = id;
    }

    this.updatedItemDetail(selected_option_ids);
  };

  updatedItemDetail = (selected_option_ids) => {
    const { product_variations } = this.props.details;

    let product_variation =  getProductVariation(product_variations, selected_option_ids);

    if (undefined === product_variation[0]) {
      return;
    }

    const { images, mark_price, name, sale_msg, sale_price } = product_variation[0];

    this.setState({
      images,
      mark_price,
      name,
      sale_msg,
      sale_price,
      selected_option_ids
    });
  }

  render() {

    const { sale_price, desc, name, mark_price, attributes, options, selected_option_ids } = this.state;

    const showTabButtons = attributes.map( attribute => {
      const tabAattribute = options.filter(option => option.attrib_id === attribute._id);

      const html = tabAattribute.map( btn => {
          let activeTab = false;
          if (selected_option_ids.includes(btn._id)) {
            activeTab = true;
          }

          return (
            <Button
              key={btn._id}
              variant="outlined"
              size="medium"
              onClick={this.handleActiveTabChange(btn._id, attribute.name)}
              style={activeTab ? custStyles.active : custStyles.inactive}
            >
              {btn.name}
            </Button>
          );
        });

       return (
         <React.Fragment key={attribute._id}>
           <Typography 
             variant="button"
             display="block"
             gutterBottom
           >
             {attribute.name}
           </Typography>
            {html}
         </React.Fragment>
       );
    });
 
    const discountPrice = mark_price - sale_price;
 
    return (
      <React.Fragment>
        <Grid container spacing={4}>
          <Grid item xs={12} sm style={custStyles.grid}>
            <Paper 
              elevation={3}
              style={custStyles.paper}
            >
              <Carousel 
                className={styles.res_carousel}
                showArrows={false}
                showStatus={false}
                showThumbs={false}
              >
                {this.state.images.map( (image, id) =>
                  <div key={`slider-${id}`}>
                    <img 
                      width="300"
                      height="300"
                      src={image} 
                      alt={"img"}
                      style={{objectFit: 'fill'}}
                    />
                  </div>
                )}
              </Carousel>
            </Paper>
          </Grid>
          <Grid item xs={12} sm container style={{paddingLeft: '30px'}}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h6"
              >
                {name}
              </Typography>
                <p className={styles.desc}>
                  {desc}
                </p>
              <Divider
                light
                variant="middle"
                style={custStyles.divider}
              />
              <div className={styles.price}>
                <span className={styles.sale_price}>
                  Rs. {sale_price.toFixed(2)}
                </span>
                <span className={styles.mark_price}>
                  Rs. {mark_price.toFixed(2)}
                </span>   
                <p className={styles.discount}>
                  You save Rs.{discountPrice.toFixed(2)} (10% Off)
                </p>
                <span 
                  className={styles.condition}
                >
                  *Local taxes included (wherever applicable)
                </span>
              </div>
              <Divider 
                light
                variant="middle"
                style={custStyles.divider}
              />
              {showTabButtons}
              <Divider 
                light
                variant="middle"
                style={custStyles.divider}
              />
              <Button
                variant="outlined"
                size="medium"
                style={custStyles.active}
              >
                ADD TO CART
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
  }
}

export default ProductDetails;
