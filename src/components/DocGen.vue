<template>
  <div>
    <div style="margin: 20px auto 25px;width: 80%;">
      <h3 style="text-align: center;margin-bottom: 15px;">DocGen</h3>
      <el-input placeholder="Please input a query" v-model="query">
        <el-button slot="prepend" @click="example">Example</el-button>
        <el-button slot="append" icon="el-icon-search" @click="display_loading"></el-button>
      </el-input>
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
      <div id="methods" v-show="methods_info.length > 0" style="padding: 20px 0px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">
        <div v-for="(item, index) in methods_info" v-bind:key="index" style="padding: 20px 0px;width: 96%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 6px;">
          <h3 style="margin: 12px auto;word-break: break-word;width: 93%;">{{item['name']}}</h3>
          <div style="width: 91%;margin: 0px auto;" v-show="item['comment'] != ''">
            <el-divider></el-divider>
          </div>
          <h4 style="margin: 12px auto;word-break: break-word;width: 93%;">{{item['comment']}}</h4>
          <div style="margin: 0px auto;" v-show="item['return_value'].length > 0">
            <div style="width: 91%;margin: 0px auto;">
              <el-divider></el-divider>
            </div>
            <h4 style="margin: 10px auto;word-break: break-word;width: 91%;">Return Value</h4>
            <div style="margin: 0px auto;padding: 3px;">
              <el-table
                :data="item['return_value']"
                border
                style="width: 92%;margin: 3px auto;">
                <el-table-column
                  prop="type"
                  label="type"
                  header-align="center"
                  align="center"
                  width="132">
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="center"
                  prop="qualified_name"
                  label="qualified name">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div style="margin: 0px auto;" v-show="item['parameters'].length > 0">
            <div style="width: 91%;margin: 0px auto;">
              <el-divider></el-divider>
            </div>
            <h4 style="margin: 10px auto;word-break: break-word;width: 91%;">Parameters</h4>
            <div style="margin: 0px auto;padding: 3px;">
              <el-table
                :data="item['parameters']"
                border
                style="width: 92%;margin: 3px auto;">
                <el-table-column
                  header-align="center"
                  align="center"
                  prop="type"
                  label="type"
                  width="132">
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="center"
                  prop="qualified_name"
                  label="qualified name">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DocGen',
  data () {
    return {
      query: '',
      isLoading: false,
      extend_and_implements_info: [],
      fields_info: [],
      methods_info: []
    }
  },
  methods: {
    example () {
      this.query = 'org.jabref.gui.entryeditor.FieldsEditorTab'
    },
    display_loading () {
      if (this.query.trim() === '') {
        alert('Qualified name can not be null')
      } else {
        this.isLoading = true
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
    dealt_response_data (responseData) {
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
          name: responseData['methods'][i]['name'],
          comment: responseData['methods'][i]['doc_info']['comment'],
          return_value: [{
            qualified_name: responseData['methods'][i]['return_value'][1]['properties']['qualified_name'],
            type: responseData['methods'][i]['return_value'][1]['properties']['type']
          }],
          parameters: []
        }
        for (let j in responseData['methods'][i]['parameters']) {
          singleMethod['parameters'].push({
            qualified_name: responseData['methods'][i]['parameters'][j][1]['properties']['qualified_name'],
            type: responseData['methods'][i]['parameters'][j][1]['properties']['type']
          })
        }
        this.methods_info.push(singleMethod)
      }
      console.log(this.extend_and_implements_info)
      console.log(this.fields_info)
      console.log(this.methods_info)
    }
  }
}
</script>

<style scoped>

</style>
