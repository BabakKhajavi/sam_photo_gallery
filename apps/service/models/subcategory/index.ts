import { ISubcategory } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ISubcategoryCreationAttributes extends Optional<ISubcategory, 'id'> {}

class Subcategory
  extends Model<ISubcategory, ISubcategoryCreationAttributes>
  implements ISubcategory
{
  public id!: number;
  public title!: string;
  public description!: string;
  public category_id!: number;
  static initialize(sequelize: Sequelize) {
    Subcategory.init(
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
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'subcategory',
        timestamps: false,
      },
    );
  }
}
export { Subcategory };
