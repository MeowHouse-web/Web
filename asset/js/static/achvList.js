function getData(fileAttribution, fileName) {
    url = '/data/'+fileAttribution+'/'+fileName;
    fetch(url)
        .then((response) => response.json())
        .then((json) => createList(json))
}

function createList(jsonObject) {
    // Get Basic Infos
    const attribution = jsonObject.attribution;

    // Create Achv Id List
    const idContent = jsonObject.content;
    const idList = idContent.flatMap(obj => {
        return obj.data.map(inner => inner.id)
    });
    
//    // Create Value Name List
//    const valueContent = jsonObject.content;
//    const valueList = valueContent.flatMap(obj => {
//        return obj.data.map(inner => inner.value)
//    });
    
    // Create Achv Name List
    const nameContent = jsonObject.content;
    const nameList = nameContent.flatMap(obj => {
        return obj.data.map(inner => inner.name)
    });
    
    // Create Achv Desc List
    const descContent = jsonObject.content;
    const descList = descContent.flatMap(obj => {
        return obj.data.map(inner => inner.desc)
    });

    // Create Achv Status List
    const hiddenContent = jsonObject.content;
    const hiddenList = hiddenContent.flatMap(obj => {
        return obj.data.map(inner => inner.hidden)
    });

    mergeContent(attribution, idList, nameList, descList, hiddenList);
}

function mergeContent(attribution, idList, nameList, descList, hiddenList) {
    var content = '';
    for (i=0; i<idList.length; i++) {
        content += '<article><div class="content"><p><b>';
        content += nameList[i];
        content += '</b>';
        if (hiddenList[i] == "True") {
            content += '<span>隐藏</span>'
        };
        content += '</p><p>';
        content += descList[i];
        content += '</p></div><div class="marker"><p>';
        content += idList[i];
        content += '</p><img onclick="markAchv(this)" id="';
        content += attribution+'-'+idList[i];
        content += '" class="checkmark" src='
        if (localStorage.getItem(attribution+'-'+idList[i])) {
            content += "/img/wuthering-wave/Marker/true.png";
        } else {
            content += "/img/wuthering-wave/Marker/false.png";
        };
        content += '></div></article>';
    };
    exportHTML(content);
}

function exportHTML(data) {
    document.getElementById("data").innerHTML=data;
}

function markAchv(element) {
    var target = $(element);
    var key = target.attr("id");
    var oldValue = localStorage.getItem(key);
    var newValue = !oldValue;
    localStorage.setItem(key, newValue ? "1" : "")

    // State of Marker
    if (localStorage.getItem(key) == "1") {
        document.getElementById(key).src="/img/wuthering-wave/Marker/true.png";
    } else {
        document.getElementById(key).src="/img/wuthering-wave/Marker/false.png";
    }
}
