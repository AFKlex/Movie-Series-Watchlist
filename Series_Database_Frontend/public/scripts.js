
let localEntries;
let apiUrl;

// Fetch Backend URL from Server
async function fetchApiUrl() {
    try {
        const response = await fetch('/api-base-url');
        const data = await response.json();
        apiUrl = (data.apiUrl).replaceAll("\"", "");
    } catch (error) {
        console.error('Error fetching API URL:', error);
    }
}

// Fetch all entries from API
async function fetchEntries() {
    if (!apiUrl) {
        console.error('API URL is not defined.');
        return;
    }

    // Define backend URL
    const entriesUrl = apiUrl + "/api/get/allEntries";
    console.log("EntriesUrl: "+ entriesUrl);
    try {
        const response = await fetch(entriesUrl); // Fetch Results 
        if (!response.ok) {
            throw new Error(`Error fetching entries: ${response.statusText}`);
        }
        const data = await response.json(); 
        localEntries = data; // Store data 
        displayEntries(data); // Display Data
    } catch (error) {
        console.error('Error fetching entries:', error);
    }
}

// Function for Displaying Data
function displayEntries(entries) {
    const tableBody = document.getElementById('trackerBody');
    const cardContainer = document.getElementById('cardContainer');

    tableBody.innerHTML = '';
    cardContainer.innerHTML = '';

    entries.forEach(entry => {
        const startDateSubstring = entry.startDate.substring(0, 10);
        const finishDateSubstring = entry.finishDate ? entry.finishDate.substring(0, 10) : "N/A";

        const newRow = tableBody.insertRow();
        newRow.innerHTML = `<td class="id" style="display: none;">${entry._id}</td>
                            <td>${entry.name}</td>
                            <td>${entry.status}</td>
                            <td>${entry.score}</td>
                            <td>${startDateSubstring}</td>
                            <td>${finishDateSubstring}</td>
                            <td>${entry.currentEpisode}</td>
                            <td>${entry.rewatchCount}</td>
                            <td>${entry.note}</td>
                            <td><button onclick='editEntry(this)'>Edit</button> <button onclick='deleteEntry(this)'>Delete</button></td>`;

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-header">${entry.name}</div>
            <div class="card-content">
                <span>Status: ${entry.status}</span>
                <span>Score: ${entry.score}</span>
                <span>Start Date: ${startDateSubstring}</span>
                <span>Finish Date: ${finishDateSubstring}</span>
                <span>Current Episode: ${entry.currentEpisode}</span>
                <span>Rewatch Count: ${entry.rewatchCount}</span>
                <span>Note: ${entry.note}</span>
            </div>
            <div class="card-actions">
                <button class='edit-btn' data-id='${entry._id}'>Edit</button>
                <button class='delete-btn' data-id='${entry._id}'>Delete</button>
            </div>
        `;
        cardContainer.appendChild(card);
    });

    // Attach event listeners to card buttons
    const editButtons = cardContainer.querySelectorAll('.edit-btn');
    const deleteButtons = cardContainer.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const entryId = event.target.dataset.id;
            const entry = entries.find(e => e._id === entryId);
            if (entry) {
                document.getElementById("name").value = entry.name;
                document.getElementById("status").value = entry.status;
                document.getElementById("score").value = entry.score;
                document.getElementById("startDate").value = entry.startDate.substring(0, 10);
                document.getElementById("finishDate").value = entry.finishDate ? entry.finishDate.substring(0, 10) : "";
                document.getElementById("currentEpisode").value = entry.currentEpisode;
                document.getElementById("rewatchCount").value = entry.rewatchCount;
                document.getElementById("note").value = entry.note;

                deleteEntryFromDatabase(entryId);
                fetchEntries();
            }
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const entryId = event.target.dataset.id;
            await deleteEntryFromDatabase(entryId);
            fetchEntries();
        });
    });
}



// Frontend function for adding a entry 
async function addEntry() { 
    // Check if API URL is defined
    if (!apiUrl) { 
        console.error('API URL is not defined.');
        return;
    }
    
    // Define base URL
    const addUrl = apiUrl + "/api/add/entry";
    try { // Try to get all values from the site
        const name = document.getElementById("name").value;
        const status = document.getElementById("status").value;
        const score = parseFloat(document.getElementById("score").value);
        const startDate = document.getElementById("startDate").value;
        const finishDate = document.getElementById("finishDate").value;
        const currentEpisode = parseInt(document.getElementById("currentEpisode").value);
        const rewatchCount = parseInt(document.getElementById("rewatchCount").value);
        const note = document.getElementById("note").value;

        const entry = { 
            name,
            status,
            score,
            startDate,
            finishDate,
            currentEpisode,
            rewatchCount,
            note
        };

        const response = await fetch(addUrl, { // send POST Requst to Add data; With content as JSON format
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        });

        if (response.ok) {
            fetchEntries(); // Re-Fetch Entries from DB -> new Entrie is added and displayed to list
            document.getElementById("trackerForm").reset(); 
        } else {
            console.error('Error adding entry:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding entry:', error);
    }
}

// Function for deleting Entries from database
async function deleteEntryFromDatabase(entryId) {
    // Check if APIURL is defined
    if (!apiUrl) {
        console.error('API URL is not defined.');
        return;
    }

    // Set base url 
    const deleteUrl = apiUrl + "/api/delete/entry";
    try {
        const response = await fetch(deleteUrl, { // Send delete request to the API
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: entryId })
        });

        if (!response.ok) {
            console.error('Error deleting entry from database:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting entry from database:', error);
    }
}

// Functionality for the delete button
async function deleteEntry(button) {
    try {
        const row = button.closest('tr'); // find row
        const entryId = row.querySelector('.id').innerText; // get EntryID from database 

        await deleteEntryFromDatabase(entryId); // Delete Entry from database
        row.remove(); // Remove row from html
    } catch (error) {
        console.error('Error deleting entry:', error);
    }
}

// Function for the Edit button
function editEntry(row) {
    try {
        var i = row.parentNode.parentNode.rowIndex;
        var rowData = document.getElementById("trackerTable").rows[i].cells;

        document.getElementById("name").value = rowData[1].innerHTML;
        document.getElementById("status").value = rowData[2].innerHTML;
        document.getElementById("score").value = rowData[3].innerHTML;
        document.getElementById("startDate").value = rowData[4].innerHTML;
        document.getElementById("finishDate").value = rowData[5].innerHTML;
        document.getElementById("currentEpisode").value = rowData[6].innerHTML;
        document.getElementById("rewatchCount").value = rowData[7].innerHTML;
        document.getElementById("note").value = rowData[8].innerHTML;
        deleteEntryFromDatabase(rowData[0].innerHTML);

        document.getElementById("trackerTable").deleteRow(i);
    } catch (error) {
        console.error('Error editing entry:', error);
    }
}

// Functionality for Sorting Entries in the Website
function sortEntries(columnIndex) {
    const columnHeader = document.getElementById(`header-${columnIndex}`); // Get Colum header
    let sortOrder; 
    if (columnHeader.dataset.sortOrder !== undefined) { // Define first sort case
        sortOrder = columnHeader.dataset.sortOrder;
    } else {
        sortOrder = 'asc';
    }
    
    if (sortOrder === 'asc') { //Switch between asc and desc sorting
        sortOrder = 'desc';
    } else {
        sortOrder = 'asc';
    }
    columnHeader.dataset.sortOrder = sortOrder;

    // Sort Entries
    localEntries.sort((a, b) => {
        let comparison = 0;
        if (columnIndex === 0) {
            comparison = a.name.localeCompare(b.name);
        } else if (columnIndex === 1) {
            comparison = a.status.localeCompare(b.status);
        } else if (columnIndex === 2) {
            comparison = a.score - b.score;
        } else if (columnIndex === 3) {
            comparison = new Date(a.startDate) - new Date(b.startDate);
        } else if (columnIndex === 4) {
            comparison = new Date(a.finishDate || 0) - new Date(b.finishDate || 0);
        } else if (columnIndex === 5) {
            comparison = a.currentEpisode - b.currentEpisode;
        } else if (columnIndex === 6) {
            comparison = a.rewatchCount - b.rewatchCount;
        } else if (columnIndex === 7) {
            comparison = a.note.localeCompare(b.note);
        }
        
        // If sorting is desc reverse the current sort order
        if (sortOrder === 'desc') {
            comparison *= -1;
        }
        
        return comparison;
    });

    displayEntries(localEntries);
}

// Initial function on website load to fetch data and load endpoint etc. 
async function initialize() {
    await fetchApiUrl();  // Fetch and store the API URL once
    await fetchEntries();  // Fetch entries after the API URL has been fetched

    const headers = document.querySelectorAll('#trackerTable th'); // define table

    const clickHandler = (event) => { // Create Event Handler for Sorting Entries
        event.stopPropagation(); // Prevent event propagation
        const columnIndex = Array.from(headers).indexOf(event.target);
        sortEntries(columnIndex);
    };

    headers.forEach(header => { //Add Event Handler to headers.
        header.addEventListener('click', clickHandler);
    });
}

document.addEventListener('DOMContentLoaded', initialize); // Run the initalize function

