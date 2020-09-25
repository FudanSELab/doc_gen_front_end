<template>
    <div>
<!--        <a href="http://106.14.239.166:8080/DocGen/index.html#/" style="text-decoration:none;">-->
<!--            <el-button id="recently_apis" icon="el-icon-s-home" type="primary" style="position: absolute;left: 11px;top: 16px;z-index: 1000;padding: 12px;" plain>Back to Home</el-button>-->
<!--        </a>-->
        <h1>{{query}}</h1>

        <div style="position: fixed;top: 12px;right: 8px;">
            <el-tooltip class="item" style=" float: right;width: 140px; padding: 8px 10px;" effect="dark" content="Method Label" placement="right-start">
                <el-button>{{label}}</el-button>
            </el-tooltip>
        </div>

        <div v-show="complete_comment!=''" style="width: 92%;margin: 28px auto 0px;">
            <p style="text-align:left;margin-bottom: 10px">
                {{complete_comment}}
            </p>
        </div>

        <div style="width: 92%;margin: 28px auto 0px;" v-show="functionality!='' || directive!='' || concept_str != ''">
            <div v-show="functionality!=''||directive!=''">
                <p v-show="functionality!=''" style="text-align:left;margin-top: 20px;margin-bottom: 10px">
                    <b>functionality: </b>{{functionality}}
                </p>
                <p v-show="directive!=''" style="text-align:left;margin-top: 20px;margin-bottom: 10px">
                    <b>directive from comments: </b>{{directive}}
                </p>

<!--                <p v-show="return_value_directive != ''" style="text-align:left;margin-top: 20px;margin-bottom: 10px">-->
<!--                    <b>Permitted situation: </b>{{return_value_directive}}-->
<!--                </p>-->
<!--                <p v-show="throws_directive != ''" style="text-align:left;margin-top: 20px;margin-bottom: 10px">-->
<!--                    <b>Prohibited situation: </b>{{throws_directive}}-->
<!--                </p>-->

            </div>
            <div v-show="concept_str != ''" style="text-align: left;">
                <p>
                    <b>relevant concepts: </b>{{concept_str}}
                </p>
            </div>
        </div>

        <div style="width: 96%;margin: 0px auto;" v-show="functionality!='' || directive!='' || concept_str != ''">
            <el-divider></el-divider>
        </div>

        <div style="margin: 10px auto;padding: 3px;" v-show="all_directive.length > 0">
            <el-table
                    :data="all_directive"
                    stripe
                    border
                    max-height="350"
                    style="width: 90%;margin: 0px auto;" >
                <el-table-column
                        prop="source"
                        label="Type"
                        header-align="center"
                        align="center"
                        width="180">
                </el-table-column>
                <el-table-column
                        header-align="center"
                        align="center"
                        prop="directive"
                        label="Directive from codes">
                </el-table-column>
            </el-table>
        </div>

        <div style="margin: 25px auto;padding: 3px;" v-show="return_value.length > 0">
            <el-table
                    :data="return_value"
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
                        width="180">
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
                        prop="description"
                        label="Description">
                </el-table-column>
            </el-table>
        </div>

        <div style="width: 96%;margin: 0px auto;">
            <el-divider></el-divider>
        </div>

        <h2 style="margin: 10px auto 0px;" @click="display_loading">usage example</h2>
        <br>
        <el-table
                :data="samplecode"
                border
                empty-text="sorry,there is no relevant content..."
                style="width:92%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">
            <el-table-column
                    prop="sc"
                    label="Example"
                    header-align="center"
                    align="center"
            >
                <template slot-scope="scope">
                    <pre style="text-align: left;">
                        {{scope.row.sc}}
                    </pre>
                </template>
            </el-table-column>
        </el-table>

        <div style="width: 96%;margin: 0px auto;">
            <el-divider></el-divider>
        </div>

        <div>
            <h2>relevant concepts</h2>
            <br>
            <div v-show="related.length == 0" style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;"><p>{{"sorry,there is no relevant content..."}}</p></div>
            <div v-show="related.length >0">
            <el-table
                    :data="related"
                    border
                    style="width:92%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;"
                    empty-text="have no data"
                    :default-sort = "{prop: 's', order: 'descending'}">
                <el-table-column
                        prop="mrt"
                        label="Most Relevant Concepts"
                        header-align="center"
                        align="center"
                >
                </el-table-column>
