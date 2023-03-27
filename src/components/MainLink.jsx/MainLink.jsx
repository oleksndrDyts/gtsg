import { NavLink } from 'react-router-dom';

import css from './MainLink.module.css';

const MainLink = ({ children }) => {
  return (
    <NavLink end to="/game" className={css.link}>
      {children}
    </NavLink>
  );
};

export default MainLink;
