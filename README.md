# belly-button-challenge
Module 14 Challenge
This dashboard is hosted [here](https://github.com/reederickson/belly-button-challenge.git)
## Background
In this assignment, I built an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Features and Functions
### Horizonal Bar Chart
-Displays the top 10 OTUs found in the selected individual.
-Utilizes a dropdown menu for users to select the individual of interest.

![Bar Chart](/images/bar_chart.png)

### Bubble Chart
-Visualizes each sample with a bubble chart.
-Provides an intuitive way to explore the distribution and abundance of OTUs across samples.

![Bubble Chart](/images/bubble_chart.png)

### Sample Metadata 
-Displays demographic information for each individual, including age, gender, ethnicity, and more.
-Allows users to understand the context of the sample data.

![Sample Metadata](/images/sample_metadata.png)

### Technologies Used
HTML
JavaScript
D3.js (Data-Driven Documents) for data visualization

## Usage
To use this website:
```bash
git clone https://github.com/reederickson/belly-button-challenge.git
```
-Open the index.html file in your web browser to access the website.
-Interact with the horizontal bar chart and bubble chart to explore the OTU data.
-Use the dropdown menu to select different individuals and view their top 10 OTUs.
-Explore the sample metadata to understand the demographic information associated with each individual.


### References

[Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable.]( http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

## Credits
Reed Erickson

Outside help: tutoring session with Khangwelo.
Attended office hours and Carlos pointed out that I was running the file from my local machine; switched to the URL and it fixed my problems.