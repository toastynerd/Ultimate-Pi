'use strict';

module.exports = function(app) {
  app.factory('auth', ['$window', 'jwtHelper', '$location',  function($window, jwtHelper, $location) {
    return {
      currentUser: {},
      getToken: function(options) {
        if (options) options.noRedirect = true;
        options = options || {};
        console.log(options.noRedirect);
        if (this.token) return this.token;
        if ($window.localStorage.token) return this.setToken($window.localStorage.token);
        if (!options.noRedirect) $location.path('/signup');
      },

      setToken: function(token) {
        $window.localStorage.token = token;
        this.token = token;
        this.getUser();
        return token;
      },

      getUser: function() {
        let token = this.getToken();
        if (!token) return;
        let decoded = jwtHelper.decodeToken(token);
        this.currentUser.username = decoded.idd;
        return this.currentUser;
      },

      logOut: function() {
        console.log('logout fxn');
        $window.localStorage.token = '';
        this.currentUser = {};
        this.toggleView = false;
        this.token = '';
        $location.path('/signin');
      }
    };
  }]);
};
