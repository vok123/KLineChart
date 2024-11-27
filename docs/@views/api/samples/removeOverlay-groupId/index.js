import { init } from 'klinecharts';

const chart = init('removeOverlay-groupId-chart');
const paneId = chart.createIndicator({
  name: 'MA',
  calcParams: [5],
  shouldOhlc: false
});

fetch('/datas/kline.json')
  .then(res => res.json())
  .then(dataList => {
    chart.applyNewData(dataList);
    const startData = dataList[dataList.length - 50];
    const endData = dataList[dataList.length - 10];
    chart.createOverlay({
      name: 'segment',
      paneId: 'candle_pane',
      groupId: 'group1',
      points: [
        { timestamp: startData.timestamp, value: startData.high },
        { timestamp: endData.timestamp, value: endData.low }
      ]
    });
    chart.createOverlay({
      name: 'priceLine',
      paneId: 'candle_pane',
      points: [
        { timestamp: startData.timestamp, value: endData.close }
      ]
    });
    chart.createOverlay({
      name: 'priceLine',
      paneId,
      groupId: 'group1',
      points: [
        { timestamp: startData.timestamp, value: startData.high },
        { timestamp: endData.timestamp, value: endData.low }
      ]
    });

    chart.removeOverlay({ groupId: 'group1' });
  });