export class Customer {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public image: string,
    public roles?: string[],
    public isVerified?: boolean,
    public isSuspended?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
