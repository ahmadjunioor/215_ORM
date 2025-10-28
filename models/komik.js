module.exports = (sequelize, DataTypes) => {
    const Komik = sequelize.define("Komik",{
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
      allowNull: false
        },
        tittle:{
            type:DataTypes. STRING,
        },
        description: {
            type:DataTypes. STRING,
        },
        author:{
            type: DataTypes.STRING,
        }
    });
    return Komik;
};