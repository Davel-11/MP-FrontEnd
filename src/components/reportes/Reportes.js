import React, { useEffect, useState } from 'react'
import './Reportes.scss'
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";
import { fetchFiscaliaReporte } from '../../services/mpApi';

const Reportes = () => {

    const createReport = (recArray) => {
        let root = am5.Root.new("chartdiv");

        let myTheme = am5.Theme.new(root);
        myTheme.rule("Label").set("fontSize", "0.8em");
        
        root.setThemes([
          am5themes_Animated.new(root),
          myTheme
        ]);
        
        let container = root.container.children.push(am5.Container.new(root, {
          width: am5.p100,
          height: am5.p100,
          layout: root.horizontalLayout
        }));

        let chart0 = container.children.push(am5percent.PieChart.new(root, {
          innerRadius: am5.p50,
          tooltip: am5.Tooltip.new(root, {})
        }));
        
        let series0 = chart0.series.push(am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          alignLabels: false
        }));
        
        series0.labels.template.setAll({
          textType: "circular",
          templateField: "dummyLabelSettings"
        });
        
        series0.ticks.template.set("forceHidden", true);
        
        let sliceTemplate0 = series0.slices.template;
        sliceTemplate0.setAll({
          draggable: true,
          templateField: "settings",
          cornerRadius: 5
        });
        
        container.children.push(am5.Line.new(root, {
          layer: 1,
          height: am5.percent(60),
          y: am5.p50,
          centerY: am5.p50,
          strokeDasharray: [4, 4],
          stroke: root.interfaceColors.get("alternativeBackground"),
          strokeOpacity: 0.5
        }));
        
        // Label
        container.children.push(am5.Label.new(root, {
          layer: 1,
          text: "Drag slices over the line",
          y: am5.p50,
          textAlign: "center",
          rotation: -90,
          isMeasured: false
        }));
        
        let chart1 = container.children.push(am5percent.PieChart.new(root, {
          innerRadius: am5.p50,
          tooltip: am5.Tooltip.new(root, {})
        }));
        
        let series1 = chart1.series.push(am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          alignLabels: false
        }));
        
        series1.labels.template.setAll({
          textType: "circular",
          radius: 20,
          templateField: "dummyLabelSettings"
        });
        
        series1.ticks.template.set("forceHidden", true);
        
        let sliceTemplate1 = series1.slices.template;
        sliceTemplate1.setAll({
          draggable: true,
          templateField: "settings",
          cornerRadius: 5
        });
        
        let previousDownSlice;
        
        // change layers when down
        sliceTemplate0.events.on("pointerdown", function (e) {
          if (previousDownSlice) {
            //  previousDownSlice.set("layer", 0);
          }
          e.target.set("layer", 1);
          previousDownSlice = e.target;
        });
        
        sliceTemplate1.events.on("pointerdown", function (e) {
          if (previousDownSlice) {
            // previousDownSlice.set("layer", 0);
          }
          e.target.set("layer", 1);
          previousDownSlice = e.target;
        });
        
        // when released, do all the magic
        sliceTemplate0.events.on("pointerup", function (e) {
          series0.hideTooltip();
          series1.hideTooltip();
        
          let slice = e.target;
          if (slice.x() > container.width() / 4) {
            let index = series0.slices.indexOf(slice);
            slice.dataItem.hide();
        
            let series1DataItem = series1.dataItems[index];
            series1DataItem.show();
            series1DataItem.get("slice").setAll({ x: 0, y: 0 });
        
            handleDummy(series0);
            handleDummy(series1);
          } else {
            slice.animate({
              key: "x",
              to: 0,
              duration: 500,
              easing: am5.ease.out(am5.ease.cubic)
            });
            slice.animate({
              key: "y",
              to: 0,
              duration: 500,
              easing: am5.ease.out(am5.ease.cubic)
            });
          }
        });
        
        sliceTemplate1.events.on("pointerup", function (e) {
          let slice = e.target;
        
          series0.hideTooltip();
          series1.hideTooltip();
        
          if (slice.x() < container.width() / 4) {
            let index = series1.slices.indexOf(slice);
            slice.dataItem.hide();
        
            let series0DataItem = series0.dataItems[index];
            series0DataItem.show();
            series0DataItem.get("slice").setAll({ x: 0, y: 0 });
        
            handleDummy(series0);
            handleDummy(series1);
          } else {
            slice.animate({
              key: "x",
              to: 0,
              duration: 500,
              easing: am5.ease.out(am5.ease.cubic)
            });
            slice.animate({
              key: "y",
              to: 0,
              duration: 500,
              easing: am5.ease.out(am5.ease.cubic)
            });
          }
        });
        
        // data
        let data = [
          {
            category: "Dummy",
            value: 1000,
            settings: {
              fill: am5.color(0xdadada),
              stroke: am5.color(0xdadada),
              fillOpacity: 0.3,
              strokeDasharray: [4, 4],
              tooltipText: null,
              draggable: false
            },
            dummyLabelSettings: {
              forceHidden: true
            }
          }
        ];

        data = [...data, ...recArray]
        
        // show/hide dummy slice depending if there are other visible slices
        function handleDummy(series) {
          // count visible data items
          let visibleCount = 0;
          am5.array.each(series.dataItems, function (dataItem) {
            if (!dataItem.isHidden()) {
              visibleCount++;
            }
          });
          // if all hidden, show dummy
          if (visibleCount == 0) {
            series.dataItems[0].show();
          } else {
            series.dataItems[0].hide();
          }
        }
        // set data
        series0.data.setAll(data);
        series1.data.setAll(data);
        
        // hide all except dummy
        am5.array.each(series1.dataItems, function (dataItem) {
          if (dataItem.get("category") != "Dummy") {
            dataItem.hide(0);
          }
        });
        
        // hide dummy
        series0.dataItems[0].hide(0);
        
        // reveal container
        container.appear(1000, 100);

    }


    const getInitReport = async () => {
        const reporte = await fetchFiscaliaReporte()
        
        reporte.json().then((resp) => {

            const repArray = [
                {
                    category: "activo",
                    value: resp?.activos
                },
                {
                    category: "inactivo",
                    value: resp?.inactivos
                }
            ]

            console.log('repArray', repArray)
            createReport(repArray)
        })
    }

    useEffect(() => {
        getInitReport()
    }, [])

    const [dateOne, setDateOne] = useState('2021-02-15')
    const [dateSec, setDateSec] = useState('2021-02-15')
      
    const generarReporte = (e) => {
        e.preventDefault();

        console.log('generar reporte', dateOne, dateSec)
        getInitReport()
    }

    const changeDate = (e, type) => {
        if (type.includes('one')) {
            setDateOne(e)
        } else {
            setDateSec(e)
        }
    }

    return <div className="Reportes">
        <form className="fechas" onSubmit={(e) => generarReporte(e)}>

        <label for="start">Inicio:</label>
        <input type="date" id="start" value={dateOne} onChange={(e) => changeDate(e.target.value, 'one')}  />

        <label for="start">Fin:</label>
        <input type="date" id="start" value={dateSec} onChange={(e) => changeDate(e.target.value, 'sec')}  />

        <button>Generar</button>

        </form>
        <div className="reporte" id="chartdiv"></div>
    </div>
}

export default Reportes