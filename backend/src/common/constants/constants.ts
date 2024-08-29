export const AppConstants = Object.freeze({
  MESSGES: {
    WEAK_PASSWORD: `
        password must have following characteristics 
        1) atleast 8 characters
        2) must have 1 special character
        3) must have 1 number
        4) must have 1 letter

    `,
    REQUIRED_EMAIL: 'email is required',
    REQUIRED_NAME: 'name is required',
    REQUIRED_PASSWORD: 'password is required',
    EMAIL_PASSWORD_WRONG: 'Email/Password is incorrect!',
    USER_EXIT: 'This user already exists!',
    SUCCESSFUL_REQUEST: 'Request was successful',
    UNSUCCESSFUL_REQUEST: 'Request failed',
    SERVER_ERROR: 'Internal server error'
  },
});
