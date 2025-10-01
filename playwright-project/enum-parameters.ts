//enum for environmentType
export enum EnumEnvironmentTypes {
  production = 'production',
  staging = 'staging',
  development = 'development',
}

//enume will be export - will be used in config file for safety
export type EnumEnvironmentName = `${EnumEnvironmentTypes}`;

//enum for all brand names
export enum  EnumBrandsTypes {
  madcasino = 'madcasino',
  slottio = 'slottio',
  saucedemo = 'saucedemo',
  thinking = 'thinking'
}
//enume will be export - will be used in config file for safety
export type EnumBrands = `${EnumBrandsTypes}`;

//enum for multiple users 
export enum  EnumUserRoles {
  depositor = 'depositor',
  vip = 'vip',
  nonDepositor = 'non-depositor',
  guest = 'guest',
  demostrator = 'demostrator'
}
//enum will be export - will be used in config file for safety
export type EnumUserRole = `${EnumUserRoles}`;

//enum for safe switch method
export enum  EnumSignUpScenarios {
    invalidPassword = 'invalidPassword',
    emptyPassword = 'emptyPassword',
    default = 'default'
}