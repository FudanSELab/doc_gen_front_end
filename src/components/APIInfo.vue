<template>
    <div>
<!--        <a href="http://106.14.239.166:8080/DocGen/index.html#/" style="text-decoration:none;">-->
<!--            <el-button id="recently_apis" icon="el-icon-s-home" type="primary" style="position: absolute;left: 11px;top: 16px;z-index: 10000;padding: 12px;" plain>Back to Home</el-button>-->
<!--        </a>-->
        <h2 style="margin-bottom: 30px">{{query}}</h2>
        <div style="width: 92%;margin: 0px auto" v-show="!isLoading">

            <div v-show="tableData.length > 0" style="padding: 10px;width: 82%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">
                <el-tooltip v-for="(item, index) in class_label" :key="index" style="float: right;width: 100px; padding: 8px 10px;" effect="dark" content="Class Label"  placement="top-end">
                    <el-button>{{item}}</el-button>
                </el-tooltip>
<!--                <div v-show="class_info.length > 0 && class_info[0]['concepts'].length > 0" style="text-align: center;margin:0px auto;">-->
<!--                    <h3 style="text-align: center;">Concept: {{class_info[0]['concepts_str']}}</h3>-->
<!--                </div>-->
                <el-table
                        :data="tableData"
                        style="width: 96%;margin: auto">
                    <el-table-column
                            prop="full_description"
                            label="Class Description"
                            header-align="center"
                            style="text-indent: 2em;"
                    >
                        <template slot="header" slot-scope="scope">

                            <div style="text-align: center">Class Description</div>
                            <!--              <el-tooltip v-for="(item, index) in class_label" :key="index" style="float: right;width: 100px; padding: 8px 10px;" effect="dark" content="Class Label"  placement="top-end">-->
                            <!--                <el-button>{{item}}</el-button>-->
                            <!--              </el-tooltip>-->
                        </template>
                    </el-table-column>
                </el-table>
                <!--        <el-table-->
                <!--                border-->
                <!--                :data="methods_info"-->
                <!--                style="width: 100%;">-->
                <!--          <el-table-column-->
                <!--                  prop="sample_code"-->
                <!--                  label="Relation"-->
                <!--                  header-align="center"-->
                <!--                  align="center"-->
                <!--                  >-->
                <!--          </el-table-column>-->

                <!--        </el-table>-->
                <el-table
                        :data="class_info"
                        v-show="class_info.length > 0 && class_info[0]['functionality'] != ''"
                        style="margin: 26px auto;width: 96%">
                    <el-table-column
                            prop="functionality"
                            label="Functionality"
                            header-align="center"
                            align="center"
                            style="text-indent: 2em;"
                    >
                    </el-table-column>
                </el-table>
                <el-table
                        :data="class_info"
                        v-show="class_info.length > 0 && class_info[0]['directive'] != ''"
                        style="margin: 26px auto; width: 96%">
                    <el-table-column
                            prop="directive"
                            label="Directive"
                            header-align="center"
                            align="center"
                            style="text-indent: 2em;"
                    >
                    </el-table-column>
                </el-table>
                <div v-show="class_info.length > 0 && class_info[0]['concepts'].length > 0" style="text-align: center;margin:0px auto;">
                    <h4 style="text-align: center;"><b>relevant concepts: </b>{{class_info[0]['concepts_str']}}</h4>
                </div>
            </div>

            <div id="extend_and_implements" v-show="extend_and_implements_info.length > 0" style="padding: 10px;width: 90%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">
                <el-table
                        border
                        :data="extend_and_implements_info"
                        style="width: 100%;">
                    <el-table-column
                            prop="relation"
                            label="Relation"
                            header-align="center"
                            align="center"
                            width="132">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            header-align="center"
                            align="center"
                            label="Qualified Name">
                    </el-table-column>
                </el-table>
            </div>

            <div id="relate_api" v-show="relate_api.length > 0" style="padding: 10px;width: 82%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">
                <el-table
                        border
                        :data="relate_api"
                        style="width: 100%;">
                    <el-table-column
                            prop="qualified_name"
                            label="Relevant Classes"
                            header-align="center"
                            align="center">
                        <template slot-scope="scope">
                            <router-link target="_blank" style="color: #409EFF;text-decoration:none"  :to="{name:'APIInfo',params:{msgKey:scope.row.qualified_name}}">
                                <div>{{scope.row.qualified_name}}</div>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

