'use client'

import { FC } from 'react';

import styles from "./loading-spinner.module.scss";

/**
 * LOADING SPINNER COMPONENT
 * 
 * Simple loading spinner to be displayed when waiting for an asynchronous task to complete.
 * 
 * The CSS was grabbed from https://loading.io/css/
 */
export const LoadingSpinner: FC = () => {
  return (
    <div>
      <div className={styles["lds-ring"]}><div></div><div></div><div></div><div></div></div>
    </div>
  );
}