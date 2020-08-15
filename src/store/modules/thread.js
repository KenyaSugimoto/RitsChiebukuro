import axiosDb from '../../axios/axios-db';
import {toast} from "../../function/toastr.js";

const actions = {
  async getThread({rootGetters, commit}, postId) {
    await axiosDb.get(`threads/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then((response) => {
      commit('updateThread', response.data.fields, {root: true});
    }).catch((error) => {
      if (error.response.data.error.status == 'NOT_FOUND') {
        console.log('まだ回答がありません');
        commit('updateThread', null, {root: true});
      }
    });
  },
  async createThread({rootGetters, commit}, threadInfo) {
    let message = '';

    await axiosDb.post(`/threads?documentId=${threadInfo.postId}`,
      {
        fields: threadInfo.fields,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then((response) => {
      commit('updateThread', response.data.fields, {root: true});
      message = 'OK';
      toast("回答を送信しました", "success");
    }).catch((error) => {
      console.log(error.response);
      if (error.response.data.error.status == 'ALREADY_EXISTS') {
        message = 'ALREADY_EXISTS';
      }
    });

    return message;
  },
  async addThread({rootGetters, commit}, threadInfo) {
    let message = '';
    const type = threadInfo.type;
    const thread = {};
    Object.assign(thread, JSON.parse(JSON.stringify(rootGetters.thread)));
    const answers = thread.answers.arrayValue.values;

    if (type == 'answer') {
      if (typeof(answers) !== 'undefined') {
        answers.push(threadInfo.answer);
      } else {
        thread.answers.arrayValue.values = [threadInfo.answer];
      }
    } else if (type == 'comment') {
      for (let answer of answers) {
        answer = answer.mapValue.fields;
        const answerId = answer.answerId.stringValue;
        if (answerId == threadInfo.answerId) {
          if (typeof(answer.comments.arrayValue.values) !== 'undefined') {
            answer.comments.arrayValue.values.push(threadInfo.comment);
          } else {
            answer.comments.arrayValue.values = [threadInfo.comment];
          }
        }
      }
    }

    await axiosDb.patch(`threads/${threadInfo.postId}?updateMask.fieldPaths=answers`,
      {
        fields : thread,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then((response) => {
      commit('updateThread', response.data.fields, {root: true});
      message = 'OK';
      if (type == 'answer') {
        toast("回答を送信しました", "success");
      } else if (type == 'comment') {
        toast("コメントを送信しました", "success");
      }
    }).catch((error) => {
        console.log(error.response);
    });

    return message;
  },
  async deleteAnswer({rootGetters, commit}, threadInfo) {
    const thread = {};
    Object.assign(thread, JSON.parse(JSON.stringify(rootGetters.thread)));
    const answers = thread.answers.arrayValue.values;
    const newAnswers = answers.filter(answer => answer.mapValue.fields.answerId.stringValue != threadInfo.answerId);
    thread.answers.arrayValue.values = newAnswers;

    await axiosDb.patch(`threads/${threadInfo.postId}?updateMask.fieldPaths=answers`,
      {
        fields : thread,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then((response) => {
      if (typeof(response.data.fields.answers.arrayValue.values) === 'undefined') {
        response.data.fields.answers.arrayValue.values = [];
      }
      commit('updateThread', response.data.fields, {root: true});
      toast("回答を削除しました", "success");
    }).catch((error) => {
        console.log(error.response);
    });
  },
  deleteComment({rootGetters, commit}, threadInfo) {
    const thread = {};
    Object.assign(thread, JSON.parse(JSON.stringify(rootGetters.thread)));
    const answers = thread.answers.arrayValue.values;
    let answerIndex = 0;
    let newComments = [];

    for (let answer of answers) {
      answer = answer.mapValue.fields;
      const answerId = answer.answerId.stringValue;
      if (answerId == threadInfo.answerId) {
        const comments = answer.comments.arrayValue.values;
        newComments = comments.filter(comment => comment.mapValue.fields.commentId.stringValue != threadInfo.commentId);
        break;
      }
      answerIndex += 1;
    }

    if (newComments != []) {
      thread.answers.arrayValue.values[answerIndex].mapValue.fields.comments.arrayValue.values = newComments;
    }

    axiosDb.patch(`threads/${threadInfo.postId}?updateMask.fieldPaths=answers`,
      {
        fields : thread,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then((response) => {
      commit('updateThread', response.data.fields, {root: true});
      toast("コメントを削除しました", "success");
    });
  },
  updateBestAnswer({rootGetters, commit, dispatch}, answerInfo) {
    const thread = {};
    Object.assign(thread, JSON.parse(JSON.stringify(rootGetters.thread)));

    // 解決済みにする場合
    if (answerInfo.isResolved) {
      const answers = thread.answers.arrayValue.values;
      for (let answer of answers) {
        answer = answer.mapValue.fields;
        const answerId = answer.answerId.stringValue;
        if (answerId == answerInfo.answerId) {
          answer.isBestAnswer.booleanValue = true;
        }
      }
    }
    thread.isResolved.booleanValue = answerInfo.isResolved;

    const postId = answerInfo.postId;
    axiosDb.patch(`threads/${postId}?updateMask.fieldPaths=answers&updateMask.fieldPaths=isResolved`,
      {
        fields : thread,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.idToken}`,
        },
      }
    ).then((response) => {
      commit('updateThread', response.data.fields, {root: true});
      commit('updateIsResolved', answerInfo.isResolved, {root: true});
      dispatch('post/updateIsResolved', {
        postId,
        isResolved: answerInfo.isResolved
      }, {root: true});
      // 解決済みにする場合
      if (answerInfo.isResolved) {
        toast("ベストアンサーにしました", "success");
      }
    });
  },
};

export default {
  namespaced: true,
  actions,
};
