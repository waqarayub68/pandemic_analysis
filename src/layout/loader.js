import React from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';
import styles from './style.module.css';

const Loader = ({ spinning = true, fullScreen }) => (
  <div>
    <Spin
      className={classNames(styles.loader, { [styles.hidden]: !spinning, [styles.fullScreen]: fullScreen })}
      size="large"
      spinning={spinning}
    />
  </div>
);

export default Loader;