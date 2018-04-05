// Storage Controller

// Item Controller
const ItemCtrl = (function() {
  // item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // data structure / state
  const data = {
    items: [
        // {
        //   id: 0,
        //   name: "Steak Dinner",
        //   calories: 1200
        // },
        // {
        //   id: 1,
        //   name: "Cookie",
        //   calories: 400
        // },
        // {
        //   id: 2,
        //   name: "Eggs",
        //   calories: 300
        // }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems(){
      return data.items;
    },
    addItem(name, calories){
      let ID;
      // create id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // calories to number
      calories = parseInt(calories);

      // create item
      const newItem = new Item(ID, name, calories);

      // add item
      data.items.push(newItem);

      return newItem;
    },
    getTotalCalories(){
      let total = 0;

      // loop throw items
      data.items.forEach(item => {
        total += item.calories;
      });

      // set total calories
      data.totalCalories = total;

      return data.totalCalories;
    },
    logData(){
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: '.total-calories'
  };
  // Public methods
  return {
    populateItemList(items) {
      let html = ``;

      items.forEach(item => {
        html += `
                <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${
          item.calories
        } Calories</em>
                <a href="#" class="secondary-content">
                  <i class=" edit-item fa fa-pencil"></i>
                </a>
              </li>`;
      });

      // insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors() {
      return UISelectors;
    },
    showTotalCalories(totalCalories) {
     document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    addListItem(item) {
      // show list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // add id
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                  <a href="#" class="secondary-content">
                    <i class=" edit-item fa fa-pencil"></i>
                  </a>
        `;
      // incert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput() {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    getItemInput() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    }
  };
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // load event listenrs
  const loadEventListener = () => {
    // get ui selectors
    const UISelectors = UICtrl.getSelectors();

    // add item ivent
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  // add item submit
  const itemAddSubmit = e => {
    // get form input from ui ctrl
    const input = UICtrl.getItemInput();
    // check for name and calorie
    if (input.name !== "" && input.calories !== "") {
      // add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // add item to ui list
      UICtrl.addListItem(newItem);

      // get total colories
      const totalCalories = ItemCtrl.getTotalCalories();

      // add total calories to ui
      UICtrl.showTotalCalories(totalCalories);
      // clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Public methods
  return {
    init() {
      // fetch items from data structure
      const items = ItemCtrl.getItems();

      // check if any items
      if (!items.length) {
        UICtrl.hideList();
      } else {
        // populate list with items
        UICtrl.populateItemList(items);
      }

       // get total colories
       const totalCalories = ItemCtrl.getTotalCalories();

       // add total calories to ui
       UICtrl.showTotalCalories(totalCalories);
      // load event listeners
      loadEventListener();
    }
  };
})(ItemCtrl, UICtrl);

//Initialize
App.init();
