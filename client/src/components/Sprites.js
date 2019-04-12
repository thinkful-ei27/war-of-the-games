/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import "./styles/sprites.css";

export default function Sprites() {
  return (
    <div className="form-input">
      <div className="profile-selector">
        <label className="avatar demon" htmlFor="demon" />
        <input id="demon" type="radio" name="profile-pic" value="demon" />

        <input id="knight" type="radio" name="profile-pic" value="knight" />
        <label className="avatar knight" htmlFor="knight" />

        <input
          id="bigZombie"
          type="radio"
          name="profile-pic"
          value="bigZombie"
        />
        <label className="avatar bigZombie" htmlFor="bigZombie" />

        <input
          id="femaleElf"
          type="radio"
          name="profile-pic"
          value="femaleElf"
        />
        <label className="avatar femaleElf" htmlFor="femaleElf" />

        <input
          id="femaleWizard"
          type="radio"
          name="profile-pic"
          value="femaleWizard"
        />
        <label className="avatar femaleWizard" htmlFor="femaleWizard" />

        <input id="maleElf" type="radio" name="profile-pic" value="maleElf" />
        <label className="avatar maleElf" htmlFor="maleElf" />

        <input
          id="maleWizard"
          type="radio"
          name="profile-pic"
          value="maleWizard"
        />
        <label className="avatar maleWizard" htmlFor="maleWizard" />

        <input id="ogre" type="radio" name="profile-pic" value="ogre" />
        <label className="avatar ogre" htmlFor="ogre" />

        <input id="shaman" type="radio" name="profile-pic" value="shaman" />
        <label className="avatar shaman" htmlFor="shaman" />
      </div>
    </div>
  );
}
