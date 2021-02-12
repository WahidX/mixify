const axios = require('axios');
const Mix = require('../models/Mix');
const utils = require('../configs/utils');
const User = require('../models/user');

const checkAccessCodeValidity = async (access_token) => {
  var config = {
    method: 'get',
    url: utils.urls.getUser(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
  };

  return axios(config);
};

let storeUser = async (userResponse) => {
  try {
    let user = await User.findOne({
      spotify_id: userResponse.id,
    });

    if (!user) {
      user = await User.create({
        spotify_id: userResponse.id,
        name: userResponse.display_name,
        img: userResponse.images.length !== 0 ? userResponse.images[0].url : '', //img can be empty
        explicit_content: userResponse.explicit_content.filter_enabled,
        playlists: [],
      });
    } else {
      user.playlists = [];
      user.save();
    }

    return user;
  } catch (err) {
    return false;
  }
};

module.exports.createLink = async (req, res) => {
  checkAccessCodeValidity(req.body.access_token)
    .then(async (response) => {
      try {
        let user = await storeUser(response.data);

        let newMix = await Mix.create({
          creator: user._id,
          explicit_filter: user.explicit_filter,
          users: [user._id],
        });

        return res.status(200).json({
          message: 'New Mix Created',
          linkid: newMix._id,
          userID: user.spotify_id,
        });
      } catch (err) {
        console.log('Err: ', err);
        return res.status(501).json({
          message: 'Internal Server Error',
        });
      }
    })
    .catch((err) => {
      console.log('ERRR: ', err);
      return res.status(501).json({
        message: 'Invalid/expired access_token',
      });
    });
};

module.exports.joinLink = async (req, res) => {
  checkAccessCodeValidity(req.body.access_token)
    .then(async (response) => {
      let user = await storeUser(response.data);

      let linkid = req.params.linkid;

      if (!linkid) {
        return res.status(404).json({
          message: 'Invalid Link',
        });
      }

      let mix = await Mix.findById(linkid);

      // checking if the user already joined
      if (mix.users.indexOf(user._id) === -1) {
        // not joined yet
        mix.users.push(user._id);
        mix.explicit_filter = mix.explicit_filter && user.explicit_filter;
        mix.save();
      }

      return res.status(200).json({
        message: 'Joined party!',
        userID: user.spotify_id,
      });
    })
    .catch((err) => {
      console.log('ERRR: ', err);
      return res.status(501).json({
        message: 'Invalid/expired access_token',
      });
    });
};
