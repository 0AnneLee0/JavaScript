//STORAGE CONTROLLER
const StorageCtrl = (function() {
    //public method
    return {
        //method to store item into local storage
        storeItem: function(item) {
            let items;

            //check if any items in local storage
            if(localStorage.getItem('items') === null) {
                //set as empty array
                items = [];

                //push new item onto items array
                items.push(item);

                //set local storage - wrap items in JSON, local storage only holds strings
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                //convert strings back into object array
                items = JSON.parse(localStorage.getItem('items'));

                //push new item onto items array
                items.push(item);

                //re-set local storage
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        //method to get items from local storage
        getItemsFromStorage: function() {
            let items;
            if(localStorage.getItem('items') === null) {
                //set as empty array
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));

            //remove item if item id is found in array
            items.forEach(function(item, index) {
                if(updatedItem.id === item.id) {
                    //delete 1 from index, and replace with updated item
                    items.splice(index, 1, updatedItem);
                }
            });

            //re-set local storage
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem('items'));

            //remove item if item id is found in array
            items.forEach(function(item, index) {
                if(id === item.id) {
                    //delete 1 from index
                    items.splice(index, 1);
                }
            });

            //re-set local storage
            localStorage.setItem('items', JSON.stringify(items));
        },
        //removes all items from local storage
        clearAllFromStorage: function() {
            localStorage.removeItem('items');
        }
    }
})();

