<template>
    <div class="TEST-PAGE MODULE">
        <van-sticky>
            <van-nav-bar title="培训考试" left-text="返回" left-arrow @click-left="onConfirmLeave"
                @click-right="onClickRight">
                <template #right>
                    <van-circle v-if="leftRate && !disabledSubmit" size="30" v-model="leftRate" stroke-width="60" :speed="100"
                        layer-color="#e6e6e6">
                        <div style="line-height:30px;">
                            {{leftTime / 60 || 0 | toFixed}}
                        </div>
                    </van-circle>
                </template>
            </van-nav-bar>
        </van-sticky>
        <div class="content">
            <van-form ref="form" :scrollToError="false" @submit="onSubmit" @failed="onFailed">
                <div class="header">
                    <h1 class="sj_title">{{sj_info.sub_title || '试卷标题'}}</h1>
                    <div class="sj_info">
                        <!-- <div>试卷名称: {{sj_info.title}}</div> -->
                        <span>考试时间: {{leftTime / 60 || 0 | toFixed}}/{{sj_info.t_time || 0}}分</span>
                        <span>总分: {{sj_info.t_fenshu || 100}}</span>
                    </div>
                </div>

                <van-divider></van-divider>
                <div class="question-list">
                    <div class="question" @click="questionClick" :class="{disabled: disabledSubmit}"
                        v-for="el in tm_list" :key="el.id">
                        <div class="form-item" v-if="el.tmType == 'X'">
                            <van-field :name="'radio'+el.id" :rules="[{ required: true, message: '请勾选你的选项' }]">
                                <test-question-title :el="el" slot="label"></test-question-title>
                                <template #input>
                                    <!-- 选择题 -->
                                    <van-radio-group v-model="el.answer">
                                        <van-cell-group>
                                            <van-cell v-for="o in el.options" :key="o.id" :title="o.xx+ '.' + o.xxName"
                                                clickable @click="toggleRadio(o.id)" :border="false">
                                                <template #right-icon>
                                                    <van-radio ref="radio" :o_id="o.id" style="margin-bottom:5px"
                                                        :name="o.xx"></van-radio>
                                                </template>
                                            </van-cell>
                                        </van-cell-group>
                                    </van-radio-group>
                                </template>
                            </van-field>
                        </div>
                        <div class="form-item" v-if="el.tmType == 'D'">
                            <!-- 多选题 -->
                            <van-field :name="'checkbox'+el.id" :rules="[{ required: true, message: '请勾选你的选项' }]">
                                <test-question-title :el="el" slot="label"></test-question-title>
                                <template #input>
                                    <van-checkbox-group v-model="el.answer">
                                        <van-cell-group>
                                            <van-cell v-for="o in el.options" :key="o.id" :title="o.xx+ '.' + o.xxName"
                                                clickable :border="false" @click="toggleCheckbox(o.id)">
                                                <template #right-icon>
                                                    <van-checkbox shape="square" ref="checkbox" :o_id="o.id"
                                                        style="margin-bottom:5px" :name="o.xx"></van-checkbox>
                                                </template>
                                            </van-cell>
                                        </van-cell-group>
                                    </van-checkbox-group>
                                </template>
                            </van-field>
                        </div>
                        <div class="form-item" v-if="el.tmType == 'J'">
                            <van-field v-model="el.answer" rows="2" type="textarea" placeholder="请输入答案(不超过100字)"
                                show-word-limit autosize clickable :name="'textarea' + el.id"
                                :rules="[{ validator:textareaValidator, message: '字符过长' },{ required:true, message: '不能为空' }]">
                                <test-question-title :el="el" slot="label"></test-question-title>
                            </van-field>
                        </div>
                        <div class="form-item" v-if="el.tmType== 'P'">
                            <!-- 对错题 -->
                            <van-field :name="'duicuo'+el.id" :rules="[{ required: true, message: '请勾选你的选项' }]">
                                <test-question-title :el="el" slot="label"></test-question-title>
                                <template #input>
                                    <van-radio-group v-model="el.answer">
                                        <van-cell>
                                            <template #title>
                                                <van-radio class="panduan-right" style="margin-bottom:5px" name="T">
                                                    正确
                                                    <template #icon>
                                                        <van-icon name="success" />
                                                    </template>
                                                </van-radio>
                                            </template>
                                            <van-radio class="panduan-wrong" style="margin-bottom:5px" name="F">错误
                                                <template #icon>
                                                    <van-icon name="cross" />
                                                </template>
                                            </van-radio>
                                        </van-cell>
                                    </van-radio-group>
                                </template>
                            </van-field>
                        </div>
                    </div>
                </div>

                <div class="submit">
                    <van-button block style="padding:0 20px" native-type="submit" size="medium" color="rgb(7,193,96)">
                        提交考卷 </van-button>
                    <van-button v-if="disabledSubmit" @click="reTest" block style="padding:0 20px;margin-top:10px;" 
                        native-type="button" size="medium" type="danger" plain>
                        重新考试
                    </van-button>
                </div>
            </van-form>

        </div>

    </div>
