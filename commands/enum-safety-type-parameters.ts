// Enum for sign-up form states to ensure type safety and autocompletion
export enum SignUpFormState {
  AreEmptyData = 'areEmptyData',
  IsInvalidPasswordAndEmail = 'isInvalidPasswordAndEmail',
  IsInvalidFirstNameLastName = 'isInvalidFirstNameLastName',
  AreAllFilled = 'areAllFilled'
}

//log in parameters addded to enum 
export  enum  LogInFromState { 
 AreCorrectCredentials = 'areCorrectCredentials',
 AreInvalidCredentials = 'areInvalidCredentials'
}

