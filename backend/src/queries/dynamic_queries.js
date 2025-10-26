// Table: historico_requisiciones
/*Columns:
    Fecha DATE,
    Sede VARCHAR(50),
    Codigo VARCHAR(50),
    Tipo VARCHAR(50),
    Tamano VARCHAR(50),
    Base VARCHAR(50),
    Producto VARCHAR(100),
    UnidadesOrdenadas INT,  
    id SERIAL PRIMARY KEY
*/

export function buildConsultaPersonalizadaQuery(params) {
    let baseQuery = `
    SELECT 
      fecha,
      sede,
      codigo,
      tipo,
      tamano,
      base,
      producto,
      unidadesordenadas
    FROM historico_requisiciones
    WHERE 1=1
  `;

    const values = [];
    let index = 1;

    // Filtro por rango de fechas
    if (params.fechaInicio) {
        baseQuery += ` AND fecha >= $${index++}`;
        values.push(params.fechaInicio);
    }

    if (params.fechaFin) {
        baseQuery += ` AND fecha <= $${index++}`;
        values.push(params.fechaFin);
    }

    // Filtros de texto
    if (params.sede) {
        baseQuery += ` AND sede ILIKE $${index++}`;
        values.push(`%${params.sede}%`);
    }

    if (params.tipo) {
        baseQuery += ` AND tipo ILIKE $${index++}`;
        values.push(`%${params.tipo}%`);
    }

    if (params.tamano) {
        baseQuery += ` AND tamano ILIKE $${index++}`;
        values.push(`%${params.tamano}%`);
    }

    if (params.base) {
        baseQuery += ` AND base ILIKE $${index++}`;
        values.push(`%${params.base}%`);
    }

    if (params.producto) {
        baseQuery += ` AND producto ILIKE $${index++}`;
        values.push(`%${params.producto}%`);
    }

    baseQuery += ` ORDER BY fecha DESC`;

    return { query: baseQuery, values };
}


