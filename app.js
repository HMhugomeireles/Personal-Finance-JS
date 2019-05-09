class App {
  constructor() {

    // Elements from DOM
    this.dateNowElement = document.querySelector('#dateNow').innerHTML = this.buildData();
    this.listOfMonthElement = document.querySelector('#listOfMonth');
    this.totalAmountElement = document.querySelector('#totalAmount');
    this.inputId = document.querySelector('#identification');
    this.inputType = document.querySelector('#type');
    this.inputDescription = document.querySelector('#description');
    this.inputAmount = document.querySelector('#amount');
    this.fieldset = document.querySelector('fieldset');
    // Buttons
    this.btnInsert = document.querySelector('#insert');
    this.btnBack = document.querySelector('#back');
    this.btnNewRecord = document.querySelector('#newRecord');
    this.formRecord = document.querySelector('#formRecord');

    this.loadData();
    this.setFormReadOnlyTo(true);

    // set events
    this.initEvent();

  }

  buildData() {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    return day + "/" + month + "/" + year;
  }

  loadData() {
    const listOfMonth = this.getListOfMonth();
    let listOutput = "";
    let totalAmount = 0;

    listOfMonth.forEach(register => {
      listOutput+= register.print();

      if (register.getType() === 'Income') {
        totalAmount += register.getAmount();
      } else {
        totalAmount -= register.getAmount();
      }

    });

    this.listOfMonthElement.innerHTML = listOutput;
    this.totalAmountElement.innerHTML = totalAmount + '€';

    if (totalAmount < 0) {
      this.totalAmountElement.className = "text-danger";
    } else {
      this.totalAmountElement.className = "text-success";
    }
  }

  initEvent() {
    this.btnNewRecord.addEventListener("click", () => {
      this.setFormReadOnlyTo(false);
    });
    this.btnBack.addEventListener("click", () => {
      this.setFormReadOnlyTo(true);
    });
    this.btnInsert.addEventListener("click", () => {
      this.setFormReadOnlyTo(true);
    });
    this.formRecord.addEventListener("submit", (e) => {
      console.log(e);
    });
  }

  setFormReadOnlyTo(setting) {
    if (setting === true) {
      this.fieldset.setAttribute("disabled", true);
      this.btnNewRecord.removeAttribute("disabled", true);
    } else {
      this.fieldset.removeAttribute("disabled", false);
      this.btnNewRecord.setAttribute("disabled", true);
    }
  }


  getListOfMonth() {
    return [
        new FinanceRegister(1, 'Income', 'Month Salary', 100),
        new FinanceRegister(2,'Income', 'Home Rentals', 500),
        new FinanceRegister(3,'Expense', 'Tax Home Rentals', 200)
    ];
  }


}
