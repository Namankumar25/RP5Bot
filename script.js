function setup() {


    noCanvas();
    let voice = new p5.Speech();
    let speechRec = new p5.SpeechRec("en-US", gotSpeech);


    var bot = new RiveScript();
    bot.loadFile("brain/brain.rive").then(brainReady).catch(brainError);

    function brainReady() {
        bot.sortReplies();
    }

    function brainError() {
        console.log("brain is facing some errors ! ");
    }

    let user_input = select('#user_input');
    let output = select('#output');

    //selecting Bot Mode
    let voiceMode = select('#voiceMode');
    let send = select('#send');
    let stopListening = select('#stop');

    voiceMode.mousePressed(function () {
        
        alert("If you are using Voice Mode Then there is no need to tap again and again on voice mode button.Bot starts listening to you on one single tap only");

        output.html("Listening..")
        let continous = true;
        let interim = false;
        speechRec.start(continous, interim);
    })

    stopListening.mousePressed(function () {
        window.location.reload();
    })

    send.mousePressed(function () {

        let text = user_input.value();
        bot.reply("local-user", text).then(function (reply) {
            output.html(reply);
            user_input.value("")
        });
    })

    function gotSpeech() {
        if (speechRec.resultValue) {
            user_input.value(speechRec.resultString);
            let input = user_input.value();

            bot.reply("local-user", input).then(function (reply) {
                voice.speak(reply);
                output.html(reply);
            });
        }
    }
}