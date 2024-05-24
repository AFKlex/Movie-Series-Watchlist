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

1. **Clone the Repository**: Clone the repository to your local machine.
   ```bash
   git clone https://github.com/yourusername/series-movies-tracker.git
   ```
2. **Navigate to the Project Directory**: Open the project folder.
   ```bash
   cd series-movies-tracker
   ```
3. (Optional) Change Configs in the Docker-Compose file
4. docker-compose up
5. connect to specefied IP/Port 
6. enjoy

## Usage

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
- **Sort Entries**: Entries can be sorted ascending or descending alphabetically order by pressing on the respective coloum.   

## Reason

This project was created as a project for my Study Course in Software Development. 

## License

This project is licensed under the MIT License.

---

Thank you for using the Series/Movies Tracker! Enjoy keeping track of your favorite series and movies.
