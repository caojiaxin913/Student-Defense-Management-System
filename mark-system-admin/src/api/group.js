import request from './http'

//获取答辩小组
export const getall = params => {
    return request({
        url:'/group/getall',
        method:'get',
        params
    })
}

//编辑答辩小组
export const edit = params => {
    return request({
        url:'/group/edit',
        method:'post',
        data:params
    })
}

//删除答辩小组
export const deletegroup = params => {
    return request({
        url:'/group/delete/'+params,
        method:'delete'
    })
}

//创建答辩小组
export const create = params => {
    return request({
        url:'/group/create',
        method:'post',
        data:params
    })
}

