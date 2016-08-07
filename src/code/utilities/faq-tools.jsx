// Content
import questionAnswers from 'content/faq-question-answers'

export function getAnswerList (answer) {
	if (answer instanceof Array) {
		return answer
	}

	return [answer]
}

export function getQuestionOrAnswer (id) {
	for (let i = 0, l = questionAnswers.length; i < l; i++) {
		let questionAnswer = questionAnswers[i]

		if (id === questionAnswer.id) {
			questionAnswer.answer = getAnswerList(questionAnswer.answer)
			return questionAnswer
		}
	}
}