# PdfGeneratorFromUrlApi

## Overview
PdfGeneratorFromUrlApi is a Node.js based API service that converts HTML pages to PDF documents. Using Puppeteer for rendering HTML, it's ideal for dynamically generating PDFs from web pages.

## Features
URL to PDF Conversion: Converts any web page to a PDF document by providing its URL.
Swagger Documentation: Integrated Swagger UI for easy API testing and documentation.
Docker Support: Docker configuration included for seamless deployment.
Error Handling: Implements robust error handling for consistent service performance.

## Prerequisites
To use PdfGeneratorFromUrlApi, Docker must be installed on your system.

## Installation
Clone the Repository
```bash
git clone https://github.com/darek1945/PdfGeneratorFromUrlApi.git
```
Navigate to the Cloned Directory
```bash
cd PdfGeneratorFromUrlApi
```
#Running the Application
##Using Docker Compose

To build and run the Docker container, execute:
```bash
docker-compose up --build
```
The service will be accessible at http://localhost.
Using the API
Access the Swagger UI at http://localhost/swagger to use the API.
Convert a URL to a PDF using the /generate-pdf endpoint.

# Contributing
Contributions are welcome. Please adhere to the existing coding style and include unit tests for new or modified functionality.

# License
This project is licensed under the MIT License.
