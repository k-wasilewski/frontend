export default function (response) {
    if (response!==undefined) {
        untranslateColor(response);
        untranslateSize(response);
    }
}

function untranslateColor(response) {
    let items = response.items;
    if (items===undefined) items=response;

    items.map(item => {
        if (item.color==='Niebieski') {
            item.color = 'blue';
        }
        else if (item.color==='Błękitny') {
            item.color = 'lightblue';
        }
        else if (item.color==='Granatowy') {
            item.color = 'darkblue';
        }

        return item;
    })
}

function untranslateSize(response) {
    let items = response.items
    if (items===undefined) items=response;

    items.map(item => {
        item.size = item.size.toLowerCase();
        return item;
    })
};