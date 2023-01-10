let match = 1
const base = 'https://docs.google.com/spreadsheets/d/1Z5sTrMvQPhDwGg50ALi-v9hXXTXL9Km-h7eI_vf1sRM/gviz/tq?'
const query = encodeURIComponent('Select *  ')
const url = base + '&tq=' + query;
async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 1000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}
let parallel = false;
async function getData() {
    try {
        let data
        const response = await fetchWithTimeout(url, {
            timeout: 6000
        })
            .then(res => res.text())
            .then(rep => {
                data = JSON.parse(rep.substr(47).slice(0, -2));
            });
        console.log(data.table.rows[0].c[2].v)
        console.log(data.table)
        console.log(data?.table.cols[1].label.replace(new RegExp("^([^\sT]+) ","gm"), ""))
        console.log(data?.table.cols[2].label.replace(new RegExp(".+ ","gm"), ""))


        document.querySelector('.nleft').innerHTML = data?.table.cols[2].label.replace(new RegExp(".+ ","gm"), "")
        document.querySelector('.nright').innerHTML = data?.table.cols[3].label.replace(new RegExp(".+ ","gm"), "")
        document.querySelector('.sleft').innerHTML = data?.table.rows[0].c[2]?.v
        document.querySelector('.sright').innerHTML = data?.table.rows[0].c[3]?.v
        document.querySelector('.info1').innerHTML = data?.table.cols[1].label.replace(new RegExp("^([^\sT]+) ","gm"), "")
        // if(parallel)
        // {
            document.querySelector('.plname').innerHTML = data?.table.cols[4].label.replace(new RegExp(".+ ","gm"), "")
            document.querySelector('.prname').innerHTML = data?.table.cols[5].label.replace(new RegExp(".+ ","gm"), "")
            document.querySelector('.plscore').innerHTML = data?.table.rows[0].c[4]?.v
            document.querySelector('.prscore').innerHTML = data?.table.rows[0].c[5]?.v
            document.querySelector('.pinfo1').innerHTML = data?.table.cols[1].label.replace(new RegExp("^([^\sT]+) ","gm"), "")
        // }

        getData()
    } catch (error) {
        // Timeouts if the request takes
        // longer than 6 seconds
        console.log(error.name === 'AbortError');
    }

}
getData()

function start(element) {
    let minute = 0;
    let second = 3;
    let operation = 1
    element.style.fontSize = `4vw`
    countdown(element, minute, second, operation)

    // countdown(minute, second)


}
function countdown(element, minute, second, operation) {
    var total = minute * 60 + second;

    var timer = setInterval(function () {

        var tmin = Math.floor(total / 60);
        var tsec = Math.floor(total % 60);
        if (tmin < 10) {
            tmin = "0" + tmin
        }
        if (tsec < 10) {
            tsec = "0" + tsec
        }
        element.innerHTML = tmin + ":" + tsec;
        if (total <= 0) {
            if (operation === 2) {
                element.style.fontSize = `2vw`
                var mend = new Audio('match_end.mp3')
                mend.play()
                element.innerHTML = "GAME OVER";
                clearInterval(timer)
            }
            if (operation === 1) {
                element.innerHTML = ""
                element.style.fontSize = `0.3vw`
                var mstart = new Audio('match_start.wav')
                mstart.play()
                element.innerHTML = "START"
                element.style.fontSize = `4vw`

                minute = 2
                second = 30
                operation = 2
                countdown(element, minute, second, operation)
                clearInterval(timer)
            }



        }
        if (total === 30) {
            var horn = new Audio('horn.wav')
            horn.play()
        }
        total--;
        if (tsec == 00) {
            tmin--;
            tsec = 60;
            if (tmin == 0) {
                tmin = 2;
            }
        }
    }, 1000);
}

window.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        start(document.querySelector(".timer"))
    }

    if (e.code === 'Space') {
        start(document.querySelector(".ptimer"))
    }
    if (e.code === 'KeyS') {
        this.document.querySelector('.logo').classList.toggle('score_anima')
        this.document.querySelector('.timer').classList.toggle('score_anima')
    }
    if (e.code === 'KeyO') {
        this.document.querySelector('.plogo').classList.toggle('score_anima')
        this.document.querySelector('.ptimer').classList.toggle('score_anima')
    }
    if (e.key === 'b') {

    }
    if (e.code === 'KeyU') 
    {
        document.querySelector(".uzb").classList.toggle("dNone")
        mus = new  Audio('Uzbekistan.mp3')
        mus.play()
        

    }
    if (e.code === "KeyP")
    {
        parallel = !parallel;
        document.querySelector('.parallel').classList.toggle("dNone")
    }
    if (e.code === 'KeyG') 
    {

        var mediaVideo = document.querySelector(".gen");
        mediaVideo.play()
        // if (mediaVideo.paused)
        // {
        //     mediaVideo.play()
        // }
        // else{
        //     mediaVideo.pause()
        // }
        document.querySelector(".gen").classList.toggle("dNone")
        
    }
    if (e.code === 'KeyK') 
    {
        document.querySelector(".kaz").classList.toggle("dNone")
        mus = new  Audio('Kazakhstan.mp3')
        mus.play()
    }
    if (e.code === 'KeyM')
    {
        document.querySelector(".container").classList.toggle("dNone")
    }
    if(e.code === "KeyN")
    {
        document.querySelector('.sleft').classList.toggle("dNone")
        document.querySelector('.sright').classList.toggle("dNone")
        document.querySelector('.nleft').classList.toggle("dNone")
        document.querySelector('.nright').classList.toggle("dNone")
    }
    if(e.code === "KeyQ")
    {
        document.querySelector('.qr').classList.toggle("dNone")
    }
    if (e.code === 'KeyC') 
    {
                    /*
        *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
        *
        *  Use of this source code is governed by a BSD-style license
        *  that can be found in the LICENSE file in the root of the source
        *  tree.
        */
        'use strict';

        // Put variables in global scope to make them available to the browser console.
        const constraints = window.constraints = {
        audio: false,
        video: true
        };

        function handleSuccess(stream) {
        const video = document.querySelector('.camera');
        const videoTracks = stream.getVideoTracks();
        console.log('Got stream with constraints:', constraints);
        console.log(`Using video device: ${videoTracks[0].label}`);
        window.stream = stream; // make variable available to browser console
        video.srcObject = stream;
        }

        function handleError(error) {
        if (error.name === 'OverconstrainedError') {
            const v = constraints.video;
            errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
        } else if (error.name === 'NotAllowedError') {
            errorMsg('Permissions have not been granted to use your camera and ' +
            'microphone, you need to allow the page access to your devices in ' +
            'order for the demo to work.');
        }
        errorMsg(`getUserMedia error: ${error.name}`, error);
        }

        function errorMsg(msg, error) {
        const errorElement = document.querySelector('#errorMsg');
        errorElement.innerHTML += `<p>${msg}</p>`;
        if (typeof error !== 'undefined') {
            console.error(error);
        }
        }

        async function init(e) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            handleSuccess(stream);
            e.target.disabled = true;
        } catch (e) {
            handleError(e);
        }
        }
        init();
        document.querySelector('#showVideo').addEventListener('click', e => init(e));

    }

})
