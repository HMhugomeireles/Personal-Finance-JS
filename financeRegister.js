class FinanceRegister{
  constructor(id, type, description, amount) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.amount = amount;
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getDescription() {
    return this.description;
  }

  getAmount() {
    return this.amount;
  }

  print() {
    let output;

    const type = this.getType();

    switch(type) {
      case 'Income':
        output = `<div class="col-2 text-success">+${this.getAmount()}€</div>`;
        break;
      case 'Expense':
        output = `<div class="col-2 text-danger">-${this.getAmount()}€</div>`;
        break;
    }

    return `<li class="list-group-item">
              <div class="row">
                <div class="col">${this.getDescription()}</div>
                <div class="col-2">${this.getType()}</div>
                ${output}
              </div>
            </li>`;
  }

}