
export const INIT_APP_NOTES = 'INIT_APP_NOTES';


export function getNotes(dispatch) {
  let tabNotasWTF = [];
  const tabNotas = ['test'];
  return fetch('http://cremme.com.br/wp-json/acf/v3/options/orcamento-informacoes')
    .then(res => res.json())
    .then((notas) => {
      tabNotasWTF = notas.acf[''];
      tabNotasWTF.forEach(nota => (tabNotas.push(nota.nota)));
      console.log(tabNotas);
      dispatch({
        type: 'INIT_APP_NOTES',
        data: tabNotas,
      });
      return tabNotas;
    });
}
