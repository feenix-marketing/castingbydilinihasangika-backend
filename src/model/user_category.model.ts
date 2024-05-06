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
};

export default UserCategory;
