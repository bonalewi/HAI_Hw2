// const msgerForm = get(".msger-inputarea");
// const msgerInput = get(".msger-input");
// const msgerChat = get(".msger-chat");

// const BOT_MSGS = [
// "Please upload your .CSV file"];


// // Icons made by Freepik from www.flaticon.com
// const BOT_IMG = "https://static.vecteezy.com/system/resources/previews/014/194/232/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg";
// const PERSON_IMG = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Favatars-99%2F62%2Favatar-370-456322-512.png&f=1&nofb=1&ipt=81a6b29d5dca0cbf9e1ebba0428243777a299913fb4d164efc8c501c63d5504d&ipo=images";
// const BOT_NAME = "SimpleAI";
// const PERSON_NAME = "User";

// msgerForm.addEventListener("submit", event => {
//   event.preventDefault();

//   const msgText = msgerInput.value;
//   if (!msgText) return;

//   appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
//   msgerInput.value = "";

//   botResponse();
// });

// function appendMessage(name, img, side, text) {
//   //   Simple solution for small apps
//   const msgHTML = `
//     <div class="msg ${side}-msg">
//       <div class="msg-img" style="background-image: url(${img})"></div>

//       <div class="msg-bubble">
//         <div class="msg-info">
//           <div class="msg-info-name">${name}</div>
//           <div class="msg-info-time">${formatDate(new Date())}</div>
//         </div>

//         <div class="msg-text">${text}</div>
//       </div>
//     </div>
//   `;

//   msgerChat.insertAdjacentHTML("beforeend", msgHTML);
//   msgerChat.scrollTop += 500;
// }

// function botResponse() {
//   const r = random(0, BOT_MSGS.length - 1);
//   const msgText = BOT_MSGS[r];
//   const delay = msgText.split(" ").length * 100;

//   setTimeout(() => {
//     appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
//   }, delay);
// }

// // Utils
// function get(selector, root = document) {
//   return root.querySelector(selector);
// }

// function formatDate(date) {
//   const h = "0" + date.getHours();
//   const m = "0" + date.getMinutes();

//   return `${h.slice(-2)}:${m.slice(-2)}`;
// }

// function random(min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// }
// function uploadCSV() {
//   const input = document.getElementById('csvFileInput');
//   const file = input.files[0];

//   if (file) {
//       console.log('File selected:', file);  // Debug log
//       readCSVFile(file);
//   } else {
//       alert("Please upload a CSV file first.");
//   }
// }

// // Function to read and parse the CSV file using D3
// function readCSVFile(file) {
//   const reader = new FileReader();
//   reader.onload = function(e) {
//       const text = e.target.result;
//       const data = d3.csvParse(text, d3.autoType);  // Use d3 to parse CSV and auto-detect types
//       console.log('Parsed data:', data);  // Debug log
//       processCSV(data);
//   };
//   reader.readAsText(file);
// }

// // Function to display a table preview
// function processCSV(data) {
//   const previewData = data.slice(0, 10);  // Show only the first 10 rows
//   console.log('Displaying preview of:', previewData);  // Debug log
//   createTable(previewData);
//   showPreview();  // Show the preview container
// }

// // Function to create a table for preview
// function createTable(data) {
//   const tableDiv = document.getElementById('previewTable');
//   tableDiv.innerHTML = ''; // Clear previous table, if any

//   if (data.length === 0) {
//       tableDiv.innerHTML = '<p>No data available</p>';
//       return;
//   }

//   // Create table element
//   const table = document.createElement('table');
//   const headerRow = document.createElement('tr');

//   // Get headers from the first row's keys
//   const headers = Object.keys(data[0]);
//   headers.forEach(header => {
//       const th = document.createElement('th');
//       th.textContent = header;
//       headerRow.appendChild(th);
//   });
//   table.appendChild(headerRow);

//   // Add rows for data preview
//   data.forEach(row => {
//       const tr = document.createElement('tr');
//       headers.forEach(header => {
//           const td = document.createElement('td');
//           td.textContent = row[header];
//           tr.appendChild(td);
//       });
//       table.appendChild(tr);
//   });

//   // Append the table to the div
//   tableDiv.appendChild(table);
// }

// // Function to show the preview
// function showPreview() {
//   const previewContainer = document.getElementById('previewContainer');
//   const chatArea = document.querySelector('.msger-chat');

