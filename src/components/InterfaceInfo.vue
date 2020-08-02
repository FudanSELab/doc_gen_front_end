<template>
    <div >
        <div style="text-align:right">
            <el-button icon="el-icon-refresh-left" id="clickMe" @click="display_loading"></el-button>
        </div>
         <h1 @click="display_loading">Interface Information</h1>
    <el-table
            :data="tableData"
            stripe
            style="width: 100%">
        <el-table-column
                prop="full_html_description"
                label="full_html_description"
                width="360">
        </el-table-column>
        <el-table-column
                prop="full_description"
                label="full_description"
                width="360">
        </el-table-column>
        <el-table-column
                prop="sentence_description"
                label="sentence_description">
        </el-table-column>
    </el-table>

</div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "InterfaceInfo",
        props:{
            getq:String,
            required:true
        },
        data() {
            return {
                tableData: []
            }
        },

        methods: {
            myFunc: function() {
                setTimeout(function() {
                    // IE
                    debugger
                    if (document.all) {
                        document.getElementById('clickMe').click()
                    } else { // 其它浏览器
                        var e = document.createEvent('MouseEvents')
                        e.initEvent('click', true, true)
                        document.getElementById('clickMe').dispatchEvent(e)
                    }
                }, 3000)
            },
            display_loading (){
                console.log('test')
                console.log(this.getq.trim())
                axios
                    .post(
                        'http://106.14.239.166/contest/api/get_doc/',
                        {qualified_name: this.getq.trim()})
                    .then(response => {
                        this.dealt_response_data(response.data)
                        this.isLoading = false
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error)
                        alert("Sorry! We can't find related responses.")
                    })
            },
            dealt_response_data (responseData) {
                this.tableData= []

                this.tableData.push({
                    full_html_description: responseData['full_html_description'],
                    full_description: responseData['full_description'],
                    sentence_description: responseData['sentence_description']
                })

                console.log(this.tableData)
            }

        },

    }
</script>

<style scoped>
    h1{
        font-size: 20px
    ;
    }
</style>