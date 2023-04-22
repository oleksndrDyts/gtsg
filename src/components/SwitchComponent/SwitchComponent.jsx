const SwitchComponent = ({ caseTo, arrayOfItems }) => {
  const obj = arrayOfItems.reduce((acc, item) => {
    if (!Array.isArray(item.caseTo)) {
      return { ...acc, [item.caseTo]: item.childs };
    } else {
      const res = item.caseTo.reduce(
        (acc, el) => ({
          ...acc,
          [el]: item.childs,
        }),
        {}
      );
      return { ...acc, ...res };
    }
  }, {});

  return <>{obj[caseTo]}</>;
};

export default SwitchComponent;
