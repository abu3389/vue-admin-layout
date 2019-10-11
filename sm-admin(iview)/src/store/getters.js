const getters = {
    avatar: state => state.user.avatar,
    access: state => state.user.access,
    new: state => state.message.new,
    read: state => state.message.read,
    litigantType: state => state.app.litigantType,
    agentType: state => state.app.agentType,
    tabList:state => state.app.tabList,
    hastabList: (state, getters) => (title) => {
        var tabObj=state.app.tabList.find(tabList => tabList.title === title)
        //判断是否有该选项卡权限
        if(tabObj){
           return true
        }else{
           return false
        }
    },
    roLeName: state => state.app.roLeName,
    userIdCard: state => state.app.userIdCard,
    userName: state => state.app.userName,
    userId: state => state.app.userId,
};
export default getters;
