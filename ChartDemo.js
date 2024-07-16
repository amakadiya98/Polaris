import * as Polaris from '@shopify/polaris-viz-native'
// import { formatCurrency } from '../utils/currency'
import { PolarisVizProvider } from '@shopify/polaris-viz-native';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { View } from 'react-native';

const data = [
    {
        "name": "18 dec.2022 - 17 dec.2023",
        "data": [
            {
                "key": "dec 2022",
                "value": 1000000000
            },
            {
                "key": "mars 2023",
                "value": 3000000000
            },
            {
                "key": "juin 2023",
                "value": 2000000000
            },
            // {
            //   "key": "sept 2023",
            //   "value": 1000000000
            // }
        ]
    },
    {
        "name": "Lunch",
        "data": [
            {
                "key": "dec 2022",
                "value": 1500000000
            },
            {
                "key": "mars 2023",
                "value": 350000000
            },
            {
                "key": "juin 2023",
                "value": 500000000
            },
            //     {
            //       "key": "Thursday",
            //       "value": 15
            //     },
            //     {
            //       "key": "Friday",
            //       "value": 8
            //     },
            //     {
            //       "key": "Saturday",
            //       "value": 45
            //     },
            //     {
            //       "key": "Sunday",
            //       "value": 0.1
            //     }
        ]
    },
    // {
    //   "name": "Dinner",
    //   "data": [
    //     {
    //       "key": "Monday",
    //       "value": 7
    //     },
    //     {
    //       "key": "Tuesday",
    //       "value": 0
    //     },
    //     {
    //       "key": "Wednesday",
    //       "value": -15
    //     },
    //     {
    //       "key": "Thursday",
    //       "value": -12
    //     },
    //     {
    //       "key": "Friday",
    //       "value": 45
    //     },
    //     {
    //       "key": "Saturday",
    //       "value": 5
    //     },
    //     {
    //       "key": "Sunday",
    //       "value": 0.1
    //     }
    //   ]
    // }
]

// export default function BarChart({ isCurrency, storeConfig }) {
//     if (data[0].data && data[0].data.length <= 0) {
//         return <div className='data-container d-flex' style={{ justifyContent: 'center', alignItems: 'center' }}>
//             <p>There was no data found for this date range.</p>
//         </div>
//     }
//     console.log(Polaris, ' <--- i am polaris...')
//     return (
//         <PolarisVizProvider >
//             <View style={{ width: '90%', height: 200, padding: 20, marginTop: 200, borderWidth: 1, borderColor: 'red', margin:'auto' }}>

//                 <Polaris.SparkLineChart
//                     accessibilityLabel="Test"
//                     data={data}
//                     // isAnimated
//                     theme='Light'
//                 // xAxisOptions={{
//                 //     labelFormatter: value => value //`${isCurrency && storeConfig?.currency_alignment === 'left' ? storeConfig.currency_symbol : ''}${isCurrency ? formatCurrency(value) : value} ${isCurrency && (!storeConfig?.currency_alignment || storeConfig?.currency_alignment === 'right') ? storeConfig.currency_symbol : ''}`
//                 // }}
//                 // showLegend={true}
//                 />
//             </View>
//         </PolarisVizProvider>
//     )
// }

const sampleData = [
    {
        name: 'Sample Data',
        data: [
            { key: 'Jan', value: 100 },
            { key: 'Feb', value: 200 },
            { key: 'Mar', value: 300 },
            { key: 'Apr', value: 400 },
            { key: 'May', value: 100 },
        ],
    },
];

export default function BarChart() {
    if (sampleData[0].data.length <= 0) {
        return (
            <div className='data-container d-flex' style={{ justifyContent: 'center', alignItems: 'center' }}>
                <p>There was no data found for this date range.</p>
            </div>
        );
    }

    const xAxisLabels = sampleData[0].data.map(item => item.key);
    const yAxisValues = sampleData[0].data.map(item => item.value);

    return (
        <PolarisVizProvider>
            <View style={{ width: '90%', height: 200, padding: 20, marginTop: 200, borderWidth: 1, borderColor: 'red', margin: 'auto' }}>
                <Polaris.SparkLineChart
                    accessibilityLabel="Sample SparkLine Chart"
                    data={sampleData}
                    theme='Light'
                    xAxisOptions={{
                        labelFormatter: (value, index) => xAxisLabels[index]
                    }}
                    yAxisOptions={{
                        labelFormatter: value => value.toFixed(2)
                    }}
                />
            </View>
        </PolarisVizProvider>
    );
}