//use reusable commands for brands navigation 
//import env mapping and types
import { EnvironmentConfig, EnvironmentName } from './env.config';
import { environmentData } from '../fixtures/environments/brands'

// Hook to get current environment and brands
export const useBrandEnvHook = (envType:string, urlSubstring?:string) => {
    const env : EnvironmentName = envType as EnvironmentName;
    const brands = environmentData[env].brands as EnvironmentConfig['brands'];
    // Optional: find a brand URL containing a specific substring
    let currentUrl: string | undefined = undefined;
    if(urlSubstring){ 
      currentUrl = brands.find(b => b.url.includes(urlSubstring))?.url;
    }
    return { env, brands, currentUrl };
}

// Hook to get current user details 
export const userDetailsHook = (envType:string, userRole: string) => {
    const env : EnvironmentName = envType as EnvironmentName;
    const users = environmentData[env].users as EnvironmentConfig['users'];
    const userEmail = users.find(u => u.role === userRole)?.email;
    const userPassword = users.find(u => u.role === userRole)?.password;
    if (!userEmail || !userPassword) {
        throw new Error(`User credentials for role ${userRole} are not defined in the environment configuration.`);
    }
    return { userEmail, userPassword };
}