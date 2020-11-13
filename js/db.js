var dbPromised = idb.open("Top-Premier-league", 1, function (upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  teamsObjectStore.createIndex("name", "name", {
    unique: false,
  });
});

const saveForLater = (team) => {
  dbPromised
    .then((db) => {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.add(team);
      return tx.complete;
    })
    .then(() => {
      console.log("team berhasil di simpan.");
    });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function (team) {
        resolve(team);
      });
  });
};

const removeById = (id) => {
  dbPromised
    .then((db) => {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.delete(id);
      return tx.complete;
    })
    .then(() => {
      console.log("team berhasil di hapus.");
    });
};
