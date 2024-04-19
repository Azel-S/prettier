class TestClass {
    publicFieldFirst = 'Public field first'; // Public field
    #privateField = 'Private Field'; // Simulated private field using naming convention
    publicFieldLast = 'Public field last'; // Public field
    #privateFieldLast = 'Private Field Last'; // Simulated private field

    constructor() {
        this.publicFieldConstructor = 'Public field set in constructor';
        this._privateFieldConstructor = 'Private field set in constructor';
        console.log('Constructor');
    }
}