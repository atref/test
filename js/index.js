let fillStyle = 'hachure'

window.onload = () => {
    let data = getData();
    let chart = new wijmo.chart.FlexChart('#chart', {
        itemsSource: data,
        bindingX: 'country',
        series: [
            { name: 'Sales', binding: 'sales' },
            { name: 'Expenses', binding: 'expenses' },
            { name: 'Downloads', binding: 'downloads' }
        ]
    });
    roughSvgRender(chart._currentRenderEngine);

    let pie = new wijmo.chart.FlexPie('#pie');//
    roughSvgRender(pie._currentRenderEngine);

    pie.itemsSource = data;
    pie.bindingName = 'country';
    pie.binding = 'sales';
    pie.dataLabel.content = '{value}';
    pie.dataLabel.position = wijmo.chart.PieLabelPosition.Outside;
    pie.dataLabel.connectingLine = true;
    pie.dataLabel.offset = 30;

    let tree = new wijmo.chart.hierarchical.TreeMap('#tree', {
        //maxDepth: 1,
        binding: 'sales',
        bindingName: 'type',
        childItemsPath: 'items',
        palette: wijmo.chart.Palettes.standard,
        dataLabel: {
            position: 'Center',
            content: '{name}'
        }
    });
    roughSvgRender(tree._currentRenderEngine);
    tree.itemsSource = getTreeData();

    let area = new wijmo.chart.FlexChart('#area', {
        chartType: wijmo.chart.ChartType.Area,
        itemsSource: data,
        bindingX: 'country',
        series: [
            { name: 'Sales', binding: 'sales' },
            { name: 'Expenses', binding: 'expenses' },
        ]
    });
    roughSvgRender(area._currentRenderEngine);

    let line = new wijmo.chart.FlexChart('#line', {
        chartType: wijmo.chart.ChartType.LineSymbols,
        bindingX: 'x',
        symbolSize: 20,
        series: [
            { itemsSource: getSinData(), name: 'sin(x)', binding: 'y' },
            { itemsSource: getCosData(), name: 'cos(x)', binding: 'y' },
        ]
    });
    roughSvgRender(line._currentRenderEngine);

    let bubble = new wijmo.chart.FlexChart('#bubble', {
        chartType: wijmo.chart.ChartType.Bubble,
        bindingX: 'revenue',
        binding: 'earnings,cap',
        axisX: {
            title: 'revenue'
        },
        axisY: {
            title: 'earnings'
        },
        options: {
            bubble: { minSize: 0, maxSize: 50 }
        },
        series: [
            { name: 'Apple', itemsSource: getCorpData('Apple') },
            { name: 'Alphabet', itemsSource: getCorpData('Alphabet') },
            { name: 'Microsoft', itemsSource: getCorpData('Microsoft') },
            { name: 'Amazon', itemsSource: getCorpData('Amazon') },
            { name: 'Facebook', itemsSource: getCorpData('Facebook') },
            { name: 'Zero', itemsSource: getCorpData('Zero'), symbolSize:0, visibility: wijmo.chart.SeriesVisibility.Plot }
        ]
    });
    roughSvgRender(bubble._currentRenderEngine);

    let charts = [chart, pie, area, line, bubble, tree];
    let pals = [];
    for (var p in wijmo.chart.Palettes) {
        pals.push(p);
    }

    let palette = new wijmo.input.Menu('#palette', {
        itemsSource: pals,
        header: 'standard',
        selectedIndexChanged: function (s, e) {
            if (s.selectedIndex > -1) {
                s.header = s.selectedItem;
                charts.forEach((c) => c.palette = wijmo.chart.Palettes[s.selectedItem]);
            }
        }
    });

    let fill = new wijmo.input.Menu('#fill', {
        itemsSource: [ 'hachure', 'solid', 'zigzag', 'cross-hatch', 'dots'],
        header: 'hachure',
        selectedIndexChanged: function (s, e) {
            if (s.selectedIndex > -1) {
                s.header = fillStyle = s.selectedItem;
                charts.forEach((c) => c.refresh());
            }
        }
    });

}


