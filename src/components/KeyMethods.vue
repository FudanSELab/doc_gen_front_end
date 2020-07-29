<template>
    <div >
        <div style="text-align:right">
            <el-button icon="el-icon-refresh-left" @click="display_loading"></el-button>
        </div>
        <el-table
                :data="KeyM"
                border
                style="width: 92%;margin: 3px auto;">
            <el-table-column
                    prop="keym"
                    label="key_methods"
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
        name: "KeyMethods",
        props:{
            getquery:String,
            required:true
        },
        data() {
            return {
                KeyM: [],

            }
        },

        methods: {
            display_loading (){
                axios
                    .post(
                        'http://106.14.239.166/contest/api/key_methods/',
                        {qualified_name: this.getquery})
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
                this.KeyM = [];
                for (let i in responseData['key_methods']) {
                    this.KeyM.push({
                        keym: responseData['key_methods'][i],


                    })

                }

            }

        }
    }
</script>

<style scoped>

</style>