</template>
<script>
    import {
        test_getTestPage,
        test_setTestPageAnswer
    } from 'api';
    import {
        dateFormat
    } from './../utils/utils.js'
    import {
        setStorage,
        getStorage,
        delStorage
    } from "./../utils/storage";

    export default {
        data() {
            return {
                sj_info: {},
                tm_list: [],
                startTime: dateFormat(this.$store.getters.getServerTime(), 'yyyy-MM-dd hh:mm:ss'),
                leftRate: 0,
                leftTime: 0,
                disabledSubmit: false,
            }
        },
        props: [
            'paper_id'
        ],
        methods: {
            onConfirmLeave() {
                return this.$dialog.confirm({
                    title: '是否退出考试?',
                    message: '你已答题的内容将无法保存,需要重新答题!'
                }).then(res => {
                    this.$router.go(-1);
                    delStorage({name: 'test_data',type:'session'})
                }).catch(e => false);
            },
            onClickRight() {
                var second = 5;
                var leftRate = function () {
                    return (100 - this.leftTime / (this.sj_info.t_time * 60) * 100).toFixed(3)
                }.bind(this)
                var toast = this.$toast({
                    duration: 5000,
                    icon: 'underway-o',
                    message: `考试时间进度: ${ leftRate()} %`
                });
                var timer = setInterval(() => {
                    second--;
                    if (second) {
                        toast.message = `考试时间进度: ${ leftRate()} %`
                    } else {
                        clearInterval(timer);
                    }
                }, 1000);
            },
            toggleRadio(id) {
                this.$refs.radio.filter(el => el.$attrs.o_id == id)[0].toggle();
            },
            toggleCheckbox(id) {
                this.$refs.checkbox.filter(el => el.$attrs.o_id == id)[0].toggle();
            },
            textareaValidator(val) {
                return [...val.replace(/[^\x00-\xff]/g, '**')].length < 200
            },
            checkFormData() {
                var tm_list = [];
                this.tm_list.forEach(el => {
                    var tm_answer = el.tmType == 'D' ? el.answer.join(',') : el.answer;
                    tm_list.push({
                        tm_id: el.id,
                        tm_answer,
                        tm_name: el.tmName,
                        tm_type: el.tmTypeLabel
                    })
                });
                return ({
                    userName: 'zxc',
                    userId: 1,
                    sjName: this.sj_info.sub_title,
                    sjId: this.sj_info.id,
                    endTime: dateFormat(this.$store.getters.getServerTime(), 'yyyy-MM-dd hh:mm:ss'),
                    startTime: this.startTime,
                    answerList: tm_list
                })
            },
            onFailed(e) {
                if (this.disabledSubmit) {
                    this.$refs.form.resetValidation();
                    return this.onSubmit();
                }
                this.$refs.form.scrollToField(e.errors[0].name);
                this.$eventBus.$emit('triggerScroll', {
                    x: 0,
                    y: this.$root.$el.scrollTop - 50
                }, true);
            },

            async onSubmit() {
                this.$toast.loading('正在提交...');
                var data = this.checkFormData();
                return test_setTestPageAnswer(data).then(r => {
                    this.$toast.success(r.errmsg);
                }).catch(errmsg => {
                    this.$toast.fail(errmsg)
                }).finally(() => {
                    setTimeout(() => {
                        this.$router.go(-1);
                        delStorage({name: 'test_data',type:'session'})
                    }, 1000)
                })
            },
            questionClick() {
                if (this.disabledSubmit) {
                    this.$toast.fail('时间到, 无法修改')
                }
            },
            saveProcessInLocal(){
                var content = {
                    startTime: this.startTime,
                    leftRate: this.leftRate,
                    leftTime: Math.abs(this.leftTime),
                    tm_list: this.tm_list,
                    sj_info: this.sj_info,
                    disabledSubmit: this.disabledSubmit,
                    scrollTop: this.$root.$el.scrollTop
                }
                setStorage({
                    name: 'test_data',
                    content,
                    type: 'session'
                });
            },
            reTest(){
                delStorage({name: 'test_data',type:'session'});
                this.$eventBus.$emit('triggerScroll', { x: 0, y: 0 }, true);
                this.$eventBus.$emit('refreshView');
            }
        },
        async created() {
            var prev_data = getStorage({
                name: 'test_data'
            });
            if (prev_data && this.paper_id == prev_data.sj_info.id) { //如果有保存记录
                this.startTime = prev_data.startTime;
                this.leftRate = prev_data.leftRate
                this.leftTime = prev_data.leftTime;
                this.tm_list = prev_data.tm_list;
                this.sj_info = prev_data.sj_info
                this.disabledSubmit = prev_data.disabledSubmit;
                var scrollTop = prev_data.scrollTop;
                if(scrollTop && scrollTop > 0 ) {
                    await this.$nextTick();
                    this.$eventBus.$emit('triggerScroll', {x:0,y:scrollTop},false);
                }
            } else { //如果没有
                var rs = await test_getTestPage(this.paper_id).then(r => {
                    return r.data
                }).catch(e => {
                    this.$toast.fail('获取试卷失败,请重试!');
                })
                this.$set(this.$data, 'sj_info', {
                    t_time: rs.answerTime,
                    t_fenshu: rs.sjzf,
                    title: rs.sjms,
                    id: rs.id,
                    sub_title: rs.sjName
                });
                this.tm_list = rs.tms.map((el, index) => {
                    el.answer = el.tmType == 'D' ? [] : "";
                    el.focus = false;
                    el.tmTypeLabel = el.tmType == 'X' ? '选择' : el.tmType == 'D' ? '多选' : el.tmType == 'P' ?
                        '判断' : '简答'
                    return el
                });
                this.leftTime = this.sj_info.t_time * 60;
            }
            
            this.clocker = setInterval(() => {
                this.leftTime--;
                this.leftRate = this.leftTime / (this.sj_info.t_time * 60) * 100;
                this.saveProcessInLocal();
                if (this.leftRate <= 0) {
                    this.disabledSubmit = true;
                    this.$toast('时间到, 已无法修改考卷!');
                    clearInterval(this.clocker);
                }
            }, 1000)
        },
        filters: {
            toFixed(val) {
                return Math.abs(val.toFixed(0));
            }
        },
        beforeDestroy() {
            clearInterval(this.clocker);
        }

    }
