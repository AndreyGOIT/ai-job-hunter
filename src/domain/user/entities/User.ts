import { Email } from "../value-objects/Email";
import { Language } from "../value-objects/Language";
import { UserId } from "../value-objects/UserId";

export type UserProps = {
  id: UserId;
  email: Email;
  preferredLanguage: Language;
};

export class User {
  private constructor(private readonly props: UserProps) {}

  public static create(props: UserProps): User {
    return new User(props);
  }

  public get id(): UserProps["id"] {
    return this.props.id;
  }

  public get email(): UserProps["email"] {
    return this.props.email;
  }

  public get preferredLanguage(): UserProps["preferredLanguage"] {
    return this.props.preferredLanguage;
  }

  public equals(other: User): boolean {
    return this.id.equals(other.id);
  }
}