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
            if (/\bMSIE\b/.test(navigator.userAgent)) {
                var blobObject = new Blob(data);
                window.navigator.msSaveOrOpenBlob(blobObject, filename); // The user only has the option of clicking the Save button.
            } else {
                var blob = new Blob([data.join('\n')], {type: 'text/csv;charset=utf-8'});
                var url  = window.URL || window.webkitURL;
                var link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
                link.href = url.createObjectURL(blob);
                link.download = filename; // whatever file name you want :)

                var event = document.createEvent("MouseEvents");
                event.initEvent("click", true, false);
                link.dispatchEvent(event);
            }
        };
    }]);
