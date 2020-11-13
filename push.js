var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BDzS-Q17uE3xWS8oXXqbQNC46LtSrF99r_6kumFmziV3A9Ck8A0Q8X4NNNHoDU4FgtTu0BdH53axitcRk7kO5aM", //"<Public Key>",
  privateKey: "6ru2B4UqGpBiMwcCjDw7j86jDbY17sIi2fT1dj_ZD-8", //"<Private Key>",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/eIF46IrUiHI:APA91bH4cvX3udxreCew_w7DeiwGOFOwGvjno__pbYPctZ6Jtxrn524ninFQOWFeYzOwJzyTl9H5xpnOzwRn3Nv4PHNsySET69s4dXR0Smq-FoySODPMWgn3iFxb-4OhI9JEbkV__mbB", //"<Endpoint URL>",
  keys: {
    p256dh:
      "BF+8x4eCpVH3DIPUetAQ9+HMRxL6NvgHrAO3ncUp+aGXYdcvHxDpqE1jdFiP6IU1bMBT7lIAmiKfMs2Zpr2I1pU=", //"<p256dh Key>",
    auth: "z5RPlScbyd5GTQ1mh8kfFg==", //"<Auth key>",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "1079586222608", //"<FCM Sender ID>",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
