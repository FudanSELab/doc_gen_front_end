<template>
    <div>
        <div style="text-align:right">
            <el-button icon="el-icon-refresh-left" @click="display_loading"></el-button>
        </div>
        <el-table
                :data="KeyM"
                border
                empty-text="loading..."
                style="width: 92%;margin: 3px auto;">
            <el-table-column
                    prop="keym"
                    label="Key Methods"
                    header-align="center"
                    align="center"
            >
                <template slot-scope="scope">
                    <router-link target="_blank" style="color: #409EFF;text-decoration:none"  :to="{name:'SampleCode',query:{query:scope.row.keym}}">
                        {{scope.row.keym}}
                    </router-link>
                        <template  v-show="scope.row.sample_code.length>0">
                            <el-popover
                                    placement="top-start"
                                    title="Sample Code "
                                    width="100%"
                                    trigger="hover">
                                <pre>{{scope.row.sample_code}}</pre>
                                <el-button type="text" style="float: right;color: #2c3e50;" slot="reference">Sample Code </el-button>
                            </el-popover>
                        </template>


<!--                    <div v-show="scope.row.sample_code.length>0">-->
<!--                    <el-collapse accordion :center="true" style="width:93%;margin: 0px auto;">-->
<!--                        <el-collapse-item >-->
<!--                            <template slot="title">-->
<!--                                Sample Code-->
<!--                            </template>-->
<!--                            <div><pre style="font-family: ‘Courier New’, Courier, monospace;">{{scope.row.sample_code}}</pre></div>-->
<!--                        </el-collapse-item>-->
<!--                    </el-collapse>-->
<!--                    </div>-->
<!--                    <template>-->

<!--&lt;!&ndash;                    <el-button type="text" @click="dialogVisible = true">打开嵌套表格的 Dialog</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-dialog modal="false" destroy-on-close="true" title="收货地址" :visible.sync="dialogVisible">&ndash;&gt;-->
<!--&lt;!&ndash;                        {{scope.row.keym}}&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-dialog>&ndash;&gt;-->

<!--                    &lt;!&ndash;                    <el-button type="text" style="float: right" @click="dialogVisible = true">Sample Code</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-dialog&ndash;&gt;-->
<!--&lt;!&ndash;                            title="Sample Code"&ndash;&gt;-->
<!--&lt;!&ndash;                            :visible.sync="dialogVisible"&ndash;&gt;-->
<!--&lt;!&ndash;                            width="90%"&ndash;&gt;-->
<!--&lt;!&ndash;                            :before-close="handleClose">&ndash;&gt;-->
<!--&lt;!&ndash;                       <span> <pre>{{KeyM['sample_code']}}</pre></span>&ndash;&gt;-->
<!--&lt;!&ndash;                        <span slot="footer" class="dialog-footer">&ndash;&gt;-->
<!--&lt;!&ndash;    <el-button @click="dialogVisible = false">取 消</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;            </span>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-dialog>&ndash;&gt;-->
<!--                    </template>-->
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "KeyMethods",
        props:{
            getquery:String,
            required:true
        },
        data() {
            return {
                KeyM: [],
                method:[],
                dialogVisible: false
            }
        },

        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {

                        done();
                    })
                    .catch(_ => {});
            },
            display_loading (){
                axios
                    .post(
                        'http://106.14.239.166/contest/api/key_methods/',
                        {qualified_name: this.getquery})
                    .then(response => {
                        this.dealt_response_data(response.data)
                        this.isLoading = false
                        console.log(response.data)
                        //this.KeyM=response.data.key_methods
                    })
                    .catch(error => {
                        console.log(error)
                        alert("Sorry! We can't find related responses.")
                    })

            },
            dealt_response_data (responseData) {
                this.KeyM = [];
                this.method=[];
                for (let i in responseData) {
                    this.KeyM.push({
                        keym:responseData[i]['qualified_name'],
                        sample_code:responseData[i]['sample_code']
                    })

                }

            }

        }
    }
</script>

<style scoped>

</style>
