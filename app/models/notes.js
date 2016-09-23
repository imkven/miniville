// Example model


module.exports = function (sequelize, DataTypes) {

  var Notes = sequelize.define('Notes', {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return Notes;
};
