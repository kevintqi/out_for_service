var loginModule = angular.module("login", []);
mainNavigationModule.component("login", {
  templateUrl: "login/login.template.html",
  controller: [
    "dataSource",
    function LoginController(dataSource) {
      this.user = {};
      this.userIcon = "images/manager.jpg";
      this.rememberMe = false;
      var self = this;
      this.login = function() {
        dataSource.postLogin(this.user).then(
          function(response) {
            alert(JSON.stringify(response));
          }
        ).catch(
          function(error) {
            alert(JSON.stringify(error));
          }
        );
      };
    }
  ]
});
