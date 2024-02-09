$(function () {
  $("#contact-form").validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: false,
      },
      message: {
        required: true,
      },
      title: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "This field is required",
        minlength: "your name must consist of at least 2 characters",
      },
      email: {
        required: "This field is required",
      },
      message: {
        required: "This field is required",
      },
    },
    submitHandler: function (form) {
      var formData = $(form).serializeArray();
      var requestBody = {};

      $.each(formData, function () {
        if (this.name != "submit") {
          requestBody[this.name] = this.value;
        }
      });
      console.log(requestBody);

      var jsonRequestBody = JSON.stringify(requestBody);
      // console.log(jsonRequestBody);

      $.ajax({
        type: "POST",
        contentType: "application/json",
        data: jsonRequestBody,
        dataType: "json",
        url: "https://ygnle3xkg2.execute-api.us-east-2.amazonaws.com/v1/send-email",
        success: function () {
          $("#contact :input").attr("disabled", "disabled");
          $("#contact").fadeTo("slow", 1, function () {
            $(this).find(":input").attr("disabled", "disabled");
            $(this).find("label").css("cursor", "default");
            $("#success-message").fadeIn();
          });
        },
        error: function () {
          $("#contact").fadeTo("slow", 1, function () {
            $("#error-message").fadeIn();
          });
        },
      });
    },
  });
});
