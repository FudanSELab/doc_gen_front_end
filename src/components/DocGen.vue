<template>
  <div>
    <div style="margin: 20px auto 25px;width: 80%;">
      <h3 style="text-align: center;margin-bottom: 15px;font-size:30px" >Doc Generator</h3>
      <div id="search-box" style="margin: 50px 2.5% 30px;display: flex;">
        <el-tooltip class="item" effect="dark" :content="displayLabelMean" placement="top">
          <div>
            <el-select v-model="select" slot="prepend" placeholder="Please Choose" @change="change_search">
              <el-tooltip class="item" effect="dark" content="Please input a query" placement="right">
                <el-option label="Class Search" value="1"></el-option>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Please input a method" placement="right">
                <el-option label="Method Search" value="2"></el-option>
              </el-tooltip>
            </el-select></div>
        </el-tooltip>
        <el-input placeholder="Please input a query" v-model="query" @select="handleSelect"
                  @keyup.enter.native="secondVersionSearch">
          <el-button slot="prepend" @click="example">Example</el-button>
          <el-button slot="append" icon="el-icon-search" @click="secondVersionSearch"></el-button>
        </el-input>
      </div>
    </div>
    <div>
      <div ref="loading" v-show="isLoading" style="text-align: center;font-size: 26px;">loading……</div>
    </div>
    <div style="width: 92%;margin: 0px auto;" v-show="!isLoading">
      <div id="extend_and_implements" v-show="extend_and_implements_info.length > 0" style="padding: 10px;width: 80%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">
        <el-table
                border
                :data="extend_and_implements_info"
                style="width: 100%;white-space: pre-line;">
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
      <div id="fields" v-show="fields_info.length > 0" style="padding: 10px;width: 92%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">
        <el-table
                :data="fields_info"
                border
                style="width: 100%;">
          <el-table-column
                  prop="type"
                  label="Type"
                  header-align="center"
                  align="center"
                  width="132">
          </el-table-column>
          <el-table-column
                  prop="qualified_name"
                  header-align="center"
                  align="center"
                  label="Field Name"
                  width="320">
          </el-table-column>
          <el-table-column
                  prop="description"
                  header-align="center"
                  align="left"
                  label="Description"
                 >
          </el-table-column>
        </el-table>
      </div>
      <el-tabs  id="methods" v-show="kai" style="padding: 0px 0px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;" type="border-card">
        <el-tab-pane>
          <span slot="label">Basic Information</span>
          <div v-show="methods_info.length == 0" style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;"><h4>{{"sorry,we can't find the methods..."}}</h4>
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
                      label="Type"
                      header-align="left"
                      align="left"
                      width="360"
              >
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
            <h2 style="margin: 10px auto;align:left; word-break: break-word;width: 91%;margin-top: 40px;">Method Detail</h2>
            <div style="margin: 0px auto;" v-for="(item, index) in methods_info" v-bind:key="index" v-show="item['return_value'].length > 0">
              <div style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">
              <p class="1" align="left" style="margin-left: 45px">{{item['mname']}}</p>
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
        </el-tab-pane>
        <el-tab-pane label="Interface Information"><InterfaceInfo :getq="query"></InterfaceInfo></el-tab-pane>
        <el-tab-pane label="Key Methods"><KeyMethods :getquery="query"></KeyMethods></el-tab-pane>
        <el-tab-pane label="SampleCode"><SamCode :gqu="query"></SamCode></el-tab-pane>
        <el-tab-pane label="Category"><Characteristic :gquery="query"></Characteristic></el-tab-pane>
        <el-tab-pane label="How To Use"><UseClass :use="query"></UseClass></el-tab-pane>
        <el-tab-pane label="Others"><RelatedTerms :gq="query"></RelatedTerms></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import KeyMethods from "./KeyMethods";
  import InterfaceInfo from "./InterfaceInfo";
  import Characteristic from "./Characteristic";
  import RelatedTerms from "./RelatedTerms";
  import SamCode from "./SamCode";
  import Others from "./Others";
  import UseClass from "./UseClass";

  export default {
    name: 'DocGen',
    components: {UseClass, Others, SamCode, RelatedTerms, Characteristic,InterfaceInfo, KeyMethods},
    data () {
      return {
        query: '',
        isLoading: false,
        extend_and_implements_info: [],
        fields_info: [],
        methods_info: [],
        select: '1',
        kai:false,
        displayLabelMean: "Please select your question cateqory",
        label: "Class Search"
      }
    },
    filters: {
      "msg":function (value) {
        return value.replace(/<s>/g," ");
      },
      "m":function (value) {
        return value.replace(/<\/s>/g," ");
      },
      "R":function (value) {
        return value.replace(/<R>/g," ");
      }

    },
    methods: {
      example() {
        this.query = 'org.jabref.model.entry.BibEntry'
      },
      display_loading() {
        if (this.query.trim() === '') {
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
                  })
        }
      },
      dealt_response_data(responseData) {
        this.extend_and_implements_info = []
        this.fields_info = []
        this.methods_info = []
        this.extend_and_implements_info.push(responseData['extends'])
        for (let i in responseData['fields']) {
          this.fields_info.push({
            type: responseData['fields'][i][1]['properties']['type'],
            qualified_name: responseData['fields'][i][1]['properties']['qualified_name'],
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

          let singleMethod = {
            name: responseData['methods'][i]['declare']+'<br/>'+responseData['methods'][i]['doc_info']['comment'].replace(/<s>/g, '').replace(/<NULL>/g,'').replace(/<\/s>/g,''),
            mname:responseData['methods'][i]['declare'],
            returntype: responseData['methods'][i]['return_value'][1]['properties']['type'],
            return_value: [{
              qualified_name: responseData['methods'][i]['return_value'][1]['properties']['description'],
              type: responseData['methods'][i]['return_value'][1]['properties']['type'],
              name:'-',
              la: 'return value'
            }],
            parameters: []
          }
          for (let j in responseData['methods'][i]['parameters']) {
            singleMethod['return_value'].push({
              qualified_name: responseData['methods'][i]['parameters'][j][1]['properties']['description'],
              type: responseData['methods'][i]['parameters'][j][1]['properties']['type'],
              name:responseData['methods'][i]['parameters'][j][1]['properties']['simple_name'],
              la: 'parameters'
            })
          }
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