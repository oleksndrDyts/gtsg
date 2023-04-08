import css from './PageContainer.module.css';

const PageContainer = ({ children, centerContent, block }) => {
  if (block) {
    return (
      <>
        <div className={css.block}></div>
        <div className={css.container + ' ' + css.center}>{children}</div>
      </>
    );
  }

  return <div className={css.container + ' ' + css.center}>{children}</div>;
};

export default PageContainer;
