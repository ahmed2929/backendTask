const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const DataObject = sequelize.define("DataObject", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Level = sequelize.define("Level", {
  levelID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  levelName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Element = sequelize.define("Element", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parentId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Elements",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
});

DataObject.hasMany(Level);
Level.belongsTo(DataObject);
Level.hasMany(Element);
Element.belongsTo(Level);
Element.belongsTo(Element, { as: "Parent" });

sequelize
  .sync({ force: false })
  .then(() => console.log("Tables created successfully"))
  .catch((error) => console.error("Error creating tables:", error));

module.exports = { DataObject, Level, Element };