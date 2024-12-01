import { useRef } from "react";
import PropTypes from 'prop-types';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame} from "framer-motion";
import { wrap } from "@motionone/utils";

ParallaxText.propTypes = {
  children: PropTypes.node.isRequired,
  baseVelocity: PropTypes.number
};

/**
 * ParallaxText.jsx
 * 
 * ParallaxText component creates a parallax scrolling effect for its children elements.
 * 
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed within the parallax effect.
 * @param {number} [props.baseVelocity=100] - The base velocity for the parallax scrolling effect.
 * 
 * @returns {JSX.Element} The rendered ParallaxText component.
 */

const ParallaxText = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

export default ParallaxText;
