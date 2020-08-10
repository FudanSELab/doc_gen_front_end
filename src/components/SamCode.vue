<template>
    <div>
        <div style="text-align:right">
            <el-button icon="el-icon-refresh-left" @click="display_loading"></el-button>
        </div>
    <h2 @click="display_loading">Sample Code</h2>
    <br>
    <el-table
            :data="samplecode.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border
            style="width:90%; margin: 10px auto 30px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); border-radius: 10px;">
        <el-table-column
                prop="sc"
                label="Example"
                header-align="center"
                align="left"
        >
            <template slot-scope="scope">
                <div v-html="scope.row.sc"></div>
            </template>
        </el-table-column>
    </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 3, 4, 5]"
            :page-size="pagesize"
            :total="samplecode.length"
            layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "SamCode",
        props:{
            gqu:String,
            required:true
        },
        data() {
            return {
                samplecode: [],
                pagesize:1,
                currentPage:1,

            }
        },
        methods: {
            display_loading() {
                axios
                    .post(
                        'http://106.14.239.166/contest/api/sample_code/',
                        {qualified_name: this.gqu})
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
            dealt_response_data(responseData) {
                this.samplecode = [];
                for (let i in responseData['sample_code']) {
                    let code = "<pre style='padding-left: 50%'>" + responseData['sample_code'][i] + "</pre>";
                    this.samplecode.push({
                        sc: code,

                    })

                }

            },
            changeHash (idName) {
                document.querySelector(idName).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
            },
            handleSizeChange: function(val) {
                this.pagesize = val;
            },
            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
            },
        }
    }
</script>

<style scoped>
    .el-table .cell {
        　　white-space: pre-line;
    }

</style>