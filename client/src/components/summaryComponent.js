import React from "react";

export default function SummaryComponent(props) {
  const { summary } = props;

  const maxLength = 200; // maximum number of characters to extract

  // trim the string to the maximum length
  let trimmedString = summary.substr(0, maxLength);

  // re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
  );

  return <div className="summary-div">{trimmedString.concat("...")}</div>;
}
