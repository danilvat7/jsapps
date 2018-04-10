// Storage Controller

// Item Controller
const ItemCtrl = (function () {
    // item constructor
    const Item = function (id, name, calories) {
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
        getItems() {
            return data.items;
        },
        getItemById(id) {
            let found = null;
            // loop throught items
            data.items.forEach(item => {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        updateItem(name, calories) {
            // calories to number
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(item => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;

                    found = item;
                }
            });

            return found;
        },
        deleteItem(id) {
            // get ids
            const ids = data.items.map(item => {
                return item.id;
            });

            // get index
            const index = ids.indexOf(id);

            // remove item

            data.items.splice(index, 1);
        },
        clearAllItems() {
            data.items = [];
        },
        setCurrentItem(item) {
            data.currentItem = item;
        },
        getCurrentItem() {
            return data.currentItem;
        },
        addItem(name, calories) {
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
        getTotalCalories() {
            let total = 0;

            // loop throw items
            data.items.forEach(item => {
                total += item.calories;
            });

            // set total calories
            data.totalCalories = total;

            return data.totalCalories;
        },
        logData() {
            return data;
        }
    };
})();

// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: "#item-list",
        listItems: '#item-list li',
        addBtn: ".add-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
        clearBtn: ".clear-btn",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories",
        totalCalories: '.total-calories',

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
        upddateListItem(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // turn node list into aray
            listItems = Array.from(listItems);

            listItems.forEach(listItem => {
                const itemID = listItem.getAttribute('id');
                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                              <a href="#" class="secondary-content">
                                <i class=" edit-item fa fa-pencil"></i>
                              </a>
                    `;
                }
            });
        },
        deleteListItem(id) {
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            item.remove();
        },
        clearInput() {
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = "";
        },
        addItemToForm() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        removeItems() {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // turn node list into array
            listItems = Array.from(listItems);

            listItems.forEach(item => {
                item.remove();
            })
        },
        hideList() {
            document.querySelector(UISelectors.itemList).style.display = "none";
        },
        clearEditState() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
            document.querySelector(UISelectors.backBtn).style.display = "none";
            document.querySelector(UISelectors.addBtn).style.display = "inline";
        },
        showEditState() {
            document.querySelector(UISelectors.updateBtn).style.display = "inline";
            document.querySelector(UISelectors.deleteBtn).style.display = "inline";
            document.querySelector(UISelectors.backBtn).style.display = "inline";
            document.querySelector(UISelectors.addBtn).style.display = "none";
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
const App = (function (ItemCtrl, UICtrl) {
    // load event listenrs
    const loadEventListener = () => {
        // get ui selectors
        const UISelectors = UICtrl.getSelectors();

        // add item ivent
        document
            .querySelector(UISelectors.addBtn)
            .addEventListener("click", itemAddSubmit);

        // disable submit on enter
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // edit item click event
        document
            .querySelector(UISelectors.itemList)
            .addEventListener('click', itemEditClick);

        // updaye item event
        document
            .querySelector(UISelectors.updateBtn)
            .addEventListener('click', itemUpdateSubmit);


        // delete item event
        document
            .querySelector(UISelectors.deleteBtn)
            .addEventListener('click', itemDeleteSubmit);

        // clear item event
        document
            .querySelector(UISelectors.clearBtn)
            .addEventListener('click', clearAllItemClick);

        // back btn event
        document
            .querySelector(UISelectors.backBtn)
            .addEventListener('click', UICtrl.clearEditState);
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

    // update item submit
    const itemEditClick = e => {
        if (e.target.classList.contains('edit-item')) {
            // get list item id
            const listId = e.target.parentNode.parentNode.id;

            // break into in array
            const listIdArr = listId.split('-');

            // get tha actual id
            const id = parseInt(listIdArr[1]);

            // get item
            const itemToEdit = ItemCtrl.getItemById(id);
            // set curent item
            ItemCtrl.setCurrentItem(itemToEdit);

            // add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    const itemUpdateSubmit = e => {
        // get item input
        const input = UICtrl.getItemInput();

        // update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // update ui
        UICtrl.upddateListItem(updatedItem);

        // get total colories
        const totalCalories = ItemCtrl.getTotalCalories();

        // add total calories to ui
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    // delete item

    const itemDeleteSubmit = e => {
        // get current item

        const currentItem = ItemCtrl.getCurrentItem();

        // delete from data
        ItemCtrl.deleteItem(currentItem.id);

        // delete from ui
        UICtrl.deleteListItem(currentItem.id);

        // get total colories
        const totalCalories = ItemCtrl.getTotalCalories();

        // add total calories to ui
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    // clear all

    const clearAllItemClick = e => {
        // delete from data structure
        ItemCtrl.clearAllItems();

          // get total colories
          const totalCalories = ItemCtrl.getTotalCalories();

          // add total calories to ui
          UICtrl.showTotalCalories(totalCalories);

        // remove from UI
        UICtrl.removeItems();

        // hide ul
        UICtrl.hideList();

        e.preventDefault();
    }

    // Public methods
    return {
        init() {
            // Clear edit state
            UICtrl.clearEditState();
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