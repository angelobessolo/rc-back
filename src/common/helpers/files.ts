import * as fs from 'fs';
import * as path from 'path';
import { SaveFile } from './interfaces/save-file.interface';
import { ConvertToPng } from './interfaces/convert-to-png.interface';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
import PdfPrinter from 'pdfmake';
import { params } from 'src/params';
import { NotFoundException } from '@nestjs/common';
import { StudentForms } from 'src/controllers/register-student/entities/student-forms.entity';

export async function base64ToPNG(
  base64Image: string,
  nameHint: string,
): Promise<ConvertToPng> {
  try {
    const matches = base64Image.match(/^data:image\/png;base64,(.+)$/);
    if (!matches) {
      throw new Error(
        'Formato de imagen inválido (se espera image/png en base64)',
      );
    }

    const buffer = Buffer.from(matches[1], 'base64');
    const fileName = `${nameHint.replace(/\s+/g, '_')}.png`;

    return {
      buffer,
      fileName,
    };
  } catch (err) {
    throw new Error(`No se pudo convertir la imagen: ${err.message}`);
  }
}

// Method to upload file
// buffer -> Content file
// directory -> Full path to save file
// fileName -> File name
// return -> The method return the full path to save the document
export async function saveFile(
  buffer: Buffer,
  directory: string,
  fileName: string,
): Promise<SaveFile> {
  try {
    fs.mkdirSync(directory, { recursive: true });

    const filePath = path.join(directory, fileName);
    fs.writeFileSync(filePath, buffer);

    return {
      filePath,
      status: true,
    };
  } catch (error) {
    throw new Error(`No se pudo guardar el archivo: ${error.message}`);
  }
}

