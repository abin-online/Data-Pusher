import { RoleModel } from "../model/RoleModel";
import { IRole } from "../../../domain/entities/IRole";
import mongoose, { Schema, Document, model } from "mongoose";


export default async function seedRoles(): Promise<void> {
  try {

const roles: IRole[] = [
  { role_name: "Admin", createdAt: new Date(), updatedAt: new Date() },
  { role_name: "Normal", createdAt: new Date(), updatedAt: new Date() }
];

    for (const role of roles) {
      const exists = await RoleModel.findOne({ role_name: role.role_name });
      if (!exists) {
        await RoleModel.create(role);
        console.log(`Inserted role: ${role.role_name}`);
      }
    }

    console.log("Roles seeded successfully!");
  } catch (error) {
    console.error("Error seeding roles:", error);
  } 
}