//ITEM CONTROLLER
const ItemCtrl = (function() {
    // console.log('item controller');

    //Item constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure/State 
    const data = {
        // items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 0, name: 'Cookies', calories: 400},
            // {id: 0, name: 'Egg', calories: 300}
        // ],
        // get items from local storage
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0,
    }

    //data returned becomes public; accessable from browser
    return {
        getItems: function(){
            return data.items;
        },
        addItem: function(name, calories){
            let ID;

            //create id
            if(data.items.length > 0) {
                ID = data.items[data.items.length-1].id+1;
            } else {
                ID = 0;
            }
            //parse calories string to number
            calories = parseInt(calories);

            //create new item
            newItem = new Item(ID, name, calories);
            //add new item to array
            data.items.push(newItem);
            //return item
            return newItem;
        },
        getItemById: function(id) {
            let found = null;

            data.items.forEach(function(item) {
                if(item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, calories) {
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(function(item) {
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function(id) {
            //get id's using map
            ids = data.items.map(function(item) {
                return item.id;
            });

            //get index
            const index = ids.indexOf(id);

            //remove item
            data.items.splice(index, 1);
        },
        clearAllItems: function() {
            data.items= [];
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        getTotalCalories: function(iem) {
            let total = 0;

            data.items.forEach(function(item) {
                total += item.calories;
            });

            data.totalCalories = total;
            return data.totalCalories;
        },
        logData: function() {
            return data;
        }
    }
})();


//UI CONTROLLER
const UICtrl = (function() {
    // console.log('UI controller');

    //UI selector - allows you to change id in one place
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-cal',
        totalCalories: '.total-calories'
    }

    //public methods
    return {
        populateItemList: function(items) {
            let html = '';
            
            //cycle through all items and appending <li> to the html
            items.forEach(function(item) {
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}:</strong>
                <em>${item.calories} calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>`;
            });

            //Inserts list<li> items and puts them in <ul> 
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        //getting the input object 
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item) {
            //show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //create <li> element
            const li = document.createElement('li');
            //add class
            li.className = 'collection-item';
            //add ID
            li.id = `item-${item.id}`;
            //add HTML
            li.innerHTML = `<strong>${item.name}:</strong>
            <em>${item.calories} calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
            //insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        //Update UI with edit
        updateListItem: function(item) {
            //creates a node list
            let listItems = document.querySelectorAll(UISelectors.listItems);

            //cannot use forEach on node list - convert to array
            listItems = Array.from(listItems);
            listItems.forEach(function(listItem) {
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}:</strong>
                    <em>${item.calories} calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
                }
            });
        },
        deleteListItem: function(id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        //clear input fields from UI
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        removeItems: function() {
            //creates node list
            let listItems = document.querySelectorAll(UISelectors.listItems);

            //convert node list into array
            listItems = Array.from(listItems);
            listItems.forEach(function(item) {
                item.remove();
            });
        },
        //hide list
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        //Showing total calories
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        //to make UI selectors public
        getSelectors: function() {
            return UISelectors;
        }
    }
})();


//APP CONTROLLER
const AppCtrl = (function(ItemCtrl, StorageCtrl, UICtrl) {
    // console.log(ItemCtrl.logData());

    //load event listener function for all events
    const loadEventListeners = function() {
        //Get UI selectors to use
        const UISelectors = UICtrl.getSelectors();

        //----- EVENT LISTENERS -----
        //ADD item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //disable submit on enter
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        //EDIT icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        //UPDATE item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        //BACK button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        //DELETE item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        //CLEAR ALL item event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllClick);
    }

    //add item submit
    const itemAddSubmit = function(e) {
        // console.log('Add');
        //get form input object from UI controller
        const input = UICtrl.getItemInput();
       
        //test
        // console.log(input);

        //check for name and calorie input
        if(input.name !== '' && input.calories !== '') {
            //then add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            //add item to UI list
            UICtrl.addListItem(newItem);

            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //add total calories to the UI
            UICtrl.showTotalCalories(totalCalories);

            //Store in local storage
            StorageCtrl.storeItem(newItem);

            //clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    //edit item on click 
    const itemEditClick = function(e) {
        if(e.target.classList.contains('edit-item')) {
            // console.log('edit-item');
            //Get list item id (item-#)
            const listId = e.target.parentNode.parentNode.id;
            // console.log(listId);

            //break into id into array
            const listIdArr = listId.split('-');
            console.log(listIdArr);

            //Get actual id
            const id = parseInt(listIdArr[1]);

            //get item
            const itemToEdit = ItemCtrl.getItemById(id);
            // console.log(itemToEdit);

            //set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            //add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    //------- update item submit -------
    const itemUpdateSubmit = function(e) {
        // console.log('update');

        //get item input from UI
        const input = UICtrl.getItemInput();

        //update item 
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        //updates the UI
        UICtrl.updateListItem(updatedItem);

        //get updated total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        
        //Shows total calories in UI
        UICtrl.showTotalCalories(totalCalories);

        //update local storage
        StorageCtrl.updateItemStorage(updatedItem)

        UICtrl.clearEditState();

        e.preventDefault();
    }

    //-------item Delete submit -------
    //delete button event
    const itemDeleteSubmit = function(e) {
        // console.log(123);
        //get current item
        const currentItem = ItemCtrl.getCurrentItem();

        //delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        //delete from UI
        UICtrl.deleteListItem(currentItem.id);

        //get updated total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        
        //Shows total calories in UI
        UICtrl.showTotalCalories(totalCalories);

        //delete item from local storage
        StorageCtrl.deleteFromStorage(currentItem.id);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    //----- clear all click -----
    const clearAllClick = function() {
        //delete all items from data structure
        ItemCtrl.clearAllItems();

        //get updated total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        
        //Shows total calories in UI
        UICtrl.showTotalCalories(totalCalories);

        //remove all items from UI
        UICtrl.removeItems();

        //remove all items from local storage
        StorageCtrl.clearAllFromStorage();

        //hide the <ul>
        UICtrl.hideList();
    }

    //return initializer for the application
    //public methods
    return {
        init: function() {
            // console.log('initializing app...');

            //clear/set initial state
            UICtrl.clearEditState();

            //Fetch items from data structure
            const items = ItemCtrl.getItems();
            //check
            // console.log(items);

            //check for any items
            if(items.length === 0) {
                UICtrl.hideList();
            } else {
                //populate list with items
                UICtrl .populateItemList(items);
            }

            //for future from local storage
            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //add total calories to the UI
            UICtrl.showTotalCalories(totalCalories);

            //Load event listeners
            loadEventListeners();
        }
    }
    
})(ItemCtrl, StorageCtrl, UICtrl);

//Init app - call from the item controller getItem to get all items, and the UI controller to populate list
AppCtrl.init();