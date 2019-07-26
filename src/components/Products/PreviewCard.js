import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';

import styles from './PreviewCard.module.css';

const PreviewCard = (props) => {

  const { _id, images, name, sale_price, mark_price, sale_msg } = props.cardData;

  return (
    <Link
      style={{textDecoration: 'none'}}
      to={`/products/${_id}`}
    >
      <Card  raised className={styles.card} >
        <CardActionArea>
          <CardMedia
            component="img"
            alt="mobile"
            height="250"
            style={{objectFit: 'contain'}}
            image={images[0]}
            title={name}
          />
          <CardContent>
            <h3 className={styles.name}>
              {name}
            </h3>
            <Divider/>
          </CardContent>
          <p style={{marginTop: '-10px'}}>
            <span className={styles.sale_price}>
              Rs. {sale_price.toFixed(2)}
            </span>
            <span className={styles.mark_price}>
              <strike>
                Rs. {mark_price.toFixed(2)}
              </strike>
            </span>
            <span className={styles.sale_msg}>
              ({sale_msg})
            </span>
          </p>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default PreviewCard;