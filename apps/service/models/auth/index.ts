import { IUser } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IUserCreationAttributes extends Optional<IUser, 'id'> {}

class User extends Model<IUser, IUserCreationAttributes> implements IUser {
  public id!: number;
  public username!: string;
  public password!: string;
  public first_name!: string;
  public last_name!: string;
  public role!: string;
  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'users',
        timestamps: false,
      }
    );
  }
}

export { User as Auth };
