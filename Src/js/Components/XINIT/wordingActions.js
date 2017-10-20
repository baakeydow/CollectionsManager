const Hello = {
  welcome: {
    cta: "Discover"
  },
  home: {
    title: "Welcome"
  },
  about: {
    title: "About"
  },
  contact: {
    title: "Contact Us",
    form: {
        name: "Name *",
        email: "Email *",
        message: "Message *"
    },
    button: "Send"
  }
}
const Bonjour = {
  welcome: {
    cta: "Découvrir"
  },
  home: {
    title: "Bonjour !"
  },
  about: {
    title: "À Propos"
  },
  contact: {
    title: "Contactez Nous",
    form: {
        name: "Nom *",
        email: "Email *",
        message: "Message *"
    },
    button: "Envoyer"
  }
}

export function getLg(lang) {
  console.log('=============');
  console.log(lang);
  console.log('=============');
  if (lang === 'EN') {
    return function(dispatch) {
      dispatch({type: "GETENGLISH",
                payload: Hello});
    }
  } else {
    return function(dispatch) {
      dispatch({type: "GETFRENCH",
                payload: Bonjour});
    }
  }

}
