<template>
  <div>
    <div style="margin: 20px auto 25px;width: 80%;">
      <h3 style="text-align: center;margin-bottom: 15px;font-size:30px" >DocGen</h3>
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
                style="width: 100%">
          <el-table-column
                  prop="relation"
                  label="relation"
                  header-align="center"
                  align="center"
                  width="132">
          </el-table-column>
          <el-table-column
                  prop="name"
                  header-align="center"
                  align="center"
                  label="qualified name">
          </el-table-column>
        </el-table>
      </div>
      <div id="fields" v-show="fields_info.length > 0" style="padding: 10px;width: 92%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">
        <el-table
                :data="fields_info"
                border
                style="width: 100%">
          <el-table-column
                  prop="type"
                  label="type"
                  header-align="center"
                  align="center"
                  width="132">
          </el-table-column>
          <el-table-column
                  prop="qualified_name"
                  header-align="center"
                  align="center"
                  label="qualified name">
          </el-table-column>
          <el-table-column
                  prop="full_declaration"
                  header-align="center"
                  align="center"
                  label="full declaration">
          </el-table-column>
        </el-table>
      </div>
      <el-tabs  id="methods" v-show="kai" style="padding: 0px 0px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;" type="border-card">
        <el-tab-pane>
          <span slot="label">Basic Information</span>
          <div v-show="methods_info.length == 0" style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;"><h4>{{"sorry,we can't find the methods..."}}</h4>
          </div>
          <div v-show="methods_info.length > 0" v-for="(item, index) in methods_info" v-bind:key="index" style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">
            <h3 style="margin: 12px auto;word-break: break-word;width: 93%">{{item['name']}}</h3>
            <div style="width: 91%;margin: 0px auto;" v-show="item['comment'] != ''">
              <el-divider></el-divider>
            </div>
            <h4 style="margin: 12px auto;word-break: break-word;width: 93%;">{{item['comment']|msgFormat|msg|m}}</h4>
            <div style="margin: 0px auto;" v-show="item['return_value'].length > 0">
              <div style="width: 91%;margin: 0px auto;">
                <el-divider></el-divider>
              </div>
              <h3 style="margin: 10px auto;align:left; word-break: break-word;width: 91%;margin-top: 40px;">Method detail</h3>
              <div style="margin: 0px auto;padding: 3px;" v-show="item['return_value'].length > 0">
                <el-table
                        :data="item['return_value']"
                        stripe
                        border
                        style="width: 93%;margin: 0px auto;" >
                  <el-table-column
                          prop="la"
                          label="title"
                          header-align="center"
                          align="center"
                          width="132">
                  </el-table-column>
                  <el-table-column
                          prop="type"
                          label="name and type"
                          header-align="center"
                          align="center"
                          width="300">
                  </el-table-column>
                  <el-table-column
                          header-align="center"
                          align="center"
                          prop="qualified_name"
                          label="description">
                  </el-table-column>
                </el-table>
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
            full_declaration: responseData['fields'][i][1]['properties']['full_declaration']
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
            name: responseData['methods'][i]['declare'],
            comment: responseData['methods'][i]['doc_info']['comment'],
            return_value: [{
              qualified_name: responseData['methods'][i]['return_value'][1]['properties']['description'],
              type: responseData['methods'][i]['return_value'][1]['properties']['simple_name']+responseData['methods'][i]['return_value'][1]['properties']['type'],
              la: 'return_value'
            }],
            parameters: []
          }
          for (let j in responseData['methods'][i]['parameters']) {
            singleMethod['return_value'].push({
              qualified_name: responseData['methods'][i]['parameters'][j][1]['properties']['description'],
              type: responseData['methods'][i]['parameters'][j][1]['properties']['simple_name']+responseData['methods'][i]['parameters'][j][1]['properties']['type'],
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