import { IAdvertisement } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IAdvertisementCreationAttributes
  extends Optional<IAdvertisement, 'id'> {}

class Advertisement
  extends Model<IAdvertisement, IAdvertisementCreationAttributes>
  implements IAdvertisement
{
  public id!: number;
  public type!: string;
  public htmlContent!: string;
  public styles!: string;

  static initialize(sequelize: Sequelize) {
    Advertisement.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        type: DataTypes.STRING,
        htmlContent: DataTypes.STRING,
        styles: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'advertisement',
        timestamps: false,
      }
    );
  }
}
export { Advertisement };
