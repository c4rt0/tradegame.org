import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, roundness, textColor, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button 
      style={{
        fontFamily: "'Nunito Sans', 'Helvetica Neue', Helvetica, Arial",
        cursor: "pointer",
        display: "inline - block",
        lineHeight: "1",
        padding : `${props.padd}`,
        fontWeight : `${props.fontWeight}`,
        color : `${props.color}`,
        backgroundColor : `${props.bgColor}`,
        border: `${props.border}`,
        width : `${props.width}`,
        borderRadius:`${props.borderRadius}`
      }}
      type="button"
      className={[ `${props.hoverTextColor}`, 'storybook-button', `storybook-button--${size}`, `storybook-button--${textColor}`, `storybook-button--${roundness}`, mode].join(' ')}
      {...props}
    >
      {label}
    </button >
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  roundness: PropTypes.oneOf(['highRoundness', 'lowRoundness']),
  textColor: PropTypes.oneOf(['black', 'white'])

};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
