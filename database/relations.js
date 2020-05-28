const { User, Review } = require('./models')

Review.belongsTo(User, { foreignKey: 'user_id', as: 'user'});

User.hasMany(Review, { foreignKey: 'user_id', as: 'review' });

console.log(Review)
console.log(User)