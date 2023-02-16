function linkedCheckboxes(widget) {
    const controllingCheckbox = widget.querySelector('[kjs-role=controllingcheckbox]');
    const relatedCheckboxes = widget.querySelectorAll('[kjs-role=relatedcheckboxes]');

    function handleClick(e) {
        let checkedRelatedCount, uncheckAll, setRelatedBool;
        let relatedCheckboxId = e.target.getAttribute('kjs-relatedcheckbox-id');
        let controllingCheckboxId = e.target.getAttribute('kjs-controllingcheckbox-id');
        uncheckAll = false;
        checkedRelatedCount = 0;
        for (const checkbox of relatedCheckboxes) {
        if (checkbox.checked) {
            checkedRelatedCount++;
            uncheckAll = checkbox.checked;
        }
        }
        if (relatedCheckboxId) {
        if (checkedRelatedCount === 0) {
            controllingCheckbox.checked = false;
            controllingCheckbox.indeterminate = false;
        } else if (checkedRelatedCount === relatedCheckboxes.length) {
            controllingCheckbox.checked = true;
            controllingCheckbox.indeterminate = false;
        } else {
            controllingCheckbox.checked = false;
            controllingCheckbox.indeterminate = true;
        }
        } else if (controllingCheckboxId) {
        setRelatedBool = false;
        if (!controllingCheckbox.checked || uncheckAll) {
            setRelatedBool = false;
            controllingCheckbox.checked = false;
        }
        else if (controllingCheckbox.checked) {
            setRelatedBool = true;
        }
        for (const check of relatedCheckboxes) {
            check.checked = setRelatedBool;
        }
        }
    }
    var actions = [];
    [...relatedCheckboxes, controllingCheckbox].forEach(function (checkbox) {
        actions.push({
        element: checkbox,
        event: 'click',
        handler: handleClick
        });
    });
    return {
        actions: actions
    };
}

module.exports = linkedCheckboxes;
