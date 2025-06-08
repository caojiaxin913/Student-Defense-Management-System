import request from './http'

//管理员登录
export const login = params => {
    return request({
        url:'/user/login',
        method:'post',
        data:params
    })
}

//根据类型获取用户
export const getUserByType = params => {
    return request({
        url:'/user/users',
        method:'get',
        params
    })
}

//新增用户
export const add = params => {
    return request({
        url:'/user/register',
        method:'post',
        data:params
    })
}

//编辑用户信息
export const edit = params => {
    return request({
        url:'/user/edit',
        method:'post',
        data:params
    })
}

//搜索用户
export const search = params => {
    return request({
        url:'/user/search',
        method:'get',
        params
    })
}

//删除用户
export const deleteuser = params => {
    return request({
        url:'/user/deleteuser',
        method:'delete',
        data:params
    })
}

//获取导师列表
export const getteachers = params => {
    return request({
        url:'/user/getteachers',
        method:'get',
        params
    })
}
