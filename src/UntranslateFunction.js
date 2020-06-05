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
        if (item[1]==='Niebieski' || item.color==='Niebieski') {
            item[1] = 'blue';
            item.color = 'blue';
        }
        else if (item[1]==='Błękitny' || item.color==='Błękitny') {
            item[1] = 'lightblue';
            item.color = 'lightblue';
        }
        else if (item[1]==='Granatowy' || item.color==='Granatowy') {
            item[1] = 'darkblue';
            item.color = 'darkblue';
        }
    })
}

function untranslateSize(response) {
    let items = response.items
    if (items===undefined) items=response;

    items.map(item => {
        if (item.size!==undefined) item.size = item.size.toLowerCase();
        else item[2] = item[2].toLowerCase();
    })
};