class FinanceRegister {
  constructor(id, type, day, month, description, amount) {
    this.id = Number(id);
    this.type = type;
    this.month = month;
    this.day = day;
    this.description = description;
    this.amount = Number(amount);
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

  getMonth() {
    return this.month;
  }

  getDay() {
    return this.day;
  }

  formatDateToShow() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let dateFormated = this.getDay() + " " + monthNames[this.getMonth()];

    return dateFormated;
  }

  print() {
    let output;

    const type = this.getType();

    switch (type) {
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
                <div class="col-2">${this.formatDateToShow()}</div>
                ${output}
              </div>
            </li>`;
  }

}