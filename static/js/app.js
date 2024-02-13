function getPlots(id) {
//read samples.json
    d3.json("samples.json").then(sampleData => {
        console.log(sampleData)
    // Create a horizontal bar chart with a dropdown menue to display the top 10 OTUs found in that individual 
        var ids = sampleData.samples[0].otuIds;
        console.log(ids)
        var sampleValues = sampleData.samples[0].sample_values.slice(0,10).reverse();
        //_troubleshooting
        d3.json("samples.json").then(sampleData => {
            if (sampleData && sampleData.samples && sampleData.samples.length > 0) {
                var sampleValues = sampleData.samples[0].sample_values.slice(0, 10).reverse();
            } else {
                console.error("Invalid or empty sample data.");
            }
        }).catch(error => {
            console.error("Error loading sample data:", error);
        });
        //_
        console.log(sampleValues)
        var labels = sampleData.samples[0].otu_labels.slice(0,10);
        console.log(labels)
        //Get only top 10 ids
        var otuTop = (sampleData.samples[0].otuIds.slice(0,10)).reverse();
        // get OTU ids in correct form
        var otuIds = otuTop.map(d => "OTU" + d);
        console.log(`OTU IDS: ${otuIds}`)
        //get top 10 labels
        var labels = sampleData.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: otuIds,
            text: labels,
            marker: {
            color:'blue'
            },
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
                t:100,
                l: 100,
                r: 100,
                b: 30
            }
        };

    Plotly.newPlot('bar', data, layout);
    
//Create a bubble chart that displays each sample.
        var trace1={
            x: sampleData.samples[0].otuIds,
            y: sampleData.samples[0].sampleValues,
            marker: {
                size: sampleData.samples[0].sampleValues,
                color: sampleData.samples[0].otuIds
            },
            text: sampleData.samples[0].otu_labels
        };
        //set layout for bubble chart
        var layout2= {
            xaxis: {title: "OTU ID"},
            height: 500,
            width: 1000
        };

        var data1= [trace1];
    //create the bubble plot
    Plotly.newPlot("bubble",data1,layout2);

    });
}

//Display the sample metadata, i.e., an individual's demographic information.
//Display each key-value pair from the metadata JSON object somewhere on the page.
function getDemoInfo(id) {
    //read json file
    d3.json("samples.json").then((data)=> {
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
}

// Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard.
function optionChange(id){
    getPlots(id);
    getDemoInfo(id);
}

function init(){
    var dropdown= d3.select("#selDataset");
    d3.json("samples.json").then((data)=> {
        console.log(data)
        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value", name);
        });
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();