address="http://localhost:3000/api/add/entry"

curl -X POST -H "Content-Type: application/json" -d '{"name": "Breaking Bad", "status": "Completed", "score": 95, "startDate": "2019-01-01", "finishDate": "2019-01-30", "currentEpisode": null, "rewatchCount": 1, "note": "Crime drama series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "Stranger Things", "status": "Watching", "score": 90, "startDate": "2020-06-01", "finishDate": null, "currentEpisode": 5, "rewatchCount": 0, "note": "Sci-fi horror series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "The Witcher", "status": "Completed", "score": 85, "startDate": "2020-12-01", "finishDate": "2021-01-10", "currentEpisode": null, "rewatchCount": 0, "note": "Fantasy series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "The Mandalorian", "status": "Plan to watch", "score": 88, "startDate": null, "finishDate": null, "currentEpisode": null, "rewatchCount": 0, "note": "Star Wars spin-off series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "Friends", "status": "Completed", "score": 90, "startDate": "2018-01-01", "finishDate": "2018-05-01", "currentEpisode": null, "rewatchCount": 2, "note": "Classic sitcom."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "Sherlock", "status": "Watching", "score": 92, "startDate": "2021-04-01", "finishDate": null, "currentEpisode": 2, "rewatchCount": 1, "note": "Modern-day detective series."}' $address
se provide test cases and data. You can write them as actions to be undertaken and expected results, e.g. click on button X / message Y is shown.
curl -X POST -H "Content-Type: application/json" -d '{"name": "Black Mirror", "status": "Plan to watch", "score": 87, "startDate": null, "finishDate": null, "currentEpisode": null, "rewatchCount": 0, "note": "Dystopian anthology series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "Westworld", "status": "Completed", "score": 89, "startDate": "2019-07-01", "finishDate": "2019-08-01", "currentEpisode": null, "rewatchCount": 0, "note": "Sci-fi thriller series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "The Crown", "status": "Watching", "score": 91, "startDate": "2020-10-01", "finishDate": null, "currentEpisode": 7, "rewatchCount": 0, "note": "Historical drama series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "House of Cards", "status": "Completed", "score": 85, "startDate": "2018-03-01", "finishDate": "2018-04-01", "currentEpisode": null, "rewatchCount": 1, "note": "Political drama series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "Narcos", "status": "Plan to watch", "score": 88, "startDate": null, "finishDate": null, "currentEpisode": null, "rewatchCount": 0, "note": "Crime drama series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "The Office", "status": "Completed", "score": 93, "startDate": "2017-09-01", "finishDate": "2017-12-01", "currentEpisode": null, "rewatchCount": 3, "note": "Mockumentary sitcom."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "The Handmaid\'s Tale", "status": "Watching", "score": 86, "startDate": "2021-05-01", "finishDate": null, "currentEpisode": 3, "rewatchCount": 0, "note": "Dystopian drama series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "Ozark", "status": "Plan to watch", "score": 90, "startDate": null, "finishDate": null, "currentEpisode": null, "rewatchCount": 0, "note": "Crime drama series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "Better Call Saul", "status": "Completed", "score": 92, "startDate": "2019-05-01", "finishDate": "2019-06-01", "currentEpisode": null, "rewatchCount": 1, "note": "Breaking Bad spin-off."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "Peaky Blinders", "status": "Watching", "score": 89, "startDate": "2021-01-01", "finishDate": null, "currentEpisode": 4, "rewatchCount": 0, "note": "Historical crime drama."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "Money Heist", "status": "Plan to watch", "score": 88, "startDate": null, "finishDate": null, "currentEpisode": null, "rewatchCount": 0, "note": "Spanish heist crime drama."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "Fargo", "status": "Completed", "score": 91, "startDate": "2020-08-01", "finishDate": "2020-09-01", "currentEpisode": null, "rewatchCount": 0, "note": "Anthology crime series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "The Boys", "status": "Watching", "score": 90, "startDate": "2021-07-01", "finishDate": null, "currentEpisode": 6, "rewatchCount": 0, "note": "Superhero dark comedy series."}' $address

curl -X POST -H "Content-Type: application/json" -d '{"name": "True Detective", "status": "Plan to watch", "score": 88, "startDate": null, "finishDate": null, "currentEpisode": null, "rewatchCount": 0, "note": "Crime anthology series."}' $address
