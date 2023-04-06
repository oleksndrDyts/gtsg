import { NavLink } from 'react-router-dom';

import css from './MainLink.module.css';

const MainLink = ({ children, shouldStart }) => {
  const className = shouldStart ? css.link : `${css.link} ${css.disabled}`;

  return (
    <NavLink end to="/game" className={className}>
      {children}
    </NavLink>
  );
};

export default MainLink;
