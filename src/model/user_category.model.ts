import { DataTypes, Model, Sequelize } from "sequelize";

class UserCategory extends Model {
  public id!: number;
}

export const initializeUserCategory = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }

  UserCategory.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserCategory",
    }
  );

  // UserCategory.belongsTo(Order, { foreignKey: "orderId", as: "order" });
  // Order.hasMany(UserCategory, { foreignKey: "orderId", as: "items" });

  // UserCategory.belongsTo(Dish, { foreignKey: "dishId", as: "dish" });
  // Dish.hasMany(UserCategory, { foreignKey: "dishId", as: "orders" });

  // DishCategory.belongsTo(Restaurant, {
  //   foreignKey: "restaurant_category_id",

  //   as: "restaurant",
  // });

  // Restaurant.hasMany(DishCategory, {
  //   foreignKey: "restaurant_category_id",
  //   as: "categories",
  // });
};

export default UserCategory;
