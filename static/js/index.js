(appModule = new function() {
    var me = this;

    var SELECTED_IMAGE_POSTFIX = '_selected';

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

    function getInputsContainer() {
        return document.getElementById('CardInputsContainer');
    };
    
    function getInputsTexts() {
        var cardTexts = [];
        getInputsContainer().querySelectorAll('input').forEach(function(i) {
            i.value && cardTexts.push(i.value);
        });
        return cardTexts.join(',');
    };

    function ensureButtonsState() {
        var deleteButton = document.getElementById('DeleteCardInputButton'),
            inputsCount = getInputsContainer().childElementCount;
        deleteButton[inputsCount < 2 ? 'setAttribute' : 'removeAttribute']('disabled', true);
        ensureCreateButtonState();
    };

    function ensureCreateButtonState() {
        document.getElementById('CreateGraphButton')[getInputsTexts().length == 0 ? 'setAttribute' : 'removeAttribute']('disabled', true);
    };

    function onDeleteCardInputButtonClick(e) {
        if(e.target.getAttribute('disabled')) {
            return;
        }
        var container = getInputsContainer(),
            inputs = container.childNodes,
            inputToDelete = inputs[inputs.length - 1];
        container.removeChild(inputToDelete);
        ensureButtonsState();
    };

    function onAddCardInputButtonClick() {
        var newInput = document.createElement('INPUT');
        newInput.setAttribute('type', 'text');
        document.getElementById('CardInputsContainer').appendChild(newInput);
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

        document.getElementById('DeleteCardInputButton').addEventListener('click', onDeleteCardInputButtonClick);
        document.getElementById('AddCardInputButton').addEventListener('click', onAddCardInputButtonClick);
        document.getElementById('CreateGraphButton').addEventListener('click', onCreateGraphButtonClick);
        document.getElementById('StastTypesContainer').addEventListener('click', onStatTypesContainerClick);
    };
}());

appModule.init();