<template>
  <div>
    <MapleHandsontable
      :columns="columns"
      :data="data"
      :options="options"
      @click="click"
      @change="change"
      ref="MapleRef"
    />
    <button @click="getData">获取数据</button>
  </div>
</template>

<script>
import { MapleHandsontable } from "vue-handsontable-element";
import Vue from "vue";
Vue.use(MapleHandsontable);

export default {
  data() {
    return {
      columns: [
        {
          title: "Name",
          key: "checked",
          type: "selection",
          props: {
            disabled: true
          },
          options: [
            {
              label: "",
              value: 1
            }
          ]
        },
        {
          title: "单选",
          key: "radioabled",
          type: "radio",
          options: [
            {
              label: "1208",
              value: "maple1"
            },
            {
              label: "1105",
              value: "maple2"
            }
          ]
        },
        {
          title: "输入框",
          key: "input",
          type: "input"
        },
        {
          title: "数字输入框",
          key: "num",
          type: "inputNumber"
        },
        {
          title: "下拉选择框",
          key: "select",
          type: "select",
          options: [
            {
              label: "1208",
              value: "maple1"
            },
            {
              label: "1105",
              value: "maple2"
            }
          ]
        },
        {
          title: "切换",
          key: "switch",
          type: "switch"
        },
        {
          title: "日期时间选择框",
          key: "data",
          type: "date",
          props: {
            type: "datetimerange",
            rangeSeparator: "至",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期"
          }
        },
        {
          title: "普通文本",
          key: "text",
          type: "text"
        },
        {
          title: "操作",
          key: "text",
          type: "handle",
          options: [
            {
              name: "删除",
              props: {
                type: "primary",
                size: "mini"
              }
            },
            {
              props: {
                type: "primary",
                circle: true,
                icon: "el-icon-edit",
                size: "mini"
              }
            }
          ]
        }
      ],
      data: [
        {
          checked: true,
          radioabled: "",
          input: "maple test input",
          num: 1208,
          select: "",
          switch: false,
          data: [
            new Date(2000, 10, 10, 10, 10),
            new Date(2000, 10, 11, 10, 10)
          ],
          text: "maple test text"
        },
        {
          checked: false,
          radioabled: "",
          input: "maple test input8888",
          num: 1105,
          select: "",
          switch: true,
          data: [],
          text: "maple test text11"
        }
      ],
      options: {
        colWidths: [30, 100, 160, 200, 200, 100, 400, 200, 300],
        beforePaste: (data, coords) => {
          return this.beforePaste(data, coords);
        },
        beforeCut: (data, coords) => {
          return this.beforeCutbeforeCut(data, coords);
        }
      }
    };
  },
  methods: {
    click(a) {
      console.log(a);
    },
    change(a) {
      console.log(a);
    },
    getData() {
      const d = this.$refs.MapleRef.getData();
      console.log(d);
    },
    beforePaste(data, coords) {
      console.log(data, coords, "beforePaste");
    },
    beforeCut(data, coords) {
      console.log(data, coords, "beforeCut");
    }
  }
};
</script>
