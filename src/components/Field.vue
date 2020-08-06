<template>
    <div id="fields" v-show="fields_info.length > 0" style="padding: 10px;width: 90%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;">
        <h2>Field</h2>
        <el-table
                :data="fields_info"
                border
                style="margin-top:30px;width: 100%;">
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
</template>

<script>
    import axios from "axios";

    export default {
        name: "Field",
        props: {
            fquery: String,
            required: true
        },
        data() {
            return {
                fields_info: [],
            }
        },
        methods: {
            display_loading() {
                axios
                    .post(
                        'http://106.14.239.166/contest/api/api_structure/',
                        {qualified_name: this.fquery.trim()})
                    .then(response => {
                        this.dealt_response_data(response.data)
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        alert("Sorry! We can't find related responses.")
                    })
            },
            dealt_response_data(responseData) {
                this.fields_info = []
                for (let i in responseData['fields']) {
                    let qname = responseData['fields'][i][1]['properties']['qualified_name']
                    qname = qname.substring(qname.lastIndexOf('.') + 1)
                    this.fields_info.push({
                        type: responseData['fields'][i][1]['properties']['type'],
                        qualified_name: qname,
                        description: responseData['fields'][i][1]['properties']['full_description'].replace(/[*/]/g, '')
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>