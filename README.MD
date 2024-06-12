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
6. Start the docker container with `docker-compose up`

7. enjoy

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

## Reason

This project was created as a project for my Study Course in Software Development. 

## License

This project is licensed under the MIT License.

---

Thank you for using the Series/Movies Tracker! Enjoy keeping track of your favorite series and movies.
