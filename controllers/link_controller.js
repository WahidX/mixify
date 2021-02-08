const axios = require('axios');
const Mix = require('../models/Mix');

const checkAccessCodeValidity = async (access_token) => {
  var config = {
    method: 'get',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
  };

  return axios(config);
};

module.exports.createLink = async (req, res) => {
  checkAccessCodeValidity(req.body.access_token)
    .then(async (response) => {
      let user = response.data;

      let newMix = await Mix.create({
        creator: user.id,
        explicit_filter: user.explicit_content.filter_enabled,
        users: [user.id],
      });

      return res.status(200).json({
        message: 'New Mix Created',
        linkid: newMix._id,
      });
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
      let user = response.data;
      let linkid = req.params.linkid;

      if (!linkid) {
        return res.status(404).json({
          message: 'Invalid Link',
        });
      }

      let mix = await Mix.findById(linkid);

      // checking if the user already joined
      if (mix.users.indexOf(user.id) === -1) {
        // means not joined yet
        mix.users.push(user.id);
        mix.explicit_filter =
          mix.explicit_filter && user.explicit_content.filter_enabled;
        mix.save();
      }

      return res.status(200).json({
        message: 'Joined party!',
      });
    })
    .catch((err) => {
      console.log('ERRR: ', err);
      return res.status(501).json({
        message: 'Invalid/expired access_token',
      });
    });
};
