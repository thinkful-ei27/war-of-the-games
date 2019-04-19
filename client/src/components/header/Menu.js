import React from "react";
import ConnectedMenuItem from "./MenuItem";

export default function Menu(props) {
  const { menuItems } = props;
  const menuLinks = menuItems.map(item => (
    <ConnectedMenuItem
      name={item.name}
      link={item.link}
      key={item.key}
      passedProps={props}
    />
  ));
  return <ul className="nav-container">{menuLinks}</ul>;
}
