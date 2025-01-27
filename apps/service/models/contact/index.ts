import { IContact } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IContactCreationAttributes extends Optional<IContact, 'id'> {}

class Contact
  extends Model<IContact, IContactCreationAttributes>
  implements IContact
{
  public id!: number;
  public phone!: string;
  public email!: string;
  public address!: string;
  public facebook!: string;
  public instagram!: string;
  public linkedin!: string;
  public youtube!: string;
  public is_main!: boolean;
  static initialize(sequelize: Sequelize) {
    Contact.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        facebook: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        instagram: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        linkedin: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        youtube: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        is_main: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'contact',
        timestamps: false,
      }
    );
  }
}

export { Contact };