<!--            <div id="fields" v-show="fields_info.length > 0" style="padding: 10px;width: 90%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">-->
<!--                <el-table-->
<!--                        :data="fields_info"-->
<!--                        border-->
<!--                        style="width: 100%;">-->
<!--                    <el-table-column-->
<!--                            prop="type"-->
<!--                            label="Type"-->
<!--                            header-align="center"-->
<!--                            align="center"-->
<!--                            width="132">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            prop="qualified_name"-->
<!--                            header-align="center"-->
<!--                            align="center"-->
<!--                            label="Field Name"-->
<!--                            width="320">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            prop="description"-->
<!--                            header-align="center"-->
<!--                            align="left"-->
<!--                            label="Description"-->
<!--                    >-->
<!--                    </el-table-column>-->
<!--                </el-table>-->
<!--            </div>-->

            <el-tabs  id="methods" v-model="activeName" v-show="kai" style="padding: 0px 0px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;" type="border-card"  @tab-click="call_son_component_method">
<!--                <el-tab-pane name="Method">-->
<!--                    <span slot="label">Methods</span>-->
<!--                    <div v-show="methods_info.length == 0" style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;"><h4>{{"sorry,we can't find the methods..."}}</h4>-->
<!--                    </div>-->
<!--                    <div v-show="methods_info.length > 0"  style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">-->
<!--                        <h2>All Methods</h2>-->
<!--                        <el-table-->
<!--                                :data="methods_info"-->
<!--                                stripe-->
<!--                                style="width: 95%;margin: auto"-->
<!--                        >-->
<!--                            <el-table-column-->
<!--                                    prop="returntype"-->
<!--                                    label="Return Type"-->
<!--                                    header-align="left"-->
<!--                                    align="left"-->
<!--                                    width="360"-->
<!--                            >-->
<!--                                <template slot-scope="scope">-->
<!--                                    <router-link tag="a" target="_blank" style="color: #2c3e50;text-decoration:none" :to="{name:'Info',params:{msgKey:scope.row.retype}}">{{scope.row.returntype}}-->
<!--                                    </router-link>-->
<!--                                </template>-->
<!--                            </el-table-column>-->

<!--                            <el-table-column-->
<!--                                    prop="name"-->
<!--                                    label="Method and Description"-->
<!--                                    header-align="left"-->
<!--                                    align="left"-->
<!--                            >-->
<!--                                <template slot-scope="scope">-->
<!--                                    <div v-html="scope.row.name"></div>-->
<!--                                </template>-->
<!--                            </el-table-column>-->
<!--                        </el-table></div>-->
<!--                    <div v-show="methods_info.length > 0"  style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">-->
<!--                        <h2 style="margin: 10px auto;align:left; word-break: break-word;width: 91%;margin-top: 40px;">Method Detail</h2>-->
<!--                        <div style="margin: 0px auto;" v-for="(item, index) in methods_info" v-bind:key="index" v-show="item['return_value'].length > 0">-->
<!--                            <div style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">-->
<!--                                <p class="1" v-html="item['mname']" align="left" style="font-size:15px;margin-left: 45px;margin-bottom: 5px;width: 93%;">{{item['mname']}}</p>-->
<!--                                <div style="margin: 0px auto;padding: 3px;margin-bottom: 30px" v-show="item['return_value'].length > 0">-->
<!--                                    <el-table-->
<!--                                            :data="item['return_value']"-->
<!--                                            stripe-->
<!--                                            border-->
<!--                                            style="width: 93%;margin: 0px auto;" >-->
<!--                                        <el-table-column-->
<!--                                                prop="la"-->
<!--                                                label="Title"-->
<!--                                                header-align="center"-->
<!--                                                align="center"-->
<!--                                                width="132">-->
<!--                                        </el-table-column>-->

