---
title: echarts pie 饼图
date: "2024-04-29 12:50"
description: "饼图 echarts 南丁格尔图"
---
#### 效果对比
![适配前](../../assets/images/pie.png "Magic Gardens")
![适配后](../../assets/images/pie1.png "Magic Gardens")

#### html

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.bootcdn.net/ajax/libs/echarts/5.1.0/echarts.js"></script>
  </head>
  <body>
    <div
      style="height: 500px; width: 500px; border: 1px solid black"
      id="pie-echarts"
    ></div>
  </body>
  <script type="module">
    const pieData = [
      {
        value: 26,
        name: "211",
        selected: true,
      },
      { value: 21, name: "985" },
      { value: 23, name: "双一流" },
      { value: 2, name: "普通院校" },
    ]
    const option = {
      legend: {
        top: "bottom",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [200, 230],
          center: ["50%", "50%"],
          roseType: "radius",
          data: pieData,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
        },
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [0, 200.5],
          center: ["50%", "50%"],
          data: pieData,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
        },
      ],
    }

    const myChart = echarts.init(document.getElementById("pie-echarts"))
    myChart.setOption(option)
    myChart.on("mouseover", e => {
      const dataIndex = e.dataIndex
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
      })
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 1,
      })
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: dataIndex,
      })
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 1,
        dataIndex: dataIndex,
      })
    })
    myChart.on("mouseout", e => {
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
      })
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 1,
      })
    })

    hover()
  </script>
</html>
```


<!-- [Echarts pie demo](/QuillDemo) -->