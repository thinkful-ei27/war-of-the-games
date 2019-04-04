const bcrypt = require("bcryptjs");

const password = "baseball";

/* Hash a password with cost-factor 10 */
bcrypt
  .hash(password, 10)
  .then(digest => {
    console.log("digest:", digest);
  })
  .catch(err => {
    console.error("error", err);
  });
