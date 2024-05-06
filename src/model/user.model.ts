import { Sequelize, DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs";
import { sequelize } from "../database/database";

class User extends Model {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare refreshToken: string;
  declare first_name: string;
  declare last_name: string;
  declare gender: string;
  declare address: string;
  declare showcase_images: string;
  declare dob: string;
  declare nic: string;
  declare contact_number: string;
  declare whatsapp_number: string;
  declare direct_city: string;
  declare profile_picture: string;
  declare height: string;
  declare pant_size: string;
  declare hair_color: string;
  declare shoe_size: string;
  declare top_size: string;
  declare eye_color: string;
  declare dress_size: string;
  declare facebook_url: string;
  declare instagram_url: string;
  declare youtube_url: string;
  declare tiktok_url: string;
  declare past_two_year_experience: string;
  declare acting_experience: string;
  declare special_skills: string;
  declare special_notes_admin: string;
  declare user_category_admin: string;
  declare approved_admin: string;
  declare user_type: string;

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
      },
      showcase_images: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
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

      // Admin Notes
      special_notes_admin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_category_admin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      approved_admin: {
        type: DataTypes.STRING,
        defaultValue: "0",
        allowNull: true,
      },
      user_type: {
        type: DataTypes.STRING,
        defaultValue: "user",
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
