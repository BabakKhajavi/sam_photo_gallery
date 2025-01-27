import { Sequelize } from 'sequelize';
import {
  Address,
  Category,
  Gallery,
  Advertisement,
  Jumbotron,
  Subcategory,
  Approach,
  Request,
  City,
  FindUs,
  Auth,
  Review,
  Welcome,
  Contact,
} from '.';

const createDatabaseAssociations = () => {
  //
  Gallery.belongsTo(Subcategory, {
    foreignKey: 'subcategory_id',
    as: 'subcategory',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });
  Subcategory.hasMany(Gallery, {
    foreignKey: 'subcategory_id',
    as: 'galleries',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });

  Category.hasMany(Subcategory, {
    foreignKey: 'category_id',
    as: 'subcategory',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });
  Subcategory.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });

  Jumbotron.belongsTo(Subcategory, {
    foreignKey: 'subcategory_id',
    as: 'subcategory',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });
  Subcategory.hasMany(Jumbotron, {
    foreignKey: 'subcategory_id',
    as: 'jumbotron',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });

  Address.hasMany(Request, {
    foreignKey: 'address_id',
    as: 'requestAddress',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });
  Request.belongsTo(Address, {
    foreignKey: 'address_id',
    as: 'requestAddress',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });

  Address.belongsTo(City, {
    foreignKey: 'city_id',
    as: 'city',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });
  City.hasMany(Address, {
    foreignKey: 'city_id',
    as: 'addresses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
  });

  Request.belongsTo(FindUs, { foreignKey: 'findus_id', as: 'findus' });
  FindUs.hasMany(Request, { foreignKey: 'findus_id', as: 'requests' });
};

export const initializeModels = (sequelize: Sequelize) => {
  Address.initialize(sequelize);
  Advertisement.initialize(sequelize);
  Approach.initialize(sequelize);
  Auth.initialize(sequelize);
  Category.initialize(sequelize);
  Subcategory.initialize(sequelize);
  City.initialize(sequelize);
  FindUs.initialize(sequelize);
  Gallery.initialize(sequelize);
  Jumbotron.initialize(sequelize);
  Request.initialize(sequelize);
  Review.initialize(sequelize);
  Welcome.initialize(sequelize);
  Contact.initialize(sequelize);

  createDatabaseAssociations();
};
