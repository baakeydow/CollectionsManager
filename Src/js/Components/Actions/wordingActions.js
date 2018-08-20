const Hello = {
  welcome: {
    cta: "Discover"
  },
  home: {
    title: "Links"
  },
  articles: {
    title: "Articles"
  },
  media: {
    title: "Media"
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
    title: "Links !"
  },
  articles: {
    title: "Nos Articles"
  },
  media: {
    title: "Media"
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
  if (lang === 'EN') {
    return function (dispatch) {
      dispatch({
        type: "GETENGLISH",
        payload: Hello
      });
    }
  } else {
    return function (dispatch) {
      dispatch({
        type: "GETFRENCH",
        payload: Bonjour
      });
    }
  }

}
