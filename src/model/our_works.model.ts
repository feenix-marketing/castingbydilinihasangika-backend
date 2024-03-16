import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/database";

class OurWorks extends Model {
  declare id: number;
  // declare userId: number;
  // declare totalPrice: number;
  // declare OurWorksDate: Date;
  // declare status: boolean;
}

export const initializeOurWorks = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }
  OurWorks.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // userId: {
      //   type: DataTypes.UUID,
      //   allowNull: true,
      // },
      // totalPrice: {
      //   type: DataTypes.FLOAT,
      //   allowNull: false,
      // },
      // OurWorksDate: {
      //   type: DataTypes.DATE,
      //   allowNull: false,

      //   defaultValue: DataTypes.NOW,
      // },
      // status: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false,
      //   allowNull: false,
      // },
    },
    {
      sequelize,
      modelName: "OurWorks",
      timestamps: true,
    }
  );
};

export default OurWorks;
