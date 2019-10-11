<style lang="less">
    @import './message.less';
</style>

<template>
    <div class="message-main-con">
        <div class="message-mainlist-con">
            <div>
                <Button @click="setCurrentMesType('unread')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'unread'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">未读消息</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="unreadCount"></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('hasread')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'hasread'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">已读消息</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="hasreadCount"></Badge></Button>
            </div>
        </div>
        <div class="message-content-con">
            <transition name="view-message">
                <div v-if="showMesTitleList" class="message-title-list-con">
                    <Table ref="messageList" :columns="mesTitleColumns" :data="currentMesList" :no-data-text="noDataText"></Table>
                </div>
            </transition>
            <transition name="back-message-list">
                <div v-if="!showMesTitleList" class="message-view-content-con">
                    <div class="message-content-top-bar">
                        <span class="mes-back-btn-con"><Button type="text" @click="backMesTitleList"><Icon type="chevron-left"></Icon>&nbsp;&nbsp;返回</Button></span>
                        <h3 class="mes-title">{{ mes.noticeContent }}</h3>
                    </div>
                    <p class="mes-time-con"><Icon type="android-time"></Icon>&nbsp;&nbsp;{{ mes.createDate }}</p>
                    <div class="message-content-body">
                        <p class="message-content">{{ mes.content }}</p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import { formatDate } from '@/libs/date';
export default {
    name: 'message_index',
    data () {
        const markAsreadBtn = (h, params) => {
            return h('Button', {
                props: {
                    size: 'small'
                },
                on: {
                    click: () => {
                        store.dispatch('ModiNotice', params.row.id).then(res => {
                            if (res.data.state == 100) {
                                this.hasreadMesList.unshift(this.currentMesList.splice(params.index, 1)[0]);
                            } else {
                                this.$Message.error(res.data.message);
                            }
                        })
                        this.$store.commit('setMessageCount', this.unreadMesList.length);
                    }
                }
            }, '标为已读');
        };
        const deleteMesBtn = (h, params) => {
            return h('Button', {
                props: {
                    size: 'small',
                    type: 'error'
                },
                on: {
                    click: () => {
                        store.dispatch('DelNotice', params.row.id).then(res => {
                            if (res.data.state == 100) {
                                this.hasreadMesList.splice(params.index, 1);
                                this.$Message.success('删除成功');
                            } else {
                                this.$Message.error(res.data.message);
                            }
                        })
                    }
                }
            }, '删除');
        };
        return {
            currentMesList: [],
            unreadMesList: [],
            hasreadMesList: [],
            recyclebinList: [],
            currentMessageType: 'unread',
            showMesTitleList: true,
            unreadCount: 0,
            hasreadCount: 0,
            recyclebinCount: 0,
            noDataText: '暂无未读消息',
            mes: {
                noticeContent: '',
                createDate: '',
                content: ''
            },
            mesTitleColumns: [
                // {
                //     type: 'selection',
                //     width: 50,
                //     align: 'center'
                // },
                {
                    title: ' ',
                    key: 'noticeContent',
                    align: 'left',
                    ellipsis: true,
                    render: (h, params) => {
                        return h('a', {
                            style: {
                                paddingLeft: '15px'
                            },
                            on: {
                                click: () => {
                                    this.showMesTitleList = false;
                                    this.mes.noticeContent = params.row.noticeContent;
                                    this.mes.createDate = formatDate(new Date(params.row.createDate), 'yyyy-MM-dd hh:mm:ss');
                                    this.mes.content = params.row.noticeContent;
                                    store.dispatch('ModiNotice', params.row.id).then(res => {
                                        if (res.data.state == 100) {
                                            this.hasreadMesList.unshift(this.currentMesList.splice(params.index, 1)[0]);
                                        } else {
                                            this.$Message.error(res.data.message);
                                        }
                                    })
                                    this.$store.commit('setMessageCount', this.unreadMesList.length);
                                    // this.getContent(params.index);
                                }
                            }
                        }, params.row.noticeContent);
                    }
                },
                {
                    title: ' ',
                    key: 'createDate',
                    align: 'center',
                    width: 180,
                    render: (h, params) => {
                        return h('span', [
                            h('Icon', {
                                props: {
                                    type: 'android-time',
                                    size: 12
                                },
                                style: {
                                    margin: '0 5px'
                                }
                            }),
                            h('span', {
                                props: {
                                    type: 'android-time',
                                    size: 12
                                }
                            }, formatDate(new Date(params.row.createDate), 'yyyy-MM-dd hh:mm:ss'))
                        ]);
                    }
                },
                {
                    title: ' ',
                    key: 'asread',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        if (this.currentMessageType === 'unread') {
                            return h('div', [
                                markAsreadBtn(h, params)
                            ]);
                        } 
                        // else if (this.currentMessageType === 'hasread') {
                        //     return h('div', [
                        //         deleteMesBtn(h, params)
                        //     ]);
                        // }
                    }
                }
            ]
        };
    },
    methods: {
        backMesTitleList () {
            this.showMesTitleList = true;
        },
        setCurrentMesType (type) {
            if (this.currentMessageType !== type) {
                this.showMesTitleList = true;
            }
            this.currentMessageType = type;
            if (type === 'unread') {
                this.noDataText = '暂无未读消息';
                this.currentMesList = this.$store.getters.new;
                console.log(this.currentMesList)
            } else if (type === 'hasread') {
                this.noDataText = '暂无已读消息';
                this.currentMesList = this.$store.getters.read;
            }
        },
        getContent (index) {
            this.mes.content = mesContent;
        }
    },
    created () {

    },
    mounted () {
        store.dispatch('ShowNotice').then(res => {
            this.currentMesList = this.unreadMesList = this.$store.getters.new;
            this.hasreadMesList = this.$store.getters.read;
            this.unreadCount = this.unreadMesList.length;
            this.hasreadCount = this.hasreadMesList.length;
        })
    },
    watch: {
        unreadMesList (arr) {
            this.unreadCount = arr.length;
        },
        hasreadMesList (arr) {
            this.hasreadCount = arr.length;
        },
        recyclebinList (arr) {
            this.recyclebinCount = arr.length;
        }
    }
};
</script>
