const server = 'localhost'


export const fetchFiscalias = () => {
    const res = fetch(`http://${server}:8085/mpbackend/api/fiscalia`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
  
    return res
}

export const postFiscalia = (mpObject) => {
  const res = fetch(`http://${server}:8085/mpbackend/api/fiscalia`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mpObject),
    })
  
    return res
}

export const deleteFiscalia = (id) => {
  const res = fetch(`http://${server}:8085/mpbackend/api/fiscalia?id=${id}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })
  
    return res
}

export const fetchFiscaliaReporte = () => {
  const res = fetch(`http://${server}:8085/mpbackend/api/fiscalia/reporte`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  return res
}