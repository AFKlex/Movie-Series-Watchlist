let localEntries;
let apiUrl;

async function fetchApiUrl() {
    try {
        const response = await fetch('/api-base-url');
        const data = await response.json();
        apiUrl = (data.apiUrl).replaceAll("\"","");
        
        //console.log('API URL:', apiUrl);
    } catch (error) {
        console.error('Error fetching API URL:', error);
    }
}

async function fetchEntries() {
    if (!apiUrl) {
        console.error('API URL is not defined.');
        return;
    }

    // What is going on with this problem!

    const entriesUrl = apiUrl + "/api/get/allEntries";
    console.log("EntriesUrl: "+ entriesUrl);
    try {
        const response = await fetch(entriesUrl);
        if (!response.ok) {
            throw new Error(`Error fetching entries: ${response.statusText}`);
        }
        const data = await response.json();
        localEntries = data;
        displayEntries(data);
    } catch (error) {
        console.error('Error fetching entries:', error);
    }
}

function displayEntries(entries) {
    const tableBody = document.getElementById('trackerBody');
    tableBody.innerHTML = '';

    entries.forEach(entry => {
        const newRow = tableBody.insertRow();
        const startDateSubstring = entry.startDate.substring(0, 10);
        const finishDateSubstring = entry.finishDate ? entry.finishDate.substring(0, 10) : "N/A";
        
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
    });
}

async function addEntry() {
    if (!apiUrl) {
        console.error('API URL is not defined.');
        return;
    }

    const addUrl = apiUrl + "/api/add/entry";
    try {
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

        const response = await fetch(addUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        });

        if (response.ok) {
            fetchEntries();
            document.getElementById("trackerForm").reset();
        } else {
            console.error('Error adding entry:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding entry:', error);
    }
}

async function deleteEntryFromDatabase(entryId) {
    if (!apiUrl) {
        console.error('API URL is not defined.');
        return;
    }

    const deleteUrl = apiUrl + "/api/delete/entry";
    try {
        const response = await fetch(deleteUrl, {
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

async function deleteEntry(button) {
    try {
        const row = button.closest('tr');
        const entryId = row.querySelector('.id').innerText;

        await deleteEntryFromDatabase(entryId);
        row.remove();
    } catch (error) {
        console.error('Error deleting entry:', error);
    }
}

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

function sortEntries(columnIndex) {
    const columnHeader = document.getElementById(`header-${columnIndex}`);
    let sortOrder;
    if (columnHeader.dataset.sortOrder !== undefined) {
        sortOrder = columnHeader.dataset.sortOrder;
    } else {
        sortOrder = 'asc';
    }
    
    if (sortOrder === 'asc') {
        sortOrder = 'desc';
    } else {
        sortOrder = 'asc';
    }
    columnHeader.dataset.sortOrder = sortOrder;

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
        
        if (sortOrder === 'desc') {
            comparison *= -1;
        }
        
        return comparison;
    });

    displayEntries(localEntries);
}

async function initialize() {
    await fetchApiUrl();  // Fetch and store the API URL once
    await fetchEntries();  // Fetch entries after the API URL has been fetched

    const headers = document.querySelectorAll('#trackerTable th');

    const clickHandler = (event) => {
        event.stopPropagation(); // Prevent event propagation
        const columnIndex = Array.from(headers).indexOf(event.target);
        sortEntries(columnIndex);
    };

    headers.forEach(header => {
        header.addEventListener('click', clickHandler);
    });
}

document.addEventListener('DOMContentLoaded', initialize);

//window.onload = fetchEntries;
