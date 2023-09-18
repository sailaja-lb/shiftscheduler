export class Project {
    id: number | undefined;
    firstName: string = '';
    lastName: string = '';
    userId: string = '';
    password: string = '';
    role: string = '';
    get isNew(): boolean {
        return this.id === undefined;
    }
    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.firstName) this.firstName = initializer.firstName;
        if (initializer.lastName) this.lastName = initializer.lastName;
        if (initializer.userId) this.userId = initializer.userId;
        if (initializer.password)
            this.password = initializer.password;
        if (initializer.role)
            this.role = initializer.role;
    }
}