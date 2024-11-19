// faker-script.cjs
const { faker } = require("@faker-js/faker");

function generateUserData() {
  return {
    name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    rol: "user",
    password: "password123",
  };
}
module.exports = { generateUserData };