// Pdf
export async function generateReceive(studentForms: StudentForms) {
  try {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    // Image converted to base64
    const imagePath = path.join(
      process.cwd(),
      'public',
      'images',
      'fundetec2.png',
    );
    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
    const imageDataUrl = `data:image/png;base64,${imageBase64}`;

    const { typeProgram } = studentForms;

    // Titulo del documento
    let type = 'BACHILLERATO CLEI';
    if (typeProgram.id === 2) {
      type = 'TECNICOS LABORALES';
    }

    const description = 'TARJETA DE MATRICULA';

    // Formato fecha de proceso
    const date = new Date();
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];
    const fullDate = `${day} de ${monthNames[month]} del ${year}`;

    // Born date format
    const bornDate = new Date(studentForms.bornDate);
    const bornDateDay = bornDate.getDate();
    const bornDateMonth = monthNames[bornDate.getMonth()];
    const bornDateYear = bornDate.getFullYear();
    const formattedBornDate = `${bornDateDay} de ${bornDateMonth} del ${bornDateYear}`;

    const body: any = {
      image: imageDataUrl,
      companyName: 'FUNDETEC',
      typeProgram: type,
      description: description,
      date: fullDate,
      titleTable: 'DATOS DEL ESTUDIANTE',
      titleTable2: 'DATOS DEL PROGRAMA ACADEMICO',
      names: studentForms.names,
      sureNames: studentForms.sureNames,
      typeDocument: studentForms.typeDocuments.documentName,
      documentNumber: studentForms.documentNumber,
      expeditionPlace: studentForms.expeditionPlace,
      age: studentForms.age,
      email: studentForms.email,
      bornDate: formattedBornDate,
      state: studentForms.state,
      city: studentForms.city,
      neighborhood: studentForms.neighborhood,
      address: studentForms.address,
      phoneNumber: studentForms.phoneNumber,
      secondPhoneNumber: studentForms.secondPhoneNumber,
      program: studentForms.program.programName,
      modality: studentForms?.program?.typeModality?.modalityName,
      group: studentForms?.group?.groupName,
      graduationYear: studentForms.graduationYear,
      agent: studentForms.agent,
      documents: studentForms.documents,
      observation: studentForms.observation,
    };

    let docDefinition: TDocumentDefinitions;

    // Bachelor(1) - Tecnic(2) 
    switch (typeProgram.id){
      case 1: 
        if (studentForms.studentFormsCycles.length > 0) {
        // Form 
        docDefinition = {
          pageMargins: [20, 20, 20, 20],
          defaultStyle: {
            fontSize: 12,
          },
          footer: function (currentPage, pageCount) {
            return {
              columns: [
                {
                  text: `Página ${currentPage} de ${pageCount}`,
                  alignment: 'right',
                  fontSize: 10,
                },
              ],
              margin: [0, 0, 20, 0], // margen exterior del footer (opcional)
            };
          },
          content: [
            // Imagen de fondo (marca de agua)
            {
              image: imageDataUrl,
              fit: [595, 842], // ajusta a tamaño A4
              opacity: 0.2, // valor típico para marca de agua
              absolutePosition: { x: 0, y: 180 },
            },

            // Encabezado con logo e info
            {
              columns: [
                {
                  image: imageDataUrl,
                  width: 100,
                  height: 100,
                },
                {
                  margin: [0, 0, 0, 0],
                  alignment: 'center',
                  width: 400,
                  stack: [
                    {
                      text: body.companyName,
                      fontSize: 25,
                      color: 'green',
                      bold: true,
                    },
                    { text: body.typeProgram, fontSize: 23, bold: true },
                    { text: body.description, fontSize: 16, bold: true },
                    { text: body.date, fontSize: 16, bold: true },
                  ],
                },
              ],
              margin: [0, 20, 0, 10],
            },

            // Tabla de datos del estudiante
            {
              table: {
                widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                body: [
                  [
                    {
                      text: body.titleTable,
                      colSpan: 10,
                      alignment: 'center',
                      bold: true,
                      fontSize: 12,
                      color: 'white',
                      fillColor: 'green',
                      margin: [0, 5, 0, 5],
                    },
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                  ],
                  [
                    {
                      text: [{ text: 'NOMBRES:\n', bold: true }, body.names],
                      colSpan: 5,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {},
                    {},
                    {
                      text: [
                        { text: 'APELLIDOS:\n', bold: true },
                        body.sureNames,
                      ],
                      colSpan: 5,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {},
                    {},
                  ],
                  [
                    {
                      text: [
                        { text: 'TIPO DE DOCUMENTO:\n', bold: true },
                        body.typeDocument,
                      ],
                      colSpan: 3,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {
                      text: [
                        { text: 'N° DOCUMENTO:\n', bold: true },
                        body.documentNumber,
                      ],
                      colSpan: 3,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {
                      text: [
                        { text: 'LUGAR DE EXPEDICIÓN:\n', bold: true },
                        body.expeditionPlace,
                      ],
                      colSpan: 3,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {
                      text: [{ text: 'EDAD:\n', bold: true }, body.age],
                      margin: [2, 2, 2, 2],
                    },
                  ],
                  [
                    {
                      text: [
                        { text: 'CORREO ELECTRÓNICO:\n', bold: true },
                        body.email,
                      ],
                      colSpan: 5,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {},
                    {},
                    {
                      text: [
                        { text: 'FECHA DE NACIMIENTO:\n', bold: true },
                        body.bornDate,
                      ],
                      colSpan: 5,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {},
                    {},
                  ],
                  [
                    {
                      text: [
                        { text: 'DEPARTAMENTO:\n', bold: true },
                        body.state,
                      ],
                      colSpan: 3,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {
                      text: [{ text: 'CIUDAD:\n', bold: true }, body.city],
                      colSpan: 2,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {
                      text: [
                        { text: 'BARRIO:\n', bold: true },
                        body.neighborhood,
                      ],
                      colSpan: 2,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {
                      text: [
                        { text: 'DIRECCIÓN:\n', bold: true },
                        body.address,
                      ],
                      colSpan: 3,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                  ],
                  [
                    {
                      text: [
                        { text: 'NÚMERO DE WHATSAPP:\n', bold: true },
                        body.phoneNumber,
                      ],
                      colSpan: 5,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {},
                    {},
                    {
                      text: [
                        { text: 'NÚMERO DE CONTACTO 2:\n', bold: true },
                        body.secondPhoneNumber,
                      ],
                      colSpan: 5,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {},
                    {},
                  ],
                ],
              },
              margin: [0, 10, 0, 10],
            },

            // Tabla del programa académico
            {
              table: {
                widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                body: [
                  [
                    {
                      text: body.titleTable2,
                      colSpan: 10,
                      alignment: 'center',
                      bold: true,
                      fontSize: 12,
                      color: 'white',
                      fillColor: 'green',
                      margin: [0, 5, 0, 5],
                    },
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                  ],
                  [
                    {
                      text: [{ text: 'PROGRAMA:\n', bold: true }, body.program],
                      colSpan: 2,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {
                      text: [
                        { text: 'MODALIDAD:\n', bold: true },
                        body.modality,
                      ],
                      colSpan: 2,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {
                      text: [{ text: 'GRUPO:\n', bold: true }, body.group],
                      colSpan: 2,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {
                      text: [
                        { text: 'AÑO GRADUACIÓN:\n', bold: true },
                        body.graduationYear,
                      ],
                      colSpan: 2,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {
                      text: [{ text: 'ASESOR:\n', bold: true }, body.agent],
                      colSpan: 2,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                  ],
                  [
                    {
                      text: [
                        { text: 'Documentos Entregados:\n', bold: true },
                        body.documents,
                      ],
                      colSpan: 10,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                  ],
                  [
                    {
                      text: [
                        { text: 'Observaciones:\n', bold: true },
                        body.observation,
                      ],
                      colSpan: 10,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                  ],
                ],
              },
              margin: [0, 10, 0, 0],
            },

            // Tabla de ciclos
            {
              table: {
                widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                body: [
                  [
                    {
                      text: 'DATOS DE CICLOS',
                      colSpan: 10,
                      alignment: 'center',
                      bold: true,
                      fontSize: 12,
                      color: 'white',
                      fillColor: 'green',
                      margin: [0, 5, 0, 5],
                    },
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                  ],
                  [
                    {
                      text: [
                        { text: 'TÉCNICO RELACIONADO:\n', bold: true },
                        body.program,
                      ],
                      colSpan: 10,
                      margin: [2, 2, 2, 2],
                    },
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                  ],
                  [
                    {
                      colSpan: 10,
                      margin: [5, 5, 5, 5],
                      table: {
                        widths: ['*', '*'],
                        body: [
                          [
                            { text: 'CICLO', bold: true, fillColor: '#eeeeee' },
                            {
                              text: 'CONTENIDO',
                              bold: true,
                              fillColor: '#eeeeee',
                            },
                          ],
                          // Aquí insertas dinámicamente los ciclos:
                          ...studentForms.studentFormsCycles.map(
                            (cycle: any) => [
                              { text: cycle.cycles.cycleNumber },
                              { text: '' },
                            ],
                          ),
                        ],
                      },
                    },
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                  ],
                ],
              },
              margin: [0, 10, 0, 0],
            },
          ],
        };
        } else {
          // Se crea el formulario manual normal
          docDefinition = {
            pageMargins: [20, 20, 20, 20],
            defaultStyle: {
              fontSize: 12,
            },
            footer: function (currentPage, pageCount) {
              return {
                columns: [
                  {
                    text: `Página ${currentPage} de ${pageCount}`,
                    alignment: 'right',
                    fontSize: 10,
                  },
                ],
                margin: [0, 0, 20, 0], // margen exterior del footer (opcional)
              };
            },
            content: [
              // Imagen de fondo (marca de agua)
              {
                image: imageDataUrl,
                fit: [595, 842], // ajusta a tamaño A4
                opacity: 0.2, // valor típico para marca de agua
                absolutePosition: { x: 0, y: 180 },
              },

              // Encabezado con logo e info
              {
                columns: [
                  {
                    image: imageDataUrl,
                    width: 100,
                    height: 100,
                  },
                  {
                    margin: [0, 0, 0, 0],
                    alignment: 'center',
                    width: 400,
                    stack: [
                      {
                        text: body.companyName,
                        fontSize: 25,
                        color: 'green',
                        bold: true,
                      },
                      { text: body.typeProgram, fontSize: 23, bold: true },
                      { text: body.description, fontSize: 16, bold: true },
                      { text: body.date, fontSize: 16, bold: true },
                    ],
                  },
                ],
                margin: [0, 20, 0, 10],
              },

              // Tabla de datos del estudiante
              {
                table: {
                  widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                  body: [
                    [
                      {
                        text: body.titleTable,
                        colSpan: 10,
                        alignment: 'center',
                        bold: true,
                        fontSize: 12,
                        color: 'white',
                        fillColor: 'green',
                        margin: [0, 5, 0, 5],
                      },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      {
                        text: [{ text: 'NOMBRES:\n', bold: true }, body.names],
                        colSpan: 5,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {},
                      {},
                      {
                        text: [
                          { text: 'APELLIDOS:\n', bold: true },
                          body.sureNames,
                        ],
                        colSpan: 5,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      {
                        text: [
                          { text: 'TIPO DE DOCUMENTO:\n', bold: true },
                          body.typeDocument,
                        ],
                        colSpan: 3,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {
                        text: [
                          { text: 'N° DOCUMENTO:\n', bold: true },
                          body.documentNumber,
                        ],
                        colSpan: 3,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {
                        text: [
                          { text: 'LUGAR DE EXPEDICIÓN:\n', bold: true },
                          body.expeditionPlace,
                        ],
                        colSpan: 3,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {
                        text: [{ text: 'EDAD:\n', bold: true }, body.age],
                        margin: [2, 2, 2, 2],
                      },
                    ],
                    [
                      {
                        text: [
                          { text: 'CORREO ELECTRÓNICO:\n', bold: true },
                          body.email,
                        ],
                        colSpan: 5,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {},
                      {},
                      {
                        text: [
                          { text: 'FECHA DE NACIMIENTO:\n', bold: true },
                          body.bornDate,
                        ],
                        colSpan: 5,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      {
                        text: [
                          { text: 'DEPARTAMENTO:\n', bold: true },
                          body.state,
                        ],
                        colSpan: 3,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {
                        text: [{ text: 'CIUDAD:\n', bold: true }, body.city],
                        colSpan: 2,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {
                        text: [
                          { text: 'BARRIO:\n', bold: true },
                          body.neighborhood,
                        ],
                        colSpan: 2,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {
                        text: [
                          { text: 'DIRECCIÓN:\n', bold: true },
                          body.address,
                        ],
                        colSpan: 3,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                    ],
                    [
                      {
                        text: [
                          { text: 'NÚMERO DE WHATSAPP:\n', bold: true },
                          body.phoneNumber,
                        ],
                        colSpan: 5,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {},
                      {},
                      {
                        text: [
                          { text: 'NÚMERO DE CONTACTO 2:\n', bold: true },
                          body.secondPhoneNumber,
                        ],
                        colSpan: 5,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {},
                      {},
                    ],
                  ],
                },
                margin: [0, 10, 0, 10],
              },

              // Tabla del programa académico
              {
                table: {
                  widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                  body: [
                    [
                      {
                        text: body.titleTable2,
                        colSpan: 10,
                        alignment: 'center',
                        bold: true,
                        fontSize: 12,
                        color: 'white',
                        fillColor: 'green',
                        margin: [0, 5, 0, 5],
                      },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      {
                        text: [{ text: 'PROGRAMA:\n', bold: true }, body.program],
                        colSpan: 2,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {
                        text: [
                          { text: 'MODALIDAD:\n', bold: true },
                          body.modality,
                        ],
                        colSpan: 2,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {
                        text: [{ text: 'GRUPO:\n', bold: true }, body.group],
                        colSpan: 2,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {
                        text: [
                          { text: 'AÑO GRADUACIÓN:\n', bold: true },
                          body.graduationYear,
                        ],
                        colSpan: 2,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {
                        text: [{ text: 'ASESOR:\n', bold: true }, body.agent],
                        colSpan: 2,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                    ],
                    [
                      {
                        text: [
                          { text: 'Documentos Entregados:\n', bold: true },
                          body.documents,
                        ],
                        colSpan: 10,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      {
                        text: [
                          { text: 'Observaciones:\n', bold: true },
                          body.observation,
                        ],
                        colSpan: 10,
                        margin: [2, 2, 2, 2],
                      },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                    ],
                  ],
                },
                margin: [0, 10, 0, 0],
              },
            ],
          };
        }
      break;

      case 2:
        docDefinition = {
        pageMargins: [20, 20, 20, 20],
        defaultStyle: {
          fontSize: 12,
        },
        footer: function (currentPage, pageCount) {
          return {
            columns: [
              {
                text: `Página ${currentPage} de ${pageCount}`,
                alignment: 'right',
                fontSize: 10,
              },
            ],
            margin: [0, 0, 20, 0], // margen exterior del footer (opcional)
          };
        },
        content: [
          // Imagen de fondo (marca de agua)
          {
            image: imageDataUrl,
            fit: [595, 842], // ajusta a tamaño A4
            opacity: 0.2, // valor típico para marca de agua
            absolutePosition: { x: 0, y: 180 },
          },

          // Encabezado con logo e info
          {
            columns: [
              {
                image: imageDataUrl,
                width: 100,
                height: 100,
              },
              {
                margin: [0, 0, 0, 0],
                alignment: 'center',
                width: 400,
                stack: [
                  {
                    text: body.companyName,
                    fontSize: 25,
                    color: 'green',
                    bold: true,
                  },
                  { text: body.typeProgram, fontSize: 23, bold: true },
                  { text: body.description, fontSize: 16, bold: true },
                  { text: body.date, fontSize: 16, bold: true },
                ],
              },
            ],
            margin: [0, 0, 0, 10],
          },

          // Tabla de datos del estudiante
          {
            table: {
              widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
              body: [
                [
                  {
                    text: body.titleTable,
                    colSpan: 10,
                    alignment: 'center',
                    bold: true,
                    fontSize: 12,
                    color: 'white',
                    fillColor: 'green',
                    margin: [0, 5, 0, 5],
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: [{ text: 'NOMBRES:\n', bold: true }, body.names],
                    colSpan: 5,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {},
                  {},
                  {
                    text: [
                      { text: 'APELLIDOS:\n', bold: true },
                      body.sureNames,
                    ],
                    colSpan: 5,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: [
                      { text: 'TIPO DE DOCUMENTO:\n', bold: true },
                      body.typeDocument,
                    ],
                    colSpan: 3,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {
                    text: [
                      { text: 'N° DOCUMENTO:\n', bold: true },
                      body.documentNumber,
                    ],
                    colSpan: 3,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {
                    text: [
                      { text: 'LUGAR DE EXPEDICIÓN:\n', bold: true },
                      body.expeditionPlace,
                    ],
                    colSpan: 3,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {
                    text: [{ text: 'EDAD:\n', bold: true }, body.age],
                    margin: [2, 2, 2, 2],
                  },
                ],
                [
                  {
                    text: [
                      { text: 'CORREO ELECTRÓNICO:\n', bold: true },
                      body.email,
                    ],
                    colSpan: 5,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {},
                  {},
                  {
                    text: [
                      { text: 'FECHA DE NACIMIENTO:\n', bold: true },
                      body.bornDate,
                    ],
                    colSpan: 5,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: [{ text: 'DEPARTAMENTO:\n', bold: true }, body.state],
                    colSpan: 3,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {
                    text: [{ text: 'CIUDAD:\n', bold: true }, body.city],
                    colSpan: 2,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {
                    text: [
                      { text: 'BARRIO:\n', bold: true },
                      body.neighborhood,
                    ],
                    colSpan: 2,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {
                    text: [{ text: 'DIRECCIÓN:\n', bold: true }, body.address],
                    colSpan: 3,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: [
                      { text: 'NÚMERO DE WHATSAPP:\n', bold: true },
                      body.phoneNumber,
                    ],
                    colSpan: 5,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {},
                  {},
                  {
                    text: [
                      { text: 'NÚMERO DE CONTACTO 2:\n', bold: true },
                      body.secondPhoneNumber,
                    ],
                    colSpan: 5,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {},
                  {},
                ],
              ],
            },
            margin: [0, 10, 0, 10],
          },

          // Tabla del programa académico
          {
            table: {
              widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
              body: [
                [
                  {
                    text: body.titleTable2,
                    colSpan: 10,
                    alignment: 'center',
                    bold: true,
                    fontSize: 12,
                    color: 'white',
                    fillColor: 'green',
                    margin: [0, 5, 0, 5],
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: [{ text: 'PROGRAMA:\n', bold: true }, body.program],
                    colSpan: 2,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {
                    text: [{ text: 'MODALIDAD:\n', bold: true }, body.modality],
                    colSpan: 2,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {
                    text: [{ text: 'GRUPO:\n', bold: true }, body.group],
                    colSpan: 2,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {
                    text: [
                      { text: 'AÑO GRADUACIÓN:\n', bold: true },
                      body.graduationYear,
                    ],
                    colSpan: 2,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {
                    text: [{ text: 'ASESOR:\n', bold: true }, body.agent],
                    colSpan: 2,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                ],
                [
                  {
                    text: [
                      { text: 'Documentos Entregados:\n', bold: true },
                      body.documents,
                    ],
                    colSpan: 10,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: [
                      { text: 'Observaciones:\n', bold: true },
                      body.observation,
                    ],
                    colSpan: 10,
                    margin: [2, 2, 2, 2],
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
              ],
            },
            margin: [0, 10, 0, 0],
          },
        ],
      };
      break;
    }

    const doc = await createPdf(docDefinition);

    // Convert the file PDF to Buffer
    const docBuffer: Buffer = await new Promise((resolve, reject) => {
      const chunks: any[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
      doc.end();
    });

    // Path to storage
    const route = path.join(
      process.cwd(),
      'src',
      `${params.storage}`,
      `${year}`,
      'files',
    );

    const fileName = `${studentForms.typeProgram.id}-${studentForms.program.programName}-${studentForms.documentNumber}.pdf`;
    const fileNameWithoutBlanks = fileName.replaceAll(' ', '-');

    const savedFile = await saveFile(docBuffer, route, fileNameWithoutBlanks);
    if (!savedFile.status) {
      throw new NotFoundException(
        `Hubo un error al momento de almacenar imagen de la asignatura`,
      );
    }

    return {
      buffer: docBuffer,
      path: savedFile.filePath,
      filename: fileNameWithoutBlanks,
    };
  } catch (error) {
    throw new Error(`No se pudo convertir la imagen: ${error}`);
  }
}

export async function createPdf(
  documentDefinition: TDocumentDefinitions,
  options: BufferOptions = {},
) {
  const fonts = {
    Roboto: {
      normal: path.join(process.cwd(), 'fonts', 'Roboto-Regular.ttf'),
      bold: path.join(process.cwd(), 'fonts', 'Roboto-Medium.ttf'),
      italics: path.join(process.cwd(), 'fonts', 'Roboto-Italic.ttf'),
      bolditalics: path.join(process.cwd(), 'fonts', 'Roboto-MediumItalic.ttf'),
    },
  };

  const printer = new PdfPrinter(fonts);

  return printer.createPdfKitDocument(documentDefinition, options);
}
