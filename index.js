
var express = require('express');
var app = express();


var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

// Endpoint to handle date requests
app.get("/api/:date?", function (req, res) {
  let inputDate = req.params.date;
  let date;

  if (!inputDate) {

    date = new Date();
  } else if (/^\d+$/.test(inputDate)) {

    date = new Date(parseInt(inputDate));
  } else {

    date = new Date(inputDate);
  }

  if (!isValidDate(date)) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});






var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
