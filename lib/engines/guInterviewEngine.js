'use strict';
const interview = require('../../config/interviews');

var GuInterviewEngine = function () {
};

function parseResponse(message, question, session) {
    if (question.type.toLowerCase() === 'choice') {
        for (let answer of question.answers) {
            if (message.toLowerCase() === answer.title.toLowerCase()){
                session.addOrReplace(question.id, answer.id);
                return answer.nextQuestionId;                
            }
        }
    } else if (question.type.toLowerCase() === 'text') {
        let answer = question.answers[0];
        session.addOrReplace(question.id, message);
        return answer.nextQuestionId;
    }

    return question.id;
}

function formatQuestion(question) {
    if (question.type === 'text' || question.type === 'close') {
        return {
            text: question.title
        };
    } else if (question.type === 'choice') {
        let response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: question.title,
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
            
            if (answer.url && answer.url !== ""){
                button.type = "web_url";
                button.url = answer.url;
            } else {
                button.type = "postback";
                button.payload = answer.title;
            }
            response.attachment.payload.elements[0].buttons.push(button);
        }

        return response;
    }
}

GuInterviewEngine.prototype.reply = function (message, session, callback) {
    var current = 0;
    var id = interview[current].firstQuestionId;
    if (session.contains('questionId')) {
        id = parseResponse(message, interview[current].questions[session.get('questionId')], session);
    }

    session.addOrReplace('questionId', id);
    let nextQuestion = interview[current].questions[id];
    if (nextQuestion.type === 'close')
        session.saveAndClear();

    callback(formatQuestion(nextQuestion));
};

module.exports = GuInterviewEngine;
