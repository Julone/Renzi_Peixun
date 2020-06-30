import axios, {axiosByFormData} from './axios';
// var baseUrl = process.env.NODE_ENV =='development'? '/api_test': 'http://192.168.35.97:9878';
var baseUrl = process.env.NODE_ENV == 'development'? '/exec.ashx': '/exec.ashx'
export function login_requestToken({userName = 'panhq', password= 'phq'}){
    return axiosByFormData({
        url: baseUrl,
        method: 'POST',
        params:{
            action:'login',
            serviceName: 'svr-build'
        },
        data: {
            data:{ 
                userName, password
            }
        }
    })
}
export function home_getCourseList(){
    return axiosByFormData({
        url: baseUrl,
        method:'POST',
        params: {
            action: 'getCourseList',
            serviceName: 'svr-build'
        }
    })
}
export function home_getCourseDetail(courseId){
    return axiosByFormData({
        url: baseUrl,
        method: 'POST',  
        params: {
            action: 'getCourseById',
            serviceName: 'svr-build'
        },
        data: {
            data:{
                videoId: courseId
            }
        },
    })
}
export function test_getTestPage(sjid){
    return axiosByFormData({
        url: baseUrl,
        method: 'POST',
        params: {
            action: 'getTestPaperById',
            serviceName: 'svr-build'
        },
        data: {
            data: {
                sjid
            }
        }
    })
}
export function test_setTestPageAnswer(data){
    return axiosByFormData({
        url: baseUrl,
        method: 'POST',
        data: {
            data: data
        },
        params: {
            action: 'setUserAnswerInfo',
            serviceName: 'svr-build'
        }
    })
}
export function progress_getUserStudyProgress(userId){
    return axiosByFormData({
        url: baseUrl,
        method: 'POST',
        params: {
            action: 'getLearnRecord',
            serviceName: 'svr-build'
        }

    })
}
export function video_saveVideoProgress({courseId,chapterId,videoId,progress}){
    return axiosByFormData({
        url: baseUrl,
        method:'POST',
        data: {
            data:  {courseId,chapterId,videoId,"videoProgress":Math.round(progress)}
        },
        params: {
            clientProgress: false,
            clientToast: false,
            action: 'setProgress',
            serviceName: 'svr-build',
        }
    })
}

export function video_getCommentById(courseId){
    return axiosByFormData({
        url: baseUrl,
        method: 'POST',
        params: {
            data:{ courseId},
            action: 'getCommentByCourseId',
            serviceName: 'svr-build',
        },
    })
}

export function video_addCommentByInfo({courseId, parentId, parentUserName, content}){
    return axiosByFormData({
        url: baseUrl,
        method: 'POST',
        data: {
            data: { "userId":2,"userName":"phq", courseId, parentId, parentUserName, content }
        },
        params:{
            action: 'addOneCommentByInfo',
            serviceName: 'svr-build',
        }
    })
}

export function score_getScoreList(){
    return axiosByFormData({
        url: baseUrl,
        method: 'POST',
        data: {
            data: {"userId":1}
       },
       params:{
            action: 'getAllAnswerByUserId',
            serviceName: 'svr-build',
        }
    })
    
}