//   previewContainer.style.display = 'flex';  // Show the preview
//   chatArea.style.display = 'none';  // Hide the chat area
// }

// // Function to close the preview and show the chat again
// function closePreview() {
//   const previewContainer = document.getElementById('previewContainer');
//   const chatArea = document.querySelector('.msger-chat');

//   previewContainer.style.display = 'none';  // Hide the preview
//   chatArea.style.display = 'block';  // Show the chat area
// }

// async function generateChart() {
//   const csvData = await readCSVData(); // Get the CSV data already parsed
//   if (!csvData || csvData.length === 0) {
//       alert("No data available to generate a chart.");
//       return;
//   }

//   const columns = Object.keys(csvData[0]);
//   const columnTypes = columns.map(col => ({
//       name: col,
//       type: typeof csvData[0][col], // This is a simplified type check
//       sample: csvData[0][col],
//   }));

//   const question = "How do sales trends vary across different categories and regions over time?"; // Example question

//   const prompt = `
//   I have a dataset with the following columns:
//   ${columnTypes.map(col => `- ${col.name} (${col.type}): Example value: ${col.sample}`).join("\n")}

//   The user wants to visualize how sales trends vary across different categories and regions over time. 
//   Please generate a Vega-Lite specification for a line chart where:
//   1. The x-axis represents the Date.
//   2. The y-axis represents Sales.
//   3. Different lines represent different Categories, and colors differentiate the Regions.

//   Also, provide a textual description of the chart that explains the trends observed.
//   `;

//   // Call OpenAI API
//   const apiResponse = await callOpenAI(prompt);
//   const { vegaLiteSpec, description } = apiResponse; // Adjust based on the API response structure

//   // Render Vega-Lite Chart
//   renderChart(vegaLiteSpec);

//   // Display Description
//   displayDescription(description);
// }

// // Function to read CSV data - adjusted for the new structure
// async function readCSVData() {
//   // Implement a way to access your parsed CSV data
//   // This can be a variable that holds the parsed data after the user uploads a CSV
//   return parsedCSVData; // Assuming you have a global variable holding the parsed CSV
// }

// // Function to call OpenAI API
// async function callOpenAI(prompt) {
//   const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//           'Authorization': `Bearer OPENAI_API`,
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//           model: 'gpt-3.5-turbo', // or whatever model you want to use
//           messages: [{ role: 'user', content: prompt }],
//           max_tokens: 500, // Adjust as needed
//       })
//   });

//   const data = await response.json();
//   // Extract the Vega-Lite spec and description from the response
//   const vegaLiteSpec = data.choices[0].message.content; // Adjust based on the actual response structure
//   return vegaLiteSpec; // Modify based on your needs
// }

// // Function to render Vega-Lite chart
// function renderChart(vegaLiteSpec) {
//   const chartContainer = document.getElementById('chartContainer');
//   chartContainer.innerHTML = ''; // Clear previous chart

//   // Render the chart using Vega-Lite
//   vegaEmbed(chartContainer, vegaLiteSpec)
//       .then(result => {
//           console.log('Chart rendered:', result);
//       })
//       .catch(console.error);
// }

// // Function to display the chart description
// function displayDescription(description) {
//   const descriptionContainer = document.createElement('div');
//   descriptionContainer.innerHTML = `<h3>Chart Description:</h3><p>${description}</p>`;
//   document.getElementById('chartContainer').appendChild(descriptionContainer);
// }

// // Event Listener for Generate Chart button
// document.getElementById('generateChartButton').addEventListener('click', generateChart);


const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const generateChartButton = document.getElementById('generateChartButton');

const BOT_MSGS = [
  "Please upload your .CSV file"
];

// Constants for bot and user images
const BOT_IMG = "https://static.vecteezy.com/system/resources/previews/014/194/232/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg";
const PERSON_IMG = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Favatars-99%2F62%2Favatar-370-456322-512.png&f=1&nofb=1";
const BOT_NAME = "SimpleAI";
const PERSON_NAME = "User";

// Variable to store parsed CSV data
let parsedCSVData = [];

// Event listener for message submission
msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  // Trigger bot response if needed
  botResponse();
});

// Function to append messages to the chat
function appendMessage(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

// Function for bot responses
function botResponse() {
  const r = random(0, BOT_MSGS.length - 1);
  const msgText = BOT_MSGS[r];
  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }, delay);
}

