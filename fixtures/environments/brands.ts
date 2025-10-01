import {EnvironmentName,EnvironmentConfig, User} from "../../playwright-project/env.config";
import users from "./users.json";


export const environmentData: Record<EnvironmentName, EnvironmentConfig> = {
  production: {
    users: users.users as User[],
    brands: [
      { name: 'madcasino', url: 'https://www.ecasino.com' },
      { name: 'slottio', url: 'https://www.elottio.com' },
      { name : 'saucedemo' ,  url: 'https://www.saucedemo.com/'},
      { name: 'thinking', url:'https://thinking-tester-contact-list.herokuapp.com/'}
    ],
  },
  staging: {
    users: users.users as User[],
    brands: [
      { name: 'madcasino', url: 'https://staging.ecasino.com' },
      { name: 'slottio', url: 'https://staging.elottio.com' },
      {name : 'saucedemo' ,  url: 'https://www.saucedemo.com/'}
    ],
  },
  development: {
    users: users.users as User[],
    brands: [
      { name: 'madcasino', url: 'https://dev.ecasino.com' },
      { name: 'slottio', url: 'https://dev.elottio.com' },
      {name : 'saucedemo' ,  url: 'https://www.saucedemo.com/'}
    ],
  },
};
