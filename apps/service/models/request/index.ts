import { IRequest } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IRequestCreationAttributes extends Optional<IRequest, 'id'> {}

class Request
  extends Model<IRequest, IRequestCreationAttributes>
  implements IRequest
{
  public id!: number;
  public number!: string;
  public datetime!: string;
  public is_online!: boolean;
  public seen!: boolean;
  public customer_name!: string;
  public email!: string;
  public phone!: string;
  public phone_alt!: string;
  public schedule!: string;
  public note!: string;
  public media1!: string;
  public media2!: string;
  public media3!: string;
  public subcategories!: string;
  public city_id!: number;
  static initialize(sequelize: Sequelize) {
    Request.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        datetime: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_online: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        seen: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        customer_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone_alt: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        schedule: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        note: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        media1: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        media2: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        media3: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        subcategories: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'request',
        timestamps: false,
      },
    );
  }
}

export { Request };
