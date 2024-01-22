const table = 'employees';
const listArray = [
  {
    email: 'admin@gmail.com',
    password: '$2a$08$dQWrGSXodiFE5gn7jphCB.tAFU30pzBRSueeBewbhTxfEnr8l/1FK',
    firstname: 'admin',
    lastname: 'admin',
    status: 'active',
    phoneNumber: '4343342222',
    dateOfBirth : "08-05-1999",
    gender : "male",
    address : "indore",
    role: 'admin',
  },
];
const data = listArray.map((element) => ({
  email: element.email,
  password: element.password,
  firstname: element.firstname,
  phoneNumber: element.phoneNumber,
  role: element.role,
  status: element.status,
  dateOfBirth : element.dateOfBirth,
  gender : element.gender,
  address : element.address,
  role : element.role,
}));

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(table, data, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(table, null, {}),
};
