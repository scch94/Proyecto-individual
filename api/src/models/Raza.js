const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Raza', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
    },
    name:{
      type:DataTypes.STRING(),
      allowNull: false,
    },
    height:{
      type:DataTypes.STRING(),
      allowNull: false,
    },
    weight:{
      type:DataTypes.STRING(),
      allowNull:false
    },
    life_span:{
      type:DataTypes.STRING()
    },
    image:{
      type:DataTypes.STRING(),
      defaultValue:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxxMNmdm1CZRVePLGqn8zTvIT7PE3F_VB9Ow&usqp=CAU"
    }
  });
};
