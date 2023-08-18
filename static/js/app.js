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

  //initialise with first test subject data
  let initialselectedValue = namesArray[0];
  updateData(initialselectedValue);


  //function to update displayed data
  function updateData(selectedValue) {
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
  
    // bar chart
    let sample = data.samples;
    let selectedSample = sample.find(sample => sample.id === selectedValue);

    let barChartData= {
      x: selectedSample.sample_values.slice(0, 10).reverse(),
      y: selectedSample.otu_ids.map(String).slice(0, 10).map(id=>`OTU ${id}`).reverse(),
      text: selectedSample.otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    };

    let layout = {
      title: `Top 10 OTUs for Test Subject ${selectedSample.id}`,
      xaxis: { title: 'Sample Values' },
    };
   
    Plotly.newPlot('bar', [barChartData], layout);
    

    //bubble chart 
    let bubbleData={
      x: selectedSample.otu_ids,
      y: selectedSample.sample_values,
      text: selectedSample.otu_labels,
      mode: 'markers',
      marker: {
        size: selectedSample.sample_values,
        color: selectedSample.otu_ids,
        colorscale: 'Veridis'}
    };

    let bubble_layout = {
      title: `Test Subject ${selectedSample.id} Samples`,
      xaxis: {type:'scatter', title: 'OTU ID' },
    };
   
    Plotly.newPlot('bubble', [bubbleData], bubble_layout);
  }


  // function to handle dropdown option change
  dropdown.addEventListener("change", function () {
    let selectedValue=dropdown.value;
    updateData(selectedValue); 
  });

});