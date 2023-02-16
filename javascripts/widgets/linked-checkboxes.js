function linkedCheckboxes(widget) {
    const controllingCheckbox = widget.querySelector('[kjs-role=controllingcheckbox]');
    const relatedCheckboxes = widget.querySelectorAll('[kjs-role=relatedcheckboxes]');
  
    function setup() {
      controllingCheckbox.addEventListener('click', handleControlCheckboxClick);
    }
  
    function handleControlCheckboxClick(e) {
      let uncheckAll = false;
      let setRelatedCheckBoxBoolean = false;
      for (const checkbox of relatedCheckboxes) {
        if (checkbox.checked) {
          uncheckAll = checkbox.checked;
        }
      }
      if (!controllingCheckbox.checked || uncheckAll) {
        setRelatedCheckBoxBoolean = false;
        controllingCheckbox.checked = false;
      }
      else if (controllingCheckbox.checked) {
        setRelatedCheckBoxBoolean = true;
      }
      for (const check of relatedCheckboxes) {
        check.checked = setRelatedCheckBoxBoolean;
      }
    }
  
    function handleRelatedCheckboxClick(e) {
      let checkedRelatedCount = 0;
      for (const checkbox of relatedCheckboxes) {
        if (checkbox.checked) {
          checkedRelatedCount++;
        }
      }
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
    }
    var actions = [];
    relatedCheckboxes.forEach(function (checkbox) {
      actions.push({
        element: checkbox,
        event: 'click',
        handler: handleRelatedCheckboxClick
      });
    });
    return {
      setup: setup,
      actions: actions
    };
}
  
module.exports = linkedCheckboxes;
