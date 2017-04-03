(appModule = new function() {
    var me = this;

    var SELECTED_IMAGE_POSTFIX = '_selected',
        CARD_TITLE_WRAPPER_CSS_CLASS_SELECTOR = '.card-title-wrapper';

    function createRequest(url, method, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        data && xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(data ? 'data=' + JSON.stringify(data) : null);
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
        window.clearTimeout(me.ensureButtonsStateTimeout);
        me.ensureButtonsStateTimeout = window.setTimeout(ensureCreateButtonState, 300);
    };

    function ensureCreateButtonState() {
        function setButtonDisabled(isDisabled) {
            document.getElementById('CreateStatButton')[isDisabled ? 'setAttribute' : 'removeAttribute']('disabled', true);
        }

        setButtonDisabled((me.statId && me.statId.length >= 4 && !me.isIdFree) || getInputsTexts().length == 0);
    };

    function onRemoveCardTitleButtonClick(e) {
        getInputsContainer().removeChild(e.target.parentNode);
        ensureButtonsState();
    };

    function onCardTitleInputKeyUp(e) {
        ensureButtonsState();
    };

    function onStatIdInputKeyUp(e) {
        me.statId = e.target.value;
        window.clearTimeout(me.checkIdTimeout);
        setErrorLabelVisible('IdLength', me.statId && me.statId.length < 4);
        if(me.statId && me.statId.length >= 4) {
            me.checkIdTimeout = window.setTimeout(function() {
                createRequest('/is_id_free/' + me.selectedStatType + '/' + me.statId, 'GET', null, function(resp) {
                    me.isIdFree = resp;
                    setErrorLabelVisible('IdNotFree', !me.isIdFree);
                    ensureButtonsState();
                });
            }, 300);
        } else {
            me.isIdFree = true;
            setErrorLabelVisible('IdNotFree', false);
            ensureButtonsState();
        }
    };

    function onAddCardInputButtonClick() {
        var settingsNode = document.querySelector(CARD_TITLE_WRAPPER_CSS_CLASS_SELECTOR),
            clone = deepClone(settingsNode);
        clone.querySelector('input').value = '';
        document.getElementById('CardInputsContainer').appendChild(clone);
        ensureButtonsState();
    };

    function onCreateStatButtonClick() {
        var data = {
            cardsText: getInputsTexts(),
            id: me.statId
        };
        createRequest('/' + me.selectedStatType + '/create/', 'POST', data, function(resp) {
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
    
    function setErrorLabelVisible(errorName, isVisible) {
        var label = document.getElementById(errorName + 'ErrorLabel');
        label.innerHTML = isVisible ? label.dataset.message : '';
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
        document.getElementById('StatIdInput').onkeyup = onStatIdInputKeyUp;
        document.getElementById('AddCardInputButton').onclick = onAddCardInputButtonClick;
        document.getElementById('CreateStatButton').onclick = onCreateStatButtonClick;
        document.getElementById('StastTypesContainer').onclick = onStatTypesContainerClick;
    };
}());

appModule.init();