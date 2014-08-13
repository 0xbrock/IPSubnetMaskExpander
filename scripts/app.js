'use strict';

angular.module('0xbrock.Ipsubnetmaskexpander', ['ngRoute'])

  .constant('version', 'v0.1.0')

  .config(function($locationProvider, $routeProvider, $compileProvider) {

    $locationProvider.html5Mode(false);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|data):/);
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .otherwise({
        redirectTo: '/'
      });

  }).service('SaveFileService', [function () {
        this.Save = function(data, filename, mimeType) {
            var blob = new Blob([data.join('\n')], {type: mimeType});
            if (/\bMSIE\b|\bTrident\b/.test(navigator.userAgent)) {
                window.navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                var url  = window.URL || window.webkitURL,
                    link = document.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                    event = document.createEvent("MouseEvents");
                link.href = url.createObjectURL(blob);
                link.download = filename;
                event.initEvent("click", true, false);
                link.dispatchEvent(event);
            }
        };
    }]);
