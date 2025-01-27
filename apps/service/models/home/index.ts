import { IHome } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IHomeCreationAttributes extends Optional<IHome, 'id'> {}

class Home extends Model<IHome, IHomeCreationAttributes> implements IHome {
  public id!: number;
  public title!: string;
  public description!: string;
  public subtitle!: string;
  public media!: string;
  static initialize(sequelize: Sequelize) {
    Home.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subtitle: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        media: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'subcategory',
        timestamps: false,
      }
    );
  }
}

export { Home };
