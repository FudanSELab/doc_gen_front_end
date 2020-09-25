<template>
    <div>
        <div style="text-align:right">
            <el-button icon="el-icon-refresh-left" @click="display_loading"></el-button>
        </div><h1>Characteristic/Concepts Classification</h1>
        <div>
        <el-table
                :data="category"
                stripe
                style="width: 60%;margin: auto"
                empty-text="have no data"
                >
            <el-table-column
                prop="relation"
                label="Relation"
                header-align="center"
                align="center"

        >
        </el-table-column>
            <el-table-column
                    prop="name"
                    label="Name"
                    header-align="center"
                    align="center"

                    >
            </el-table-column>

        </el-table>
            <h2>Characteristic</h2>
            <div v-show="characteristic.length == 0" style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;"><h4>{{"sorry,there is no relevant content..."}}</h4></div>
            <el-table
                    v-show="characteristic.length > 0"
                    :data="characteristic"
                    stripe
                    style="width: 80%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;"
                    border
                    empty-text="have no data"
            >
                <el-table-column
                        prop="name1"
                        label="name"
                        header-align="center"
                        align="center"
                >
                </el-table-column>
<!--                <el-table-column-->
<!--                        prop="relation1"-->
<!--                        label="relation"-->
<!--                        header-align="center"-->
<!--                        align="center"-->
<!--                >-->
<!--                </el-table-column>-->
            </el-table>
        </div>
    </div>

</template>

<script>
    import axios from "axios";
    export default {
        name: "Characteristic",
        props:{
            gquery:String,
            required:true
        },
        data() {
            return {
                category: [],
                characteristic:[]
            }
        },
        methods: {
            display_loading() {
                axios
                    .post(
                        'http://106.14.239.166/contest/api/api_knowledge/',
                        {qualified_name: this.gquery.trim()})
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
            dealt_response_data(responseData) {
                this.category = []
                this.characteristic=[]
                for (let i in responseData['category']) {
                    this.category.push({
                        name: responseData['category'][i]['name'],
                        relation: responseData['category'][i]['relation']+' :',
                    })

                    console.log(this.category)
                }
                for (let i in responseData['characteristic']) {
                    this.characteristic.push({
                        name1: responseData['characteristic'][i]['name'],
                        relation1: responseData['characteristic'][i]['relation']
                    })
                }
            }
        }
    }
</script>

<style scoped>
    h1{
        font-size: 20px
    ;
    }
    h2{
        font-size: 20px
    ;
        margin-top: 40px;
    }
</style>
