import config from './config';

export const INIT_APP_OPTIONS = 'INIT_APP_OPTIONS';

export function getOptions(dispatch) {
  // let tabNotasWTF = [];
  // const tabNotas = ['test'];
  return fetch(`${config.dataUrl}/wp-json/acf/v3/options/orcamento-informacoes`)
    .then(res => res.json())
    .then((options) => {
      // console.log(options.acf);
      // tabNotasWTF = notas.acf['notas'];
      // tabNotasWTF.forEach(nota => (tabNotas.push(nota.nota)));
      dispatch({
        type: 'INIT_APP_OPTIONS',
        data: options.acf,
      });
      return options.acf;
    });
}
