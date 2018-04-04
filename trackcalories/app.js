// Storage Controller

// Item Controller
const ItemCtrl = (function () {
    // item constructor
    const Item = (id, name, calories) => {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // data structure / state
    const data = {
        items: [{
                id: 0,
                name: 'Steak Dinner',
                calories: 1200
            },
            {
                id: 1,
                name: 'Cookie',
                calories: 400
            },
            {
                id: 2,
                name: 'Eggs',
                calories: 300
            }
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Public methods
    return {
        getItems: () => {
            return data.items;
        },
        logData:  () => {
            return data;
        }
    }
})();

// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list'
    }
    // Public methods
    return {
        populateItemList: (items) => {
            let html = ``;

            items.forEach(item => {
                html += `
                <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class=" edit-item fa fa-pencil"></i>
                </a>
              </li>`;
            });

            // insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        }
    }
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {

    // Public methods
    return {
        init: () => {
            // fetch items from data structure
            const items = ItemCtrl.getItems();

            // populate list with items
            UICtrl.populateItemList(items);

        }
    }
})(ItemCtrl, UICtrl);

//Initialize
App.init();