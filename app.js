class App {
  constructor() {
    this.list = [
      new FinanceRegister(1, 'Income', 4, 5, 'Month Salary', 100),
      new FinanceRegister(2,'Income', 8, 5, 'Home Rentals', 500),
      new FinanceRegister(3,'Expense', 8, 5, 'Tax Home Rentals', 200)
    ];

    // Elements from DOM
    this.dateNowElement = document.querySelector('#dateNow').innerHTML = this.buildData();
    this.listOfMonthElement = document.querySelector('#listOfMonth');
    this.totalAmountElement = document.querySelector('#totalAmount');
    this.inputId = document.querySelector('#identification');
    this.inputType = document.querySelector('#type');
    this.inputDescription = document.querySelector('#description');
    this.inputAmount = document.querySelector('#amount');
    this.fieldset = document.querySelector('fieldset');
    this.listGroupUl = document.querySelector('.list-group');

    // Buttons
    this.btnBack = document.querySelector('#back');
    this.btnNewRecord = document.querySelector('#newRecord');
    this.formRecord = document.querySelector('#formRecord');

    this.loadData();
    this.setFormReadOnlyTo(true);
    this.buildChart();

    // set events
    this.initEvent();

    console.log(this.getDataToChart())
  }

  buildData() {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    return day + "/" + month + "/" + year;
  }

  loadData() {
    this.totalAmountElement.innerHTML = " "; 
    const listOfMonth = this.getListOfMonth();
    let listOutput = "";
    let totalAmount = 0;

    listOfMonth.forEach(register => {
      listOutput+= register.print();

      if (register.getType() === 'Income') {
        totalAmount += register.getAmount();
      }
      if (register.getType() === 'Expense') {
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

      let nextID = this.list.length + 1;
      this.inputId.value = nextID;
    });
    this.btnBack.addEventListener("click", () => {
      this.setFormReadOnlyTo(true);
    });
    this.formRecord.addEventListener("submit", (e) => {
      e.preventDefault();
      this.setFormReadOnlyTo(true);

      let id = this.inputId.value;
      let type = this.inputType.value;
      let description = this.inputDescription.value;
      let amount = this.inputAmount.value;

      // insert new register
      this.list.push(new FinanceRegister(id, type, new Date().getDay, (new Date().getMonth + 1), description, amount));

      this.clearForm();

      this.loadData();
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

  clearForm() {
    this.inputId.value = "";
    this.inputDescription = "";
    this.inputAmount.value = "";
  }

  getListOfMonth() {
    return this.list;
  }

  buildChart() {
    let dataValues = this.getDataToChart();

    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawBackgroundColor);

    function drawBackgroundColor() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Days');


      data.addRows(dataValues);

      var options = {
        hAxis: {
          title: 'Actions Income/Expense'
        },
        vAxis: {
          title: 'Amount'
        },
        backgroundColor: '#fff'
      };

      var chart = new google.visualization.LineChart(document.getElementById('chartDiv'));
      chart.draw(data, options);
    }

  }


  getDataToChart() {
    const dataToChart = this.list.map(register => [register.day, register.amount]);
    return dataToChart;
  }

}
