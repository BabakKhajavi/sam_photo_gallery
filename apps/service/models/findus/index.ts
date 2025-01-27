import { IFindUs } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IContactCreationAttributes extends Optional<IFindUs, 'id'> {}

class FindUs
  extends Model<IFindUs, IContactCreationAttributes>
  implements IFindUs
{
  public id!: number;
  public type!: string;
  static initialize(sequelize: Sequelize) {
    FindUs.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'findus',
        timestamps: false,
      }
    );
  }
}

export { FindUs };
