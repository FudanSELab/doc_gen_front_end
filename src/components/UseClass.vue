<template>
    <div>
        <div style="text-align:right">
            <el-button icon="el-icon-refresh-left" @click="display_loading"></el-button>
        </div>

        <div class="forward container" style="max-width: 1200px;">
            <div class="side_bar">
                <ul class="nav_sidebar">
                    <li><a @click="changeHash('#As_parameter')">As Parameter</a></li>
                    <li><a @click="changeHash('#As_Return_value')">As Return Value</a></li>
                    </ul>
            </div>
        </div>
        <div class="As_Return_value">
            <h2>{{use}}</h2>
            <p align="left" style="text-indent: 2em;margin-left: 70px;font-size: 16px;width:800px;">{{introduction}}</p>
        <div style="margin-top: 37px" id="As_parameter" >
            <el-table
                    :data="as_parameter.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    stripe
                    style="width: 90%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;"
            >
                <el-table-column
                        prop="parameter"
                        label="As Parameter"
                        header-align="center"
                        align="center"
                >
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="pagesize"
                    :total="as_parameter.length"
                    layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <div class="As_return_value" id="As_Return_value">
            <el-table
                    :data="as_return_value.slice((currentPage1-1)*pagesize1,currentPage1*pagesize1)"
                    stripe
                    style="width: 90%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;"
                    border

            >
                <el-table-column
                        prop="return_value"
                        label="As Return Value"
                        header-align="center"
                        align="center"
                >
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="pagesize1"
                    :total="as_return_value.length"
                    layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

            </div>

        </div>

</template>

<script>
    import axios from "axios";
    export default {
        name: "UseClass",
        props:{
            use:String,
            required:true
        },
        data() {
            return {
                as_return_value: [],
                as_parameter:[],
                pagesize:10,
                currentPage:1,
                pagesize1:10,
                currentPage1:1,
                introduction:'If you want to know more about the usage of this class, you can browse the following.Under this page, you can see how to use the class. For example, we can take it as a parameter or as a return value.'
            }
        },
        methods: {
            display_loading (){
                axios
                    .post(
                        'http://106.14.239.166/contest/api/parameter_return_value/',
                        {qualified_name: this.use.trim()})
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
                this.as_parameter= []
                this.as_return_value=[]
                for (let i in responseData['paramater']) {
                this.as_parameter.push({
                    parameter: responseData['paramater'][i],
                })

            }
            for (let i in responseData['return_value']) {
                this.as_return_value.push({
                    return_value: responseData['return_value'][i],

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
            handleSizeChange1: function(val) {
                this.pagesize1 = val;
            },
            handleCurrentChange1: function(currentPage1) {
                this.currentPage1 = currentPage1;
            },

        },

    }


</script>

<style scoped>
    @media (min-width: 992px) {
        .side_bar{
            float: left;
        }
        .As_Return_value{
            margin-left: 200px;
            padding: 30px 30px;
            /*box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);*/
            /*border: solid 1px;*/
            /*border-radius: 2px;*/
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
        }
        .nav_sidebar{
            top: 0;
            padding: 20px 20px;
            margin-top: 30px;
            max-height: 90%;
            overflow-y: auto;
            width: 140px;
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
        }

    }
    .nav_sidebar li:active{
        color: #1e88e4;
        font-weight: bold;
        /*color: #1e88e5;*/
    }
    .nav_sidebar li:hover{
        color: #1e88e4;
        boder-bottom: thick dotted #ff0000;
    }
    .nav_sidebar > li:after{
        display: block;
        content: "";
        clear: both;
    }

</style>