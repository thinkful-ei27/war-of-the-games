import React from "react";

const style = {
  listContainer: {
    listStyle: "none",
    paddingLeft: 0
  }
};

export default function MultiselectCheckbox({ options, onChange }) {
  const [platforms, setData] = React.useState(options);

  const toggle = item => {
    platforms.forEach((_, key) => {
      if (platforms[key].label === item.label) {
        platforms[key].checked = !item.checked;
      }
    });
    setData([...platforms]);
    onChange(platforms);
  };

  return (
    <ul
      style={style.listContainer}
      className="flex flex-row flex-wrap justify-between"
    >
      {platforms.map(item => {
        return (
          <li key={item.label} className="p-2">
            <label htmlFor={`platform-${item.id}`}>
              <input
                type="checkbox"
                className="nes-checkbox"
                id={`platform-${item.id}`}
                onChange={() => toggle(item)}
              />
              <span>{item.label}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
