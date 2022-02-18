$(document).ready(function () {
  const colorSelected = "rgb(0, 83, 128)";
  const colorNotSelected = "white";
  const colorMouseOver = "#f7f7f9";
  const colorTextSelected = "white";
  const colorTextNotSelected = "#212529";

  $("#btnRandom").click(function () {
    $.get("https://api.thecatapi.com/v1/images/search", function (data) {
      $("#srcChat").attr("src", data[0]["url"]);
    });
  });

  $(document).on("click", "tr", function () {
    const actualColor = $(this).css("background-color");
    if (actualColor == colorSelected) {
      $(this).css("background-color", colorNotSelected);
      $(this).css("color", colorTextNotSelected);
      $(this).css("font-size", "100%");
    } else {
      $(this).css("background-color", colorSelected);
      $(this).css("color", colorTextSelected);
      $(this).css("font-size", "150%");
    }
  });

  $(document).on("dblclick", "tr", function () {
    $(this).hide();
  });

  $(document).on("mouseover", "tr", function () {
    if (!isSelected($(this))) {
      $(this).css("background-color", colorMouseOver);
    }
  });

  $(document).on("mouseout", "tr", function () {
    if (!isSelected($(this))) {
      $(this).css("background-color", colorNotSelected);
    }
  });

  $(".card").click(function () {
    $(this).css("background-color", colorSelected);
    $(this).find(".card-text").toggle();
  });

  $("#btnRandomUser").click(function () {
    $.get("https://randomuser.me/api/", function (data) {
      const firstName = data["results"][0]["name"]["first"];
      const lastName = data["results"][0]["name"]["last"];
      const title = data["results"][0]["name"]["title"];

      $("#randomUserImage").attr("src", data["results"][0]["picture"]["large"]);
      $("#email").html(data["results"][0]["email"]);
      $("#indentity").html(title + " " + firstName + " " + lastName);
    });
  });

  function isSelected(elem) {
    if (elem.css("background-color") == colorSelected) {
      return true;
    } else {
      return false;
    }
  }

  function getDepartements() {
    $.get("https://geo.api.gouv.fr/departements", function (data) {
      affichageDepartement(data);
    });
  }

  function affichageDepartement(data) {
    $("#departements").html("");
    data.forEach(function (item) {
      $("#departements").append(
        "<tr class='departement'><td class='nom'>" +
          item["nom"] +
          "</td><td>" +
          item["code"] +
          "</td><td>" +
          item["codeRegion"] +
          "</td></tr>"
      );
    });
  }

  $("#btnRandom").click();
  $("#btnRandomUser").click();
  getDepartements();
});
