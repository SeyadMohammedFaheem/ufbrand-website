import { google } from 'googleapis'

export async function getProducts() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Updated to allow writing
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A2:I1000', // Updated to include H and I
  })

  const rows = response.data.values || []

  return rows
    .filter(row => row[1])
    .map((row) => ({
      id: row[0] || '',
      name: row[1] || '',
      description: row[2] || '',
      price: parseFloat(row[3]) || 0,
      image: row[4] || '',
      status: row[5] || '',
      type: row[6] || 'KURTI',
      isNewArrival: row[7] === 'TRUE',
      isBestSeller: row[8] === 'TRUE',
    }))
}

export async function updateProduct(id, updatedData) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  // 1. Get all products to find the row index
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A2:A1000',
  })
  const rows = response.data.values || []
  const rowIndex = rows.findIndex(row => row[0] === id)
  
  if (rowIndex === -1) throw new Error('Product not found in sheet')

  const actualRowNumber = rowIndex + 2 // +2 for 1-based indexing and header row

  // 2. Update the row
  const values = [[
    id,
    updatedData.name,
    updatedData.description,
    updatedData.price,
    updatedData.image,
    updatedData.status,
    updatedData.type,
    updatedData.isNewArrival ? 'TRUE' : 'FALSE',
    updatedData.isBestSeller ? 'TRUE' : 'FALSE',
  ]]

  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `Sheet1!A${actualRowNumber}:I${actualRowNumber}`, // Updated range
    valueInputOption: 'RAW',
    requestBody: { values }
  })

  return { success: true }
}