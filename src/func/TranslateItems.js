export default function (response) {
    if (response!==undefined) {
        translateColor(response);
        translateSize(response);
    }
}

function translateColor(response) {
    let items = response.items;
    if (items===undefined) items=response;

    items.map(item => {
        if (item.color==='blue') {
            item.color = 'Niebieski';
        }
        else if (item.color==='lightblue') {
            item.color = 'Błękitny';
        }
        else if (item.color==='darkblue') {
            item.color = 'Granatowy';
        }
    })
}

function translateSize(response) {
    let items = response.items
    if (items===undefined) items=response;

    items.map(item => {
        item.size = item.size.toUpperCase();
    })
};