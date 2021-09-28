/*jslint es6:true*/
// Alarm Clock Initialization
function init() {
    //  Getting  current hours, minutes and seconds
    ac.currenthr = document.getElementById("current-hr");
    ac.currentmin = document.getElementById("current-min");
    ac.currentsec = document.getElementById("current-sec");

    //  Creating Time Picker Hour, Min, Sec
    ac.thr = ac.createSel(23);
    document.getElementById("time-picker-h").appendChild(ac.thr);
    ac.thm = ac.createsel(59);
    document.getElementById("time-picker-m").appendChild(ac.thm);
    ac.ths = ac.createSel(59);
    document.getElementById("time-picker-s").appendChild(ac.ths);


    // Creating time Picker - Set and Reset
    
    ac.tset = document.getElementById("tset");
    ac.tset.addEventListner("click", ac.set)
    ac.treset = document.getElementById("treset");
    ac.treset.addEventListner("click", ac.reset);

    //  Getting alarm sound

    ac.sound = document.getElementById("alarm-sound");

    // Starting the clock

    ac.alarm = null;
    setInterval(ac.tick, 1000);
}

// Support Function - Creating selector for Hour, Minutes, Seconds
function createSel(max){
    var selector = document.createElement("select");
    for (var i = 0; i < max; i++){
        var opt = document.createElement("option");
        i = ac.padzero(i);
        opt.value = i;
        opt.innerHTML = i;
        selector.append(opt);
    }
    return selector
}
// Update current time
function tick(){
    //  Current TIME
    var now = new Date();
    var hr = ac.padzero(now.getHours());
    var min = ac.padzero(now.getMinutes());
    var sec = ac.padzero(now.getSeconds());

    //  Update HTML Clock
    ac.currenthr.innerHTML = hr;
    ac.currentmin.innerHTML = min;
    ac.currentsec.innerHTML = sec;

    // Check and Sound Alarm
    if (ac.alarm != null){
        now = hr + min + sec;
        if (now == ac.alarm){
            if (ac.sound.paused){ac.sound.play();}
    }
   }
}

//  Set Alarm
function set(){
    ac.alarm = ac.thr.value + ac.thm.value + ac.ths.value
    ac.thr.disabled = true;
    ac.thm.disabled = true;
    ac.ths.disabled = true;
    ac.tset.disabled = true;
    ac.treset.disabled = false;
}
//  Reset alarm
function reset(){
    if (!ac.sound.paused){ac.sound.pause(); }
    ac.alarm = null;
    ac.thr.disabled = false;
    ac.thm.disabled = false;
    ac.ths.disabled = false;
    ac.tset.disabled = false;
    ac.treset.disabled = true;
}

//  Start Clock on Page load
window.addEventListener("load", ac.init);
