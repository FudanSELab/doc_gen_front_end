<template>
    <div>
    <div id="graph" class="section">
        <h2>Knowledge Graph</h2>
        <hr>
        <el-row>
            <el-button type="warning" plain @click="graphDisplay" size="small">{{graphString}}</el-button>
            <el-button type="warning" plain @click="GoGraph" size="small">Graph Detail</el-button>
        </el-row>
        <!--            <ForceGraph :loadingData="loadingData" :responseData="responseData" v-on:foreChange = "changeLoading($event)" v-show="graphShow"></ForceGraph>-->
        <ForceGraph :loadingData="loadingData" :graphData="id" v-on:foreInfo = "getExpandNodeInfoFromForceGraph($event)" v-show="graphShow"></ForceGraph>
    </div>
    <div id="language" v-show="lang.length > 0" class="section">
        <h4 id="Labels">Labels</h4>
        <hr>
        <el-table :data="language_table.slice(0,label_show)" scope="scope" style="width: 70%;">
            <el-table-column label="language" >
                <template slot-scope="scope">
                    {{lang[scope.$index]}}
                </template>
            </el-table-column>
            <el-table-column prop="label" label="label"></el-table-column>
            <el-table-column prop="description" label="description"></el-table-column>
            <el-table-column prop="alias" label="alias"></el-table-column>
        </el-table>
        <el-button type="text" @click="dialogLabelVisible = true" v-show="label_show < lang.length || l_show != '+more'">{{l_show}}</el-button>
        <el-dialog title="Label" :visible.sync="dialogLabelVisible" style="" :center="true" >
            <el-table :data="language_table" scope="scope" >
                <el-table-column label="language" >
                    <template slot-scope="scope">
                        {{lang[scope.$index]}}
                    </template>
                </el-table-column>
                <el-table-column prop="label" label="label"></el-table-column>
                <el-table-column prop="description" label="description"></el-table-column>
                <el-table-column prop="alias" label="alias"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import ForceGraph from './forceGraph'

    export default {
        name: "Others",
        components: {ForceGraph},
        data: function () {
            return {
                id:790,
                graphString: 'Display Graph',
                loadingData: true,
                graphShow: false,
                lang: [],
                language_table: [],
                alias_list: {},
                description_list: {},
                site_list: [],
                label_list: {},
                label_show: 5,
                l_show: '+more',
                r_show: '+more',
                dialogLabelVisible: false,
            }
        },
        // created () {
        //     this.id = this.$route.params.id
        // },
        methods:{
            getExpandNodeInfoFromForceGraph (msg){
                let _this = this
                console.log(msg)
                this.responseData = msg
                this.startNodesNameList = []
                this.AdjacentNodesNameList = []
                this.relation_name = []
                let tempNodes = []
                if (this.responseData.relations.length > 0) {
                    this.responseData.nodes.forEach(nodes => {
                        if (nodes.id !== _this.id) {
                            let node = {}
                            node.id = nodes.id
                            node.name = nodes.name
                            tempNodes.push(node)
                            // this.$set(this.AdjacentNodesNameList, this.AdjacentNodesNameList.length, node)
                        }
                    })
                    console.log(tempNodes)
                    this.responseData.relations.forEach(relation => {
                        let startNode = {}
                        let node = {}
                        tempNodes.forEach(function (d) {
                            if (d.id === relation.end_id) node = d
                        })
                        tempNodes.forEach(function (d) {
                            if (d.id === relation.start_id) startNode = d
                        })
                        _this.$set(_this.startNodesNameList, _this.startNodesNameList.length, startNode)
                        _this.$set(_this.AdjacentNodesNameList, _this.AdjacentNodesNameList.length, node)
                        _this.$set(_this.relation_name, _this.relation_name.length, relation.name)
                    })
                    console.log(_this.startNodesNameList)
                    console.log(_this.AdjacentNodesNameList)
                }
                this.loadingData = false
            },
            graphDisplay () {
                this.graphShow = !this.graphShow
                if (this.graphString === 'Hide Graph') this.graphString = 'Display Graph'
                else if (this.graphString === 'Display Graph') this.graphString = 'Hide Graph'
            },
            changeHash (idName) {
                document.querySelector(idName).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
            },
            GoGraph () {
                // this.$router.push({name: 'ElementGraph', params: { id: this.id }})
                let goGraph = this.$router.resolve({name: 'ElementGraph', params: { id: this.id }})
                window.open(goGraph.href, '_blank')
            },
            // getId () {
            //     this.id = this.$route.params.id
            // },
            mounted () {
                this.loadingData = true
                this.getNodeData()
                // this.getNodeRelation()
                this.graphDisplay()

            },
        },
    }
</script>

<style scoped>

</style>