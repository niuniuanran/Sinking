# Sinking: the Titanic Story 

[![Build Status](https://dev.azure.com/sinking/Sinking/_apis/build/status/niuniuanran.Sinking?branchName=master)](https://dev.azure.com/sinking/Sinking/_build/latest?definitionId=1&branchName=master)

The story of Titanic, by data. https://sinking.azurewebsites.net/

Created by Anran Niu, August 2020

## Acknowledgements

### Why this project

I started working on this project as a task for a cool company, [Quantiful](https://quantiful.ai/)'s front end intern recruitment. It turns out to be fun and lots of new learning. Thank you Quantiful for such a special opportunity to explore data presentation!
### Wave Effect

The wave effect is largely inspired by a Codepen.io project, [CSS Wave Animation with a .png](https://codepen.io/plavookac/pen/QMwObb) by [@plavookac](https://codepen.io/plavookac), and uses CSS code and png image from it.

## How to Run the App Locally
```
$ git clone https://github.com/niuniuanran/Sinking.git sinking
$ cd sinking
$ npm install
$ npm start
```

## Features

### View Passengers on Titanic

<img src="./doc/screen-shot/table.gif" width="800px" alt="table-preview"/>

* Only passengers who paid a fare is shown.

### Sort Passengers

<img src="./doc/screen-shot/sort.gif" width="800px" alt="sort-preview"/>

### Filter Passengers

<img src="./doc/screen-shot/filter.gif" width="800px" alt="filter-preview"/>

### Survival Statistics Visualisation

<img src="./doc/screen-shot/stats.gif" width="800px" alt="stats-preview"/>

## Next Steps 

### Small Screen View
At this moment, the web page only works well on Desktop, and it will be nice if supports could be added for small screen.

### More Stats Visualisation
There is potential for more visualisation on the data to explore patterns and provide insights - for example, showing the cross-effect of gender * price * survival number.