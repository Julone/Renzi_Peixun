import axios, {axiosByFormData,axiosSilent} from './axios';
import store from './../store';

var baseUrl = process.env.NODE_ENV == 'development'? '/api_test': 'http://192.168.35.97:9878';
function getToken(){
    var token = store.getters.apptoken || ""
    return token;
}

export function login_requestToken({userName = 'panhq', password= 'phq'}){
    return axiosByFormData({
        url: baseUrl + '/login',
        method: 'POST',
        data: {
            data:{ 
                userName, password
            }
        }
    })
}
export function login_getToken(){
    return axiosByFormData({
        url: baseUrl + '/getToken',
        method: 'POST',
        data: {
            data:{"cid":"15512","cname":"panhq"}
        }
    })
}
export function home_getCourseList(){
    return axiosByFormData({
        url: baseUrl + '/px/getCourseList'
    })
}
export function video_getCourseDetail({v_id,c_id}){
    var data = {};
    v_id ? data['videoId'] = v_id: data['courseId'] = c_id;
    return axiosByFormData({
        url: baseUrl + '/px/getCourseById',
        method: 'POST',
        data: {
            data
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
    return axiosByFormData({
        url: baseUrl + '/px/getLearnRecord',
        method: 'POST'
    })
}
export function video_saveVideoProgress({courseId,chapterId,videoId,progress}){
    return axiosSilent({
        url: baseUrl + '/px/setProgress',
        method:'POST',
        data: {
            data:  {
                courseId,chapterId,videoId,
                videoProgress:Math.round(progress),
                token: getToken()
            }
        }
    })
}

export function video_getCommentById(courseId){
    return axiosByFormData({
        url: baseUrl + "/comment/getCommentByCourseId",
        method: 'POST',
        data: {
            data:{ courseId}
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

export function score_getScoreList(){
    return axiosByFormData({
        url: baseUrl + "/exam/getAllAnswerByUserId",
        method: 'POST',
        data: {
            data: {"userId":1}
       }
    })
    
}