const UtilitiesCommon = require('./common');

var QuestionFactory = function () {

};

function getQuestionTitle (question, session){
    return question.dataContextRequire ?
        UtilitiesCommon.stringBuild(question.title, session.getMany(question.dataContextRequire)) : 
        question.title;
}

QuestionFactory.prototype.createText = function (question, session) {
    return {
            text: getQuestionTitle(question, session)
    };
};

QuestionFactory.prototype.createChoice = function (question, session) {
    let response = {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: [{
                    title: getQuestionTitle(question, session),
                    subtitle: question.subTitle,
                    item_url: question.url,
                    image_url: question.imageUrl,
                    buttons: []
                }]
            }
        }
    };

    for (let answer of question.answers) {
        var button = {
            title: answer.title
        };

        if (answer.url && answer.url !== "") {
            button.type = "web_url";
            button.url = answer.url;
        } else {
            button.type = "postback";
            button.payload = answer.title;
        }
        response.attachment.payload.elements[0].buttons.push(button);
    }

    return response;
};

module.exports = QuestionFactory;