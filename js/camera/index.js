var Quagga = window.Quagga;
var App = {
    _lastResult: null,
    init: function() {
        this.attachListeners();
    },
    activateScanner: function() {
        var scanner = this.configureScanner('.overlay__content'),
            onDetected = function (result) {
                this.addToResults(result);
            }.bind(this),
            stop = function() {
                scanner.stop();  // should also clear all event-listeners?
                scanner.removeEventListener('detected', onDetected);
                this.hideOverlay();
                this.attachListeners();
            }.bind(this);

        this.showOverlay(stop);
        console.log("activateScanner");
        scanner.addEventListener('detected', onDetected).start();
    },
    addToResults: function(result) {
        if (this._lastResult === result.codeResult.code) {
            return;
        }
        this._lastResult = result.codeResult.code;
        var results = document.querySelector('ul.results'),
            li = document.createElement('li'),
            format = document.createElement('span'),
            code = document.createElement('span');

        li.className = "result";
        format.className = "format";
        code.className = "code";

        li.appendChild(format);
        li.appendChild(code);

        format.appendChild(document.createTextNode(result.codeResult.format));
        code.appendChild(document.createTextNode(result.codeResult.code));

        results.insertBefore(li, results.firstChild);
    },
    checkCapabilities: function() {
        var track = Quagga.CameraAccess.getActiveTrack();
        var capabilities = {};
        if (typeof track.getCapabilities === 'function') {
            capabilities = track.getCapabilities();
        }
        this.applySettingsVisibility('zoom', capabilities.zoom);
        this.applySettingsVisibility('torch', capabilities.torch);
    },
    updateOptionsForMediaRange: function(node, range) {
        console.log('updateOptionsForMediaRange', node, range);
        var NUM_STEPS = 6;
        var stepSize = (range.max - range.min) / NUM_STEPS;
        var option;
        var value;
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        for (var i = 0; i <= NUM_STEPS; i++) {
            value = range.min + (stepSize * i);
            option = document.createElement('option');
            option.value = value;
            option.innerHTML = value;
            node.appendChild(option);
        }
    },
    applySettingsVisibility: function(setting, capability) {
        // depending on type of capability
        if (typeof capability === 'boolean') {
            var node = document.querySelector('input[name="settings_' + setting + '"]');
            if (node) {
                node.parentNode.style.display = capability ? 'block' : 'none';
            }
            return;
        }
        if (window.MediaSettingsRange && capability instanceof window.MediaSettingsRange) {
            var node = document.querySelector('select[name="settings_' + setting + '"]');
            if (node) {
                this.updateOptionsForMediaRange(node, capability);
                node.parentNode.style.display = 'block';
            }
            return;
        }
    },
    initCameraSelection: function(){
        var streamLabel = Quagga.CameraAccess.getActiveStreamLabel();

        return Quagga.CameraAccess.enumerateVideoDevices()
        .then(function(devices) {
            function pruneText(text) {
                return text.length > 30 ? text.substr(0, 30) : text;
            }
            var $deviceSelection = document.getElementById("deviceSelection");
            while ($deviceSelection.firstChild) {
                $deviceSelection.removeChild($deviceSelection.firstChild);
            }
            devices.forEach(function(device) {
                var $option = document.createElement("option");
                $option.value = device.deviceId || device.id;
                $option.appendChild(document.createTextNode(pruneText(device.label || device.deviceId || device.id)));
                $option.selected = streamLabel === device.label;
                $deviceSelection.appendChild($option);
            });
        });
    },
    attachListeners: function() {
        var button = document.querySelector('button.scan'),
            self = this;
            

            self.initCameraSelection();
        button.addEventListener("click", function clickListener (e) {
            e.preventDefault();
            button.removeEventListener("click", clickListener);
            self.activateScanner();
        });
    },
    showOverlay: function(cancelCb) {
        document.querySelector('.container .controls')
            .classList.add('hide');
        document.querySelector('.overlay--inline')
            .classList.add('show');
        var closeButton = document.querySelector('.overlay__close');
        closeButton.addEventListener('click', function closeHandler() {
            closeButton.removeEventListener("click", closeHandler);
            cancelCb();
        });
    },
    hideOverlay: function() {
        document.querySelector('.container .controls')
            .classList.remove('hide');
        document.querySelector('.overlay--inline')
            .classList.remove('show');
    },
    querySelectedReaders: function() {
        return Array.prototype.slice.call(document.querySelectorAll('.readers input[type=checkbox]'))
            .filter(function(element) {
                return !!element.checked;
            })
            .map(function(element) {
                return element.getAttribute("name");
            });
    },
    configureScanner: function(selector) {
        var scanner = Quagga
            .decoder({readers: this.querySelectedReaders()})
            .locator({patchSize: 'medium'})
            .fromSource({
                target: selector,
                constraints: {
                    width: 600,
                    height: 600,
                    facingMode: "environment"
                }
            });
        return scanner;
    }
};
App.init();
