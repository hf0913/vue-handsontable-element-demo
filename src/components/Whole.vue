<template>
  <div>
    <MapleHandsontable
      :columns="columns"
      v-model="data"
      :options="options"
      @click="click"
      @change="change"
      ref="MapleRef"
    />
    <button @click="validate">获取数据</button>
  </div>
</template>

<script>
import { MapleHandsontable } from "vue-handsontable-element";
import Vue from "vue";
Vue.use(MapleHandsontable);

/**
 * 注意事项
 * 1.序号，只能放在第1列或者第2列
 * 2.关于增删改查，强烈不建议调用handsontable的core中的方法
 */
export default {
  data() {
    return {
      columns: [
        {
          title: "选择",
          key: "checked",
          type: "selection",
          props: {
            disabled: false
          }
        },
        {
          title: "序号",
          type: "index"
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
          type: "input",
          dataType: "notNull"
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
            endPlaceholder: "结束日期",
            valueFormat: "yyyy-MM-dd hh:mm:ss"
          },
          dataType: "notNull"
        },
        {
          title: "级联选择器",
          key: "address",
          type: "cascader"
        },
        {
          title: "普通文本",
          key: "text1",
          type: "text",
          props: {
            disabled: false
          }
        },
        {
          title: "操作",
          key: "text",
          type: "handle",
          width: 300,
          options: [
            {
              title: "增加",
              props: {
                type: "primary",
                circle: true,
                icon: "el-icon-circle-plus"
              }
            },
            {
              title: "复制",
              props: {
                type: "info",
                circle: true,
                icon: "el-icon-document-copy"
              }
            },
            {
              title: "删除",
              props: {
                type: "danger",
                circle: true,
                icon: "el-icon-delete"
              }
            }
          ],
          cellProperties: {
            editor: false, // 禁用编辑
            readOnly: true // 只读属性，无法接受粘贴/填充
          }
        }
      ],
      data: [
        {
          radioabled: "",
          input: "maple test input",
          num: 1208,
          select: "",
          switch: false,
          data: ["2000-11-23 12:00:00", "2000-12-12 12:00:00"],
          address: [],
          text1: "maple test text",
          cellProperties: {
            // 优先级最高精确控制到某一个或多个单元格属性(handsontable)
            text1: {
              // columns对应的type值
              editor: true, // 禁用编辑
              readOnly: true // 只读属性，无法接受粘贴/填充
            }
          },
          cellProps: {
            // 优先级最高精确控制到某一个或多个单元格属性(element-ui)
            text1: {
              // columns对应的type值
              disabled: true
            }
          }
        },
        {
          radioabled: "",
          input: "maple test input8888",
          num: 1105,
          select: "",
          switch: true,
          address: ["310000", "310100", "310113"],
          data: [],
          text: "maple test text11",
          cellProps: {
            // 优先级最高精确控制到某一个或多个单元格属性(element-ui)
            inputNumber: {
              // columns对应的type值
              precision: 2
            }
          }
        }
      ],
      options: {
        // handsontable插件的options https://handsontable.com/docs/7.4.2/Options.html
        beforePaste: (data, coords) => {
          return this.beforePaste(data, coords);
        },
        beforeCut: (data, coords) => {
          return this.beforeCut(data, coords);
        },
        loading: false //控制表格loading
      }
    };
  },
  methods: {
    /**
     * row：行
     * col：列
     * index：索引
     */
    click({
      core,
      col,
      row,
      index,
      item,
      copyAddRow,
      addNewRow,
      deleteRow,
      type
    }) {
      /**
       * https://handsontable.com/docs/7.4.2/Core.html
       * 强烈不建议调用handsontable的增删改查
       */
      console.log(
        "点击触发",
        core,
        col,
        row,
        index,
        item,
        copyAddRow,
        addNewRow,
        deleteRow,
        type
      );
      /**
       * 滚动到某一个单元格
       * core.scrollViewportTo(0, 0);
       */
      /**
       * 删除
       */
      // deleteRow();
      /**
       * 新增
       */
      // addNewRow();
      /**
       * 新增一条当前数据
       */
      // copyAddRow();
      switch (true) {
        case item && item.title === "增加":
          addNewRow();
          break;
        case item && item.title === "删除":
          deleteRow();
          break;
        case item && item.title === "复制":
          copyAddRow();
          break;
      }
    },
    change({ core, col, row, value, type, currentRow }) {
      console.log(
        "change事件触发",
        core,
        col,
        row,
        value,
        `类型：${type}，type为selection（单选），type为allSelection（全选）,其余值是columns中type值`,
        `当前勾选的行数组：${currentRow}`
      );
    },
    validate() {
      this.$refs.MapleRef.validate((valid, value) => {
        if (valid) {
          console.log(value, "校验数据ok");
        } else {
          console.log("校验数据失败");
        }
      });
    },
    beforePaste(data, coords) {
      console.log(data, coords, "粘贴后，如果return false，意味着无法粘贴");
    },
    beforeCut(data, coords) {
      console.log(data, coords, "剪切后，如果return false，意味着无法粘贴");
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>
