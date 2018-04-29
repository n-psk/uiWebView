
    function init() {

        const video = document.querySelector('video');
        const videoSelect = document.querySelector('select#videoSource');
        const selectors = [videoSelect];

        function gotDevices(deviceInfos) {
            // Handles being called several times to update labels. Preserve values.
            var values = selectors.map(function (select) {
                return select.value;

            });
            selectors.forEach(function (select) {
                while (select.firstChild) {
                    select.removeChild(select.firstChild);
                }
            });
            // Pull all the available cameras from the device(PC, Tab, Laptop or mobiles)

            for (var i = 0; i !== deviceInfos.length; ++i) {

                var deviceInfo = deviceInfos[i];
                var option = document.createElement('option');
                option.value = deviceInfo.deviceId;

                if (deviceInfo.kind === 'videoinput') {

                    option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
                    videoSelect.appendChild(option);

                } else {
                    console.log('Some other kind of source/device: ', deviceInfo);
                }
            }

            selectors.forEach(function (select, selectorIndex) {
                if (Array.prototype.slice.call(select.childNodes).some(function (n) {
                    return n.value === values[selectorIndex]
                })) {
                    select.value = values[selectorIndex];
                }
            });
        }



        function gotStream(stream) {
            window.stream = stream; // make stream available to console
            video.srcObject = stream;
            // Refresh button list in case labels have become available
            return navigator.mediaDevices.enumerateDevices();
        }

        function start() {
            if (window.stream) {
                window.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
            var videoSource = videoSelect.value;
            var constraints = {
                video: {
                    deviceId: videoSource ? { exact: videoSource } : undefined
                }
            };
            navigator.mediaDevices.getUserMedia(constraints).
                then(gotStream).then(gotDevices).catch(handleError);
        }



        videoSelect.onchange = start;

        start();

        // var sound = new Audio("barcode.wav");

       

    }
    
   