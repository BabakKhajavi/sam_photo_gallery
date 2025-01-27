import { IAddress } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IAddressCreationAttributes extends Optional<IAddress, 'id'> {}

class Address
  extends Model<IAddress, IAddressCreationAttributes>
  implements IAddress
{
  public id!: number;
  public line1!: string;
  public line2!: string;
  public province!: string;
  public zip!: string;
  public city_id!: number;
  public request_id!: number;
  static initialize(sequelize: Sequelize) {
    Address.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        line1: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        line2: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        province: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        zip: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        city_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        request_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'address',
        timestamps: false,
      }
    );
  }
}

export { Address };
