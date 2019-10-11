import Util from '@/libs/util.js';

const service = Util.ajax;


//菜单权限

/**
 * 获取所有权限
 * @param {*} params 
 */
export function getAuths (params) {
    return service({
        url: '/court/admin/getAuths.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 添加菜单
 * @param {*} params 
 */
export function addRoleMenu (params) {
    return service({
        url: '/court/admin/addRoleMenu.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 添加按钮
 */
export function addAuthority (params) {
    return service({
        url: '/court/admin/addAuthority.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 编辑按钮
 */
export function editAuthority (params) {
    return service({
        url: '/court/admin/editAuthority.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 编辑菜单
 */
export function editRoleMenu (params) {
    return service({
        url: '/court/admin/editRoleMenu.jhtml',
        method: 'GET',
        params
    });
}

export function deletePermission (params) {
    return service({
        url: '/court/infoManage/deletePermission.jhtml',
        method: 'GET',
        params
    });
}

export function searchPermission (params) {
    return service({
        url: '/court/infoManage/searchPermission.jhtml',
        method: 'GET',
        params
    });
}


//角色权限

/**
 * 获取角色列表
 * @param {*} params 
 */
export function getRoleList (params) {
    return service({
        url: '/court/admin/getRoles.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 获取角色权限
 * @param {*} params 
 */
export function getRoleAuths (roleId) {
    const params = {
        roleId
    }
    return service({
        url: '/court/admin/getRoleAuths.jhtml',
        method: 'GET',
        params
    });
}


/**
 * 编辑角色权限
 * @param {*} params 
 */
export function editRoleAuth (id,authIds) {
    const params = {
        id,
        authIds
    }
    return service({
        url: '/court/admin/editRoleAuth.jhtml',
        method: 'post',
        params
    });
}

export function getAllPermissionList (params) {
    return service({
        url: '/court/infoManage/getAllPermissionList.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 添加角色
 * @param {*} params 
 */
export function addRole (params) {
    return service({
        url: '/court/admin/addRole.jhtml',
        method: 'GET',
        params
    });
}

export function editRole (params) {
    return service({
        url: '/court/infoManage/editRole.jhtml',
        method: 'GET',
        params
    });
}

export function deleteRole (params) {
    return service({
        url: '/court/admin/deleteRole.jhtml',
        method: 'GET',
        params
    });
}

export function setDefaultRole (params) {
    return service({
        url: '/court/infoManage/setDefaultRole.jhtml',
        method: 'GET',
        params
    });
}

export function editRolePerm (params) {
    return service({
        url: '/court/infoManage/editRolePerm.jhtml',
        method: 'GET',
        params
    });
}

export function initDepartment (params) {
    return service({
        url: '/court/infoManage/initDepartment.jhtml',
        method: 'GET',
        params
    });
}

export function loadDepartment (params) {
    return service({
        url: '/court/infoManage/loadDepartment.jhtml',
        method: 'GET',
        params
    });
}

export function editRoleDep (params) {
    return service({
        url: '/court/infoManage/editRoleDep.jhtml',
        method: 'GET',
        params
    });
}


//用户列表

/**
 * 获取用户列表
 */
export function getInsiders (params) {
    return service({
        url: '/court/admin/getInsiders.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 8.	获取法院内部人员基础信息
 */
export function getInsiderInfo (idCard) {
    const params = {
        idCard
    }
    return service({
        url: '/court/admin/getInsiderInfo.jhtml',
        method: 'GET',
        params
    });
}


/**
 * 8.	编辑角色
 */
export function editInsiderInfo (adminId,roleIds) {
    const params = {
        adminId,
        roleIds
    }
    return service({
        url: '/court/admin/editInsiderInfo.jhtml',
        method: 'GET',
        params
    });
}




//获取登录角色菜单
export function getAdminMenu (roleId) {
    const params = {
        roleId
    }
    return service({
        url: '/court/admin/getAdminMenu.jhtml',
        method: 'GET',
        params
    });
}

//获取登录角色选项卡
export function getAdminTable (roleName,platform) {
    const params = {
        roleName,
        platform
    }
    return service({
        url: '/court/admin/getAdminTable.jhtml',
        method: 'GET',
        params
    });
}





