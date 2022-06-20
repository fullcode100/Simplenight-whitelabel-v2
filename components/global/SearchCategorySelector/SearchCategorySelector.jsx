import React from 'react';
import cx from 'classnames';

import { useSelector } from 'react-redux';
import { getFeatures } from '/store/selectors/core';
import { categoryOptions } from '../../../providers/categoryProvider';

import styles from './SearchCategorySelector.module.scss';

const SearchCategorySelector = ({ searchType, onItemClick, className }) => {
  const features = useSelector(getFeatures);

  return (
    <>
      <div className={cx(styles.content, className)}>
        {categoryOptions.map((item) => {
          return features[item.value] ? (
            <div
              className={cx(styles.searchType, {
                [styles.selectedSearchType]: item.value === searchType,
              })}
              onClick={() => onItemClick(item.value)}
              key={item.name}
            >
              <div
                className={
                  item.value === searchType ? styles.selectedIcon : styles.icon
                }
              >
                {item.value === searchType ? item.selectedIcon : item.icon}
              </div>
              <div className={styles.text}>{item.name}</div>
            </div>
          ) : (
            ''
          );
        })}
        {/* <ComingSoonTab /> */}
      </div>
    </>
  );
};

export default SearchCategorySelector;
