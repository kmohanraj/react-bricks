import React from 'react';
import './button.scss';

export const Button = ({ label = '', customClass = '' }) => {
  return <button className={`btn ${customClass}`}>{label}</button>;
};
