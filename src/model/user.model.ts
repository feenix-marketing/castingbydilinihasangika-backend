import { Sequelize, DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../database/database";

class User extends Model {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare refreshToken: string;

  async verifyPassword(candidatePassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      console.error("Error verifying password:", error);
      return false;
    }
  }
}

export const initializeUser = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // Contact Information and Images
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      showcase_images: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
      },
      nic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      whatsapp_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direct_city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Physical Measurements
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pant_size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hair_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shoe_size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      top_size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eye_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dress_size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Social Media & Other
      facebook_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instagram_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      youtube_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tiktok_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // Experience Details
      past_two_year_experience: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      acting_experience: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      special_skills: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Credentials
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
};

export default User;
