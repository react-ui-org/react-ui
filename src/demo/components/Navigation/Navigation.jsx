import PropTypes from 'prop-types';
import React from 'react';
import styles from './Navigation.scss';

const Navigation = (props) => (
  <div>
    <h1 className={styles.headline}>React UI</h1>
    <ul className={styles.root}>
      {props.items.map((item) => (
        <li key={item.link}>
          <a href={item.link} className={styles.navigationLink}>{item.title}</a>
          {item.items && (
            <ul className={styles.subnavigation}>
              {item.items.map((nestedItem) => (
                <li key={nestedItem.link}>
                  <a href={nestedItem.link} className={styles.subnavigationLink}>
                    {nestedItem.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </div>
);

Navigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })),
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default Navigation;