<!--                                        <el-table-column-->
<!--                                                prop="type"-->
<!--                                                label="Type"-->
<!--                                                header-align="center"-->
<!--                                                align="center"-->
<!--                                                width="160">-->
<!--                                        </el-table-column>-->
<!--                                        <el-table-column-->
<!--                                                prop="name"-->
<!--                                                label="Name"-->
<!--                                                header-align="center"-->
<!--                                                align="center"-->
<!--                                                width="160">-->
<!--                                        </el-table-column>-->
<!--                                        <el-table-column-->
<!--                                                header-align="center"-->
<!--                                                align="center"-->
<!--                                                prop="qualified_name"-->
<!--                                                label="Description">-->
<!--                                        </el-table-column>-->
<!--                                    </el-table>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </el-tab-pane>-->
                <el-tab-pane name="Method">
                    <span slot="label">Methods</span>
                    <div v-show="methods_info.length == 0" style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;"><h4>{{"loading..."}}</h4>
                    </div>
                    <div v-show="methods_info.length > 0"  style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">
                        <h2>All Methods</h2>
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
                                    {{scope.row.returntype}}
                                    <!--                  <router-link target="_blank" style="color: #2c3e50;text-decoration:none"  :to="{name:'APIInfo',params:{msgKey:scope.row.retype}}">{{scope.row.returntype}}-->
                                    <!--                  </router-link>-->
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="name"
                                    label="Method and Description"
                                    header-align="left"
                                    align="left"
                            >
                                <template slot-scope="scope">
                                    <router-link target="_blank" style="color: #2c3e50;text-decoration:none"  :to="{name:'SampleCode',query:{query:scope.row.qualified_name}}">
                                        <div v-html="scope.row.name"></div>
                                    </router-link>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-show="methods_info.length > 0"  style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">
                        <h2 style="margin: 10px auto;align:left; word-break: break-word;width: 91%;margin-top: 40px;">Method Detail</h2>
                        <div style="margin: 0px auto;" v-for="(item, index) in methods_info" v-bind:key="index" v-show="item['return_value'].length > 0">
                            <div style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">
                                <div style="width: 93%;margin: 5px auto 25px;">
                                    <el-tooltip class="item" style=" float: right;width: 140px; padding: 8px 10px;" effect="dark" content="Method Label" placement="right-start">
                                        <el-button>{{item['label']}}</el-button>
                                    </el-tooltip>

                                    <router-link target="_blank" style="color: #2c3e50;text-decoration:none"  :to="{name:'SampleCode',query:{query:item.qualified_name}}">
                                        <p class="1" v-html="item['simple_name']" align="left" style="font-size:16px;margin-bottom: 5px;width: 93%;color: #409EFF;">{{item['simple_name']}}</p>
                                    </router-link>

                                    <div v-show="item['complete_comment']!=''">
                                        <p style="text-align:left;margin-bottom: 10px">
                                            {{item['complete_comment']}}
                                        </p>
                                    </div>

                                    <div v-show="item['functionality']!='null'||item['directive']!='null'">
                                        <p v-show="item['functionality']!='null'" style="text-align:left;margin-top: 20px;margin-bottom: 10px">
                                            <b>functionality: </b>{{item['functionality']}}
                                        </p>
                                        <p v-show="item['directive']!='null'" style="text-align:left;margin-top: 20px;margin-bottom: 10px">
                                            <b>directive from comments: </b>{{item['directive']}}
                                        </p>

