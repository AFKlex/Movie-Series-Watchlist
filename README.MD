# Series/Movies Tracker

## Overview
This web application allows users to track their series and movies, keeping detailed records of viewing status, scores, dates, and personal notes. The application enables users to add, view, and manage their entries through a user-friendly interface.

## Features

- **Add Entries**: Users can add new series or movies with details such as name, status, score, start date, finish date, current episode, rewatch count, and personal notes.
- **View Entries**: All entries are displayed in a table format for easy viewing and management.
- **Manage Entries**: Users can update or delete entries as needed.

## Installation

### Prerequisites

- A web browser (e.g., Chrome, Firefox, Safari)
- Docker and Docker-compose should be installed on the system. 

### Setup

1. Install docker 
```
sudo apt install docker
```

2. Install Docker-compose 
```
sudo apt install docker-compose 
```

3. Pull the GitHub repository 
```
git clone https://github.com/AFKlex/Movie-Series-Watchlist.git
```

4. switch into directory `cd Movie-Series-Watchlist` 
5. Configure the Docker Container if needed. If not, run only for localhost. Change the IP Address of the exposed Docker Container. 
6. Start the docker container with `sudo docker-compose up`
7. Connect to the specified IP or localhost (default)
8. enjoy

## Usage

### Add Sample Data 
To Add Sample Data you can use the 'AddSampleData.sh' script. In this script define the address and port of the Database. The script adds a few test data. 

### Adding an Entry

1. **Enter Details**: Fill out the form with the required details:
   - **Series/Movie Name**: Name of the series or movie.
   - **Status**: Select the current status from the dropdown menu (Completed, Plan to watch, Rewatching, Paused, Dropped).
   - **Score**: Provide a score between 0 and 100.
   - **Start Date**: Select the start date.
   - **Finish Date**:  Select the finish date.
   - **Current Episode**: Enter the current episode number.
   - **Rewatch Count**: Enter the number of times rewatched.
   - **Note Comment**: Add any additional notes.
2. **Add Entry**: Click the "Add Entry" button to add the entry to the tracker.

### Viewing and Managing Entries and Sorting Entries

- **View Entries**: All entries are displayed in a table below the form.
- **Manage Entries**: Use the action buttons in the table to update or delete entries.
- **Sort Entries**: Entries can be sorted ascending or descending alphabetically order by pressing on the respective coloum. This is only possible when we are not on a mobile phone and not in mobile view. 

## Test Cases 
### Test Case 1: Adding a New Entry

- Title: Add New Series/Movie Entry
- Description: Verify that a new series/movie entry can be added successfully.
- Steps:
  1. Click on the "Series/Movie Name" input field and enter "Breaking Bad".
  2. Select "Completed" from the "Status" dropdown.
  3. Enter "95" in the "Score" input field.
  4. Select a start date from the "Start Date" input field.
  5. Select a finish date from the "Finish Date" input field.
  6. Enter "62" in the "Current Episode" input field.
  7. Enter "0" in the "Rewatch Count" input field.
  8. Enter "Great series!" in the "Note" input field.
  9. Click the "Add Entry" button.
- Expected Result:
  - The new entry "Breaking Bad" appears at the end of the table with all entered details.

### Test Case 2: Editing an Entry

- Title: Edit Existing Series/Movie Entry
- Description: Verify that an existing series/movie entry can be edited successfully.
- Preconditions: An entry "Breaking Bad" exists in the table.
- Steps:
  1. Click the "Edit" button next to the "Breaking Bad" entry.
  2. Change the "Score" input field to "98".
  3. Click the "Add Entry" button.
- Expected Result:
  - The entry "Breaking Bad" is updated with the new score "98" and appears again at the end of the table.

### Test Case 3: Deleting an Entry

- Title: Delete Series/Movie Entry
- Description: Verify that a series/movie entry can be deleted successfully.
- Preconditions: An entry "Breaking Bad" exists in the table.
- Steps:
  1. Click the "Delete" button next to the "Breaking Bad" entry.
- Expected Result:
  - The entry "Breaking Bad" is removed from the table.

### Test Case 4: Sorting Entries by column

- Title: Sort Entries by Name
- Description: Verify that entries can be sorted by column.
- Preconditions: Multiple entries exist in the table and we are in desktop view. 
- Steps:
  1. Click the "Name" column header to sort entries by name in descending  order.
  2. Click the "Name" column header again to sort entries by name in ascending order.
  3. Click the "Status" column header to sort entries by Status in descending  order.
  4. Click the "Status" column header again to sort entries by Status in ascending order.
  5. Click the "Score" column to Sort by highest element first.
  6. Click the "Score" column again to Sort by lowest element first.
  7. Click the Start-Date to Sort by the newest element first. 
  8. Click the "Start-Date" column again to Sort by oldest element first.
  9.   Click the Finish-Date to Sort by the newest element first. 
  10. Click the "Finish-Date" column again to Sort by oldest element first.
  11. Click the "Current Episode" column to Sort by highest element first.
  12. Click the "Current Episode" column again to Sort by lowest element first.
  13. Click the "Rewatch Count" column to Sort by highest element first.
  14. Click the "Rewatch Count" column again to Sort by lowest element first.
  1. Click the "Note" column header to sort entries in descending  order.
  2. Click the "Note" column header again to sort entries in ascending order.

-Expected Result:
Every Pressing of a Coulmn the Sorting should be either done in ascending or descending order, depending of the datatype stored. 

### Test Case 5: Responsive Design - Mobile View

- Title: Responsive Design on Mobile
- Description: Verify that the application displays correctly on a mobile device.
- Preconditions: Open the web application on a mobile device or use a browser's mobile view.
- Steps:
  1. Open the Series/Movies Tracker on a mobile device or in mobile view.
  2. Verify the display of elements: form, table, and cards.
- Expected Result:
  - The form, table, and cards are displayed correctly and are fully functional.
  - Only the card view is shown, not the table view.

## Reason

This project was created as a project for my Study Course in Software Development. 

## License

This project is licensed under the MIT License.

---

Thank you for using the Series/Movies Tracker! Enjoy keeping track of your favorite series and movies.
