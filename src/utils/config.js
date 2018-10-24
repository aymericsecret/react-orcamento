import logoCremme from '../assets/logo_cremme_grey.svg';
import logoSante from '../assets/logo_sante.png';
import logoSmallCremme from '../assets/logo_circle_cremme.svg';
import logoSmallSante from '../assets/logo_sante_small.png';

import cremmeDrag from '../assets/SVG/cremme/Icones-01.svg';
import cremmeClose from '../assets/SVG/cremme/Icones-02.svg';
import cremmeBack from '../assets/SVG/cremme/Icones-03.svg';
import cremmeSearch from '../assets/SVG/cremme/Icones-08.svg';
import cremmeReload from '../assets/SVG/cremme/Icones-09.svg';
import cremmeLogout from '../assets/SVG/cremme/Icones-10.svg';
import cremmeToggle from '../assets/SVG/cremme/Icones-11.svg';

import santeDrag from '../assets/SVG/sante/Icones-01.svg';
import santeClose from '../assets/SVG/sante/Icones-02.svg';
import santeBack from '../assets/SVG/sante/Icones-03.svg';
import santeSearch from '../assets/SVG/sante/Icones-08.svg';
import santeReload from '../assets/SVG/sante/Icones-09.svg';
import santeLogout from '../assets/SVG/sante/Icones-10.svg';
import santeToggle from '../assets/SVG/sante/Icones-11.svg';

/**
 * Project
 * 0 = Local/Test
 * 1 = Cremme
 * 2 = Santé
 */
const project = 1;

let projectConfig;

if (project === 1) {
  projectConfig = {
    project: 'cremme',
    logo: logoCremme,
    logoSmall: logoSmallCremme,
    dataUrl: 'http://cremme.com.br',
    emailUrl: 'http://cremme.com.br',
    fontPath: 'http://cremme.com.br/wp-content/themes/rsw-cremme/assets/fonts',
    fontColor: '#3c3c3c',
    fontColorDark: '#979797',
    fontColorSpecial: '#636463',
    fonts: {
      light: 'OmnesLight',
      regular: 'Omnes',
      medium: 'OmnesMedium',
      semibold: 'OmnesSemibold',
      bold: 'OmnesBold',
    },
    icons: {
      back: cremmeBack,
      close: cremmeClose,
      drag: cremmeDrag,
      toggle: cremmeToggle,
      logout: cremmeLogout,
      search: cremmeSearch,
      reload: cremmeReload,
    },
  };
} else if (project === 2) {
  projectConfig = {
    project: 'sante',
    logo: logoSante,
    logoSmall: logoSmallSante,
    dataUrl: 'https://santemobiliario.com.br',
    emailUrl: 'https://santemobiliario.com.br',
    fontPath: 'https://santemobiliario.com.br/wp-content/themes/rsw-sante/assets/fonts',
    fontColor: '#2A7861',
    fontColorDark: '#2A7861',
    fontColorSpecial: '#F8E71C',
    fonts: {
      light: 'PxLight',
      regular: 'PxLight',
      medium: 'PxRegular',
      semibold: 'PxBold',
      bold: 'PxBold',
    },
    icons: {
      back: santeBack,
      close: santeClose,
      drag: santeDrag,
      toggle: santeToggle,
      logout: santeLogout,
      search: santeSearch,
      reload: santeReload,
    },
  };
} else {
  projectConfig = {
    project: 'cremme',
    logo: logoCremme,
    logoSmall: logoSmallCremme,
    dataUrl: 'http://localhost/cremme',
    emailUrl: 'httpshttp://localhost/cremme',
    fontPath: 'http://localhost/cremme/wp-content/themes/rsw-sante/assets/fonts',
    fontColor: '#3c3c3c',
    fontColorDark: '#979797',
    fontColorSpecial: '#636463',
    fonts: {
      light: 'OmnesLight',
      regular: 'Omnes',
      medium: 'OmnesMedium',
      semibold: 'OmnesSemibold',
      bold: 'OmnesBold',
    },
    icons: {
      back: cremmeBack,
      close: cremmeClose,
      drag: cremmeDrag,
      toggle: cremmeToggle,
      logout: cremmeLogout,
      search: cremmeSearch,
      reload: cremmeReload,
    },
  };
}
const config = projectConfig;

export default config;
