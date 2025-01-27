import { IJumbotron } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IJumbotronCreationAttributes extends Optional<IJumbotron, 'id'> {}

class Jumbotron
  extends Model<IJumbotron, IJumbotronCreationAttributes>
  implements IJumbotron
{
  public id!: number;
  public title!: string;
  public subtitle!: string;
  public media!: string;
  public is_main_jumbotron!: boolean;
  public subcategory_id!: number;
  static initialize(sequelize: Sequelize) {
    Jumbotron.init(
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
        subtitle: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        media: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_main_jumbotron: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        subcategory_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'jumbotron',
        timestamps: false,
      }
    );
  }
}
export { Jumbotron };
