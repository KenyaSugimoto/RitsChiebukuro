import axiosDb from '../../axios/axios-db';

const actions = {
  async getThread({rootGetters, commit}, postId) {
    await axiosDb.get(`tests/${postId}`,
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
    await axiosDb.post(`/tests?documentId=${threadInfo.postId}`,
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
  addThread({rootGetters, commit}, threadInfo) {
    const type = threadInfo.type;
    const thread = {};
    Object.assign(thread, JSON.parse(JSON.stringify(rootGetters.thread)));
    const answers = thread.answers.arrayValue.values;

    if (type == 'answer') {
      answers.push(threadInfo.answer)
      commit('updateThread', thread, {root: true});
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

    axiosDb.patch(`tests/${threadInfo.postId}?updateMask.fieldPaths=answers`,
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
    })
    .catch((error) => {
        console.log(error.response);
    });
  },
};

export default {
  namespaced: true,
  actions,
};