<!--                                        <p v-show="item['return_value_directive']!=''" style="text-align:left;margin-top: 20px;margin-bottom: 10px">-->
<!--                                            <b>Permitted situation:</b>{{item['return_value_directive']}}-->
<!--                                        </p>-->
<!--                                        <p v-show="item['throws_directive']!=''" style="text-align:left;margin-top: 20px;margin-bottom: 10px">-->
<!--                                            <b>Prohibited situation:</b>{{item['throws_directive']}}-->
<!--                                        </p>-->

                                    </div>

                                    <!--                  这是显示概念的地方-->
<!--                                    <div v-show="item['concepts'].length > 0" style="text-align: left;">-->
<!--                                        <p>-->
<!--                                            <b>Concepts: </b>{{item['concepts_str']}}-->
<!--                                        </p>-->
<!--                                    </div>-->
                                </div>

                                <div style="margin: 10px auto;padding: 3px;" v-show="item['all_directive'].length > 0">
                                    <el-table
                                            :data="item['all_directive']"
                                            stripe
                                            border
                                            max-height="300"
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

                                <div style="margin: 10px auto;padding: 3px;" v-show="item['return_value'].length > 0">
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

                                    <el-collapse accordion style="width:93%;margin: 0px auto;">
                                        <el-collapse-item title="Sample Code">
                                            <div style="overflow-x:scroll;text-align: left"><pre style="font-family: ‘Courier New’, Courier, monospace;">{{item['sample_code']}}</pre></div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Fields" name="Field"><Field ref="Field" :fquery="query"></Field></el-tab-pane>
                <el-tab-pane label="Constructors" name="Constructor"><Constructor ref="Constructor" :getquery="query"></Constructor></el-tab-pane>
                <el-tab-pane label="Key Methods" name="KeyMethods"><KeyMethods ref="KeyMethods" :getquery="query"></KeyMethods></el-tab-pane>
                <el-tab-pane label="Usage Examples" name="SamCode"><SamCode ref="SamCode" :gqu="query"></SamCode></el-tab-pane>
                <el-tab-pane label="Characteristic/Concepts Classification" name="Characteristic"><Characteristic ref="Characteristic" :gquery="query"></Characteristic></el-tab-pane>
                <el-tab-pane label="Usage Scenario" name="UseClass"><UseClass ref="UseClass" :use="query"></UseClass></el-tab-pane>
