import { showNotice, modiNotice, delNotice } from '@/api/message';

const message = {
    state: {
        new: [],
        read: []
    },
    mutations: {
        SET_NEW: (state, list) => {
            state.new = list;
        },
        SET_READ: (state, list) => {
            state.read = list;
        }
    },
    actions: {
        ShowNotice ({ commit }) {
            return new Promise((resolve, reject) => {
                showNotice()
                    .then(response => {
                        if (response.data.state == 100) {
                            let data = response.data.data;
                            
                            let newList = [];
                            if(data['false']){
                                newList = data['false']
                            }
                            let readList =data['true'];
                            if(data['true']){
                                readList =data['true']
                            }
                            commit('SET_NEW', newList);
                            commit('SET_READ', readList);
                            resolve(response);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        ModiNotice ({ commit }, noticeId) {
            return new Promise((resolve, reject) => {
                modiNotice(noticeId)
                    .then(response => {
                        console.log(response)
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        DelNotice ({ commit }, noticeId) {
            return new Promise((resolve, reject) => {
                delNotice(noticeId)
                    .then(response => {
                        console.log(response)
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
}
export default message;
