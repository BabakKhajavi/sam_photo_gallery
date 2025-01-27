import { IGallery } from '@packages/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IGalleryCreationAttributes extends Optional<IGallery, 'id'> {}

class Gallery
  extends Model<IGallery, IGalleryCreationAttributes>
  implements IGallery
{
  public id!: number;
  public title!: string;
  public subtitle!: string;
  public description!: string;
  public media!: string;
  public media_thumb!: string;
  public is_main!: boolean;
  public subcategory_id!: number;
  static initialize(sequelize: Sequelize) {
    Gallery.init(
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
        subtitle: {
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
        media_thumb: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_main: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        subcategory_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'gallery',
        timestamps: false,
      }
    );
  }
}

export { Gallery };
