(appModule = new function() {
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
        createPostRequest('/efficiency/create/', getInputsTexts(), function(resp) {
            window.open(resp.graphUrl, '_self');
        });
    };

    this.init = function() {
        ensureButtonsState();
        document.getElementById('DeleteCardInputButton').addEventListener('click', onDeleteCardInputButtonClick);
        document.getElementById('AddCardInputButton').addEventListener('click', onAddCardInputButtonClick);
        document.getElementById('CreateGraphButton').addEventListener('click', onCreateGraphButtonClick);
    };
}());

appModule.init();