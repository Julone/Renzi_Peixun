import axios, {axiosByFormData} from './axios';
export function home_getCourseList(){
    return axios({
        url: '/api1/px/getCourseList'
    })
}
export function home_getCourseDetail(courseId){
    return axios({
        url: '/api1/px/getCourseById',
        method: 'POST',
        params: {
            courseId
        }
    })
}
export function test_getTestPage(sjid){
    return axiosByFormData({
        url: '/api1/exam/getTestPaperById',
        method: 'POST',
        data: {
            data: {
                sjid
            }
        }
    })
}
export function test_setTestPageAnswer(data){
    return axiosByFormData({
        url: '/api1/exam/setUserAnswerInfo',
        method: 'POST',
        data: {
            data: data
        }
        
    })
}
export function progress_getUserStudyProgress(userId){
    return axios({
        url: '/api1/px/getLearnRecord',
        method: 'POST',
        params: {
            userId
        }
    })
}