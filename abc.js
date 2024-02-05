const button = document.querySelector('#btn1');
const taskText = document.querySelector('#text1');
const taskList = document.getElementById('taskList');

button.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const taskValue = taskText.value.trim(); // Trim the value to remove whitespace

    if (taskValue.length > 10) {
        alert('Length is greater than 10.');
        taskText.value = "";
        return; // Exit the function early if length is greater than 10
    }

    if (taskValue !== '') {
        // Create a new list item
        let listItem = document.createElement('li');

        // Create a checkbox
        let checkbox = document.createElement('input');
        let taskSpan = document.createElement('span');
        taskSpan.className = "content";
        checkbox.className = "check";
        checkbox.type = 'checkbox';

        taskSpan.textContent = taskValue;

        // Create a span to display the task text
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                taskSpan.style.textDecoration = 'line-through';
                checkbox.setAttribute('checked', 'checked');

                //UnCheck

            } else {
                taskSpan.style.textDecoration = 'none';
                checkbox.removeAttribute('checked');
            }

            // Save data when checkbox state changes
            saveData()
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);

        // Create a delete button
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '\u00d7';
        deleteButton.className = "close";
        deleteButton.addEventListener('click', () => {
            saveData()
            listItem.remove();
            // Save data when a task is deleted


        });
        listItem.appendChild(deleteButton);

        // Append the new list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskText.value = '';
        // Save data after adding a new task
    }
    saveData()
});
///localStorage.clear();
// Function to save the task list data to local storage
// Function to save the task list data to local storage
function saveData() {
    localStorage.setItem("data", JSON.stringify(taskList.innerHTML));

}

// Function to load the task list data from local storage
function loadData() {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
        taskList.innerHTML = data;
        addEventListenersToCheckboxes();
        addEventListenersToDeleteButtons();

    }
}

// Function to add event listeners to checkboxes
function addEventListenersToCheckboxes() {
    const checkboxes = document.querySelectorAll('.check');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const taskSpan = checkbox.nextElementSibling;

            if (checkbox.checked) {
                taskSpan.style.textDecoration = 'line-through';
                checkbox.setAttribute('checked', 'checked');

                //UnCheck

            } else {
                taskSpan.style.textDecoration = 'none';
                checkbox.removeAttribute('checked');
            }


            saveData();
        });
    });
}






// Function to add event listeners to delete buttons
function addEventListenersToDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.close');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function () {
            const listItem = this.parentNode;
            listItem.remove();
            saveData(); // Save the updated task list after deletion
        });
    }
}


// Load the task list data when the page loads
loadData();

