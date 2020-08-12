import axiosDb from '../../axios/axios-db';

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
    })
    .catch((error) => {
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
        console.log(thread);
        thread.answers.arrayValue.values = [threadInfo.answer];
      }
      // answers.push(threadInfo.answer);
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
    })
    .catch((error) => {
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
    commit('updateThread', thread, {root: true});

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
    })
    .catch((error) => {
        console.log(error.response);
    });
  }
};

export default {
  namespaced: true,
  actions,
};
