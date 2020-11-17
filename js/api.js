const base_url = "https://api.football-data.org/v2/";
const liga = "competitions/2021"; // Liga Inggris
// Blok kode yang akan di panggil jika fetch berhasil
const status = (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
};

// Blok kode untuk memparsing json menjadi array JavaScript
const json = (response) => {
  return response.json();
};

// Blok kode untuk meng-handle kesalahan di blok catch
const error = (err) => {
  console.log(`Error : ${err}`);
};

const fetchApi = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": "a4ddf0e6a24e4b908c73782c303bba5f",
    },
  });
};

const standing = (data) => {
  let standHtml = "";
  let stand = "";
  stand = data.standings[0].table;
  stand.forEach((el) => {
    standHtml += `
        <tr>
          <td>${el.position}</td>
          <td>${el.team.name}</td>
          <td>${el.playedGames}</td>
          <td>${el.won}</td>
          <td>${el.draw}</td>
          <td>${el.lost}</td>
          <td>${el.goalsFor}</td>
          <td>${el.goalsAgainst}</td>
          <td>${el.goalDifference}</td>
          <td>${el.points}</td>
        </tr>
      `;
  });

  document.getElementById("standing").innerHTML = standHtml;
};

const getStanding = () => {
  fetchApi(base_url + liga + "/standings")
    .then(status)
    .then(json)
    .then((data) => {
      standing(data);
    })
    .catch(error);
};

const team = (data) => {
  var teamHTML = `
          <div class="card-team">
            <div class="row">
              <div class="col l4 s12 center">
                <img src="${data.crestUrl}" alt="" width="175px"> 
              </div>
              <div class="col l8 s12 m4">
                <h5><b>${data.name}</b></h5>
                <table>
                  <tr>
                    <th>Nama Pendek</th>
                    <td>${data.shortName}</td>
                  </tr>
                  <tr>
                    <th>Alamat</th>
                    <td>${data.address}</td>
                  </tr>
                  <tr>
                    <th>Stadion</th>
                    <td>${data.venue}</td>
                  </tr>
                  <tr>
                    <th>Berdiri sejak</th>
                    <td>Tahun ${data.founded}</td>
                  </tr>
                  <tr>
                    <th>Telepon</th>
                    <td>${data.phone}</td>
                  </tr>
                  <tr>
                    <th>Surel</th>
                    <td>${data.email}</td>
                  </tr>
                  <tr>
                    <th>Halaman Web</th>
                    <td>${data.website}</td>
                  </tr>

                </table>
              </div>
              <div class="col l12 s12">
                <h4 class="center"><b>Daftar Anggota</b></h6>
                <table>
                  <thead>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Status</th>
                  </thead>
                  <tbody id="player"></tbody>
                </table>
              </div>
            </div>
          </div>
        `;
  var playerHtml = "";
  data.squad.forEach((player, i) => {
    playerHtml += `
            <tr>
              <td>${i}</td>
              <td>${player.name}</td>
              <td>${player.role}</td>
            </tr>
          `;
  });
  document.getElementById("team").innerHTML = teamHTML;
  document.getElementById("player").innerHTML = playerHtml;
};

const getTeam = () => {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    fetchApi(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        team(data);
        resolve(data);
      })
      .catch(function (err) {
        console.error(err);
      });
  });
};

const teamCard = (data) => {
  let teamHtml = "";
  let teams = [];
  teams = data.standings[0].table;
  teams.forEach((team) => {
    teamHtml += `
        <div class="col l3 s12 ">
          <div class="card hoverable">
            <a href="./team.html?id=${team.team.id}">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${team.team.crestUrl}" alt="${team.team.name}" height="175px" />
              </div>
            </a>
            <div class="card-content">
              <span class="card-title truncate">${team.team.name}</span>
            </div>
          </div>
        </div>`;
  });
  document.getElementById("teams").innerHTML = teamHtml;
};

const getTeams = () => {
  fetchApi(base_url + liga + "/standings")
    .then(status)
    .then(json)
    .then((data) => {
      teamCard(data);
    })
    .catch(error);
};

const getSaveTeamById = () => {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  getById(Number(idParam)).then((data) => {
    team(data);
  });
};
const getSavedTeams = () => {
  let teamSaveHtml = "";
  getAll().then((teams) => {
    console.log(teams);
    if (teams.length != 0) {
      teamCard(teams);
    } else {
      teamSaveHtml += `<p class="flow-text yellow lighten-3 center">Belum ada tim tersimpan</p>`;
      document.getElementById("teams").innerHTML = teamSaveHtml;
    }
  });
};
