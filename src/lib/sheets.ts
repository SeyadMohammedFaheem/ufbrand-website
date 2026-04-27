import { google } from 'googleapis'

export async function getProducts() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A2:F1000', // skip header row
  })

  const rows = response.data.values || []

  return rows
    .filter(row => row[1]) // skip empty rows
    .map((row) => ({
      id: row[0] || '',        // A - Instagram ID
      name: row[1] || '',      // B - Product name
      description: row[2] || '', // C - Description
      price: parseFloat(row[3]) || 0, // D - Price
      image: row[4] || '',     // E - Image URL
      status: row[5] || '',    // F - Status
    }))
}