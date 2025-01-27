import { ICity } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ICityCreationAttributes extends Optional<ICity, 'id'> {}

class City extends Model<ICity, ICityCreationAttributes> implements ICity {
  public id!: number;
  public name!: string;
  static initialize(sequelize: Sequelize) {
    City.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'city',
        timestamps: false,
      }
    );
  }
}

export { City };
