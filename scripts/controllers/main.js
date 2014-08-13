/// <reference path="~/Scripts/angular.js" />
(function () {
    'use strict';

    function MainCtrl(scope, location, version, SaveFileService) {
        var vm = this;
        scope.$path = location.path.bind(location);
        vm.version = version;
        vm.subnetmasks = "";
        vm.ranges = [];
        vm.expanded = [];
        vm.calculate = function() {
            // Create the list and remove the empty items
            var ips = vm.cleanArray(vm.subnetmasks.split(/\r?\n/), "");
            var resolved = resolveRanges(ips);
            vm.ranges = resolved.ranges;
            vm.expanded = resolved.expanded;
            if (ga) ga('send', 'event', 'button', 'click', 'calculate');
        };
        vm.downloadIPRanges = function() {
            SaveFileService.Save(
                vm.csv(vm.ranges, ['\"IP Range Subnet Mask\", \"First IP\", \"Last IP\"']),
                'ipranges.csv', 'text/csv;charset=utf-8');
            if (ga) ga('send', 'event', 'button', 'click', 'downloadIPRanges');
        };
        vm.downloadExpandedIPRanges = function() {
            SaveFileService.Save(
                vm.csv(vm.expanded, ['\"Expanded\"']),
                'expandedIPRange.csv', 'text/csv;charset=utf-8');
            if (ga) ga('send', 'event', 'button', 'click', 'downloadExpandedIPRanges');
        };
        vm.csv = function(data, header) {
            return header.concat(data);
        };
        vm.cleanArray = function(list, deleteValue) {
            for (var i = 0; i < list.length; i++) {
                if (list[i] == deleteValue) {
                    list.splice(i, 1);
                    i--;
                }
            }

            return list;
        };
    }

    var controllerId = 'MainCtrl';
    angular.module('0xbrock.Ipsubnetmaskexpander').controller(controllerId, ['$scope', '$location', 'version', 'SaveFileService', MainCtrl]);

})();
