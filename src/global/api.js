import axios, {axiosByFormData} from './axios';
var baseUrl = process.env.NODE_ENV =='development'? '/api1': './'
export function home_getCourseList(){
    return axios({
        url: baseUrl + '/px/getCourseList'
    })
}
export function home_getCourseDetail(courseId){
    return axios({
        url: baseUrl + '/px/getCourseById',
        method: 'POST',
        params: {
            courseId
        }
    })
}
export function test_getTestPage(sjid){
    return axiosByFormData({
        url: baseUrl + '/exam/getTestPaperById',
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
        url: baseUrl + '/exam/setUserAnswerInfo',
        method: 'POST',
        data: {
            data: data
        }
        
    })
}
export function progress_getUserStudyProgress(userId){
    return axios({
        url: baseUrl + '/px/getLearnRecord',
        method: 'POST',
        params: {
            userId
        }
    })
}
export function video_saveVideoProgress({courseId,chapterId,videoId,progress}){
    return axiosByFormData({
        url: baseUrl + '/px/setProgress',
        method:'POST',
        data: {
            data:  {"userId":1,"userName":"phq", courseId,chapterId,videoId,"videoProgress":progress}
        }
    })
}

export function video_getCommentById(courseId){
    return axios({
        url: baseUrl + "/comment/getCommentByCourseId",
        method: 'POST',
        params: {
            courseId
        },
    })
}

export function video_addCommentByInfo({courseId, parentId, parentUserName, content}){
    return axiosByFormData({
        url: baseUrl + "/comment/addOneCommentByInfo",
        method: 'POST',
        data: {
            data: { "userId":2,"userName":"phq", courseId, parentId, parentUserName, content }
        }
    })
}

export function score_getScoreList({}){

    
}