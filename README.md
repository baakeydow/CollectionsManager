# CollectionsManager
See => CollectionsManager/Src/js/App.js

### Run Project (Dev)

**Init**

`git clone https://github.com/bndao/CollectionsManager.git && cd CollectionsManager ; mkdir -p Public/folder/website ; mkdir Public/up ; mkdir Public/videoPlaylist ; mongorestore data`

**webpack-dev-server**

`yarn && npm start`

**nodejs**

`cd Server && yarn && npm run dev`

### Run Project (Prod)

`git clone https://github.com/bndao/CollectionsManager.git && cd CollectionsManager ; mkdir -p Public/folder/website ; mkdir Public/up ; mkdir Public/videoPlaylist ; mongorestore data && yarn && npm run build && cd Server && yarn && npm run prod`
