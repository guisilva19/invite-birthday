import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Configuração do Google Sheets
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const RANGE = 'Página1!A:C'; // Colunas: Nome, Data, Timestamp

// Função para autenticar com o Google Sheets
async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  });
  return auth;
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Nome é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se as variáveis de ambiente estão configuradas
    if (!SPREADSHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta' },
        { status: 500 }
      );
    }

    // Autenticar com o Google
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    // Preparar os dados para inserção
    const now = new Date();
    const timestamp = now.toISOString();
    const dateStr = now.toLocaleDateString('pt-BR');
    
    const values = [[name, dateStr, timestamp]];

    // Inserir dados na planilha
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'RAW',
      requestBody: {
        values: values,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Presença confirmada com sucesso!',
      data: response.data
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
} 