<template>
    <div>
        <div>
        <Others></Others>
        </div>

        <div style="text-align:right">
            <el-button icon="el-icon-refresh-left" @click="display_loading"></el-button>
        </div>
        <h2 >Related Terms</h2>
        <br>
        <div v-show="related.length == 0" style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;"><p>{{"sorry,there is no relevant content..."}}</p></div>

        <el-table
                :data="related"
                v-show="related.length>0"
                border
                style="width:92%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;"
                :default-sort = "{prop: 's', order: 'descending'}">
            <el-table-column
                    prop="mrt"
                    label="Most Relevant Terms"
                    header-align="center"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="s"
                    label="Similarity"
                    sortable
                    header-align="center"
                    align="center"
            >
            </el-table-column>
        </el-table>
        </div>
</template>

<script>
    import axios from 'axios'
    import Others from "./Others";
    export default {
        name: "RelatedTerms",
        components: {Others},
        props:{
            gq:String,
            required:true
        },
        data() {
            return {
                related: [],

            }
        },
        methods: {
            display_loading(){
                axios
                    .post(
                        'http://106.14.239.166/contest/api/terminology/',
                        {qualified_name: this.gq})
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
                this.related = [];
                for (let i in responseData) {
                    this.related.push({
                        mrt: responseData[i][0],
                        s:responseData[i][1]


                    })

                }

            }

        }
    }
</script>

<style scoped>

</style>