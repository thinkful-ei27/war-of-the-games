import React from 'react'
import { connect } from "react-redux";
import './styles/sprites.css'
export class Sprites extends React.Component {

  render() {

    return (
      <form name="sprite-form">
        <p>Select an avatar</p>
        <div className="cc-selector">
          <input id="visa" type="radio" name="credit-card" value="visa" />
          <label className="drinkcard-cc visa" for="visa"></label>
          <input id="mastercard" type="radio" name="credit-card" value="mastercard" />
          <label className="drinkcard-cc mastercard" for="mastercard"></label>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Sprites);