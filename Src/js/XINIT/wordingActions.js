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
  images: {
    title: "Pictures"
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
  images: {
    title: "Images"
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
