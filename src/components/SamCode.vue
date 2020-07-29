<template>
    <div>
        <div style="text-align:right">
            <el-button icon="el-icon-refresh-left" @click="display_loading"></el-button>
        </div>
    <h1 >Sample Code</h1>
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
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "SamCode",
        props:{
            gqu:String,
            required:true
        },
        data() {
            return {
                samplecode: [],

            }
        },
        methods: {
            display_loading() {
                axios
                    .post(
                        'http://106.14.239.166/contest/api/sample_code/',
                        {qualified_name: this.gqu})
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
            dealt_response_data(responseData) {
                this.samplecode = [];
                for (let i in responseData['sample_code']) {
                    this.samplecode.push({
                        sc: responseData['sample_code'][i],


                    })

                }

            },
        }
    }
</script>

<style scoped>

</style>