$("#form").on("submit", function (evento) {
  evento.preventDefault();
  let user = $("#user").val();
  let quantity = $("#ml").val();

  if (user == "" || user == !isNaN) {
    $("#textReset").text("É necessário inserir um usuário");
  } else if (quantity == "") {
    $("#textReset").text("É necessário inserir uma quantidade");
  } else if (quantity == "" && user == "") {
    $("#textReset").text("É necessário inserir um usuario e uma quantidade");
  } else if (quantity === !isNaN || quantity <= 0) {
    $("#textReset").text("A quantidade deve ser um número positivo");
  } else {
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
        $("#textReset").text("");
        $("#result1").text("Adicionado " + $("#ml").val() + "ml");
        $("#result2").text("");
      },
    });
  }
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

$("#show").on("click", function () {
  let user = $("#user").val();

  $.ajax({
    url: "/api/show",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      user,
    }),
    success: (response) => {
      $("#result2").text("Bebido hoje " + response.show._sum.quantidade + "ml");
      $("#textReset").text("");
      $("#result1").text("");
    },
  });
});