<!--                <el-table-column-->
<!--                        prop="s"-->
<!--                        label="Similarity"-->
<!--                        sortable-->
<!--                        header-align="center"-->
<!--                        align="center">-->
<!--                </el-table-column>-->
            </el-table>
        </div>
        </div>

        <div v-show="relate_api.length > 0" style="width: 96%;margin: 0px auto;">
            <el-divider></el-divider>
        </div>

        <div id="relate_api" v-show="relate_api.length > 0" style="padding: 10px;width: 82%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">
            <el-table
                    border
                    :data="relate_api"
                    style="width: 100%;">
                <el-table-column
                        prop="qualified_name"
                        label="Relevant Methods"
                        header-align="center"
                        align="center">
                    <template slot-scope="scope">
                        <router-link target="_blank" style="color: #409EFF;text-decoration:none"  :to="{name:'SampleCode',query:{query:scope.row.qualified_name}}">
                            <div>{{scope.row.qualified_name}}</div>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
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
                directive: "",
                concept_str: "",
                concept: [],
                functionality: "",
                return_value: [],
                label: "",
                relate_api: [],
                return_value_directive: "",
                throws_directive: "",
                all_directive: [],
                complete_comment: "",
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
                // this.displayloading()
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
                        if (response.data == "wrong qualified name") {
                            alert(response.data)
                        }
                        //this.KeyM=response.data.key_methods
                    })
                    .catch(error => {
                        console.log(error)
                        alert("Sorry! We can't find related responses.")
                    })

                axios
                    .post(
                        'http://106.14.239.166/contest/api/method_structure/',
                        {qualified_name: this.query.trim()})
                    .then(response => {
                        this.isLoading = false
                        console.log(response.data)
                        this.dealt_method_detail(response.data[0])
                        //this.KeyM=response.data.key_methods
                    })
                    .catch(error => {
                        console.log(error)
                        // alert("Sorry! We can't find related responses.")
                    })

                axios
                    .post(
                        'http://106.14.239.166/contest/api/related_api/',
                        {qualified_name: this.query.trim()})
                    .then(response => {
                        this.isLoading = false
                        console.log(response.data);
                        this.relate_api = []
                        for (let i = 0; i < response.data["related_api_simplified"].length; i++) {
                            this.relate_api.push({
                                "qualified_name": response.data["related_api"][i],
                                "simple_name": response.data["related_api_simplified"][i]
                            })
                        }

                        console.log(this.relate_api)
                    })
                    .catch(error => {
                        console.log(error)
                        alert("Sorry! ")
                    })
            },
            dealt_method_detail (responseData) {
                this.label = responseData['label']
                let directive1;
                if(responseData['directive'].length>0){

                    directive1=responseData['directive']
                }else{
                    directive1=''
                }
                let functionality1;
                if(responseData['functionality'].length>0){
                    functionality1=responseData['functionality']
                }else{
                    functionality1=''
                }
                this.directive = directive1.replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,'')
                this.functionality = functionality1.replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,'')

                this.concept = responseData['concepts']
                this.concept_str = responseData['concepts'].join(", ")
                this.displayloading()

                this.return_value_directive = responseData['return_value_directive'].join(". ")
                this.throws_directive = responseData['throws_directive'].join(". ")

                this.complete_comment = responseData['doc_info']['comment'].replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,'').replace(/<noun>/g,'').replace(/<\/noun>/g,'')

                for (let j in responseData['return_value_directive']) {
                    this.all_directive.push({
                        "source": "Permitted situation",
                        "directive": responseData['return_value_directive'][j]
                    })
                }
                for (let j in responseData['throws_directive']) {
                    this.all_directive.push({
                        "source": "Prohibited situation",
                        "directive": responseData['throws_directive'][j]
                    })
                }

                let full_type = responseData['return_value'][1]['properties']['type']
                let simple_type = full_type
                if (full_type.lastIndexOf('.') != -1) {
                    simple_type = simple_type.substring(simple_type.lastIndexOf('.')+1)
                }
                if (simple_type.indexOf(" ")!=-1) {
                    simple_type = simple_type.substring(0, simple_type.indexOf(" "))
                }
                this.return_value = [{
                    description: responseData['return_value'][1]['properties']['description'],
                    type: simple_type,
                    name:'-',
                    la: 'return value'
                }]

                for (let j in responseData['parameters']) {
                    // 对Method Detail中Type这一栏的parameter进行处理
                    let full_type = responseData['parameters'][j][1]['properties']['type']
                    let simple_type = full_type
                    if (full_type.lastIndexOf('.') != -1) {
                        simple_type = full_type.substring(simple_type.lastIndexOf('.')+1)
                    }
                    if (simple_type.indexOf(" ")!=-1) {
                        simple_type = full_type.substring(0, simple_type.indexOf(" "))
                    }
                    this.return_value.push({
                        description: responseData['parameters'][j][1]['properties']['description'],
                        type: simple_type,
                        name:responseData['parameters'][j][1]['properties']['simple_name'],
                        la: 'parameters'
                    })
                }
                for (let j in responseData['exception_info']) {
                    this.return_value.push({
                        description : responseData['exception_info'][j]['description'],
                        type:responseData['exception_info'][j]['exception_name'],
                        name:'-',
                        la: 'throw exception'
                    })
                }
                console.log(this.return_value)
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
                let concept_list = []
                if (this.concept.length > 0) {
                    this.concept.forEach(ele => {
                        this.related.push({
                            mrt: ele,
                            s: 1
                        })
                    })
                }
                responseData.sort((a, b) => {
                    return b[1] - a[1]
                })
                for (let i in responseData) {
                    this.related.push({
                        mrt: responseData[i][0],
                        s: responseData[i][1]
                    })
                    concept_list.push(responseData[i][0])
                }
                if (this.concept_str == '') {
                    this.concept_str = concept_list.join(", ")
                } else if (concept_list.length > 0) {
                    this.concept_str += ", " + concept_list.join(", ")
                }
            }
        }
    }
</script>

<style scoped>

</style>
