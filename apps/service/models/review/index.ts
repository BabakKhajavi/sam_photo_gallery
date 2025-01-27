import { IReview } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IReviewCreationAttributes extends Optional<IReview, 'id'> {}

class Review
  extends Model<IReview, IReviewCreationAttributes>
  implements IReview
{
  public id!: number;
  public stars!: number;
  public source!: string;
  public description!: string;
  public link!: string;
  public owner!: string;
  public is_approved!: boolean;
  static initialize(sequelize: Sequelize) {
    Review.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        stars: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        source: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        link: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        owner: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_approved: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'review',
        timestamps: false,
      }
    );
  }
}

export { Review };
