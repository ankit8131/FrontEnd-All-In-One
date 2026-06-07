class UberDriver {
  constructor(name) {
    this.name = name;
    this.tasks = [];

    setTimeout(async () => {
      const ans = await this.next();
    }, 0);
  }

  async next() {
    const task = this.tasks.shift();
    console.log('task is',task)
    if (task) {
      await task();
      this.next();
    } else {
      console.log(`${this.name} has no tasks left`);
    }
  }

  pick() {
    this.tasks.push(() => {
      console.log(`${this.name} is picking up passengers`);
    });
    return this;
  }

  drive() {
    this.tasks.push(() => {
      console.log(`${this.name} is driving`);
    });
    return this;
  }

  coffeeBreak() {
    this.tasks.unshift(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`${this.name} is taking a coffee break`);
                resolve();
            }, 4000);
        });
    });
    return this;
  }
}

const driver = new UberDriver("John");
console.log(driver.pick().drive().coffeeBreak());
