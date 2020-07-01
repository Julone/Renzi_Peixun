import {axiosByFormData,axiosSilent} from './axios';
var baseUrl = process.env.NODE_ENV == 'development'? '/exec.ashx': 'http://tm.lilanz.com/qywx/webbll/exec.ashx';

export function login_getToken(){
    return axiosByFormData({
        // http://tm.lilanz.com/qywx/webbll/exec.ashx?serviceName=svr-build&action=getCommentByCourseId
        url: baseUrl,
        method: 'POST',
        params: {
            serviceName: 'svr-build',
            action: 'getToken'
        },
        data: {
            data:{"cid":"15512","cname":"panhq"}
        }
    })
}
export function home_getCourseList(){
    return axiosByFormData({
        url: baseUrl,
        method: 'GET',
        params: {
            serviceName: 'svr-build',
            action: 'getCourseList'
        },
    })
}
export function video_getCourseDetail({v_id,c_id}){
    var data = {};
    v_id ? data['videoId'] = v_id: data['courseId'] = c_id;
    return axiosByFormData({
        url: baseUrl,
        method: 'POST',
        params: {
            serviceName: 'svr-build',
            action: 'getCourseById'
        },
        data: {
            data
        }
    })
}
export function test_getTestPage(sjid){
    return axiosByFormData({
        url: baseUrl,
        method: 'POST',
        params: {
            serviceName: 'svr-build',
            action: 'getTestPaperById'
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
        params: {
            serviceName: 'svr-build',
            action: 'setUserAnswerInfo'
        },
        data: {
            data: data
        }
        
    })
}
export function progress_getUserStudyProgress(userId){
    return axiosByFormData({
        url: baseUrl ,
        method: 'POST',
        params: {
            serviceName: 'svr-build',
            action: 'getLearnRecord'
        },
    })
}
export function video_saveVideoProgress({courseId,chapterId,videoId,progress}){
    return axiosSilent({
        url: baseUrl ,
        method:'POST',
        params: {
            serviceName: 'svr-build',
            action: 'setProgress'
        },
        data: {
            data:  {
                courseId,chapterId,videoId,
                videoProgress:Math.round(progress)
            }
        }
    })
}

export function video_getCommentById(courseId){
    return axiosByFormData({
        url: baseUrl ,
        method: 'POST',
        params: {
            serviceName: 'svr-build',
            action: 'getCommentByCourseId'
        },
        data: {
            data:{ courseId}
        },
    })
}

export function video_addCommentByInfo({courseId, parentId, parentUserName, content}){
    return axiosByFormData({
        url: baseUrl ,
        method: 'POST',
        params: {
            serviceName: 'svr-build',
            action: 'addOneCommentByInfo'
        },
        data: {
            data: { "userId":2,"userName":"phq", courseId, parentId, parentUserName, content }
        }
    })
}

export function score_getScoreList(){
    return axiosByFormData({
        url: baseUrl,
        method: 'POST',
        params: {
            serviceName: 'svr-build',
            action: 'getAllAnswerByUserId'
        },
        data: {
            data: {"userId":1}
       }
    })
    
}
export function setting_getUserInfo(){
    return axiosSilent({
        url: baseUrl,
        method: 'POST',
        params: {
            serviceName: 'svr-build',
            action: 'getUserMsg'
        },
    })
}