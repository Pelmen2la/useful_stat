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

    function gBId(id) {
        return document.getElementById(id)
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
    };

    function getPageLanguage() {
        return document.cookie.indexOf('lang=') > -1 ? document.cookie.match(/lang=\S+/)[0].split('=')[1] : 'en';
    };

    function setPageLanguage(lang) {
        document.cookie = 'lang=' + lang + '; path=/; expires=' + (new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)).toUTCString();
        window.location.reload();
    };

    function addClassToElement(el, className) {
        el.className += ' ' + className;
    };

    function removeClassFromElement(el, className) {
        el.className = el.className.replace(' ' + className, '');
    };

    function getCardTextInputsContainer() {
        return gBId('CardInputsContainer');
    };

    function getCardTextInputsTexts() {
        var cardTexts = [];
        getCardTextInputsContainer().querySelectorAll('.card-title-wrapper input').forEach(function(i) {
            i.value && cardTexts.push(i.value);
        });
        return cardTexts;
    };

    function ensureLanguageSelectorButtonsState() {
        document.querySelectorAll('[data-language]').forEach(function(i) {
            i.style.opacity = i.dataset.language === getPageLanguage() ? '1' : '0.5';
        });
    };

    function ensureStatSettingsFieldVisibility() {
        document.querySelectorAll('[data-statTypeDepended]').forEach(function(i) {
            i.style.display = i.dataset.stattypedepended === me.selectedStatType ? '' : 'none';
        });
    };

    function ensureButtonsState() {
        var cont = getCardTextInputsContainer();
        (cont.children.length > 1 ? addClassToElement : removeClassFromElement)(cont, 'has-remove-buttons');

        window.clearTimeout(me.ensureButtonsStateTimeout);
        me.ensureButtonsStateTimeout = window.setTimeout(ensureCreateButtonState, 300);
    };

    function ensureCreateButtonState() {
        function setButtonDisabled(isDisabled) {
            gBId('CreateStatButton')[isDisabled ? 'setAttribute' : 'removeAttribute']('disabled', true);
        }

        setButtonDisabled((me.statId && me.statId.length >= 4 && !me.isIdFree) || getCardTextInputsTexts().length == 0);
    };

    function onRemoveCardTitleButtonClick(e) {
        getCardTextInputsContainer().removeChild(e.target.parentNode);
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
        gBId('CardInputsContainer').appendChild(clone);
        ensureButtonsState();
    };

    function onCreateStatButtonClick() {
        var data = {
            cardsText: getCardTextInputsTexts(),
            showResultsBeforeVote: gBId('ShowResultsBeforeVoteCheckbox').checked,
            id: me.statId
        };
        document.querySelectorAll('[data-statTypeDepended=' + me.selectedStatType + ']').forEach(function(i) {
            i.value && (data[i.name] = i.value);
        });
        createRequest('/' + me.selectedStatType + '/create/', 'POST', data, function(resp) {
            window.open(resp.graphUrl, '_self');
        });
    };

    function onLanguageSelectorContainerClick(e) {
        var target = e.target,
            language = e.target.dataset.language;
        if(language && language !== getPageLanguage()) {
            setPageLanguage(language);
        }
    };

    function onStatTypesContainerClick(e) {
        var target = e.target,
            statType = target.dataset.stattype;
        if(!statType) {
            return;
        }
        me.selectedStatType = statType;
        ensureStatSettingsFieldVisibility();
        ensureStatTypesNodesStatus();
    };
    
    function setErrorLabelVisible(errorName, isVisible) {
        var label = gBId(errorName + 'ErrorLabel');
        label.innerHTML = isVisible ? label.dataset.message : '';
    };

    function ensureStatTypesNodesStatus() {
        for(var child, i = 0; child = gBId('StastTypesContainer').children[i]; i++) {
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
        ensureLanguageSelectorButtonsState();
        ensureStatTypesNodesStatus();
        ensureStatSettingsFieldVisibility();

        document.querySelector(CARD_TITLE_WRAPPER_CSS_CLASS_SELECTOR + ' img').onclick = onRemoveCardTitleButtonClick;
        document.querySelector(CARD_TITLE_WRAPPER_CSS_CLASS_SELECTOR + ' input').onkeyup = onCardTitleInputKeyUp;
        gBId('StatIdInput').onkeyup = onStatIdInputKeyUp;
        gBId('AddCardInputButton').onclick = onAddCardInputButtonClick;
        gBId('CreateStatButton').onclick = onCreateStatButtonClick;
        gBId('LanguagesSelectorContainer').onclick = onLanguageSelectorContainerClick;
        gBId('StastTypesContainer').onclick = onStatTypesContainerClick;
    };
}());

appModule.init();