import request from './http'

//获取评分
export const getall = params => {
    return request({
        url:'/record/getall',
        method:'get',
        params
    })
}

//根据状态获取评分
export const bystatus = params => {
    return request({
        url:'/record/bystatus',
        method:'get',
        params
    })
}