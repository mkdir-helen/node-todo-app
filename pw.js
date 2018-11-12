const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync('poopface', salt);
console.log(hash);

// const didMatch = bcrypt.compareSync('poopface', hash);
// hash = bcrypt.hashSync('poopface', salt);
// console.log(hash);

// if (didMatch){
//     console.log('Yay!');
// }else{
//     console.log('shit');
// }