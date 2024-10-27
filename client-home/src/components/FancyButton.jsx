import '../styles/FancyButton.css';
import PropTypes from 'prop-types';
//FancyButton.jsx

const FancyButton = ({ color, children }) => {
  const onMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btn.style.setProperty('--x', `${x}px`);
    btn.style.setProperty('--y', `${y}px`);
  };

  return (
    <button className=''>
    <a className="fancy-button w-full px-10 py-3 hover:scale-105 cursor-pointer"
      style={{ '--clr': color }} 
      onMouseMove={onMouseMove}>
      <span className='flex justify-center'>{children}</span>
    </a>
    </button>
  );
};

FancyButton.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FancyButton;
