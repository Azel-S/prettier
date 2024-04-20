const objGet = {
    get name() {
      return this.name;
    },
  };

const objGetTwo = {
    get nameTwo() {
        this.name = this.name + " is valid";
        return this.name();
    },
}

const objSet = {
    set name(name) {
      return this.name = name;
    },
};

const objSetTwo = {
    set nameTwo(name) {
      return this.name + "may not be valid in this context because it is going out of range for print";
    },
};
  
