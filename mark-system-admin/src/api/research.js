import request from './http'

//获取课题
export const researchs = params => {
    return request({
        url:'/research/researchs',
        method:'get',
        params
    })
}

//编辑课题
export const edit = params => {
    return request({
        url:'/research/edit',
        method:'post',
        data:params
    })
}

//删除课题
export const deleteresearch = params => {
    return request({
        url:'/research/deleteresearch',
        method:'delete',
        data:params
    })
}

//分配答辩小组
export const updategroup = params => {
    return request({
        url:'/research/updategroup',
        method:'post',
        data:params
    })
}

