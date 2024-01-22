const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 8080;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PDF Generator API',
      version: '1.0.0',
      description: 'A simple API to generate PDF from HTML',
    },
  },
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

/**
 * @openapi
 * /generate-pdf:
 *   post:
 *     summary: Generates a PDF from a provided URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: URL of the HTML page to convert to PDF
 *     responses:
 *       200:
 *         description: Returns a PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad request if URL is missing
 *       500:
 *         description: Server error
 */
app.post('/generate-pdf', async (req, res) => {
  try {
      const { url } = req.body;

      if (!url) {
          return res.status(400).send({ error: "URL is required" });
      }

      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });
      
      // Tworzy bufor PDF
      const pdfBuffer = await page.pdf({ format: 'A4' });

      await browser.close();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(url)}.pdf`);
      
      res.send(pdfBuffer);
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});