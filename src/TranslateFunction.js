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
        if (item[1]==='blue' || item.color==='blue') {
            item[1] = 'Niebieski';
            item.color = 'Niebieski';
        }
        else if (item[1]==='lightblue' || item.color==='lightblue') {
            item[1] = 'Błękitny';
            item.color = 'Błękitny';
        }
        else if (item[1]==='darkblue' || item.color==='darkblue') {
            item[1] = 'Granatowy';
            item.color = 'Granatowy';
        }
    })
}

function translateSize(response) {
    let items = response.items
    if (items===undefined) items=response;

    items.map(item => {
        if (item.size!==undefined) item.size = item.size.toUpperCase();
        else item[2] = item[2].toUpperCase();
    })
};