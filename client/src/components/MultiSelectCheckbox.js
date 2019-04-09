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
    platforms.map((_, key) => {
      if (platforms[key].label === item.label)
        platforms[key].checked = !item.checked;
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
          <li key={item.label} onClick={() => toggle(item)} className="p-2">
            <input
              readOnly
              type="checkbox"
              checked={item.checked || false}
              className="nes-checkbox"
            />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
