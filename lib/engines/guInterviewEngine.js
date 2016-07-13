'use strict';
const interview = require('../../extension/interviews');
const ExtensionLib = require('../../extension/lib');
const QuestionFactory = require('../utilities/questionFactory');

var GuInterviewEngine = function (bot) {
    let self = this;
    self.guExtension = new ExtensionLib(bot);
    self.questionFactory = new QuestionFactory();
};

function parseResponse(message, question, session) {
    if (question.type.toLowerCase() === 'choice') {
        for (let answer of question.answers) {
            if (message.toLowerCase() === answer.title.toLowerCase()){
                session.addOrReplace(answer.contextAs ? answer.contextAs : question.id, { id: answer.id, message: message });
                return answer;                
            }
        }
    } else if (question.type.toLowerCase() === 'text') {
        let answer = question.answers[0];
        session.addOrReplace(answer.contextAs ? answer.contextAs : question.id, message);
        return answer;
    }
}

function formatQuestion(self, question, session) {
    if (question.type === 'text' || question.type === 'close') {
        return self.questionFactory.createText(question, session);
    } else if (question.type === 'choice')
        return self.questionFactory.createChoice(question, session);
}

GuInterviewEngine.prototype.reply = function (message, session, callback) {
    let self = this;
    var current = 0;
    let response;
    var id = interview[current].firstQuestionId;
    if (session.contains('questionId')) {
        response = parseResponse(message, interview[current].questions[session.get('questionId')], session);
        id = response ? response.nextQuestionId : session.get('questionId');
    }

    session.addOrReplace('questionId', id);
    let nextQuestion = interview[current].questions[id];
    if (nextQuestion.type === 'close')
        session.saveAndClear();

    if(response && response.action && typeof(self.guExtension[response.action]) === 'function'){
        self.guExtension[response.action](message, session, function(){
            callback(formatQuestion(self, nextQuestion, session));
        });
        return;
    }
    
    callback(formatQuestion(self, nextQuestion, session));
};

module.exports = GuInterviewEngine;
