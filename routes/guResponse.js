var GuResponse = function() {
    var self = this;
};

GuResponse.prototype.postBack = function () {
    return {
        text: "Thank you for pressing the button! Your pressing is important to us"
    };
};

GuResponse.prototype.generic = function () {
    return {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: [{
                    title: "rift",
                    subtitle: "Next-generation virtual reality",
                    item_url: "https://www.oculus.com/en-us/rift/",               
                    image_url: "http://messengerdemo.parseapp.com/img/rift.png",
                    buttons: [{
                        type: "web_url",
                        url: "https://www.oculus.com/en-us/rift/",
                        title: "Open Web URL"
                    }, {
                        type: "postback",
                        title: "Do not press",
                        payload: "Payload for first bubble",
                    }],
                    }, {
                    title: "touch",
                    subtitle: "Your Hands, Now in VR",
                    item_url: "https://www.oculus.com/en-us/touch/",               
                    image_url: "http://messengerdemo.parseapp.com/img/touch.png",
                    buttons: [{
                        type: "web_url",
                        url: "https://www.oculus.com/en-us/touch/",
                        title: "Open Web URL"
                    }, {
                        type: "postback",
                        title: "Do not press",
                        payload: "Payload for second bubble",
                    }]
                }]
            }
        }
    };
};

module.exports = GuResponse;

