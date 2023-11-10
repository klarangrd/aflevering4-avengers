const data1 = [//fullPlays
   {group: "Electric Symphony", value: 1500},
   {group: "Lost in Time", value: 1200},
   {group: "Summer Vibes", value: 950},
   {group: "Electric Dreams", value: 850},
   {group: "The Razors Edge", value: 730},
   {group: "Epic Jams", value: 720},
   {group: "Slippery When Wet", value: 620},
   {group: "Meteora", value: 600},
   {group: "Joyride", value: 580},
   {group: "Crazy World", value: 560},
   {group: "Hjertestarter", value: 520},
   {group: "Greatest hits", value: 500},
   {group: "USADSB", value: 480},
   {group: "Top Gun", value: 450},
   {group: "Wild Cherry", value: 350}
];

const data2 = [//favourites
{group: "Electric Symphony", value: 2800},
   {group: "Lost in Time", value: 2600},
   {group: "Summer Vibes", value: 2200},
   {group: "Electric Dreams", value: 1200},
   {group: "The Razors Edge", value: 1350},
   {group: "Epic Jams", value: 1500},
   {group: "Slippery When Wet", value: 1180},
   {group: "Meteora", value: 1200},
   {group: "Joyride", value: 1100},
   {group: "Crazy World", value: 1020},
   {group: "Hjertestarter", value: 980},
   {group: "Greatest hits", value: 1000},
   {group: "USADSB", value: 900},
   {group: "Top Gun", value: 950},
   {group: "Wild Cherry", value: 800}
];

const data3 = [//Number of tracks
{group: "Electric Symphony", value: 10},
   {group: "Lost in Time", value: 10},
   {group: "Summer Vibes", value: 10},
   {group: "Electric Dreams", value: 10},
   {group: "The Razors Edge", value: 12},
   {group: "Epic Jams", value: 10},
   {group: "Slippery When Wet", value: 13},
   {group: "Meteora", value: 13},
   {group: "Joyride", value: 15},
   {group: "Crazy World", value: 11},
   {group: "Hjertestarter", value: 11},
   {group: "Greatest hits", value: 18},
   {group: "USADSB", value: 10},
   {group: "Top Gun", value: 10},
   {group: "Wild Cherry", value: 9}
];

const data4 = [//ratings
{group: "Electric Symphony", value: 4.7},
   {group: "Lost in Time", value: 4.9},
   {group: "Summer Vibes", value: 4.6},
   {group: "Electric Dreams", value: 4.2},
   {group: "The Razors Edge", value: 4.8},
   {group: "Epic Jams", value: 4.5},
   {group: "Slippery When Wet", value: 4.6},
   {group: "Meteora", value: 4.6},
   {group: "Joyride", value: 4.5},
   {group: "Crazy World", value: 4.4},
   {group: "Hjertestarter", value: 4.3},
   {group: "Greatest hits", value: 4.5},
   {group: "USADSB", value: 4.2},
   {group: "Top Gun", value: 4.4},
   {group: "Wild Cherry", value: 4.2}
];
//we chose to label our data sets as group for the x axis and value for the y axis
//this is so that we dont have to add a new svg everytime we want the datasets to update based on the associated buttons


   // set the dimensions and margins of the graph
   const margin = { top: 30, right: 30, bottom: 70, left: 60 };
        const width = 1500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Initialize the chart with the first dataset
        let currentData = data1;

        // append the svg object to the body of the page
        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Function to create/update the plot for a given variable:
        function update(data) {
            currentData = data;
            data.sort((a, b) => b.value - a.value); //sort function by max value to min value

            // Update X axis
            const x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(d => d.group))
                .padding(0.5);
            svg.select(".myXaxis").remove();
            svg.append("g")
                .attr("class", "myXaxis")
                .attr("transform", `translate(0,${height})`)
                .transition()
                .duration(1000)
                .call(d3.axisBottom(x));

            // Update Y axis
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
                .range([height, 0]);
            svg.select(".myYaxis").remove();
            svg.append("g")
                .attr("class", "myYaxis")
                .transition()
                .duration(1000)
                .call(d3.axisLeft(y));

            // Update bars
            const u = svg.selectAll("rect")
                .data(data);

            u
                .join("rect")
                .transition()
                .duration(1000)
                .attr("x", d => x(d.group))
                .attr("y", d => y(d.value))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.value))
                .attr("fill", "rgb(54, 34, 44)");


        };
        
        let content = document.getElementById("header");
            document.getElementById("knap1").addEventListener("click",function(){
                   content.innerHTML = "Full Plays"
            })

            document.getElementById("knap2").addEventListener("click",function(){
                   content.innerHTML = "Favourites"
            })
            document.getElementById("knap3").addEventListener("click",function(){
                   content.innerHTML = "Number of tracks"
            })
            document.getElementById("knap4").addEventListener("click",function(){
                   content.innerHTML = "Rating"
            })

