import React from 'react'
import { connect } from "react-redux";
import './styles/sprites.css'
export class Sprites extends React.Component {

  render() {

    return (
      <form name="sprite-form">
        <p>Select an avatar</p>
        <div className="cc-selector-2">
          <input id="visa2" type="radio" name="creditcard" value="visa" />
          <label id="drinkcard-cc visa" for="visa2"></label>
          <input id="mastercard2" type="radio" name="creditcard" value="mastercard" />
          <label id="drinkcard-cc mastercard" for="mastercard2"></label>
        </div>
        <button type="submit">set avatar</button>
      </form>

    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Sprites);