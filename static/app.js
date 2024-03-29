function getPlots(id) {
//read samples.json
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(sampledata => {
        console.log(sampledata)
    // Create a horizontal bar chart with a dropdown menue to display the top 10 OTUs found in that individual 
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(labels)
        //Get only top 10 ids
        var otuTop = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();
        // get OTU ids in correct form
        var otu_ids = otuTop.map(d => "OTU" + d);
        console.log(`OTU IDS: ${otu_ids}`)
        //get top 10 labels
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: otu_ids,
            text: labels,
            marker: {
            color:'blue'},
            type: 'bar',
            orientation: 'h',
        };

        var data = [trace];
            
        var layout= {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:'linear',
            },
            margin: {
                t: 100,
                l: 100,
                r: 100,
                b: 30
            }
        };

    Plotly.newPlot('bar', data, layout);
    
//Create a bubble chart that displays each sample.
        var trace1={
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids,
                colorscale: "Earth"
            },
            text: sampledata.samples[0].otu_labels
        };
        var data1= [trace1];

        //set layout for bubble chart
        var layout2= {
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Values"},
            height: 500,
            width: 1500
        };

    //create the bubble plot
    Plotly.newPlot('bubble', data1, layout2);

    });
};

//Display the sample metadata, i.e., an individual's demographic information.
//Display each key-value pair from the metadata JSON object somewhere on the page.
function getDemoInfo(id) {
    //read json file
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)
        //filter by ID and select demographic info
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(result).forEach((key)=> {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
};

// Update all the plots when a new sample is selected.
function optionChange(id){
    // Fetch data for the selected sample
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((sampledata) => {
        var selectedSample = sampledata.samples.find(sample => sample.id === id);

        // Update the bar chart
        var barTrace = {
            x: selectedSample.sample_values.slice(0, 10).reverse(),
            y: selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: selectedSample.otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        };
        var barData = [barTrace];
        var barLayout = {
            title: "Top 10 OTU",
            yaxis: {
                tickmode: 'linear'
            },
            margin: {
                t: 100,
                l: 100,
                r: 100,
                b: 30
            }
        };
        Plotly.newPlot('bar', barData, barLayout);

        // Update the bubble chart
        var bubbleTrace = {
            x: selectedSample.otu_ids,
            y: selectedSample.sample_values,
            mode: 'markers',
            marker: {
                size: selectedSample.sample_values,
                color: selectedSample.otu_ids,
                colorscale: 'Earth'
            },
            text: selectedSample.otu_labels
        };
        var bubbleData = [bubbleTrace];
        var bubbleLayout = {
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Values" },
            height: 500,
            width: 1500
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
        // Update the demographic information
        var metadata = sampledata.metadata.find(meta => meta.id.toString() === id);
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(metadata).forEach((entry) => {
            demographicInfo.append("h5").text(`${entry[0].toUpperCase()}: ${entry[1]}`);
        });
    });
}
//update dropdown/metadata
function init(){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {
        var dropdown = d3.select("#selDataset");
        console.log(data)
        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value", name);
        });
        optionChange(data.names[0]);

        // Add an event listener to the dropdown menu element
        dropdown.on("change", function() {
            var selectedValue = d3.select(this).property("value");
            optionChange(selectedValue);
        });
    });
};

init();
