function getData() {
    let countries = 'US,Germany,UK,Japan,Italy'.split(',');
    let data = [];
    for (let i = 0; i < 3; i++) {
        data.push({
            country: countries[i],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.round(Math.random() * 10000),
            expenses: Math.round(Math.random() * 5000)
        });
    }
    return data;
}

function getCorpData(company) {
    if(company == 'Apple'){
        return [{ company: 'Apple', cap: 804, revenue: 216, earnings: 46} ];
    } else if(company == 'Alphabet'){
        return [{ company: 'Alphabet', cap: 651, revenue: 90, earnings: 19 }];
    } else if(company == 'Microsoft'){
        return [{ company: 'Microsoft', cap: 536, revenue: 85, earnings: 17 }];
    } else if(company == 'Amazon'){
        return [{ company: 'Amazon', cap: 455, revenue: 136, earnings: 2 }];
    } else if(company == 'Facebook'){
        return [{ company: 'Facebook', cap: 434, revenue: 28, earnings: 10 }];
    }

    else if(company == 'Zero'){
        return [{ company: 'Zero', cap: 0, revenue: 250, earnings: 50 }];
    }
    return null;
}

function getSinData() {
    let data = [];
    let len = 10;
    for (var i = 0; i < len; i++) {
        data.push({ x: i, y: Math.sin(0.24 * i) });
    }
    return data;
}

function getCosData() {
    let data = [];
    let len = 10;
    for (var i = 0; i < len; i++) {
        data.push({ x: i, y: Math.cos(0.24 * i) });
    }
    return data;
}

function getTreeData() {
    var data = [
        {
            type: 'Electronics', items: [
                {
                    type: 'Camera', items: [
                        { type: 'Digital Cameras', sales: getSales() },
                        { type: 'Film Photography', sales: getSales() },
                        { type: 'Lenses', sales: getSales() },
                        { type: 'Video', sales: getSales() },
                        { type: 'Accessories', sales: getSales() }
                    ]
                },
                // {
                //     type: 'Headphones', items: [
                //         { type: 'Earbud headphones', sales: getSales() },
                //         { type: 'Over-ear headphones', sales: getSales() },
                //         { type: 'On-ear headphones', sales: getSales() },
                //         { type: 'Bluetooth headphones', sales: getSales() },
                //         { type: 'Noise-cancelling headphones', sales: getSales() },
                //         { type: 'Audiophile headphones', sales: getSales() }
                //     ]
                // },
                {
                    type: 'Cell Phones', items: [
                        { type: 'Cell Phones', sales: getSales() },
                        {
                            type: 'Accessories', items: [
                                { type: 'Batteries', sales: getSales() },
                                { type: 'Bluetooth Headsets', sales: getSales() },
                                { type: 'Bluetooth Speakers', sales: getSales() },
                                { type: 'Chargers', sales: getSales() },
                                { type: 'Screen Protectors', sales: getSales() }
                            ]
                        }
                    ]
                },
                // {
                //     type: 'Wearable Technology', items: [
                //         { type: 'Activity Trackers', sales: getSales() },
                //         { type: 'Smart Watches', sales: getSales() },
                //         { type: 'Sports & GPS Watches', sales: getSales() },
                //         { type: 'Virtual Reality Headsets', sales: getSales() },
                //         { type: 'Wearable Cameras', sales: getSales() },
                //         { type: 'Smart Glasses', sales: getSales() }
                //     ]
                // }
            ]
        },
        {
            type: 'Computers & Tablets', items: [
                {
                    type: 'Desktops', items: [
                        { type: 'All-in-ones', sales: getSales() },
                        { type: 'Minis', sales: getSales() },
                        { type: 'Towers', sales: getSales() }
                    ]
                },
                {
                    type: 'Laptops', items: [
                        { type: '2 in 1 laptops', sales: getSales() },
                        { type: 'Traditional laptops', sales: getSales() }
                    ]
                },
                {
                    type: 'Tablets', items: [
                        { type: 'iOS', sales: getSales() },
                        { type: 'Android', sales: getSales() },
                        { type: 'Fire OS', sales: getSales() },
                        { type: 'Windows', sales: getSales() }
                    ]
                }
            ]
        }
    ];
    return data;
}
//
function getSales() {
    return Math.round(Math.random() * 100);
}
