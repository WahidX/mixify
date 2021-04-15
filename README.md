# Mixify

Mixify is a web app for mixing spotify playlists with based on some patterns and add it to your library. Here people with different taste in music can have a collaborative playlist.

### Built With

- NodeJS - Express
- ReactJS
- Material-UI
- React-hooks
- Spotify Web API
- MongoDB

# Demo Video

[![Youtube](https://img.youtube.com/vi/1dqA5lOa0OA/maxresdefault.jpg)](https://youtu.be/1dqA5lOa0OA)

# Getting Started

### Prerequisites:

- NodeJS-npm
- MongoDB

### Local Installation

1. Clone this repo and install the npm dependencies for both server and client.\
   You can folow the commands to do the same.

```bash
git clone https://github.com/WahidX/mixify.git
cd mixify/server
npm run install-both
```

2. Now you have to set couple of spotify credentials, which can be found in, [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) \
   Here create a new app and add redirect url as `http://localhost:3000`. Next just take these parameters.

- Spotify client id
- Spotify client secret\
  You can add these in your system's environment variables or directly hardcode them in the development object in [environment.js](https://github.com/WahidX/mixify/blob/master/server/configs/environment.js)

3. Now one last thing, change the first 4 lines of [urls.js](https://github.com/WahidX/mixify/blob/master/client/src/utils/urls.js) to this

```js
// const base_url = "https://mixify-x.herokuapp.com/api/v1";
// const base_frontend = "https://mixify-xd.web.app";

const base_url = "http://localhost:8000/api/v1";
const base_frontend = "http://localhost:3000";
```

4. Now We are good to go. Just run the below command.

```bash
npm run dev
```

# Usage

This app merges spotify playlists with some patterns.

- One can use it to rearrange his/her playlist/playlists as per the patterns.
- One can create a room and ask friends to join and then can create a merged collaborative playlist which can be modified by the users afterwards(within spotify)\
> So, I got this idea in a trip with my friends where it was becoming hard to find a playlist satisfying everyone's music taste XD.

# Its Live! Checkout

[Mixify](https://mixify-xd.web.app/)

# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# License

This project is licensed under the [Mozilla Public License 2.0](https://choosealicense.com/licenses/mpl-2.0/)
