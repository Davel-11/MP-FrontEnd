const server = 'localhost'


export const fetchFiscalias = () => {
    const res = fetch(`http://${server}:8085/mpbackend/api/fiscalia`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
  
    return res
}