(appModule = new function() {
    var me = this;

    var SELECTED_IMAGE_POSTFIX = '_selected',
        CARD_TITLE_WRAPPER_CSS_CLASS_SELECTOR = '.card-title-wrapper';

    function createPostRequest(url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send('data=' + JSON.stringify(data));
    };

    function deepClone(node) {
        var newNode = node.cloneNode();
        ['onclick', 'onkeyup'].forEach(function(event) {
            newNode[event] = node[event];
        });
        for(var child, i = 0; child = node.children[i]; i++) {
            newNode.appendChild(deepClone(child));
        }
        return newNode;
    }

    function getInputsContainer() {
        return document.getElementById('CardInputsContainer');
    };

    function getInputsTexts() {
        var cardTexts = [];
        getInputsContainer().querySelectorAll('.card-title-wrapper input').forEach(function(i) {
            i.value && cardTexts.push(i.value);
        });
        return cardTexts.join(',');
    };

    function ensureButtonsState() {
        window.clearTimeout(appModule.ensureButtonsStateTimeout);
        appModule.ensureButtonsStateTimeout = window.setTimeout(ensureCreateButtonState, 300);
    };

    function ensureCreateButtonState() {
        document.getElementById('CreateGraphButton')[getInputsTexts().length == 0 ? 'setAttribute' : 'removeAttribute']('disabled', true);
    };

    function onRemoveCardTitleButtonClick(e) {
        getInputsContainer().removeChild(e.target.parentNode);
        ensureButtonsState();
    };

    function onCardTitleInputKeyUp(e) {
        ensureButtonsState();
    };

    function onAddCardInputButtonClick() {
        var settingsNode = document.querySelector(CARD_TITLE_WRAPPER_CSS_CLASS_SELECTOR),
            clone = deepClone(settingsNode);
        clone.querySelector('input').value = '';
        document.getElementById('CardInputsContainer').appendChild(clone);
        ensureButtonsState();
    };

    function onCreateGraphButtonClick() {
        createPostRequest('/' + me.selectedStatType + '/create/', getInputsTexts(), function(resp) {
            window.open(resp.graphUrl, '_self');
        });
    };

    function onStatTypesContainerClick(e) {
        var target = e.target,
            statType = target.dataset.stattype;
        if(!statType) {
            return;
        }
        me.selectedStatType = statType;
        ensureStatTypesNodesStatus();
    };

    function ensureStatTypesNodesStatus() {
        for(var child, i = 0; child = document.getElementById('StastTypesContainer').children[i]; i++) {
            if(child.dataset.stattype === me.selectedStatType) {
                if(child.src.indexOf(SELECTED_IMAGE_POSTFIX) === -1) {
                    var srcPaths = child.src.split('/'),
                        imageName = srcPaths[srcPaths.length - 1],
                        splittedImageName = imageName.split('.'),
                        selectedImageName = [splittedImageName[0] + SELECTED_IMAGE_POSTFIX, splittedImageName[1]].join('.');
                    child.src = child.src.replace(imageName, selectedImageName);
                }
            } else {
                child.src = child.src.replace(SELECTED_IMAGE_POSTFIX, '');
            }
        }
    }

    me.selectedStatType = 'efficiency';

    me.init = function() {
        ensureButtonsState();
        ensureStatTypesNodesStatus();

        document.querySelector(CARD_TITLE_WRAPPER_CSS_CLASS_SELECTOR + ' img').onclick = onRemoveCardTitleButtonClick;
        document.querySelector(CARD_TITLE_WRAPPER_CSS_CLASS_SELECTOR + ' input').onkeyup = onCardTitleInputKeyUp;
        document.getElementById('AddCardInputButton').onclick = onAddCardInputButtonClick;
        document.getElementById('CreateGraphButton').onclick = onCreateGraphButtonClick;
        document.getElementById('StastTypesContainer').onclick = onStatTypesContainerClick;
    };
}());

appModule.init();