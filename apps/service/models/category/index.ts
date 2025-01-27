import { ICategory } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ICategoryCreationAttributes extends Optional<ICategory, 'id'> {}

class Category
  extends Model<ICategory, ICategoryCreationAttributes>
  implements ICategory
{
  public id!: number;
  public title!: string;
  static initialize(sequelize: Sequelize) {
    Category.init(
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
      },
      {
        sequelize,
        modelName: 'category',
        timestamps: false,
      }
    );
  }
}

export { Category };
