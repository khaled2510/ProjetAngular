export class LoginModel{
    UserName: string;
    Password: string;

    constructor(UserName : string, Password : string)
    {
        this.UserName = UserName;
        this.Password = Password;
    }
}