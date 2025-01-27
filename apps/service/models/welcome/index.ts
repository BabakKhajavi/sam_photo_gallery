import { IWelcome } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IWelcomeCreationAttributes extends Optional<IWelcome, 'id'> {}

class Welcome
  extends Model<IWelcome, IWelcomeCreationAttributes>
  implements IWelcome
{
  public id!: number;
  public title!: string;
  public subtitle!: string;
  public description!: string;
  public sub_description!: string;
  public media!: string;
  static initialize(sequelize: Sequelize) {
    Welcome.init(
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
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sub_description: {
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
        modelName: 'welcome',
        timestamps: false,
      }
    );
  }
}
export { Welcome };
