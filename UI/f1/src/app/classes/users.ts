import { FormGroup } from "@angular/forms";

export class Users {
    #email!: string;
    #password!: string;
    #firstName!: string;
    #lastName!: string;

    get email() { return this.#email }
    set email(email: string) { this.#email = email }
    get password() { return this.#password }
    set password(password: string) { this.#password = password }
    get firstName() { return this.#firstName }
    set firstName(firstName: string) { this.#firstName = firstName }
    get lastName() { return this.#lastName }
    set lastName(lastName: string) { this.#lastName = lastName }

    constructor(){
    }

    fillFromFormGroup(form: FormGroup) {
        this.email = form.value.email;
        this.password = form.value.password;
    }

    toJSON(): any {
        return {
            email: this.#email,
            password: this.#password,
            firstName: this.#firstName,
            lastName: this.#lastName,
        }
    }
}