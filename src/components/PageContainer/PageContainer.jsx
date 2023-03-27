import css from './PageContainer.module.css';

const PageContainer = ({ children, centerContent }) => {
  return <div className={css.container + ' ' + css.center}>{children}</div>;
};

export default PageContainer;
