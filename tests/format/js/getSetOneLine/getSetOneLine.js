//when true, line in getter is placed on same line as get()
const objGet = {
    get name() {
      return this.name;
    },
  };

//when true, remains unchanged (exceeds print width range)
const objGetTwo = {
    get nameTwo() {
        this.name = this.name + " is valid";
        return this.name();
    },
}

//when true, line in setter is placed on same line as set() 
const objSet = {
    set name(name) {
      return this.name = name;
    },
};

//when true, remains unchanged (exceeds print width range)
const objSetTwo = {
    set nameTwo(name) {
      return this.name + "may not be valid in this context because it is going out of range for print";
    },
};
  
