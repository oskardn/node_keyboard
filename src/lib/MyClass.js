class MyClass {
    #privateVar;
    publicVar;

    constructor(value = null) {
    }

    publicFunction() {
        this.#privateFunction();
        return this;
    }

    #privateFunction(){
        return this.#privateVar;
    }
}

module.exports = MyClass;