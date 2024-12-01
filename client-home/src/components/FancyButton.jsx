import '../styles/FancyButton.css';
import PropTypes from 'prop-types';

/**
 * FancyButton.jsx
 * 
 * FancyButton component renders a button with dynamic styling based on mouse movement.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.color - The color to be applied to the button.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * 
 * @returns {JSX.Element} The rendered FancyButton component.
 */

const FancyButton = ({ color, children }) => {
  const onMouseMove = (e) => {
    const btn = e.currentTarget; 
    const rect = btn.getBoundingClientRect(); 
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;

    // Update CSS custom properties for dynamic styling
    btn.style.setProperty('--x', `${x}px`);
    btn.style.setProperty('--y', `${y}px`);
  };

  return (
    <button
      className="fancy-button w-full px-10 py-3 hover:scale-105 cursor-pointer"
      style={{ '--clr': color }}
      onMouseMove={onMouseMove}
      aria-label="Fancy Button"
    >
      <span className="flex justify-center">{children}</span>
    </button>
  );
};

FancyButton.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FancyButton;
