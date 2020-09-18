<template>
    <div>
        <div   style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">
            <h2>Constructor Methods</h2>
            <el-table
                    :data="methods_info"
                    stripe
                    style="width: 95%;margin: auto"
            >
                <el-table-column
                        prop="returntype"
                        label="Return Type"
                        header-align="left"
                        align="left"
                        width="360"
                >
                    <template slot-scope="scope">
                        <router-link target="_blank"  style="color: #409EFF;text-decoration:none" :to="{name:'APIInfo', params:{msgKey:scope.row.retype}}">
                            {{scope.row.returntype}}
                        </router-link>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="name"
                        label="Method and Description"
                        header-align="left"
                        align="left"
                >
                    <template slot-scope="scope">
                        <div v-html="scope.row.name"></div>
                    </template>
                </el-table-column>
            </el-table></div>
        <div v-show="methods_info.length > 0"  style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">
            <h2 style="margin: 10px auto;align:left; word-break: break-word;width: 91%;margin-top: 40px;">Constructor Detail</h2>
            <div style="margin: 0px auto;" v-for="(item, index) in methods_info" v-bind:key="index" v-show="item['return_value'].length > 0">
                <div style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">
                    <p class="1" v-html="item['mname']" align="left" style="font-size:15px;margin-left: 45px;margin-bottom: 5px;width: 93%;">{{item['mname']}}</p>
                    <div style="margin: 0px auto;padding: 3px;margin-bottom: 30px" v-show="item['return_value'].length > 0">
                        <el-table
                                :data="item['return_value']"
                                stripe
                                border
                                style="width: 93%;margin: 0px auto;" >
                            <el-table-column
                                    prop="la"
                                    label="Title"
                                    header-align="center"
                                    align="center"
                                    width="132">
                            </el-table-column>

                            <el-table-column
                                    prop="type"
                                    label="Type"
                                    header-align="center"
                                    align="center"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="Name"
                                    header-align="center"
                                    align="center"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="qualified_name"
                                    label="Description">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Constructor",
        props:{
            getquery:String,
            required:true
            },
        data () {
            return {
                methods_info: [],
                select: '1',
                kai:false,
            }
        },

        methods: {
            display_loading() {
                if (this.getquery.trim() === '') {
                    alert('Qualified name can not be null')
                } else {
                    this.isLoading = true
                    this.kai = true
                    axios
                        .post(
                            'http://106.14.239.166/contest/api/constructor/',
                            {qualified_name: this.getquery.trim()})
                        .then(response => {
                            this.dealt_response_data(response.data)
                            this.isLoading = false
                        })
                        .catch(error => {
                            console.log(error)
                            alert("Sorry! We can't find related responses.")
                        })
                }
            },
            dealt_response_data(responseData) {
                this.methods_info = []
                for (let i in responseData['constructor_detail']) {
                    // 对All Methods这一栏的Return Type进行截取只留最后一部分
                    let full_return_type = responseData['constructor_detail'][i]['return_value'][1]['properties']['type']
                    let simple_return_type = full_return_type
                    if (full_return_type.lastIndexOf('.') != -1) {
                        simple_return_type = full_return_type.substring(full_return_type.lastIndexOf('.')+1)
                    }
                    // 对All Methods这一栏的method name进行处理, 重新构造
                    let method_name = responseData['constructor_detail'][i]['declare']
                    let method_name_prefix = method_name.substring(0, method_name.indexOf('('))
                    let para_str = ""
                    for (var index = 0; index < responseData['constructor_detail'][i]['parameters'].length; index++) {
                        let return_type = responseData['constructor_detail'][i]['parameters'][index][1]['properties']['type']
                        let simple_return_type = return_type
                        if (simple_return_type.lastIndexOf('.')!=-1) {
                            simple_return_type = return_type.substring(return_type.lastIndexOf('.')+1)
                        }
                        if (simple_return_type.indexOf(" ")!=-1) {
                            simple_return_type = return_type.substring(0, return_type.indexOf(" "))
                        }
                        if (index == responseData['constructor_detail'][i]['parameters'].length-1) {
                            para_str = para_str + simple_return_type + " " + responseData['constructor_detail'][i]['parameters'][index][1]['properties']['simple_name']
                        }else {
                            para_str = para_str + simple_return_type + " " + responseData['constructor_detail'][i]['parameters'][index][1]['properties']['simple_name'] + ", "
                        }
                    }
                    let final_method_name
                    if (para_str==""){
                        final_method_name = method_name_prefix + "( )"
                    }else {
                        final_method_name = method_name_prefix + "(" + para_str + ")"
                    }
                    //对Method Detail中的Type这一栏的return value进行处理
                    let full_type = responseData['constructor_detail'][i]['return_value'][1]['properties']['type']
                    let simple_type = full_type
                    if (full_type.lastIndexOf('.') != -1) {
                        simple_type = simple_type.substring(simple_type.lastIndexOf('.')+1)
                    }
                    if (simple_type.indexOf(" ")!=-1) {
                        simple_type = simple_type.substring(0, simple_type.indexOf(" "))
                    }
                    let singleMethod = {
                        name: '<b>'+final_method_name+'</b>' + '<br/>' + responseData['constructor_detail'][i]['doc_info']['comment'].replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,''),
                        mname:'<b>'+final_method_name+'</b>'+ '<br/>' + responseData['constructor_detail'][i]['doc_info']['comment'].replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,''),
                        returntype: simple_return_type,
                        retype:full_return_type,
                        return_value: [{
                            qualified_name: responseData['constructor_detail'][i]['return_value'][1]['properties']['description'],
                            type: simple_type,
                            name:'-',
                            la: 'return value'
                        }],
                        parameters: []
                    }
                    for (let j in responseData['constructor_detail'][i]['parameters']) {
                        // 对Method Detail中Type这一栏的parameter进行处理
                        let full_type = responseData['constructor_detail'][i]['parameters'][j][1]['properties']['type']
                        let simple_type = full_type
                        if (full_type.lastIndexOf('.') != -1) {
                            simple_type = full_type.substring(simple_type.lastIndexOf('.')+1)
                        }
                        if (simple_type.indexOf(" ")!=-1) {
                            simple_type = full_type.substring(0, simple_type.indexOf(" "))
                        }

                        singleMethod['return_value'].push({
                            qualified_name: responseData['constructor_detail'][i]['parameters'][j][1]['properties']['description'],
                            type: simple_type,
                            name:responseData['constructor_detail'][i]['parameters'][j][1]['properties']['simple_name'],
                            la: 'parameters'
                        })
                    }
                    this.methods_info.push(singleMethod)
                }
                console.log(this.extend_and_implements_info)
                console.log(this.fields_info)
                console.log(this.methods_info)
            }
        }
    }


</script>

<style scoped>

</style>
