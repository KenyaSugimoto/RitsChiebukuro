import { segmentText } from './../../function/segmentText.js'
import axiosQuery from '../../axios/axios-query';
import router from '../../router';

const actions = {
  async searchWithKeyWords({rootGetters, commit}, text) {
    const keyWords = segmentText(text);
    if (keyWords.length != 0) {
      await axiosQuery.post('/documents:runQuery',
        {
          structuredQuery: {
            from: [
              { collectionId: 'posts' }
            ],
            orderBy: [
              {
                field: {
                  fieldPath: 'created_at',
                },
                direction: 'DESCENDING',
              }
            ],
            where: {
              compositeFilter: {
                op: 'AND',
                filters: [
                  {
                    fieldFilter: {
                      field: {
                        fieldPath: 'keyWords',
                      },
                      op: 'ARRAY_CONTAINS_ANY',
                      value: {
                        arrayValue: {
                          values: keyWords
                        }
                      },
                    },
                  },
                ],
              }
            }
          },
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters.idToken}`,
          },
        }
      ).then((response) => {
        if (typeof(response.data[0].document) !== 'undefined') {
          commit('updateSearchResultPosts', response.data, {root: true});
        } else {
          commit('updateSearchResultPosts', null, {root: true});
        }
        commit('updateSearchKeyWords', text, {root: true})
        router.push('/searchResult').catch(() => {});
      }).catch((error) => {
        console.log(error.response);
      });
    }
  },
};

export default {
  namespaced: true,
  actions,
};
