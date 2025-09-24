// Define the possible environment names for the app
export type EnvironmentName = 'production' | 'staging' | 'development';

// Configuration interface for the environment
export interface EnvironmentConfig { 
  users:  User[];         // Array of user definitions
  brands: BrandConfig[]; // Array of brand configurations
}

// Configuration interface for a brand
export interface BrandConfig {
  name: string; // Brand name
  url: string;  // Brand URL
}
export type User =
  | { role: 'depositor' | 'vip' | 'non-depositor' ; email: string; password: string }
  | { role: 'guest' ; email?: never; password?: never };

