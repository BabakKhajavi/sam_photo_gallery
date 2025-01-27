import { IApproach } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IApproachCreationAttributes extends Optional<IApproach, 'id'> {}

class Approach
  extends Model<IApproach, IApproachCreationAttributes>
  implements IApproach
{
  public id!: number;
  public step!: number;
  public title!: string;
  public summary!: string;
  public description!: string;
  public media!: string;
  static initialize(sequelize: Sequelize) {
    Approach.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        step: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        summary: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        media: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'approach',
        timestamps: false,
      }
    );
  }
}

export { Approach };