</script>
<style lang="less">
    .TEST-PAGE {
        scroll-behavior: smooth;

        .block() {
            width: 90%;
            margin: 0 auto;
        }

        .header {
            .sj_title {
                font-size: .7rem;
                padding: 0 15px;
                text-align: justify;
                .flex();
            }

            .sj_info {
                .flex();
                font-size: .5rem;
                color: #333;
                justify-content: space-around;
            }
        }
        /deep/.van-sticky--fixed{
                padding: 0 10px;
                box-shadow: 0px 4px 20px -13px rgba(0, 0, 0, 0.5);
                background: white;
                @media (prefers-color-scheme: dark) {
                background: black;
                }
        }


        .submit {
            .block();
            text-align: center;
            margin: 20px auto 30px;
        }

        .myStyle(@color) {
            background-color: @color;
            border-color: @color;
        }

        .panduan-wrong,
        .panduan-right {
            .van-radio__icon--checked {
                &+.van-radio__label {
                    color: @j_main_color
                }
            }
        }

        .content {
            .question-list {
                .block();
            }
        }

        .van-radio-group,
        .van-checkbox-group {
            width: 100%;
        }

        .question.disabled {
            filter: grayscale(.5);

            .van-cell__value {
                pointer-events: none;
            }
        }

        .form-item>.van-cell {
            flex-direction: column;
            background: transparent;
            box-shadow: 0px 14px 12px 0px #ebebeb;
            margin-bottom: 30px;
            border-radius: 5px;
            border: 1px solid rgba(128, 128, 128, 0.25);
            // padding: 5px 5px;
            // margin-top: 10px;;
            padding: 15px 10px;

            &>.van-cell__title {
                width: 100%;

                p {
                    margin: 0;
                    font-size: 14px;
                    ;
                    margin-bottom: 10px;
                    ;
                }
            }
        }

        .van-field__error-message {
            .flex();
            background: #fbeeee;
            border-radius: 28px;
            color: #d04747;
            padding: 5px 20px;

            &::before {
                content: "\F056";
                position: relative;
                display: inline-block;
                font: normal normal normal 14px/1 "vant-icon";
                font-size: 16px;
                margin-bottom: 4px;
                background: #e64747;
                border-radius: 10px;
                color: white;
                margin-right: 10px;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
            }
        }

        .van-hairline--top-bottom::after,
        .van-hairline-unset--top-bottom::after {
            border-width: 2px 0 0 0;
        }
    }
</style>