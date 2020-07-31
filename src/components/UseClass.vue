<template>
    <div>
        <div style="text-align:right">
            <el-button icon="el-icon-refresh-left" @click="display_loading"></el-button>
        </div>
        <div>
            <el-table
                    :data="as_parameter"
                    stripe
                    style="width: 85%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;"

            >
                <el-table-column
                        prop="parameter"
                        label="As parameter"
                        header-align="center"
                        align="center"
                >
                </el-table-column>
            </el-table>
            <el-table
                    :data="as_return_value"
                    stripe
                    style="width: 85%;margin: 10px auto 30px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 10px;"
                    border

            >
                <el-table-column
                        prop="return_value"
                        label="As return_value"
                        header-align="center"
                        align="center"
                >
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "UseClass",
        props:{
            use:String,
            required:true
        },
        data() {
            return {
                as_return_value: [],
                as_parameter:[],
            }
        },
        methods: {
            display_loading (){
                axios
                    .post(
                        'http://106.14.239.166/contest/api/parameter_return_value/',
                        {qualified_name: this.use.trim()})
                    .then(response => {
                        this.dealt_response_data(response.data)
                        this.isLoading = false
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error)
                        alert("Sorry! We can't find related responses.")
                    })
            },
            dealt_response_data (responseData) {
                this.as_parameter= []
                this.as_return_value=[]
                for (let i in responseData['paramater']) {
                this.as_parameter.push({
                    parameter: responseData['paramater'][i],
                })

            }
            for (let i in responseData['return_value']) {
                this.as_return_value.push({
                    return_value: responseData['return_value'][i],

                })
            }

        }

        },
    }


</script>

<style scoped>

</style>