// Function to upload and process the CSV file
function uploadCSV() {
  const input = document.getElementById('csvFileInput');
  const file = input.files[0];

  if (file) {
    console.log('File selected:', file);  // Debug log
    readCSVFile(file);
  } else {
    alert("Please upload a CSV file first.");
  }
}

// Function to read and parse the CSV file using D3
function readCSVFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    parsedCSVData = d3.csvParse(text, d3.autoType);  // Use d3 to parse CSV and auto-detect types
    console.log('Parsed data:', parsedCSVData);  // Debug log
    processCSV(parsedCSVData);
  };
  reader.readAsText(file);
}

// Function to display a table preview and show the Generate Chart button
function processCSV(data) {
  const previewData = data.slice(0, 10);  // Show only the first 10 rows
  console.log('Displaying preview of:', previewData);  // Debug log
  createTable(previewData);
  showPreview();  // Show the preview
  generateChartButton.style.display = 'block'; // Show the Generate Chart button
}

// Function to create a table for preview
function createTable(data) {
  const tableDiv = document.getElementById('previewTable');
  tableDiv.innerHTML = ''; // Clear previous table, if any

  if (data.length === 0) {
    tableDiv.innerHTML = '<p>No data available</p>';
    return;
  }

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');

  const headers = Object.keys(data[0]);
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  data.forEach(row => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
      const td = document.createElement('td');
      td.textContent = row[header];
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  tableDiv.appendChild(table);
}

// Function to show the preview
function showPreview() {
  const previewContainer = document.getElementById('previewContainer');
  const chatArea = document.querySelector('.msger-chat');

  previewContainer.style.display = 'flex';  // Show the preview
  chatArea.style.display = 'none';  // Hide the chat area
}

// Function to close the preview and show the chat again
function closePreview() {
  const previewContainer = document.getElementById('previewContainer');
  const chatArea = document.querySelector('.msger-chat');

  previewContainer.style.display = 'none';  // Hide the preview
  chatArea.style.display = 'block';  // Show the chat area
}

// Function to generate Vega-Lite chart using OpenAI API
async function generateChart() {
  if (parsedCSVData.length === 0) {
    alert("No data available to generate a chart.");
    return;
  }

  const columns = Object.keys(parsedCSVData[0]);
  const columnTypes = columns.map(col => ({
    name: col,
    type: typeof parsedCSVData[0][col],
    sample: parsedCSVData[0][col],
  }));

  const prompt = `
  I have a dataset with the following columns:
  ${columnTypes.map(col => `- ${col.name} (${col.type}): Example value: ${col.sample}`).join("\n")}
  
  The user wants to visualize the data. 
  Please generate a Vega-Lite specification for a suitable chart and provide a description of the chart.
  `;

  // Call OpenAI API
  appendMessage(BOT_NAME, BOT_IMG, "left", "Generating chart...");
  try {
    const apiResponse = await callOpenAI(prompt);
    const { vegaLiteSpec, description } = apiResponse; // Adjust based on the API response structure

    // Render Vega-Lite Chart
    renderChart(vegaLiteSpec);

    // Display Description
    appendMessage(BOT_NAME, BOT_IMG, "left", description);
  } catch (error) {
    console.error("Error generating chart:", error);
    appendMessage(BOT_NAME, BOT_IMG, "left", "Failed to generate chart. Please try again.");
  }
}

// Function to call OpenAI API
async function callOpenAI(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer OPENAI_API`, // Replace with your actual API key
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // or whatever model you want to use
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    })
  });
  console.log('Parsed CSV Data:', parsedCSVData);

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const vegaLiteSpec = data.choices[0].message.content; // Adjust based on the actual response structure
  return { vegaLiteSpec, description: "Chart generated based on your dataset." }; // Mock description, adjust based on your API response
}

// Function to render Vega-Lite chart
function renderChart(vegaLiteSpec) {
  const chartContainer = document.getElementById('chartContainer');
  chartContainer.innerHTML = ''; // Clear previous chart

  // Render the chart using Vega-Lite
  vegaEmbed(chartContainer, vegaLiteSpec)
    .then(result => {
      console.log('Chart rendered:', result);
    })
    .catch(error => {
      console.error('Error rendering chart:', error);
      appendMessage(BOT_NAME, BOT_IMG, "left", "Error rendering the chart.");
    });
}

// Event Listener for Generate Chart button
generateChartButton.addEventListener('click', generateChart);

// Utils functions
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