<!--                <el-tab-pane label="Others" name="RelatedTerms"><RelatedTerms ref="RelatedTerms" :gq="query"></RelatedTerms></el-tab-pane>-->
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import KeyMethods from "./KeyMethods";
    import InterfaceInfo from "./ClassInfo";
    import Characteristic from "./Characteristic";
    import RelatedTerms from "./RelatedTerms";
    import SamCode from "./SamCode";
    import Others from "./Others";
    import UseClass from "./UseClass";
    import Constructor from "./Constructor";
    import Field from "./Field";

    export default {
        name: 'APIInfo',
        components: { Constructor,Field, UseClass, Others, SamCode, RelatedTerms, Characteristic,InterfaceInfo, KeyMethods},
        data () {
            return {
                query: "",
                isLoading: false,
                extend_and_implements_info: [],
                fields_info: [],
                methods_info: [],
                tableData: [],
                select: '1',
                kai:false,
                label: "Class Search",
                activeName: "Method",
                relate_api: [],
                class_info:[{
                    concepts: [],
                    concepts_str: ""
                }],
                class_label:[],
            }
        },
        mounted () {
            console.log(this.$route.params.msgKey)
            if(this.$route.params.msg==null){
                this.query = this.$route.params.msgKey
            }else{
                this.query = this.$route.params.msg
            }
            console.log(this.query)
            this.display_loading()
        },
        methods: {
            call_son_component_method (tab, event) {
                console.log(this.activeName)
                if (this.activeName != "Method") {
                    this.$refs[this.activeName].display_loading()
                }
            },
            display_loading() {
                if (this.query == undefined || this.query == null || this.query.trim() === '') {
                    alert('Qualified name can not be null')
                } else {
                    this.isLoading = true
                    this.kai = true
                    axios
                        .post(
                            'http://106.14.239.166/contest/api/api_structure/',
                            {qualified_name: this.query.trim()})
                        .then(response => {
                            this.dealt_response_data(response.data)
                            this.isLoading = false
                        })
                        .catch(error => {
                            console.log(error)
                            alert("Sorry! We can't find related responses.")
                        }),
                        axios
                            .post(
                                'http://106.14.239.166/contest/api/get_doc/',
                                {qualified_name: this.query.trim()})
                            .then(response => {
                                this.info_response_data(response.data)
                                this.isLoading = false
                                console.log(response.data);
                            })
                            .catch(error => {
                                this.info_data(response.data)
                                console.log(error)
                                alert("Sorry! ")
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
                }
            },
            info_response_data (responseData) {
                this.tableData= []
                if (responseData['full_description'] != "") {
                    this.tableData.push({
                        full_html_description: responseData['full_html_description'],
                        full_description: responseData['full_description'].replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,'').replace(/<noun>/g,'').replace(/<\/noun>/g,''),
                        sentence_description: responseData['sentence_description']
                    })
                }
                console.log(this.tableData)
            },
            get_term(){
                axios
                    .post(
                        'http://106.14.239.166/contest/api/terminology/',
                        {qualified_name:this.query.trim()})
                    .then(response => {
                        for (let i in response.data) {
                            this.class_info[0]['concepts'].push(response.data[i][0])
                        }
                        this.class_info[0]['concepts_str'] = this.class_info[0]['concepts'].join(", ")
                    })
                    .catch(error => {
                        console.log(error)
                        alert("Sorry! We can't find related responses.")
                    })
            },
            dealt_response_data(responseData) {
                this.extend_and_implements_info = []
                this.fields_info = []
                this.class_label=[]
                this.methods_info = []
                this.class_directive=[]

                this.class_info=[]
                this.class_info.push({
                    functionality:responseData['functionality'].replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,'').replace(/<noun>/g,'').replace(/<\/noun>/g,''),
                    directive:responseData['directive'].replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,'').replace(/<noun>/g,'').replace(/<\/noun>/g,''),
                    concepts: responseData['concepts'],
                    concepts_str: responseData['concepts'].join(", ")
                })
                this.get_term()
                // console.log(this.class_info)

                this.class_label.push(responseData['label']),
                    this.extend_and_implements_info.push(responseData['extends'])

                for (let i in responseData['fields']) {
                    let qname = responseData['fields'][i][1]['properties']['qualified_name']
                    qname = qname.substring(qname.lastIndexOf('.')+1)
                    this.fields_info.push({
                        type: responseData['fields'][i][1]['properties']['type'],
                        qualified_name: qname,
                        description: responseData['fields'][i][1]['properties']['full_description'].replace(/[*/]/g, '')
                    })
                }
                for (let i in responseData['implements']) {
                    this.extend_and_implements_info.push({
                        name: responseData['implements'][i]['name'],
                        relation: responseData['implements'][i]['relation']
                    })
                }
                for (let i in responseData['methods']) {
                    // this.methods_info.push({
                    //   sample_code: responseData['methods'][i]['sample_code'],
                    // })
                    // this.methods_info.push({
                    //   sample_code: responseData['method'][i]['declare']
                    // })
                    // 对All Methods这一栏的Return Type进行截取只留最后一部分
                    let full_return_type = responseData['methods'][i]['return_value'][1]['properties']['type']
                    let simple_return_type = full_return_type
                    if (full_return_type.lastIndexOf('.') != -1) {
                        simple_return_type = full_return_type.substring(full_return_type.lastIndexOf('.')+1)
                    }
                    // 对All Methods这一栏的method name进行处理, 重新构造
                    let method_name = responseData['methods'][i]['declare']
                    let method_name_prefix = method_name.substring(0, method_name.indexOf('('))
                    let para_str = ""
                    for (var index = 0; index < responseData['methods'][i]['parameters'].length; index++) {
                        let return_type = responseData['methods'][i]['parameters'][index][1]['properties']['type']
                        let simple_return_type = return_type
                        if (simple_return_type.lastIndexOf('.')!=-1) {
                            simple_return_type = return_type.substring(return_type.lastIndexOf('.')+1)
                        }
                        if (simple_return_type.indexOf(" ")!=-1) {
                            simple_return_type = return_type.substring(0, return_type.indexOf(" "))
                        }
                        if (index == responseData['methods'][i]['parameters'].length-1) {
                            para_str = para_str + simple_return_type + " " + responseData['methods'][i]['parameters'][index][1]['properties']['simple_name']
                        }else {
                            para_str = para_str + simple_return_type + " " + responseData['methods'][i]['parameters'][index][1]['properties']['simple_name'] + ", "
                        }
                    }
                    let final_method_name
                    if (para_str==""){
                        final_method_name = method_name_prefix + "( )"
                    }else {
                        final_method_name = method_name_prefix + "(" + para_str + ")"
                    }
                    //对Method Detail中的Type这一栏的return value进行处理
                    let full_type = responseData['methods'][i]['return_value'][1]['properties']['type']
                    let simple_type = full_type
                    if (full_type.lastIndexOf('.') != -1) {
                        simple_type = simple_type.substring(simple_type.lastIndexOf('.')+1)
                    }
                    if (simple_type.indexOf(" ")!=-1) {
                        simple_type = simple_type.substring(0, simple_type.indexOf(" "))
                    }
                    let directive1;
                    if(responseData['methods'][i]['directive'].length>0){

                        directive1=responseData['methods'][i]['directive']
                    }else{
                        directive1='null'
                    }
                    let functionality1;
                    if(responseData['methods'][i]['functionality'].length>0){
                        functionality1=responseData['methods'][i]['functionality']
                    }else{
                        functionality1='null'
                    }
                    let singleMethod = {
                        simple_name: '<b>'+final_method_name+'</b>',
                        name: '<b style="color: #409EFF;">'+final_method_name+'</b>' + '<br/>' + responseData['methods'][i]['doc_info']['comment'].replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,''),
                        mname:'<b style="color: #409EFF;">'+final_method_name+'</b>'+ '<br/>' + responseData['methods'][i]['doc_info']['comment'].replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,''),
                        qualified_name: responseData['methods'][i]['name'],
                        label:responseData['methods'][i]['label'],
                        directive:directive1.replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,'').replace(/<noun>/g,'').replace(/<\/noun>/g,''),
                        functionality:functionality1.replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,'').replace(/<noun>/g,'').replace(/<\/noun>/g,''),
                        sample_code: responseData['methods'][i]['sample_code'],
                        returntype: simple_return_type,
                        retype:full_return_type,
                        concepts: responseData['methods'][i]['concepts'],
                        concepts_str: responseData['methods'][i]['concepts'].join(", "),
                        return_value_directive: responseData['methods'][i]['return_value_directive'].join(". "),
                        throws_directive: responseData['methods'][i]['throws_directive'].join(". "),
                        complete_comment: responseData['methods'][i]['doc_info']['comment'].replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,'').replace(/<noun>/g,'').replace(/<\/noun>/g,''),
                        all_directive: [],
                        return_value: [{
                            description: responseData['methods'][i]['return_value'][1]['properties']['description'],
                            type: simple_type,
                            name:'-',
                            la: 'return value'
                        }],
                        // parameters: []
                    }

                    for (let j in responseData['methods'][i]['return_value_directive']) {
                        singleMethod['all_directive'].push({
                            "source": "Permitted situation",
                            "directive": responseData['methods'][i]['return_value_directive'][j]
                        })
                    }
                    for (let j in responseData['methods'][i]['throws_directive']) {
                        singleMethod['all_directive'].push({
                            "source": "Prohibited situation",
                            "directive": responseData['methods'][i]['throws_directive'][j]
                        })
                    }

                    for (let j in responseData['methods'][i]['parameters']) {
                        // 对Method Detail中Type这一栏的parameter进行处理
                        let full_type = responseData['methods'][i]['parameters'][j][1]['properties']['type']
                        let simple_type = full_type
                        if (full_type.lastIndexOf('.') != -1) {
                            simple_type = full_type.substring(simple_type.lastIndexOf('.')+1)
                        }
                        if (simple_type.indexOf(" ")!=-1) {
                            simple_type = full_type.substring(0, simple_type.indexOf(" "))
                        }
                        singleMethod['return_value'].push({
                            description: responseData['methods'][i]['parameters'][j][1]['properties']['description'],
                            type: simple_type,
                            name:responseData['methods'][i]['parameters'][j][1]['properties']['simple_name'],
                            la: 'parameters'
                        })
                    }
                    for (let j in responseData['methods'][i]['exception_info']) {
                        // let full_type = responseData['methods'][i]['exception_info'][j]['exception_name']
                        // let simple_type = full_type
                        // if (full_type.lastIndexOf('.') != -1) {
                        //   simple_type = full_type.substring(simple_type.lastIndexOf('.')+1)
                        // }
                        // if (simple_type.indexOf(" ")!=-1) {
                        //   simple_type = full_type.substring(0, simple_type.indexOf(" "))
                        // }
                        singleMethod['return_value'].push({
                            description : responseData['methods'][i]['exception_info'][j]['description'],
                            type:responseData['methods'][i]['exception_info'][j]['exception_name'],
                            name:'-',
                            la: 'throw exception'
                        })
                    }

                    // for (let j in responseData['methods'][i]['concepts']) {
                    //   singleMethod['return_value'].push({
                    //     description : '',
                    //     type: '-',
                    //     name: responseData['methods'][i]['concepts'][j],
                    //     la: 'concept'
                    //   })
                    // }
                    this.methods_info.push(singleMethod)
                }
                console.log(this.extend_and_implements_info)
                console.log(this.fields_info)
                console.log(this.methods_info)
            },
            change_search() {
                let select_2_label = {
                    1: "Class Search",
                    2: "Method Search",

                }
                let select_2_mean = {
                    1: "Please input a query",
                    2: "Please input a method",
                }
                this.label = select_2_label[parseInt(this.select)]
                this.displayLabelMean = select_2_mean[parseInt(this.select)]
                console.log(this.label)
                console.log(this.displayLabelMean)
            },
            handleSelect(item) {
                console.log(item)
                if (item.label == "Class Search") {
                    this.select = '1'
                    this.display_loading()
                } else if (item.label == "Method Search") {
                    this.select = '2'
                    let nextPage1 = this.$router.resolve({path: 'SampleCode', query: {"query": item.value}});
                    window.open(nextPage1.href, '_blank');
                }
                let select_2_mean = {
                    1: "Please input a query",
                    2: "Please input a method",
                }
                this.displayLabelMean = select_2_mean[parseInt(this.select)]
                let select_2_label = {
                    1: "Class Search",
                    2: "Method Search",

                }
                this.label = select_2_label[parseInt(this.select)]
            },
            secondVersionSearch () {
                if (this.label == "Class Search") {
                    console.log(this.query)
                    this.display_loading()
                } else if (this.label == "Method Search") {
                    let nextPage1 = this.$router.resolve({path: 'SampleCode', query: {"query": this.query}});
                    window.open(nextPage1.href, '_blank');
                }
            }
        }
    }
</script>

<style scoped>

</style>
