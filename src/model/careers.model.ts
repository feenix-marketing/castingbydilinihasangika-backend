import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import Dish from "./dish.model";
import DishCategory from "./dish_category.model";

class Careers extends Model {
  declare name: string;
  declare notes: string;
  declare location: string;
  declare photo: string;
  declare dishes?: NonAttribute<Dish[]>;
  declare distance: string;
  declare openTime: string;
  declare deliveryFee: string;
  declare minimumAmount: string;

  declare addDish: HasManyAddAssociationMixin<Dish, string>;
  declare addDishes: HasManyAddAssociationsMixin<Dish, number>;
  declare getDishes: HasManyGetAssociationsMixin<Dish>;
}

export class CareersCategory extends Model {}

export const initializeCareers = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }
  Careers.init(
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
      jd: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Careers",
    }
  );
};

export default Careers;
