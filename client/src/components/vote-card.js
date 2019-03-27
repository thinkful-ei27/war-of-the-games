import React from "react";

export default function VoteCard(props) {
  const { name, src } = props;

  return (
    <div>
      <span htmlFor={name}>{name}</span>
      <img name={name} src={src} alt={name} />
    </div>
  );
}
