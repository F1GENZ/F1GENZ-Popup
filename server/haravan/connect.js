const express = require("express");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");
var OAuth2 = require("oauth").OAuth2;

const router = express.Router();

const config = {
  response_mode: "form_post",
  url_authorize: "https://accounts.haravan.com/connect/authorize",
  url_connect_token: "https://accounts.haravan.com/connect/token",
  grant_type: "authorization_code",
  nonce: "f1zpopup",
  response_type: "code id_token",
  app_id: "4e30ab07b6658cc50cbab3f8b237cd51",
  app_secret:
    "7ba227cf53a3f2b7fcfe6edd6223342727900fe11a957a1a89d1643b94e474e0",
  scope_login: "openid profile email org userinfo",
  scope:
    "openid profile email org userinfo web.read_themes web.write_themes web.read_script_tags web.write_script_tags grant_service",
  login_callback_url: "http://localhost:5000/install/login",
  install_callback_url: "http://localhost:5000/install/grandservice",
  orgid: null,
};

let user = {};

router.get("/install/login", async (req, res) => {
  const orgid = req.query.orgid;
  const shopInstalled = await authModel.findOne({ orgid });
  const url = `https://accounts.haravan.com/connect/authorize?response_mode=${config.response_mode}&response_type=${config.response_type}&scope=${config.scope_login}&client_id=${config.app_id}&redirect_uri=${config.login_callback_url}&nonce=${config.nonce}`;
  if (shopInstalled) {
    res.redirect("http://localhost:3000?orgid=" + orgid);
  } else {
    res.redirect(url);
  }
});

router.post("/install/login", (req, res) => {
  let code = req.body.code;
  if (!code) {
    return res.send("Code not found in request");
  }

  const decodeToken = jwt.decode(req.body.id_token);
  config.orgid = decodeToken.orgid;
  user = {
    code: req.body.code,
    orgid: decodeToken.orgid,
    sid: decodeToken.sid,
    role: decodeToken.role[0],
  };
  if (user.role == "admin") {
    const url = `https://accounts.haravan.com/connect/authorize?response_mode=${config.response_mode}&response_type=${config.response_type}&scope=${config.scope}&client_id=${config.app_id}&redirect_uri=${config.install_callback_url}&nonce=${config.nonce}&orgid=${user.orgid}`;
    res.redirect(url);
  } else {
    res.status(401).send("Not authorized");
  }
});

router.post("/install/grandservice", async (req, res) => {
  let code = req.body.code;
  if (!code) {
    return res.send("Code not found in request");
  }
  let token = await getToken(code, config.install_callback_url);
  let authorizeInfo = {
    access_token: token.access_token,
    expires_in: token.expires_in,
    orgid: user.orgid,
  };
  if (authorizeInfo) {
    await authModel.create(authorizeInfo);
    res.redirect("http://localhost:3000?orgid=" + user.orgid);
  }
});

function getToken(code, callback_url) {
  return new Promise((resolve) => {
    try {
      let params = {};
      params.grant_type = config.grant_type;
      params.redirect_uri = callback_url;

      let _oauth2 = new OAuth2(
        config.app_id,
        config.app_secret,
        "",
        config.url_authorize,
        config.url_connect_token,
        ""
      );

      _oauth2.getOAuthAccessToken(
        code,
        params,
        (err, accessToken, refreshToken, param_token) => {
          if (err) {
            console.log("error", err);
            resolve();
          } else {
            resolve(param_token);
          }
        }
      );
    } catch (error) {
      console.log("error", error);
      return resolve();
    }
  });
}

module.exports = router;
