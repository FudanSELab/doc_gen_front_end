<template>
    <div>
        <a href="http://106.14.239.166:8080/DocGen/index.html#/" style="text-decoration:none;">
            <el-button id="recently_apis" icon="el-icon-s-home" type="primary" style="position: absolute;left: 11px;top: 16px;z-index: 1000;padding: 12px;" plain>Back to Home</el-button>
        </a>
        <h1 @click="display_loading">Sample Code</h1>
        <br>
        <el-table
                :data="samplecode"
                border
                style="width:92%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">
            <el-table-column
                    prop="sc"
                    label="Example"
                    header-align="center"
                    align="center"
            >
            </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div>
            <h1>Related Terms</h1>
            <br>
            <div v-show="related.length == 0" style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;"><p>{{"sorry,there is no relevant content..."}}</p></div>
            <div v-show="related.length >0">
            <el-table
                    :data="related"
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
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
    import RelatedTerms from "./RelatedTerms";
    export default {
        name: "SampleCode",
        components: {RelatedTerms},
        data() {
            return {
                samplecode: [],
                query:'',
                related:[],
            }
        },

        mounted () {
            let url = window.location.href;
            let query = decodeURIComponent(url).split("?query=")[1]
            // console.log(location.search)
            // let url = decodeURIComponent(location.search);
            // let query = url.split("?query=")[1]
            if (query != '' && query != undefined && query != "undefined") {
                this.query = query
                this.display_loading()
                this.displayloading()
            } else {
                this.query = ""
            }
        },
        methods: {
            display_loading(){
                axios
                    .post(
                        'http://106.14.239.166/contest/api/sample_code/',
                        {qualified_name: this.query.trim()})
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
                this.samplecode = [];
                for (let i in responseData['sample_code']) {
                    this.samplecode.push({
                        sc: responseData['sample_code'][i],


                    })

                }

            },
            displayloading(){
                axios
                    .post(
                        'http://106.14.239.166/contest/api/terminology/',
                        {qualified_name:this.query.trim()})
                    .then(response => {
                        this.dealt_response(response.data)
                        this.isLoading = false
                        console.log(response.data)
                        //this.KeyM=response.data.key_methods
                    })
                    .catch(error => {
                        console.log(error)
                        alert("Sorry! We can't find related responses.")
                    })
            },
            dealt_response (responseData) {
                this.related = [];
                for (let i in responseData) {
                    this.related.push({
                        mrt: responseData[i][0],
                        s: responseData[i][1]


                    })

                }
            }
        }
    }
</script>

<style scoped>

</style>