var nextPageToken = "";
var previousPageToken = "";

$("#ytSearchButton").click(function(e) {
  e.preventDefault();
  clearChilds();
  getVideos($("#ytSearchInput")[0].value);
});

$("#ytPrevious").click(function(e) {
  e.preventDefault();
  clearChilds();
  getVideos($("#ytSearchInput")[0].value, previousPageToken);
});

$("#ytNext").click(function(e) {
  e.preventDefault();
  clearChilds();
  getVideos($("#ytSearchInput")[0].value, nextPageToken);
});

function clearChilds() {
  let node = document.getElementById("videoContainer");
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
function getVideos(query, pageToken = "") {
  var url = 'https://www.googleapis.com/youtube/v3/search';
  var params = {
    part: 'snippet',
    type: 'video',
    key: 'AIzaSyBewVg-2JE4BAunjrxdhKU8ao8qnOLvuAc',
    q: query,
    maxResults: '10',
    pageToken: pageToken
  };
  $.getJSON(url, params, populateView);
}

function populateView(response) {
  nextPageToken = response.nextPageToken;
  previousPageToken = response.prevPageToken;
  $.each(response.items, function (index, value) {
    var entry = "<div>"
    entry += '<p>' + value.snippet.title + '</p>';
    entry += "<a href='https://www.youtube.com/watch?v=" + value.id.videoId + "'>"
    entry += '<img src="' + value.snippet.thumbnails.default.url + '">';
    entry += "</a>"
    entry += "</div>";
    $("#videoContainer").append(entry);
  });
}
