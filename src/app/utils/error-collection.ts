// Simple utility class for managing errors associated with unique field names.
export class ErrorCollection {
    private errors: { field: string, message: string }[] = [];

    public add(fieldName: string, ...messages: string[]) {
        messages.forEach(m => this.errors.push({ field: fieldName, message: m }));
        return this;
    }

    public clear(...fieldNames: string[]) {
        this.errors = this.errors.filter(e => fieldNames.length && fieldNames.indexOf(e.field) < 0);
        return this;
    }

    public getFirst(fieldName?: string) {
        const error = fieldName 
            ? this.errors.find(e => e.field === fieldName) 
            : this.errors[0];

        return error?.message;
    }

    public getAll(...fieldNames: string[]) {
        const errors = fieldNames.length
            ? this.errors.filter(e => fieldNames.indexOf(e.field) >= 0)
            : this.errors;

        return errors.map(e => e.message);
    }

    public hasAny(...fieldNames: string[]) {
        return fieldNames.length 
            ? this.errors.some(e => fieldNames.indexOf(e.field) >= 0) 
            : this.errors.length > 0;
    }
}