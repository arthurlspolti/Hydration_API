$("#form").on("submit", function (evento) {
  evento.preventDefault();
  let user = $("#user").val();
  let quantity = $("#ml").val();
  $.ajax({
    url: "/api/add",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      user,
      quantity,
    }),
    success: (response) => {
      console.log(response.add);
      $("#result1").text("Adicionado " + $("#ml").val() + "ml bebidos");
      $("#result2").text(
        "Bebido hoje " + response.total._sum.quantidade + "ml"
      );
      $("#textReset").text("");
    },
  });
});

$("#reset").on("click", function () {
  let user = $("#user").val();

  if (user === "") {
    $("#textReset").text("É necessário especificar um usuário");
    return;
  }

  $.ajax({
    url: "/api/reset",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      user,
    }),
    success: (response) => {
      $("#textReset").text(response.text);
      $("#result1").text("");
      $("#result2").text("");
    },
  });
});
