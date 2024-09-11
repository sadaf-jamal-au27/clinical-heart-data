# Clinic Health Data API

## Overview

The Clinic Health Data API is designed to receive, process, and store heart rate and other clinical metrics data from medical devices. The API is built with Node.js and Express.js, and uses MySQL for data storage. It handles asynchronous data processing, aggregation of metrics, and provides endpoints for retrieving processed results.

## Features

- **Data Reception**: Endpoint to receive JSON payloads containing heart rate and other clinical metrics.
- **Data Processing**: Aggregates heart rate data into 15-minute intervals and computes min and max values.
- **Data Storage**: Stores processed data in a MySQL database for persistence.
- **Data Retrieval**: Provides endpoints to retrieve aggregated metrics and other data.

## Technologies

- Node.js (v18.x or later)
- Express.js
- MySQL
- Sequelize (ORM)
- dotenv (for environment variables)
- body-parser (for parsing request bodies)

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
- **MySQL**: Download and install from [mysql.com](https://www.mysql.com/).

### Clone the Repository

```bash
git clone https://github.com/your-username/clinic-health-data.git
cd clinic-health-data
