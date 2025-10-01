import { EnumEnvironmentName, EnumBrands, EnumUserRoles } from './enum-parameters';
// Define the possible environment names for the app
export type EnvironmentName = EnumEnvironmentName;

// Configuration interface for the environment
export interface EnvironmentConfig { 
  users:  User[];         // Array of user definitions
  brands: BrandConfig[]; // Array of brand configurations
}

// Configuration interface for a brand
export interface BrandConfig {
  name: EnumBrands; // Brand name
  url: string;  // Brand URL
}
export type User =
  | { role: EnumUserRoles.demostrator |EnumUserRoles.depositor | EnumUserRoles.nonDepositor | EnumUserRoles.vip ; email: string; password: string }
  | { role: EnumUserRoles.guest; email?: never; password?: never };

