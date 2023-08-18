// Store the API query variables.
let url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Get the JSON data with d3.

d3.json(url).then(function(data){

  let namesArray=data.names;
        
  //dropdown element
  let dropdown = document.getElementById("selDataset");

  //loop through "names" array to populate dropdown options
  namesArray.forEach(name => {
    let option=document.createElement("option");
    option.value=name;
    option.text=name;
    dropdown.appendChild(option);
  });

    // function to handle dropdown option change
    dropdown.addEventListener("change", function() {
    let selectedValue=dropdown.value;
    console.log("Selected:", selectedValue);
    
     //Demographic info    
    let metadataArray=data.metadata;
    let selectedMetadata=metadataArray.find(metadata =>metadata.id ==selectedValue);
    
     //display "metadata" information 
    let Demographic=document.getElementById("sample-metadata");
    Demographic.innerHTML=`
      ID: ${selectedMetadata.id}<br>
      Ethnicity: ${selectedMetadata.ethnicity}<br>
      Gender: ${selectedMetadata.gender}<br>
      Age: ${selectedMetadata.age}<br>
      Location: ${selectedMetadata.location}<br>
      BB Type: ${selectedMetadata.bbtype}<br>
      Wash Frequency: ${selectedMetadata.wfreq}`
  

  
    let sample = data.samples;
    let selectedSample = sample.find(sample => sample.id === selectedValue);
      console.log("Selected Sample:", selectedSample);

    //bar chart
    let barChartData= {
      x: selectedSample.sample_values.slice(0, 10).reverse(),
      y: selectedSample.otu_ids.map(String).slice(0, 10).map(id=>`OTU ${id}`).reverse(),
      text: selectedSample.otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    };
      console.log("barChartData:", barChartData);

    let layout = {
      title: `Top 10 OTUs for Sample ${selectedSample.id}`,
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU IDs' }
    };
      console.log("layout:", layout);
   
    Plotly.newPlot('bar', [barChartData], layout);
    });














  });
