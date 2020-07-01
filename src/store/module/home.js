import {getStorage,setStorage} from './../../utils/storage'
export default {
    state: {
        course_record: getStorage({name: 'home_course_record'}) ||  []
    },
    mutations:{
        HOME_PUSH_COURSE_RECORD(state,val){
            console.log(val);
            var m = state.course_record;
            var ind = m.findIndex(el => el.id == val.id);
            ind != -1 && m.splice(ind,1); //如果存在,则移除
            m.unshift(val);
            setStorage({name: 'home_course_record', content: m});
        },
    },
    actions: {
        home_add_course_record({commit}, val){
            commit('HOME_PUSH_COURSE_RECORD', val);
        },
        home_clear_course_record({commit}){

        }
    },
    getters:{ 
        getters_home_course_record(state){
            return state.course_record;
        }   
    }
}